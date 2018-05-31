import * as fs from 'fs';
import * as path from 'path';
import { TcxFile } from 'tcx-file-class';
import { ResultClass, bestTimes } from "./classes/activity";
import {Activity} from 'tcx-file-class';
import Athlete from './classes/athlete';


let athlete = new Athlete();
athlete.id = 13678;
class test {
    private _fName: string;
    constructor(ath: Athlete, fname: string) {
        this._fName = fname;
    }

    check() {

    }

    public loadAthletes() {
        return new Promise<Array<Athlete>>((resolve, reject) => {
            fs.readFile(path.join(__dirname, "athletes.json"), 'utf8', (err, data) => {
                if (err) { reject(err) }
                resolve(JSON.parse(data));
            });
        });
    }

    public loadAthlete(id: number) {
        return new Promise<Athlete>((resolve, reject) => {
            this.loadAthletes().then(data => {
                let index = data.findIndex(value =>
                    value.id == id)
                if (index !== -1) {
                    resolve(data[index]);
                } else {
                    reject(`Δεν υπάρχει αθλητής με αριθμό καταχώρησης ${id}`)
                }
            })
        });
    }

    read() {
        return new Promise<Activity>((resolve, reject) => {
            console.log(`...reading ${this._fName}`);
            let tcx = new TcxFile();
                tcx.read(this._fName, (err) => {
                if (err) { reject(err) }
                else {
                    console.log(`Done reading ${this._fName}`);
                    console.log(`...processing activity ${tcx.getId()}`);
                    console.time();

                    let act = new Activity();
                    act.read(athlete.id, tcx, [121, 133, 145, 157]);
                    //let act = new Activity(tcxObject as TcxFile, [121, 133, 145, 157]);
                    console.timeEnd();
                    console.log(`...saving file`);
                    console.time();

                    this.write(act).then(() => {
                        console.timeEnd();
                        console.log(`Done!`);
                        resolve(act);
                    });
                }
            })
        });
    }
    write(act: Activity) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, "act.json"), JSON.stringify(act.proccessElements), (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve();
                }
            })

        })
    }
}



let file = new test(athlete, path.join(__dirname, 'g5.tcx'));
file.read()
    .then(actObject => {
        console.log((actObject as Activity).id);
    })
    .catch((err) => { console.log(err) });


file.loadAthlete(2)
    .then(data => {
        console.log(athlete);
        athlete = data;
        console.log(athlete.surName);
    })
    .catch(err => console.log(err));