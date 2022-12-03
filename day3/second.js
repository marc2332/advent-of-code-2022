const content = await Deno.readTextFile("input", "UTF-8")
const rucksacks = content.split("\n");
const charToN = (c) => c.toUpperCase() == c ? c.charCodeAt(0) -38 : c.charCodeAt(0) -96
const badges = []
for(let i = 0; i < rucksacks.length; i += 3){
    const group = rucksacks.slice(i, i + 3);
    if(group.length == 0) continue;
    let matchingChar = "";
    group[0].split("").forEach(p => {
        if(group[1].includes(p) &&  group[2].includes(p)) {
            matchingChar = p;
        }
    })
    badges.push(matchingChar);
}
console.log(badges.map(charToN).reduce((a,b) => a+ b))