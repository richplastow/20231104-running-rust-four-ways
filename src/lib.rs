// src/lib.rs

// wasm-pack uses wasm-bindgen to build and generate a JavaScript
// binding file. This line imports the wasm-bindgen crate.
use wasm_bindgen::prelude::*;

mod utils;
use utils::greet as greet_util;

// wasm-pack needs exported functions to be prefixed `#[wasm_bindgen]`.
#[wasm_bindgen]
pub fn greet(text: &str) -> String {

    // Use default text if no `text` argument exists.
    if text == "" {
        return format!("{}", greet_util("wasm app"))
    } else {
        return format!("{}", greet_util(&text))
    };
}
