static CONTENT: &str = include_str!("input");
fn main() {
    let input = CONTENT.split("\n\n");
    let elfs_calories = input.map(|e| e.split("\n").map(|n| n.parse().unwrap_or(0)));
    let mut simplified = elfs_calories.map(|cals| cals.sum()).collect::<Vec<i32>>();
    simplified.sort();
    simplified.reverse();
    println!("first: {:?} second: {:?}", simplified[0], simplified[0] + simplified[1] + simplified[2]);
}
