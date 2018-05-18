import { movingAvg } from "./utils/functions";

let ap = [{id:1, name:"stratis"},{id:2, name:"panagiotis"}];

console.log(ap.find(value => value.id == 1));

let ar = [1,2,3.4];
console.log(movingAvg(ar,0));