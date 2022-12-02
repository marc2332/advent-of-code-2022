const content = await Deno.readTextFile("input", "UTF-8")
const compare = (a, _b) => { 

    const b = (() => {
        if(_b == "X") {
            if(a == "A") return "Z";
            else if(a == "B") return "X";
            else return "Y";
        }
        if(_b == "Y") {
            if(a == "A") return "X";
            else if(a == "B") return "Y";
            else return "Z";
        }
        if(_b == "Z") {
            if(a == "A") return "Y";
            else if(a == "B") return "Z";
            else return "X";
        }
    })();

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