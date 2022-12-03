const content = await Deno.readTextFile("input", "UTF-8")
const rucksacks = content.split("\n");
const charToN = (c) => c.toUpperCase() == c ? c.charCodeAt(0) -38 : c.charCodeAt(0) -96
const rucksacksContents = rucksacks.map((r) => {
    const c = r.split("").map(charToN)
    const l = r.length / 2
    return [c.slice(0, l), c.slice(l)]
})
const repeatedItems = rucksacksContents.map(comps => comps[0].filter(c => comps[1].includes(c))[0])
console.log(repeatedItems.reduce((a,b) => a+b))