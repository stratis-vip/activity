import { secsToTime, apostasi, getNextPointCordinatesFromDistanceBearing, addTuples } from "../utils/functions";
import GeoPoint from "../classes/geoPoint";
import { iZone } from "../classes/iFaces";

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

    it("Έλεγχος addTuples", () => {
        let t2 = [0, 1];
        let t3 = [2, 3, 4];
        expect(addTuples(t3, t2)).toEqual([2, 4, 4]);
        let zo1: Array<iZone> = [{ zone: 1, time: 13 }, { zone: 2, time: 132 }, { zone: 3, time: 163 }, { zone: 4, time: 143 }, { zone: 5, time: 134 }]
        let zo2: Array<iZone> = [{ zone: 1, time: 13 }, { zone: 2, time: 1 }, { zone: 3, time: 13 }, { zone: 4, time: 143 }, { zone: 5, time: 134 }]
        let z = [5, 6, 7, 8, 9, 10, 23, zo1, 45];
        let z1: ResultTuple = [5, 6, 7, 8, 9, 10, 11, zo2];
        expect(addTuples(z, z1)).toEqual([10, 12, 14, 16, 18, 20, 34,
            [{ zone: 1, time: 26 },
            { zone: 2, time: 133 },
            { zone: 3, time: 176 },
            { zone: 4, time: 286 },
            { zone: 5, time: 268 }], 45]);
    })
});