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
            console.log(`cycle: ${this.cycle} value:${this.cycle * this.x}`);
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
for(let i = 0; i < input.length; i++){
    const op = input[i];

    stack.increaseCycle();
    
    if (op != "noop"){
        stack.registerOp(op)
        stack.increaseCycle();
    }
   
    stack.runChecks();
}

console.log(stack.sumCycles)
