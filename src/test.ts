import TcxFile from "tcx-file-class";


import * as path from 'path';
import * as fs from 'fs';
import Activity from "./classes/activity";
import InfoLap from "./classes/infoLap";
import { secsToTime } from "./utils/functions";
import { WSAESOCKTNOSUPPORT } from "constants";

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


const tcx = new TcxFile(path.join(__dirname,"garmin.tcx"),(err)=>{
    const act = new Activity(tcx);
    console.log(act.id);
    console.log(`\nFrom laps:\n${act.distanceFromLaps}`);
            console.log(secsToTime(act.timeFromLaps));
            console.log(`\nFrom points:\n${act.distanceDromPoints}`);
            console.log(secsToTime(act.timeFromPoints));
})

