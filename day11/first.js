const content = await Deno.readTextFile("input", "UTF-8")
const monkeys = content.split("\n\n").map(monkey => {
    const lines = monkey.split("\n");
    const starting = lines[1].replace("  Starting items:","").split(",").map(Number);
    const o = lines[2].replace("  Operation: new = ","").split(" ");
    const c = Number(lines[3].replace("  Test: divisible by ", ""))
    const optA = Number(lines[4].replace("    If true: throw to monkey ", ""))
    const optB = Number(lines[5].replace("    If false: throw to monkey ", ""))
    const cond = (n) => {
        if(n % c == 0) {
            return optA
        } else {
            return optB
        }
    }
    const op = (n) => {
        const ot = o[2] == "old" ? n : Number(o[2]);
        switch(o[1]) {
            case "+":
                return n + ot;
            case "*":
                return n * ot;
        }
    }
    return {
        starting,
        op,
        cond,
        inspectedItems: 0
    }
});

const rounds = 20;

for(let round = 0; round<rounds;round++){
    for(let r = 0; r <monkeys.length; r++){
        const monkey = monkeys[r];
        let newItems = [...monkey.starting]
        for(let it = 0; it < newItems.length; it++){
            monkey.inspectedItems += 1;
            const item = newItems[it];
            const newWorry = Math.floor(monkey.op(item) / 3);
            const newMonkey = monkey.cond(newWorry);
            monkeys[newMonkey].starting.push(newWorry);   
        }
        monkey.starting = []
    }
}
const [a,b] = monkeys.map(m => m.inspectedItems).sort((a,b) => a -b).reverse();
console.log(a * b)