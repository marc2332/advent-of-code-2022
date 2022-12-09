const content = await Deno.readTextFile("input", "UTF-8")
const input = content.split("\n").map(l => l.split(" ")).map(([c, n]) => [c, Number(n)]);
const size = 999;
const area = new Array(size).fill(0).map(l => new Array(size).fill(0))
// X | Y
let positionHead = {x: 500, y: 500}
let positionTail = {x: 500, y: 500}
for(const [c, steps] of input){
    for(let i = 0; i < steps; i++){
        if(c == "R") {
            positionHead.x += 1;
        } else if (c == "U"){
            positionHead.y -= 1;
        } else if (c == "L"){
            positionHead.x -= 1;
        } else if (c == "D"){
            positionHead.y += 1;
        }

        const areTouching = arePositionsTouching(positionHead, positionTail);

        if(!areTouching){
            if(c == "R") {
                positionTail.x = positionHead.x - 1;
                positionTail.y = positionHead.y;
            } else if (c == "U"){
                positionTail.x = positionHead.x;
                positionTail.y = positionHead.y + 1;
            } else if (c == "L"){
                positionTail.x = positionHead.x + 1;
                positionTail.y = positionHead.y;
            } else if (c == "D"){
                positionTail.x = positionHead.x;
                positionTail.y = positionHead.y - 1;
            }
        }

        area[positionTail.y][positionTail.x] = 1;
    }
}

function arePositionsTouching(a, b){
    const left =  a.y == b.y && a.x -1 == b.x;
    const right = a.y == b.y && a.x +1 == b.x 
    const bottom = a.y+1 == b.y && a.x == b.x
    const top = a.y-1 == b.y && a.x == b.x
    const leftTop = a.y -1== b.y && a.x -1 == b.x
    const leftBottom = a.y +1== b.y && a.x -1 == b.x
    const rightTop = a.y -1== b.y && a.x +1 == b.x
    const rightBottom = a.y +1 == b.y && a.x +1 == b.x 
    const samePosition = a.x == b.x && a.y == b.y;
    return left || right || bottom || top || leftTop || leftBottom || rightTop || rightBottom || samePosition;
}

let i = 0;
for(const row of area){
    i += row.filter(n => n == 1).length
}
console.log(i)