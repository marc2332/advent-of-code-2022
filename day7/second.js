const content = await Deno.readTextFile("input", "UTF-8")
const data = content.split("\n");
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
function getTotalSize(subTree){
    let size = 0;
    Object.values(subTree).forEach((val) => {
        if(typeof val == "object") {
            size += getTotalSize(val);
        } else {
            size += val;
        }
    })
    return size;
}
const totalsize = getTotalSize(tree);
function getCandidates(subTree, name, candidates){
    let size = 0;
    Object.entries(subTree).forEach(([key, val]) => {
        if(typeof val == "object") {
            size += getCandidates(val, key, candidates)[0];
        } else {
            size += val;
        }
    })
    if(totalsize - size < (70000000 - 30000000)) {
        candidates.push([name, size])
    }
    return [size, candidates];
}
const [_, candidates] = getCandidates(tree, "/", []);
console.log(candidates.sort((a,b) => a[1] - b[1])[0][1])