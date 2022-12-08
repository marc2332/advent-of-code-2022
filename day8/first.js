const content = await Deno.readTextFile("input", "UTF-8")
const data = content.split("\n").map(c => c.split("").map(Number));
function checkBounds(cc, cr) {
    let leftIV = false;
    let topIV = false;
    let rightIV = false;
    let botIV = false;

    const cn = data[cr][cc];
    const left = data[cr].slice(0, cc);
    left.forEach(n => {
        if (n >= cn) leftIV = true;
    });

    const right = data[cr].slice(cc + 1);
    right.forEach(n => {
        if (n >= cn) rightIV = true;
    });

    let dir = "top";
    for (let r = 0; r < data.length; r++) {
        if (r == cr) {
            dir = "bot";
            continue;
        }
        const ch = data[r][cc];
        if (ch >= cn) {
            if (dir == "top") {
                topIV = true;
            } else {
                botIV = true;
            }
        }

    }
    return !leftIV || !rightIV|| !topIV || !botIV
}
let areVisible = (data.length * 2) + (data[0].length - 2) * 2;
for (let r = 1; r < data.length - 1; r++) {
    for (let c = 1; c < data[r].length - 1; c++) {
        const isVisible = checkBounds(c, r)
        if(isVisible) areVisible++;
    }
}
console.log(areVisible)