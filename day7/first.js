const content = await Deno.readTextFile("input", "UTF-8")
const data = content.split("\n");
const MAX_SIZE = 100000;
let tree = {};
let dirsHistory = []
data.forEach((line) => {
    if(line.startsWith("$")) {
        if(!line.includes("ls")) {
            const [_a,_b, dir] = line.split(" ");
            if(dir == "..") {
                dirsHistory.pop();
            } else {
                dirsHistory.push(dir)
            }
        }
    } else if (line.startsWith("dir")) {
        // ignore
    } else {
        const [size, name] = line.split(" ");
        let obj = tree;
        dirsHistory.forEach(p => {
            if(!obj[p]) obj[p] = {}
            obj = obj[p]
        })
        obj[name] = Number(size);
    }
})
const sizes = []
function calculateSizes(subTree){
    let size = 0;
    Object.values(subTree).forEach((val) => {
        if(typeof val == "object") {
            const s = calculateSizes(val);
            if(s < MAX_SIZE) {
                sizes.push(s);
            }
            size += s;
        } else {
            size += val;
        }
    })
    return size;
}
calculateSizes(tree);
console.log(sizes.reduce((a,b) => a + b))