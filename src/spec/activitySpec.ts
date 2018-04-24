import { TcxFile } from "tcx-file-class";
import Activity, { getDistanceFromPoints, ResultClass } from "../classes/activity";
import * as path from 'path';
import * as consts from "../classes/consts";

describe("Activities TCX\n", () => {
    it("Πρέπει να διαβάζει ένα TcxFile ποδηλατικού αρχείου", (done) => {
        const tcx = new TcxFile(path.join(__dirname, "/../bike.tcx"), (err: string) => {
            const act = new Activity(tcx);
            expect(act.id).toBe("2018-04-15T09:04:15.000Z");
            expect(act.isReady).toBe(true);
            expect(act.distanceFromLaps).toBe(40036.3);
            expect(act.distanceDromPoints).toBe(40006.94404233233);
            expect(act.timeFromPoints).toBe(5117);
            expect(act.timeFromLaps).toBe(5104);
            expect(act.infoLaps.length).toBe(9);
            expect(act.tPoints.length).toBe(2759);
            let res: ResultClass;
            res = getDistanceFromPoints(act.tPoints, [121, 133, 145, 157], act);
            expect(res.maxHR).toBe(154);

            expect(res.distance).toBe(40006.94404233233);
            expect(res.totalTime).toBe(5117);
            expect(res.minAlt).toBe(25.200000762939453);
            expect(res.maxAlt).toBe(104.4000015258789);
            expect(res.totalUp).toBe(207.59997177124023);
            expect(res.totalDown).toBe(216.59997177124023);
            expect(res.maxSpeed).toBe(14.410793780043537);
            expect(res.maxHR).toBe(154);

            expect(res.maxBikeCadence).toBe(94);
            expect(res.maxRunCadence).toBe(consts.ERROR_NUMBER_VALUE);

            expect(res.zones).toEqual([{ zone: 1, time: 32 }, { zone: 2, time: 26 }, { zone: 3, time: 4907 }, { zone: 4, time: 152 }, { zone: 5, time: 0 }]);
            expect(act.zones).toEqual([{ zone: 1, time: 32 }, { zone: 2, time: 26 }, { zone: 3, time: 4907 }, { zone: 4, time: 152 }, { zone: 5, time: 0 }]);
            done();
        });
    });

    it("Πρέπει να διαβάζει ένα TcxFile", (done) => {
        const tcx = new TcxFile(path.join(__dirname, "/../garmin.tcx"), (err: string) => {
            const act = new Activity(tcx);
            expect(act.id).toBe("2018-04-12T14:56:42.000Z");
            expect(act.isReady).toBe(true);
            expect(act.distanceFromLaps).toBe(7009.27);
            expect(act.distanceDromPoints).toBe(7049.351765077946);
            expect(act.timeFromPoints).toBe(3014);
            expect(act.timeFromLaps).toBe(3005);
            expect(act.infoLaps.length).toBe(8);
            expect(act.tPoints.length).toBe(3020);
            let res: ResultClass;
            res = getDistanceFromPoints(act.tPoints, [121, 133, 145, 157], act);

            expect(res.distance).toBe(7049.351765077946);
            expect(res.totalTime).toBe(3014);
            expect(res.minAlt).toBe(43.20000076293945 );
            expect(res.maxAlt).toBe(83.80000305175781);
            expect(res.totalUp).toBe(273.3999900817871);
            expect(res.totalDown).toBe(273.9999885559082);
            expect(res.maxSpeed).toBe(6.553803034169953);
            expect(res.maxHR).toBe(165);
            expect(res.maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
            expect(res.maxRunCadence).toBe(102);
            expect(res.zones).toEqual([{ zone: 1, time: 32 }, { zone: 2, time: 35 }, { zone: 3, time: 145 }, { zone: 4, time: 2247 }, { zone: 5, time: 555 }]);
            expect(act.zones).toEqual([{ zone: 1, time: 32 }, { zone: 2, time: 35 }, { zone: 3, time: 145 }, { zone: 4, time: 2247 }, { zone: 5, time: 555 }]);
            done();
        });
    });

    describe("Activities TCX\n", () => {
        it("Πρέπει να διαβάζει ένα TcxFile", (done) => {
            const tcx = new TcxFile(path.join(__dirname, "/../test.tcx"), (err: string) => {
                const act = new Activity(tcx);
                expect(act.id).toBe("2018-04-16T16:56:17.000Z");
                expect(act.isReady).toBe(true);
                expect(act.distanceFromLaps).toBe(238.92);
                expect(act.distanceDromPoints).toBe(240.88933381687337);
                expect(act.timeFromPoints).toBe(129);
                expect(act.timeFromLaps).toBe(127);
                expect(act.infoLaps.length).toBe(1);
                expect(act.tPoints.length).toBe(130);
                let res: ResultClass;
                res = getDistanceFromPoints(act.tPoints);
                expect(res.distance).toBe(240.88933381687337);
                expect(res.totalTime).toBe(129);
                expect(res.minAlt).toBe(121.4000015258789);
                expect(res.maxAlt).toBe(136);
                expect(res.totalUp).toBe(14.800003051757812);
                expect(res.totalDown).toBe(11.199996948242188);
                expect(res.maxSpeed).toBe(3.003261592738725);
                expect(res.maxHR).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.maxRunCadence).toBe(91);
                expect(res.zones).toEqual([Object({ zone: 1, time: 0 }), Object({ zone: 2, time: 0 }), Object({ zone: 3, time: 0 }), Object({ zone: 4, time: 0 }), Object({ zone: 5, time: 0 })]);

                done();
            });
        });

        it("Πρέπει να επιστρέφει μηδενικές τιμές όταν το αρχείο δεν υπάρχει", (done) => {
            const tcx = new TcxFile(path.join(__dirname, "/../garmin1.tcx"), (err: string) => {
                const act = new Activity(tcx);
                expect(act.id).toBe("");
                expect(act.isReady).toBe(false);
                expect(act.distanceFromLaps).toBe(consts.ERROR_NUMBER_VALUE);
                expect(act.distanceDromPoints).toBe(consts.ERROR_NUMBER_VALUE);
                expect(act.timeFromPoints).toBe(consts.ERROR_NUMBER_VALUE);
                expect(act.timeFromLaps).toBe(consts.ERROR_NUMBER_VALUE);
                expect(act.infoLaps.length).toBe(0);
                expect(act.tPoints.length).toBe(0);
                let res: ResultClass;
                res = getDistanceFromPoints(act.tPoints);
                expect(res.distance).toBe(0);
                expect(res.totalTime).toBe(0);
                expect(res.minAlt).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.maxAlt).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.totalUp).toBe(0);
                expect(res.totalDown).toBe(0);
                expect(res.maxSpeed).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.maxHR).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.maxBikeCadence).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.maxRunCadence).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.zones).toEqual([Object({ zone: 1, time: 0 }), Object({ zone: 2, time: 0 }), Object({ zone: 3, time: 0 }), Object({ zone: 4, time: 0 }), Object({ zone: 5, time: 0 })]);

                done();
            });
        });

    })
})