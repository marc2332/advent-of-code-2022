const content = await Deno.readTextFile("input", "UTF-8")
const input = content.split('\n\n');
const elfsCalories = input.map(e => e.split('\n').map(Number));
const simplified = elfsCalories.map(cals => cals.reduce((a,b) => a + b));
const ordered = simplified.sort((f, s) => f - s);
const biggest = ordered[ordered.length - 1];
console.log(biggest);