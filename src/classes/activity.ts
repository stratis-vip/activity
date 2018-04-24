import { TcxFile } from "tcx-file-class";
import * as consts from "../classes/consts";

import GeoPoint from "./geoPoint";
import { apostasi, secsToTime, TimePaceFromSpeedMpS } from "../utils/functions";
import InfoLap from "./infoLap";
import { Lap } from "tcx-file-class/index"
import { GpsPoint } from "tcx-file-class"
import { start } from "repl";
import { iZone } from "./iFaces";

/**
 * Αρχικό αντικείμενο που κρατά πρακτικά όλη την προπόνηση 
 * Πρακτικά, το αντικείμενο αυτό θα «μοιράσει» επι μέρους 
 * τα στοιχεία του ώστε να είναι πιο πρακτικό.
 */
export default class Activity {
    /**Η Ταυτότητα της δραστηριότητας */
    id: string = consts.ERROR_STRING_VALUE;
    /**Αν είναι έτοιμη η δραστηριότητα. Αν το αρχείο TCX είναι εσφαλμένο, η ιδιότητα αυτή είναι false */
    isReady = false;
    /**Η απόσταση (σε ΜΕΤΡΑ) όπως την έχει καταγγεγραμένη στα Laps */
    distanceFromLaps = consts.ERROR_NUMBER_VALUE;
    /**Η απόσταση (σε ΜΕΤΡΑ) όπως υπολογίζεται από τα σημεία που έχει καταγράψει στο TCX */
    distanceDromPoints = consts.ERROR_NUMBER_VALUE;
    /**Ο χρόνος όπως έχει καταγραφεί στα Laps (σε secs) */
    timeFromLaps = consts.ERROR_NUMBER_VALUE;
    /**Ο χρόνος όπως υπολογίζεται από τα σημεία που έχει καταγράψει στο ΤCX (σε secs) */
    timeFromPoints = consts.ERROR_NUMBER_VALUE;
    /**Πίνακας με τους πληροφοριακούς γύρους. Laps που δεν έχουν τα Points */
    infoLaps: Array<InfoLap> = new Array<InfoLap>();
    /**Πίνακας με τα σημεία Point όλης της δραστηριότητας */
    tPoints: Array<GpsPoint> = new Array<GpsPoint>();
    /**Πίνακας που κρατάει τα δευτερόλεπτα προπόνησης */
    zones = new Array<iZone>();
    proccessElements = new ResultClass();
    lapsElements = new ResultClass();
    /** 
     * @param {TcxFile} xmlSource το αντικείμενο που κρατά όλα τα στοιχεία από το tcx αρχείο
     */
    constructor(xmlSource: TcxFile) {
        if (xmlSource.isReady) {
            this.id = xmlSource.getId();
            let laps: Array<Lap> = new Array<Lap>();
            laps = xmlSource.getLaps();
            laps.forEach((lap: Lap) => {
                this.infoLaps.push(new InfoLap(lap));
                (lap as Lap).trackPoints.forEach((point: GpsPoint) => {
                    if (point.position.latitudeDegrees !== consts.ERROR_NUMBER_VALUE) {
                        this.tPoints.push(point);
                    }
                });
            });
            this.proccessElements = getDistanceFromPoints(this.tPoints, null, this);
            this.distanceFromLaps = getDistanceFromLaps(this.infoLaps);
            this.distanceDromPoints = this.proccessElements.distance;
            this.timeFromLaps = getTimeFromLaps(this.infoLaps);
            this.timeFromPoints = this.proccessElements.totalTime;
            this.isReady = true;
        }
    }
}
function getValue(lapValue:number, resValue:number):number{
    if (lapValue > resValue){
        resValue = lapValue
    }
    return resValue;
}
/**
 * Βρίσκει την απόσταση μόνο από τις πληροφορίες των γύρων
 * 
 * @param {InfoLap[]} laps τα InfoLap από την δραστηριότητα
 * @return {number} η απόσταση σε μέτρα
 */
function getDistanceFromLaps(laps: InfoLap[]): number {
    let temp = new ResultClass();
    let distance = 0;
    let lapCount = laps.length;
    for (let i = 0; i != lapCount; ++i) {
        temp.distance += laps[i].distanceMeters;

        temp.maxSpeed = getValue(laps[i].maximumSpeed,temp.maxSpeed);
        temp.maxHR = getValue(laps[i].maximumHeartRateBpm, temp.maxHR);
        temp.maxBikeCadence = getValue(laps[i].maxBikeCadence, temp.maxBikeCadence);
        temp.maxRunCadence = getValue(laps[i].maxRunCadence, temp.maxRunCadence);

    }
    return temp.distance;
}

export class ResultClass {
    distance = 0;
    totalTime = 0;
    minAlt = consts.ERROR_NUMBER_VALUE;
    maxAlt = consts.ERROR_NUMBER_VALUE;
    totalUp = 0;
    totalDown = 0;
    maxSpeed = consts.ERROR_NUMBER_VALUE;
    maxBikeCadence = consts.ERROR_NUMBER_VALUE;
    maxRunCadence = consts.ERROR_NUMBER_VALUE;
    maxHR = consts.ERROR_NUMBER_VALUE;
    zones = [{ zone: 1, time: 0 },
    { zone: 2, time: 0 },
    { zone: 3, time: 0 },
    { zone: 4, time: 0 },
    { zone: 5, time: 0 }]
}
/**
 * Υπολογίζει την απόσταση από τα σημεία του TCX
 * 
 * @param {Point[]} points τα  σημεία TrackPoints από την δραστηριότητα
 * @return {number} η απόσταση σε μέτρα
 */
export function getDistanceFromPoints(points: Array<GpsPoint>, bpmZones?: [number, number, number, number],
    thisValue?: Activity): ResultClass {
    let pointsCount = points.length;
    let from: GeoPoint = new GeoPoint();
    let to: GeoPoint = new GeoPoint();
    let previous = 0;
    let fromTime: Date;
    let toTime: Date;

    let temp = new ResultClass();

    for (let i = 0; i != pointsCount; ++i) {
        if (points[i].position.longitudeDegrees !== consts.ERROR_NUMBER_VALUE &&
            points[i].position.latitudeDegrees !== consts.ERROR_NUMBER_VALUE) {
            if (from.latitudeDegrees === consts.ERROR_NUMBER_VALUE &&
                from.longitudeDegrees === consts.ERROR_NUMBER_VALUE) {
                from.longitudeDegrees = points[i].position.longitudeDegrees;
                from.latitudeDegrees = points[i].position.latitudeDegrees;
                from.altitudeMeters = points[i].position.altitudeMeters;
                fromTime = new Date(points[i].time);
            }

            to.longitudeDegrees = points[i].position.longitudeDegrees;
            to.latitudeDegrees = points[i].position.latitudeDegrees;
            to.altitudeMeters = points[i].position.altitudeMeters;
            toTime = new Date(points[i].time);
            //Υπολογισμός αρχικού υψομέτρου
            if (temp.minAlt === consts.ERROR_NUMBER_VALUE) {
                temp.minAlt = from.altitudeMeters;
                temp.maxAlt = from.altitudeMeters
            }

            if (to.altitudeMeters < temp.minAlt) {
                temp.minAlt = to.altitudeMeters;
            }
            if (to.altitudeMeters > temp.maxAlt) {
                temp.maxAlt = to.altitudeMeters;
            }
            if (to.altitudeMeters >= from.altitudeMeters) {

                ++previous;
                if (previous >= 1) {
                    temp.totalUp += (to.altitudeMeters - from.altitudeMeters);
                    previous = 0;
                }
            } else {
                --previous;
                if (previous <= -1) {
                    temp.totalDown += (from.altitudeMeters - to.altitudeMeters);
                    previous = 0;
                }
            }

            let meters = apostasi(from, to);
            temp.distance += meters;
            temp.maxRunCadence = getValue(points[i].runCadence,temp.maxRunCadence);
            temp.maxBikeCadence = getValue(points[i].cadence, temp.maxBikeCadence);
            let diff: number;
            diff = (Number(toTime) - Number(fromTime)) / 1000;
            let tempSpeed = temp.maxSpeed;
            if (diff > 0) {
                tempSpeed = meters / diff;
                if (tempSpeed > temp.maxSpeed) {
                    temp.maxSpeed = tempSpeed;
                }
            }
            let hr = points[i].heartRateBpm;
            if (hr > temp.maxHR){
                temp.maxHR = hr;
            }
            if (hr !== consts.ERROR_NUMBER_VALUE && bpmZones !== null) {
                if (hr < bpmZones[0]) {
                    temp.zones[0].time += diff;
                } else {
                    if (hr < bpmZones[1]) {
                        temp.zones[1].time += diff;
                    } else {
                        if (hr < bpmZones[2]) {
                            temp.zones[2].time += diff;
                        } else {
                            if (hr < bpmZones[3]) {
                                temp.zones[3].time += diff;
                            } else {
                                temp.zones[4].time += diff;
                            }
                        }
                    }
                }
            }
            temp.totalTime += (toTime.valueOf() - fromTime.valueOf()) / 1000;
            fromTime = toTime;
            from.longitudeDegrees = to.longitudeDegrees;
            from.latitudeDegrees = to.latitudeDegrees;
            from.altitudeMeters = to.altitudeMeters;
        }
    }
    if (thisValue !== undefined) {
        thisValue.zones = temp.zones;
        thisValue.distanceDromPoints = temp.distance;
    }
    return temp;
}
/**
 * Υπολογίζει τον χρόνο από τις πληροφορίες των γύρων
 * 
 * @param {InfoLap[]} laps τα InfoLap από την δραστηριότητα
 * @return o χρόνος σε δευτερόλεπτα
 */
function getTimeFromLaps(laps: InfoLap[]): number {
    let lapCount = laps.length;
    let time = consts.ERROR_NUMBER_VALUE;
    for (let i = 0; i != lapCount; ++i) {
        time += laps[i].totalTimeSeconds;
    }
    return time;
}

/**
 * Υπολογίζει τον χρόνο από τα σημεία του TCX
 * 
 * @param {Point[]} points τα σημεία Point από την δραστηριότητα
 * @return o χρόνος σε δευτερόλεπτα
 */
function getTimeFromPoints(points: Array<GpsPoint>): number {
    let time = 0.0;
    let pointsCount = points.length;
    let from: Date = null;
    let to: Date = null;
    for (let i = 0; i != pointsCount; ++i) {
        if (from === null) {
            from = new Date(points[i].time);
        }
        to = new Date(points[i].time);
        time += to.valueOf() - from.valueOf();
        from = to;
    }
    return time / 1000.0;
}