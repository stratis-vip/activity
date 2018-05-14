import * as consts from './consts';

export default class Athlete {

    //Ο μοναδικός αριθμός που χαρακτηρίζει τον αθλητή
    private _id: number;
    get id() {
        return this._id;
    }

    set id(value: number) {
        if (this._id !== value) {
            this._id = value
        }
    }
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

    private _height:number;
    get height(){
        return this._height;
    }
    
    
    set height(value:number){
        if (this._height !== value){
            this._height = value
        }
    }

    private _zones: [number, number, number, number];
    get zones() {
        return this._zones;
    }

    set zones(value: [number, number, number, number]) {
        let isValid = true;
        for (let i = 0; i != value.length - 1; ++i) {
            if (value[i] >= value[i + 1]
                || value[i] <= consts.MIN_HEART_RATE
                || value[i] >= consts.MAX_HEART_RATE
                || value[i + 1] >= consts.MAX_HEART_RATE) {
                isValid = false;
                break;
            }
        }
        if (isValid) {
            if (this._zones !== value) {
                this._zones = value
            }
        } else { this._zones = [0, 0, 0, 0] }
    }
}

