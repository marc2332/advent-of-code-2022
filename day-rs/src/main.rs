static CONTENT: &str = include_str!("input");
fn main() {
    let input = CONTENT.split("\n\n");
    let elfs_calories = input.map(|e| e.split("\n").map(|n| n.parse::<i32>().unwrap()));
    let mut simplified: Vec<i32> = elfs_calories.map(|cals| cals.sum()).collect();
    simplified.sort();
    simplified.reverse();
    println!("first: {:?} second: {:?}", simplified[0], simplified.iter().take(3).sum::<i32>());
}
