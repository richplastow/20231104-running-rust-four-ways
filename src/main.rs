// src/main.rs

mod utils;
use utils::greet;

fn main() {
    // Convert command line arguments to a vector.
    let args: Vec<_> = std::env::args().collect();

    // Use default text if no command line arguments exist.
    // Otherwise, use the second string in `args` (the first option).
    let text = if args.len() <= 1 {
        "standalone binary app".to_string()
    } else {
        format!("{}", args[1])
    };

    // Print text to the console.
    println!("{}", greet(&text))
}
