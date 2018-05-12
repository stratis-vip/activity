import * as fs from 'fs';
import * as path from 'path';
import { TcxFile } from 'tcx-file-class';
import Activity, { ResultClass, bestTimes } from "./classes/activity";

class test {
    private _fName: string;
    constructor(fname: string) {
        this._fName = fname;
    }

    read() {
        return new Promise((resolve, reject) => {
            console.log(`...reading ${this._fName}`);
            let tcx = new TcxFile(this._fName, (err) => {
                if (err) { reject(err) }
                else {
                    console.log(`Done reading ${this._fName}`);
                    console.log(`...processing activity ${tcx.getId()}`);
                    console.time();

                    let act = new Activity(tcx, [121, 133, 145, 157]);
                    //let act = new Activity(tcxObject as TcxFile, [121, 133, 145, 157]);
                    console.timeEnd();
                    console.log(`...saving file`);
                    console.time();
                    
                    this.write(act);
                    console.timeEnd();
                    console.log(`Done!`)

                    resolve(act)
                }
            })
        });
    }
    write(act: Activity) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, "act.json"), JSON.stringify(act.proccessElements), (err) => {
                if (err) {
                    console.log(err);
                }
            })

        })
    }
}


let file = new test(path.join(__dirname, 'g3.tcx')).
    read()
    .then(actObject => {
        console.log((actObject as Activity).id);
    })
    .catch((err) => { console.log(err) })

