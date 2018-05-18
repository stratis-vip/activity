import * as fs from 'fs';
import * as path from 'path';
import { EILSEQ } from 'constants';
import { movingAvg } from './utils/functions';

fs.readFile(path.join(__dirname, 'pinakas.json'), 'utf8', (err, data) => {
    if (err) {
        console.log(err);
    }
    let ara: Array<{ distance: number, hr: number }> = JSON.parse(data);
    let valueToFind = 0;
    for (let i = 10; i < 50; i++) {
        valueToFind += i * 11260 * Math.random();
        // let t0:Performance = new Performance();
        // t0.mark('mine');
        console.time('mine');
        let opa = myFind(ara, valueToFind);
        console.timeEnd('mine');
        // t0.getMarks('mine');
        //
        console.log(`Αποτέλεσμα MINE ${opa}`);
        if (opa !== -1)
        console.log(` ${ara[opa].distance}`);
        console.time('jav');
        let oo = ara.findIndex(value => value.distance > valueToFind)
        console.timeEnd('jav');
        console.log(`Αποτέλεσμα JAVA ${oo} `);
        if (oo !== -1)
        console.log(`${ara[oo].distance} `)
    }
})


function myFind(ar: Array<{ distance: number, hr: number }>, valueToFind: number): number {
    let upValue = ar.length;
    let downValue = 0;
    let midValue = 0;

    upValue = ar.length;
    downValue = 0;


    let stepDistance = movingAvg(ar.slice(0, 10).map(value => value.distance))[0];
    let guesFromStart = valueToFind / stepDistance;
    if (guesFromStart < 10) {
        upValue = 10;
    } else {
        if (guesFromStart < 1000) {
            upValue = Math.ceil(guesFromStart);
            while (ar[upValue].distance < valueToFind) {
                upValue += Math.floor(upValue / 2);
            }
        }
    }
    let guesFromEnd = (ar[ar.length - 1].distance - valueToFind) / stepDistance;
    if (guesFromEnd < 10) {
        downValue = ar.length - 10;
    } else {
        if (guesFromEnd < 1000) {
            downValue = ar.length - Math.ceil(guesFromEnd);
        }
    }
    midValue += step(upValue, downValue);
    if (ar[ar.length - 1].distance > valueToFind) {
        do {
            if (ar[midValue].distance > valueToFind) {
                upValue = midValue;
                midValue -= step(upValue, downValue);
            } else {
                downValue = midValue;
                midValue += step(upValue, downValue);
            }

        } while (upValue - downValue > 1)
        return upValue;

    } else {
        return -1
    }

}
function step(up: number, down: number): number {
    if (up - down > 2) {
        return Math.floor((up - down) / 2);
    }
    return 1;
}