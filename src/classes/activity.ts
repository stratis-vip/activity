import {TcxFile} from "tcx-file-class";
import * as consts from "../classes/consts";

import GeoPoint from "./geoPoint";
import { apostasi, secsToTime } from "../utils/functions";
import InfoLap from "./infoLap";
import {Lap} from "tcx-file-class/index"
import {GpsPoint} from "tcx-file-class"
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
    /** 
     * @param {TcxFile} xmlSource το αντικείμενο που κρατά όλα τα στοιχεία από το tcx αρχείο
     */
    constructor(xmlSource: TcxFile) {
        if (xmlSource.isReady) {
            this.id = xmlSource.getId();
            let laps: Array<Lap> = xmlSource.getLaps();
            laps.forEach((lap:Lap) => {
                this.infoLaps.push(new InfoLap(lap));
                (lap as Lap).trackPoints.forEach((point:GpsPoint) => {
                    if (point.position.latitudeDegrees !== consts.ERROR_NUMBER_VALUE) {
                        this.tPoints.push(point);
                    }
                });
            });
            this.distanceFromLaps = getDistanceFromLaps(this.infoLaps);
            this.distanceDromPoints = getDistanceFromPoints(this.tPoints);
            this.timeFromLaps = getTimeFromLaps(this.infoLaps);
            this.timeFromPoints = getTimeFromPoints(this.tPoints);
            this.isReady = true;
        }
    }
}

/**
 * Βρίσκει την απόσταση μόνο από τις πληροφορίες των γύρων
 * 
 * @param {InfoLap[]} laps τα InfoLap από την δραστηριότητα
 * @return {number} η απόσταση σε μέτρα
 */
function getDistanceFromLaps(laps: InfoLap[]): number {
    let distance = 0;
    let lapCount = laps.length;
    for (let i = 0; i != lapCount; ++i) {
        distance += laps[i].distanceMeters;
    }
    return distance;
}

/**
 * Υπολογίζει την απόσταση από τα σημεία του TCX
 * 
 * @param {Point[]} points τα  σημεία TrackPoints από την δραστηριότητα
 * @return {number} η απόσταση σε μέτρα
 */
function getDistanceFromPoints(points: Array<GpsPoint>): number {
    let distance = 0;
    let pointsCount = points.length;
    let from: GeoPoint = new GeoPoint();
    let to: GeoPoint = new GeoPoint();
    for (let i = 0; i != pointsCount; ++i) {
        if (points[i].position.longitudeDegrees !== consts.ERROR_NUMBER_VALUE &&
            points[i].position.latitudeDegrees !== consts.ERROR_NUMBER_VALUE) {
            if (from.latitudeDegrees === consts.ERROR_NUMBER_VALUE &&
                from.longitudeDegrees === consts.ERROR_NUMBER_VALUE) {
                from.longitudeDegrees = points[i].position.longitudeDegrees;
                from.latitudeDegrees = points[i].position.latitudeDegrees;
            }
            to.longitudeDegrees = points[i].position.longitudeDegrees;
            to.latitudeDegrees = points[i].position.latitudeDegrees;
            distance += apostasi(from, to);
            from.longitudeDegrees = to.longitudeDegrees;
            from.latitudeDegrees = to.latitudeDegrees;

        }
    }
    return distance;
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