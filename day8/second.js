const content = await Deno.readTextFile("input", "UTF-8")
const data = content.split("\n").map(c => c.split("").map(Number));
function getScore(cc, cr) {
    let leftN = 0;
    let rightN = 0;
    let topN = 0;
    let botN = 0;

    const cn = data[cr][cc];
    const left = data[cr].slice(0, cc).reverse();
    for(const n of left){
        leftN++;
        if (n >= cn) break;
    }

    const right = data[cr].slice(cc + 1);
    for(const n of right){
        rightN++;
        if (n >= cn) break;
    }

    for (let r = cr - 1; r >= 0; r--) {
        topN++;
        const ch = data[r][cc];
        if (ch >= cn) {
            break;
        }

    }
    for (let r = cr + 1; r < data.length; r++) {
        botN++;
        const ch = data[r][cc];
        if (ch >= cn) {
            break;
        }

    }
    return topN * leftN * botN * rightN
}
let scores = []
for (let r = 1; r < data.length - 1; r++) {
    for (let c = 1; c < data[r].length - 1; c++) {
        scores.push(getScore(c, r))
    }
}
console.log(scores.sort((a,b) => a - b).reverse()[0])