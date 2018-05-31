import { TcxFile } from "tcx-file-class";
import { ResultClass } from "../classes/activity";
import {Activity} from 'tcx-file-class'
import * as path from 'path';
import * as consts from "../classes/consts";
import { ActivitiesTypes } from "../classes/iFaces";


describe("Activities TCX\n", () => {
    let athId =1;
    it("Πρέπει να διαβάζει ένα TcxFile ποδηλατικού αρχείου", (done) => {
        const tcx = new TcxFile();
        tcx.read(path.join(__dirname, "/../bike.tcx"), (err: string) => {
            const act = new Activity();
            act.read(athId, tcx,[121, 133, 145, 157]);
            expect(act.id).toBe("2018-04-15T09:04:15.000Z");
            expect(act.isReady).toBe(true);
            expect(act.distanceFromLaps).toBe(40036.3);
            expect(act.distanceDromPoints).toBe(40006.94404233233);
            expect(act.timeFromPoints).toBe(5117);
            expect(act.timeFromLaps).toBe(5104);
            expect(act.infoLaps.length).toBe(9);
            expect(act.tPoints.length).toBe(2759);
            let res = act.proccessElements;
            expect(res.maxHR).toBe(154);

            expect(res.distance).toBe(40006.94404233233);
            expect(res.totalTime).toBe(5117);
            expect(res.minAlt).toBe(25.200000762939453);
            expect(res.maxAlt).toBe(104.4000015258789);
            expect(res.totalUp).toBe(207.59997177124023);
            expect(res.totalDown).toBe(216.59997177124023);
            expect(res.maxSpeed).toBe(14.410793780043537);
            expect(res.maxHR).toBe(154);

            expect(res.maxCadence).toBe(94);

            expect(res.zones).toEqual([{ zone: 1, time: 32 }, { zone: 2, time: 26 }, { zone: 3, time: 4907 }, { zone: 4, time: 152 }, { zone: 5, time: 0 }]);
            expect(act.zones).toEqual([{ zone: 1, time: 32 }, { zone: 2, time: 26 }, { zone: 3, time: 4907 }, { zone: 4, time: 152 }, { zone: 5, time: 0 }]);
            expect(res.points.length).toBe(2759);
            expect(act.sport).toBe(ActivitiesTypes.Biking);
            expect(res.times.length).toBe(8);
            expect(res.times[0].distance).toBe(100.609375);
            expect(res.times[0].start).toBe(2013);
            expect(res.times[0].end).toBe(2020);
            expect(res.times[0].recTime).toBe(6.957602112129212);
            expect(res.times[0].time).toBe(7);
            expect(res.times[5].distance).toBe(5011.339752197266);
            expect(res.times[5].start).toBe(24);
            expect(res.times[5].end).toBe(306);
            expect(res.times[5].recTime).toBe(504.85501384948);
            expect(res.times[5].time).toBe(506);
            expect(res.times[5].avgHr).toBe(140);
            expect(res.times[5].dAlt).toBe(-64);
            // console.log(res.times)
            done();
        });
    });

    it("Πρέπει να διαβάζει ένα TcxFile", (done) => {
        const tcx = new TcxFile();
        tcx.read(path.join(__dirname, "/../garmin.tcx"), (err: string) => {
            const act = new Activity();
            act.read(1,tcx, [121, 133, 145, 157]);
            expect(act.id).toBe("2018-04-12T14:56:42.000Z");
            expect(act.isReady).toBe(true);
            expect(act.distanceFromLaps).toBe(7009.27);
            expect(act.distanceDromPoints).toBe(7020.451029859422);
            expect(act.timeFromPoints).toBe(2673);
            expect(act.timeFromLaps).toBe(3005);
            expect(act.infoLaps.length).toBe(8);
            expect(act.tPoints.length).toBe(3020);
            let res = act.proccessElements;

            expect(res.distance).toBe(7020.451029859422);
            expect(res.totalTime).toBe(2673);
            expect(res.minAlt).toBe(43.20000076293945);
            expect(res.maxAlt).toBe(83.80000305175781);
            expect(res.totalUp).toBe(271.7999954223633);
            expect(res.totalDown).toBe(272.59998321533203);
            expect(res.maxSpeed).toBe(6.553803034169953);
            expect(res.maxHR).toBe(165);
            expect(res.maxCadence).toBe(102);
            expect(res.zones).toEqual([{ zone: 1, time: 31 }, { zone: 2, time: 34 }, { zone: 3, time: 144 }, { zone: 4, time: 1968 }, { zone: 5, time: 496 }]);
            expect(act.zones).toEqual([{ zone: 1, time: 31 }, { zone: 2, time: 34 }, { zone: 3, time: 144 }, { zone: 4, time: 1968 }, { zone: 5, time: 496 }]);
            expect(res.points.length).toBe(3020);
            expect(act.sport).toBe(ActivitiesTypes.Running);
            expect(res.times.length).toBe(6);
            expect(res.times[0].distance).toBe(101.8603515625);
            expect(res.times[0].start).toBe(2363);
            expect(res.times[0].end).toBe(2400);
            expect(res.times[0].recTime).toBe(26.506878864867456);
            expect(res.times[0].time).toBe(27);
            expect(res.times[5].distance).toBe(5003.4500732421875);
            expect(res.times[5].start).toBe(836);
            expect(res.times[5].end).toBe(3018);
            expect(res.times[5].recTime).toBe(1857.7181472657185);
            expect(res.times[5].time).toBe(1859);
            expect(res.times[0].avgHr).toBe(152);
            expect(res.times[0].dAlt).toBe(0);
      
            done();
        });
    });

    describe("Activities TCX\n", () => {
        it("Πρέπει να διαβάζει ένα TcxFile (test.tcx)", (done) => {
            const tcx = new TcxFile();
            tcx.read(path.join(__dirname, "/../test.tcx"), (err: string) => {
                const act = new Activity();
                act.read(athId, tcx);
                expect(act.id).toBe("2018-04-16T16:56:17.000Z");
                expect(act.isReady).toBe(true);
                expect(act.distanceFromLaps).toBe(238.92);
                expect(act.distanceDromPoints).toBe(240.88933381687337);
                expect(act.timeFromPoints).toBe(128);
                expect(act.timeFromLaps).toBe(127);
                expect(act.infoLaps.length).toBe(1);
                expect(act.tPoints.length).toBe(130);
                let res = act.proccessElements;
                expect(res.distance).toBe(240.88933381687337);
                expect(res.totalTime).toBe(128);
                expect(res.minAlt).toBe(121.4000015258789);
                expect(res.maxAlt).toBe(136);
                expect(res.totalUp).toBe(14.800003051757812);
                expect(res.totalDown).toBe(11.199996948242188);
                expect(res.maxSpeed).toBe(3.003261592738725);
                expect(res.maxHR).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.maxCadence).toBe(91);
                expect(res.zones).toEqual([Object({ zone: 1, time: 0 }), Object({ zone: 2, time: 0 }), Object({ zone: 3, time: 0 }), Object({ zone: 4, time: 0 }), Object({ zone: 5, time: 0 })]);
                expect(res.points.length).toBe(130);

                expect(act.sport).toBe(ActivitiesTypes.Running);
                expect(res.times.length).toBe(2);
                expect(res.times[0].distance).toBe(100.49000549316406);
                expect(res.times[0].start).toBe(53);
                expect(res.times[0].end).toBe(103);
                expect(res.times[0].recTime).toBe(48.761068087844095);
                expect(res.times[0].time).toBe(49);
                expect(res.times[0].avgHr).toBe(-1);
                
                expect(res.times[0].dAlt).toBe(6);
                
                done();
            });
        });

        it("Πρέπει να επιστρέφει μηδενικές τιμές όταν το αρχείο δεν υπάρχει", (done) => {
            const tcx = new TcxFile();
            tcx.read(path.join(__dirname, "/../garmin1.tcx"), (err: string) => {
                const act = new Activity();
                act.read(athId, tcx);
                expect(act.id).toBe("");
                expect(act.isReady).toBe(false);
                expect(act.distanceFromLaps).toBe(consts.ERROR_NUMBER_VALUE);
                expect(act.distanceDromPoints).toBe(consts.ERROR_NUMBER_VALUE);
                expect(act.timeFromPoints).toBe(consts.ERROR_NUMBER_VALUE);
                expect(act.timeFromLaps).toBe(consts.ERROR_NUMBER_VALUE);
                expect(act.infoLaps.length).toBe(0);
                expect(act.tPoints.length).toBe(0);
                let res = act.proccessElements;
                expect(res.distance).toBe(0);
                expect(res.totalTime).toBe(0);
                expect(res.minAlt).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.maxAlt).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.totalUp).toBe(0);
                expect(res.totalDown).toBe(0);
                expect(res.maxSpeed).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.maxHR).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.maxCadence).toBe(consts.ERROR_NUMBER_VALUE);
                expect(res.zones).toEqual([Object({ zone: 1, time: 0 }), Object({ zone: 2, time: 0 }), Object({ zone: 3, time: 0 }), Object({ zone: 4, time: 0 }), Object({ zone: 5, time: 0 })]);
                expect(res.points.length).toBe(0);

                expect(act.sport).toBe(ActivitiesTypes.Invalid);
                expect(res.times.length).toBe(0);
                done();
            });
        });

    })
})