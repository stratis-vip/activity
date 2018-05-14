import Athlete from '../classes/athlete';
import * as consts from '../classes/consts';

describe("Κλάση Αθλητής\n", () => {
    let nowDate: Date;
    let athlitis: Athlete;
    let testDate: Date;
    let zeroZones = [0,0,0,0];
    beforeEach((done) => {
        nowDate = new Date(2018, 4, 3, 0, 0, 0);
        athlitis = new Athlete(nowDate);
        testDate = new Date(2018, 5, 1);
        done();
    })
    it("Η ηλικία δεν μπορεί να είναι κάτω των 10 ετών", (done) => {
        athlitis.birthDay = new Date(2010, 9, 21);
        expect(athlitis.age).toBe(consts.ERROR_NUMBER_VALUE);
        done();
    });
    it("Η ηλικία πρέπει να είναι 47", (done) => {
        athlitis.birthDay = new Date(1971, 9, 21);
        expect(athlitis.age).toBe(47);
        done();
    });
    it("Η ηλικία πρέπει να είναι 47", (done) => {
        athlitis.birthDay = new Date(1971, 9, 21);
        expect(athlitis.age).toBe(47);
        done();
    });
    it("Το όνομα δεν μπορεί να είναι κενό", (done) => {
        athlitis.name = "";
        expect(athlitis.name).toBe(consts.DEFAULT_NAME_STRING);
        done();
    });
    it("Το επίθετο δεν μπορεί να είναι κενό", (done) => {
        athlitis.surName = "";
        expect(athlitis.surName).toBe(consts.DEFAULT_NAME_STRING);
        done();
    });
    it("Το όνομα πρέπει να αλλάζει σε 'Στρατής", (done) => {
        athlitis.name = "Στρατής";
        expect(athlitis.name).toBe("Στρατής");
        done();
    });
    it("Το επίθετο πρέπει να αλλάζει σε 'Χριστοδούλου", (done) => {
        athlitis.surName = "Χριστοδούλου";
        expect(athlitis.surName).toBe("Χριστοδούλου");
        done();
    });
    it(`Το βάρος δεν πρέπει να είναι κάτω από ${consts.MINWEIGHT} κιλά`, (done) => {
        athlitis.weight =consts.MINWEIGHT;
        expect(athlitis.weight).toBe(consts.ERROR_NUMBER_VALUE);
        done();
    });
    it(`Το βάρος δεν πρέπει να είναι πάνω από ${consts.MAXWEIGHT} κιλά`, (done) => {
        athlitis.weight =consts.MAXHEIGHT;
        expect(athlitis.weight).toBe(consts.ERROR_NUMBER_VALUE);
        done();
    });

    it('Ελέγχω τις ζώνες καρδιακής λειτουργίας:' , (done) => {
        athlitis.zones=[120,134,145,156];
        expect(athlitis.zones).toEqual(athlitis.zones);
        done();
    });

    it('Ελέγχω τις ζώνες καρδιακής λειτουργίας:\n\tΔεν μπορεί να υπάρχει τιμή μικρότερη από την minimum' , (done) => {
        athlitis.zones=[consts.MIN_HEART_RATE,134,145,156];
        expect(athlitis.zones).toEqual(zeroZones);
        done();
    });
    
    it('Ελέγχω τις ζώνες καρδιακής λειτουργίας:\n\tΔεν μπορεί να υπάρχει τιμή μεγαλύτερη από την max' , (done) => {
        athlitis.zones=[102,134,145,consts.MAX_HEART_RATE];
        expect(athlitis.zones).toEqual(zeroZones);
        done();
    });

    it('Ελέγχω τις ζώνες καρδιακής λειτουργίας:\n\tΔεν μπορεί να υπάρχει τιμή μεγαλύτερη από την max' , (done) => {
        athlitis.zones=[102,102,145,145];
        expect(athlitis.zones).toEqual(zeroZones);
        done();
    });
    
});