export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getMicroSecTime() {
    var hrTime = process.hrtime();
    return hrTime[0] * 1000000 + parseInt((hrTime[1] / 1000).toString());
}
