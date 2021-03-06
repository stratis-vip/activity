import { secsToTime, apostasi, getNextPointCordinatesFromDistanceBearing, addTuples, avgArray, movingAvg } from "../utils/functions";
import GeoPoint from "../classes/geoPoint";
import { iZone } from "../classes/iFaces";
import * as consts from '../classes/consts';

describe("Έλεγχος συναρτήσεων χρόνου", () => {

    it("Έλεγχος μετατροπής δευτερολέπτων σε τύπο ΩΩ:ΛΛ:ΔΔ.000", () => {
        expect(secsToTime(0, false)).toBe("00:00.00");
        expect(secsToTime(1, false)).toBe("00:01.00");
        expect(secsToTime(0.01, false)).toBe("00:00.01");
        expect(secsToTime(0, true)).toBe("00:00:00.00");
        expect(secsToTime(-5, true)).toBe("00:00:00.00");
        expect(secsToTime(-5, false)).toBe("00:00.00");
        expect(secsToTime(3005.34, false)).toBe("50:05.34");
        expect(secsToTime(3005.34, true)).toBe("00:50:05.34");
        expect(secsToTime(12345.34, false)).toBe("03:25:45.34");
        expect(secsToTime(12345.34, true)).toBe("03:25:45.34");
        expect(secsToTime(86745.34, true)).toBe("1d 00:05:45.34");
        expect(secsToTime(1112345.35, false)).toBe("12d 20:59:05.35");
        expect(secsToTime(1112345.346, false)).toBe("12d 20:59:05.35");
        expect(secsToTime(86399.99, false)).toBe("23:59:59.99");
        expect(secsToTime(86399.99, true)).toBe("23:59:59.99");
        expect(secsToTime(86399.99)).toBe("23:59:59.99");
    })

    it("Έλεγχος υπολογισμού απόστασης μεταξύ σημείων", () => {
        let from: GeoPoint = new GeoPoint(40.49010333605111, 22.254617689177394);
        let to: GeoPoint = new GeoPoint(40.48416666666667, 22.240833333333335);
        let to1000 = getNextPointCordinatesFromDistanceBearing(from, 1000, 0);
        expect(to1000.latitudeDegrees).toBe(40.49909655211029);
        expect(to1000.longitudeDegrees).toBe(22.254617689177397);
        expect(apostasi(from, to)).toBe(1339.6674559889066);
        expect(apostasi(from, from)).toBe(0);
        expect(apostasi(from, to1000)).toBeCloseTo(1000, 8);
        expect(apostasi(to1000, from)).toBeCloseTo(1000, 8);
    });

    it("Έλεγχος μέσου όρου πίνακα με αριθμούς", () => {
        let ar = [1, 1, 1, 1, 1, 1, 1, 1, 1];
        expect(avgArray(ar)).toBe(1);
        ar = [];
        expect(avgArray(ar)).toBe(consts.ERROR_NUMBER_VALUE);
        ar = [3.4, 5.6, 7.8, 9, 10.2, 34.33, 45.78];
        expect(avgArray(ar)).toBe(16.587142857142858);
    });

    it(`Έλεγχος κινούμενου μέσου όρου.\n
    Πρέπει να επιστρέφει τον ίδιο πίνακα όταν έχει μηδενικό μήκος ο πίνακας.`,(done)=>{
        let ar:Array<number> = [];
        expect(movingAvg(ar)).toEqual([]);
        done();
    });

    it(`Έλεγχος κινούμενου μέσου όρου.\n
    Πρέπει να επιστρέφει τον ίδιο πίνακα όταν δίνεται περίοδος 1 ή αρνητική περίοδο.`,(done)=>{
        let ar:Array<number> = [];
        expect(movingAvg(ar,1)).toEqual([]);
        ar = [1,2,3,4,5];
        expect(movingAvg(ar,1)).toEqual(ar);
        expect(movingAvg(ar,-1)).toEqual(ar);
        done();
    });

    it(`Έλεγχος κινούμενου μέσου όρου.\n
    Πρέπει να επιστρέφει πίνακα με μέση τιμή όλων, όταν δίνεται περίοδος 0.`,(done)=>{
        let ar:Array<number> = [];
        ar = [1,2,3,4,5];
        expect(movingAvg(ar,0)).toEqual([3]);
        expect(movingAvg(ar,-0)).toEqual([3]);
        done();
    });

    it(`Έλεγχος κινούμενου μέσου όρου.\n
    Πρέπει να επιστρέφει πίνακα με μέση τιμή όλων, όταν δίνεται περίοδος μεγαλύτερη από το μήκος του πίνακα.`,(done)=>{
        let ar:Array<number> = [];
        ar = [1,2,3,4,5];
        expect(movingAvg(ar,8)).toEqual([3]);
        expect(movingAvg(ar,-8)).toEqual(ar);
        done();
    });

    it(`Έλεγχος κινούμενου μέσου όρου.\n
    Πρέπει να επιστρέφει πίνακα με μέση τιμή όλων, όταν δίνεται περίοδος μεγαλύτερη από το μήκος του πίνακα.`,(done)=>{
        let ar:Array<number> = [];
        ar = [1,2,3,4,5, 45,67,12];
        expect(movingAvg(ar,3)).toEqual([null,null,2,3,4,18,39,41.333333333333336]);
        let mAvg = movingAvg(ar,8);
        expect(mAvg[7]).toEqual(17.375);
        expect(mAvg[5]).toEqual(null);
        done();
    });

});