import { TcxFile } from "tcx-file-class";

import * as path from 'path';
import * as fs from 'fs';
import Activity, { ResultClass, bestTimes } from "./classes/activity";
import InfoLap from "./classes/infoLap";
import { secsToTime, avgArray } from "./utils/functions";
import { iZone, SavePoints } from "./classes/iFaces";
import Athlete from "./classes/athlete";
import { start } from "repl";

// import { get } from 'https';
// // ;
// const file = fs.createWriteStream("fromnet.tcx");

// get("https://raw.githubusercontent.com/stratis-vip/tcx-file-class/master/dist/spec/garmin-b.tcx", response => {
//     response.pipe(file);
// }).on('close',()=>{
//     let tcx = new TcxFile(path.join(__dirname, "fromnet.tcx"), function (err:string) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(tcx.getId());
//         }
//     });
// })

let res = new ResultClass();

// let tcx: TcxFile;
// tcx = new TcxFile(path.join(__dirname, "g3.tcx"), (err: string) => {

     let act = new Activity(this, [121, 133, 145, 157]);


//     fs.writeFile(path.join(__dirname, "act.json"), JSON.stringify(act.proccessElements), (err) => {
//         if (err) {
//             console.log(err);
//         }
//         fs.readFile(path.join(__dirname, "act.json"), 'utf8', (err, data) => {
//             if (!err) {
//                 act.proccessElements = JSON.parse(data);
//                 //console.log(act.proccessElements.times);
//             }
//         })
//     });
// });

let rc: ResultClass = new ResultClass();

fs.readFile(path.join(__dirname, "act.json"), 'utf8', (err, data) => {
    if (!err) {
        rc = JSON.parse(data);
        // console.log(rc.points[0]);
    }




    function getValue(value: bestTimes | any): number {
        if (value === undefined) {
            return 0;
        } else {
            return value.recTime;
        }

    }

    function projectedTimes(value: Array<bestTimes>) {
        let len = value.length;
        // for (let i=0; i!= len; ++i){
        let sp100 = getValue(value[0]);
        let sp200 = getValue(value[1]);
        let sp400 = getValue(value[2]);
        let sp1000 = getValue(value[3]);
        let sp2000 = getValue(value[4]);
        let sp5000 = getValue(value[5]);

        let sp10000 = getValue(value[6]);
        let sp21100 = getValue(value[7]);
        let sp42195 = getValue(value[8]);


        console.log(`\t100\t\t200\t\t400\t\t1000\t\t2000\t\t5000\t\t10000\t\t21.100\t\t42.195`);
        console.log(`100m \t${secsToTime(sp100)}`)
        console.log(`200m \t${secsToTime(2 * sp100)} \t${secsToTime(sp200)}`);
        console.log(`400m \t${secsToTime(4 * sp100)} \t${secsToTime(2 * sp200)} \t${secsToTime(sp400)}`);
        console.log(`1000m \t${secsToTime(10 * sp100)} \t${secsToTime(5 * sp200)} \t${secsToTime(2.5 * sp400)} \t${secsToTime(sp1000)}`);
        console.log(`2000m \t${secsToTime(20 * sp100)} \t${secsToTime(10 * sp200)} \t${secsToTime(5 * sp400)} \t${secsToTime(2 * sp1000)} \t${secsToTime(sp2000)}`);
        console.log(`5000m \t${secsToTime(50 * sp100)} \t${secsToTime(25 * sp200)} \t${secsToTime(12.5 * sp400)} \t${secsToTime(5 * sp1000)} \t${secsToTime(2.5 * sp2000)} \t${secsToTime(sp5000)}`);
        console.log(`10000m \t${secsToTime(100 * sp100)} \t${secsToTime(50 * sp200)} \t${secsToTime(25 * sp400)} \t${secsToTime(10 * sp1000)} \t${secsToTime(5 * sp2000)} \t${secsToTime(2 * sp5000)} \t${secsToTime(sp10000)}`);
        console.log(`21100m \t${secsToTime(211 * sp100)} \t${secsToTime(105.5 * sp200)} \t${secsToTime(52.75 * sp400)} \t${secsToTime(21.1 * sp1000)} \t${secsToTime(10.55 * sp2000)} \t${secsToTime(4.22 * sp5000)} \t${secsToTime(2.1 * sp10000)} \t${secsToTime(sp21100)}`);
        console.log(`42195m \t${secsToTime(421.95 * sp100)} \t${secsToTime(210.975 * sp200)} \t${secsToTime(105.4875 * sp400)} \t${secsToTime(42.195 * sp1000)} \t${secsToTime(21.0975 * sp2000)} \t${secsToTime(8.439 * sp5000)} \t${secsToTime(4.2195 * sp10000)} \t${secsToTime(1.99976303317536 * sp21100)}  \t${secsToTime(sp42195)}`);

        // }
    }

    console.log(`${Math.round(rc.distance / 1000)}KM σε ${secsToTime(rc.totalTime)}\n`);

    projectedTimes(rc.times);




    // class Pop {
    //     private _alfa=0;

    //     set alfa(value:number){
    //         this._alfa = value;
    //     }

    //     get alfa() {
    //         return this._alfa;
    //     }
    // }

    // let ath = new Athlete();
    // ath.birthDay = new Date(1971,9,21);
    // let al = new Pop();
    // al.alfa=15;
    // console.log(ath.age);
    // console.log(al.alfa);


    // var filename = path.join(__dirname, 'file.txt');

    // // This line opens the file as a readable stream
    // var readStream = fs.createReadStream(filename);
    // const str:Array<any> = []; 
    // let result = "";
    // // This will wait until we know the readable stream is actually valid before piping
    // readStream.on('data', function (chunk) {
    //   // This just pipes the read stream to the response object (which goes to the client)
    //   str.push(chunk);
    // });

    // // This catches any errors that happen while creating the readable stream (usually invalid names)
    // readStream.on('end', function() {
    //   result = str.join('');
    //   console.log(result);
    // });

})