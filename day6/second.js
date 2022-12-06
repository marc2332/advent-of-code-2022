const content = await Deno.readTextFile("input", "UTF-8")
let chars = [];
let ind = 0;
for(let i = 0; i < content.length; i++){
    const c = content[i];
    if(chars.includes(c)) {
        let pos = chars.indexOf(c);
        chars = [...chars.slice(pos + 1)]
    } 
    chars.push(c);
    if(chars.length === 14){
        ind = i + 1;
        break;
    }
}
console.log(chars, ind)