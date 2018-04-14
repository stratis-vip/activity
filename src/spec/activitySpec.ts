import TcxFile from "tcx-file-class";
import Activity from "../classes/activity";
import * as path from 'path';
import * as consts from "../classes/consts";

describe("Activities TCX\n", ()=> {
    it("Πρέπει να διαβάζει ένα TcxFile", (done) => {
        const tcx = new TcxFile(path.join(__dirname, "/../garmin.tcx"), (err) => {
            const act = new Activity(tcx);
            expect(act.id).toBe("2018-04-12T14:56:42.000Z");
            expect(act.isReady).toBe(true);
            expect(act.distanceFromLaps).toBe(7009.27);
            expect(act.distanceDromPoints).toBe(7049.351765077946);
            expect(act.timeFromPoints).toBe(3014);
            expect(act.timeFromLaps).toBe(3005);
            expect(act.infoLaps.length).toBe(8);
            expect(act.tPoints.length).toBe(3020);
            done();
        });
    });

    it("Πρέπει να επιστρέφει μηδενικές τιμές όταν το αρχείο δεν υπάρχει", (done) => {
        const tcx = new TcxFile(path.join(__dirname, "/../garmin1.tcx"), (err) => {
            const act = new Activity(tcx);
            expect(act.id).toBe("");
            expect(act.isReady).toBe(false);
            expect(act.distanceFromLaps).toBe(consts.ERROR_NUMBER_VALUE);
            expect(act.distanceDromPoints).toBe(consts.ERROR_NUMBER_VALUE);
            expect(act.timeFromPoints).toBe(consts.ERROR_NUMBER_VALUE);
            expect(act.timeFromLaps).toBe(consts.ERROR_NUMBER_VALUE);
            expect(act.infoLaps.length).toBe(0);
            expect(act.tPoints.length).toBe(0);
            done();
        });
    });

})