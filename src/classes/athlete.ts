import * as consts from './consts';

export default class Athlete {
    private _alfavit: string;
    constructor(nowDate?: Date) {
        nowDate ? this.now = nowDate : this.now = new Date();

    }

    private _name: string = consts.DEFAULT_NAME_STRING;
    get name() {
        return this._name;
    }
    set name(value: string) {
        if (value !== this._name && value.length > 0) {
            this._name = value;
        }
    }

    private _surName: string = consts.DEFAULT_NAME_STRING;
    get surName() {
        return this._surName;
    }
    set surName(value: string) {
        if (value !== this._surName && value.length > 0) {
            this._surName = value;
        }
    }

    //η τιμή της now εφευρέθηκε για τα τεστς, ώστε να είναι σταθερή η «σημερινή» ημερομηνία
    private now: Date = null;
    private _birthDay: Date = null;

    set birthDay(value: Date) {
        if (value !== this._birthDay && (this.now.getFullYear() - value.getFullYear() > 10)) {
            this._birthDay = value;
        }
    }
    get birthDay() {
        return this._birthDay;
    }

    get age() {
        if (this._birthDay != null) {
            return this.now.getFullYear() - this._birthDay.getFullYear()
        } else {
            return consts.ERROR_NUMBER_VALUE;
        }
    }

    private _weight: number = consts.ERROR_NUMBER_VALUE;
    get weight() {
        return this._weight;
    };
    set weight(value: number) {
        //value = newWeight a = this._weight just for saving keys :)
        let a: number = this._weight;
        if (a !== value && value > consts.MINWEIGHT && value < consts.MAXWEIGHT) {
            this._weight = value;
        }
    }

}

