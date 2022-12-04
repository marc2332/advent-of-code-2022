const getFillingNums = (a, b) => new Array(b - a + 1).fill(0).map((_, i) => a + i);
const content = await Deno.readTextFile("input", "UTF-8")
const input = content.split("\n");
const pairs = input.map((x) => x.split(",").map(p => p.split("-").map(Number)));
const data = pairs.map(pairs => pairs.map(([a, b]) => getFillingNums(a, b)));
const resA = data.filter(pairs => {
    const [a,b] = pairs[0].length > pairs[1].length ? [pairs[0], pairs[1]] : [pairs[1], pairs[0]];
    return b.filter(x => a.includes(x)).length === b.length;
});
const resB = data.filter(pairs => {
    const [a,b] = pairs[0].length > pairs[1].length ? [pairs[0], pairs[1]] : [pairs[1], pairs[0]];
    return b.filter(x => a.includes(x)).length > 0;
});
console.log(`Firs: ${resA.length}, Second: ${resB.length}`);