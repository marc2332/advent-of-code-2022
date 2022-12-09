const content = await Deno.readTextFile("input", "UTF-8")
const input = content.split("\n").map(l => l.split(" ")).map(([c, n]) => [c, Number(n)]);
// X | Y
let positionHead = { x: 1000, y: 1000 }
let knotsPositions = new Array(9).fill(0).map(_ => ({ x: 1000, y: 1000 }));
let cc = {}
for (const [c, steps] of input) {
    for (let i = 0; i < steps; i++) {
        if (c == "R") {
            positionHead.x += 1;
        } else if (c == "U") {
            positionHead.y -= 1;
        } else if (c == "L") {
            positionHead.x -= 1;
        } else if (c == "D") {
            positionHead.y += 1;
        }
        for (let k = 0; k < knotsPositions.length; k++) {
            const lastPos = (() => {
                if (k == 0) {
                    return positionHead;
                } else {
                    return knotsPositions[k - 1];
                }
            })();
            const pos = knotsPositions[k];
            const areTouching = arePositionsTouching(lastPos, pos);
            if (!areTouching) {
                const x = Math.sign((lastPos.x - pos.x));
                const y = Math.sign((lastPos.y - pos.y));
                pos.x += x;
                pos.y += y;
                if (k == 8) {
                    cc[`${pos.x}${pos.y}`] = true
                }
            }
        }
        
    }
}

function arePositionsTouching(a, b) {
    const left = a.y == b.y && a.x - 1 == b.x;
    const right = a.y == b.y && a.x + 1 == b.x
    const bottom = a.y + 1 == b.y && a.x == b.x
    const top = a.y - 1 == b.y && a.x == b.x
    const leftTop = a.y - 1 == b.y && a.x - 1 == b.x
    const leftBottom = a.y + 1 == b.y && a.x - 1 == b.x
    const rightTop = a.y - 1 == b.y && a.x + 1 == b.x
    const rightBottom = a.y + 1 == b.y && a.x + 1 == b.x
    const samePosition = a.x == b.x && a.y == b.y;
    return left || right || bottom || top || leftTop || leftBottom || rightTop || rightBottom || samePosition;
}

console.log(Object.keys(cc).length + 1)