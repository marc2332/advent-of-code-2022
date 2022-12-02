const content = await Deno.readTextFile("input", "UTF-8")
const compare = (a, b) => { 

    const shape = (() => {
        if(b == "X") return 1;
        else if(b == "Y") return 2;
        else return 3;
    })();

    if(a == "A" && b == "X") return shape + 3;
    if(a == "B" && b == "Y") return shape + 3;
    if(a == "C" && b == "Z") return shape + 3;

    if(a == "A" && b == "Y") return shape + 6;
    if(a == "A" && b == "Z") return shape;
    if(a == "B" && b == "Z") return shape + 6;

    if(a == "B" && b == "X") return shape;
    if(a == "C" && b == "X") return shape + 6;
    if(a == "C" && b == "Y") return shape;
}
const games = content.split('\n');
const result = games.map(game => {
    const [opponent, me] = game.split(' ');
    return compare(opponent, me);
}).reduce((a,b) => a + b);

console.log(result)