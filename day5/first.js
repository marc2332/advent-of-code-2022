const content = await Deno.readTextFile("input", "UTF-8")
const [data, instructions] = content.split("\n\n")
const crates = data.replaceAll(/\s\s\s\s/g,"... ").replaceAll(/\.\[/g," [").replaceAll(/\]\./g,"] ").split("\n").map((line) => line.split(" ").filter(Boolean));
const matrix = [];
crates.forEach((element, row) => {
    for(let i = 0; i < element.length; i++) {
        if(!element[i].match(/^[0-9]+$/) && element[i] !== "") {
            const col = i;
            if(!matrix[col]) matrix[col] = [];
            matrix[col].push(element[i]);
        }
    }
});
const ma = matrix.map(d => d.filter((e) => !e.includes(".")));
const ins = instructions.split("\n");
ins.forEach(ins => {
    const [quantity, from, to] = ins.split(" ").filter(r => r.match(/^[0-9]+$/));
    const chunk = ma[from - 1].splice(0, quantity);
    ma[to - 1] = [...chunk.reverse(), ...ma[to - 1]];
})
const tops = ma.map(c => c[0]);
console.log(tops.join("").replaceAll(/\[/g,"").replaceAll(/\]/g,""))