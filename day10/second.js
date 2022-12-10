const content = await Deno.readTextFile("input", "UTF-8")
const input = content.split("\n").map(l => {
    if (l == "noop") return l;
    else return Number(l.split(" ")[1])
});
class Stack {
    x = 1;
    pendingOp=[]
    cycle = 0;
    sumCycles = 0

    increaseCycle(){
        this.cycle += 1;
        if(this.cycle == 20 || (this.cycle + 20) % 40 == 0){
            this.sumCycles += this.cycle * this.x;
        }
    }

    registerOp(n){
        this.pendingOp = [this.cycle, n];
    }

    runChecks(){
        if(this.pendingOp){
            if(this.pendingOp[0] == this.cycle - 1){
                this.x += this.pendingOp[1];
                this.pendingOp = undefined;
            }
        }
    }
}
const stack = new Stack();
const table = new Array(6).fill(0).map(() => new Array(40).fill(0).map(() => "."))
let row = 0;
let col = 0;
for(let i = 0; i < input.length; i++){
    const op = input[i];
    const run = () => {
        if(col == 40){
            col = 0;
            row += 1;
        }
        const poss = [stack.x - 1, stack.x, stack.x + 1];
        if(poss.includes(col)) {
            const rowTable = table[row];
            rowTable[col] = "#";
        } 
        col += 1;
    }
    stack.increaseCycle(); 
    if (op == "noop"){
        run();
    } else {
        run();
        stack.registerOp(op)
        stack.increaseCycle();
        run();
    }
    stack.runChecks();
}
for(const row of table){
    console.log(row.join(""))
}