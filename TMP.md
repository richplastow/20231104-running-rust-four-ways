# Upgrade rust after a while away

__Building a little Rust "Hello Rust" in late 2023.__

## Enabled VS Code Rust extensions

1. [rust-analyzer v0.3.1705
   ](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
2. [Even Better TOML v0.19.2
   ](https://marketplace.visualstudio.com/items?itemName=tamasfe.even-better-toml)

## The Rust versions before I upgraded

```sh
rustc --version
# rustc 1.66.0-nightly (a6b7274a4 2022-10-10)
rustup --version
# rustup 1.25.1 (bb60b1e89 2022-07-12)
# info: This is the version for the rustup toolchain manager, not the rustc compiler.
# info: The currently active `rustc` version is `rustc 1.66.0-nightly (a6b7274a4 2022-10-10)
rustdoc --version
# rustdoc 1.66.0-nightly (a6b7274a4 2022-10-10)
rustfmt --version
# rustfmt 1.5.1-nightly (a6b7274a 2022-10-10)
wasm-pack --version
# wasm-pack 0.10.1
```

## Updating my installation

According to [rust-lang.org:
](https://www.rust-lang.org/tools/install#installation-notes)  
> "If you've installed `rustup` in the past, you can update your installation by
> running `rustup update`"

This threw up some weird errors for me, but seemed to work anyway:

```sh
rustup update
# info: syncing channel updates for 'stable-x86_64-apple-darwin'
# warning: Signature verification failed for 'https://static.rust-lang.org/dist/channel-rust-stable.toml'
# info: latest update on 2023-10-05, rust version 1.73.0 (cc66ad468 2023-10-03)
# info: downloading component 'rls'
# info: downloading component 'rust-src'
# info: downloading component 'rust-analysis'
# info: downloading component 'rust-std' for 'wasm32-unknown-unknown'
# info: downloading component 'cargo'
# info: downloading component 'clippy'
# info: downloading component 'rust-docs'
# info: downloading component 'rust-std'
# info: downloading component 'rustc'
#  56.1 MiB /  56.1 MiB (100 %)  25.6 MiB/s in  2s ETA:  0s
# info: downloading component 'rustfmt'
# info: removing previous version of component 'rls'
# info: removing previous version of component 'rust-src'
# info: removing previous version of component 'rust-analysis'
# info: removing previous version of component 'rust-std' for 'wasm32-unknown-unknown'
# info: removing previous version of component 'cargo'
# info: removing previous version of component 'clippy'
# info: removing previous version of component 'rust-docs'
# info: removing previous version of component 'rust-std'
# info: removing previous version of component 'rustc'
# info: removing previous version of component 'rustfmt'
# info: installing component 'rls'
# info: installing component 'rust-src'
# info: installing component 'rust-analysis'
# info: installing component 'rust-std' for 'wasm32-unknown-unknown'
#  17.5 MiB /  17.5 MiB (100 %)  10.4 MiB/s in  1s ETA:  0s
# info: installing component 'cargo'
# info: installing component 'clippy'
# info: installing component 'rust-docs'
#  13.8 MiB /  13.8 MiB (100 %)   2.1 MiB/s in  5s ETA:  0s
# info: rolling back changes
# error: could not rename component file from '/Users/<username>/.rustup/tmp/lxud5juebgbs7s_l_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/x86_64-apple-darwin'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/efh9647rofmixhzh_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/share/man'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/cpny0q5jexx8kacv_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/share/zsh'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/xpdbw4zscxq9gnlg_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/etc'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/enclsoebzuvkpb9s_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/wasm32-unknown-unknown'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/tg47w0lpv76rmn6s_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/src/llvm-project/libunwind/cmake'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/r5y20tvmj4uy585e_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/stdarch/.github'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/3mz3i_i1hhtyqioe_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/std/src/ffi'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/nr9kbb41a118ijha_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/backtrace'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/p1pfrzgi7csss66y_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/backtrace/ci'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/ztd76prvnxbi9n6x_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/backtrace/ci/docker'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/5vxyut3scs5t192a_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/proc_macro'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/fb13f75u8fy83ue3_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/proc_macro/src'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/6qd5rncdawz57owe_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/panic_unwind'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/vgk0iokbho76dxls_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/std/benches'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/md50zmqj3y2hk2lt_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/stdarch/crates/std_detect'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/jazf6j_yp2q7td99_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/stdarch/crates/std_detect/src'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/t5588i_3f50leutn_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/stdarch/crates/std_detect/src/detect'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/_83_d368jmnkdb2n_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/backtrace/src'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/eyo3k9_j9p0lclxg_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/stdarch/crates/stdarch-test'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/u18i0j01hyz23oj3_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/stdarch/crates/assert-instr-macro'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/2yimzr85x0cpxeaz_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/stdarch/crates/stdarch-gen'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/50n566t5psfyp519_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/core/src/num'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/5cinro5kg9no7hw4_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/core/tests/num'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/nwx0z5356vdht3ez_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/core/tests/num/flt2dec'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/oqno96eeywai0dfi_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/std/tests'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/87so4yoknwh5f14l_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/std/src/net'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/lvpos6gp5gvzqr21_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/backtrace/src/symbolize'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/jyltjy83q2zxo4e8_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/std/src/collections'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/v3z1iv17hz796sal_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/std/src/collections/hash'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/2x1uuiz4c54rcieu_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/stdarch/crates/simd-test-macro'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/yo4usbsx43f9xmvs_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/std/src/sys/sgx'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/xzz6vpl1iff0gvv3_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/std/src/sys/sgx/abi'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/uazfnxsomac51fmg_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/alloc/benches'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/aqgtxx5s6g14en9n_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/backtrace/.github'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/4zcw4shotmsmiqwz_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/core/src/num/flt2dec'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/kdv6nk0trt11qst8_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/profiler_builtins'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/7e7fzp5vj7ce3yff_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/stdarch/crates/std_detect/src/detect/os'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/2005efimqndqk0z8_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/std/src/sys/sgx/waitqueue'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/p9b3_oegi57s_3k7_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/backtrace/tests'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/4hgj5iuh4bnb2ruf_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/std/src/sys/sgx/abi/tls'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/r5yv57o2fm4_x62m_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/std/src/thread'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/m6j43s27yt6q0xbs_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/unwind'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/qos8nffhn4u4n15g_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/stdarch/crates/core_arch/src/aarch64'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/83cpk36nzfj701xo_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/panic_abort'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/kcoyfcif19bwfwj9_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/core/src/slice'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/j72a54z88hh25pqd_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/core/benches/num/flt2dec'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/eqduaemwexghkhw8_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/library/core/src/iter'
# error: could not rename component file from '/Users/<username>/.rustup/tmp/f8yt8zoznno0c_5a_dir/bk' to '/Users/<username>/.rustup/toolchains/stable-x86_64-apple-darwin/lib/rustlib/src/rust/src/llvm-project/libunwind/include'
# error: failed to install component: 'rust-docs-x86_64-apple-darwin', detected conflict: 'share/doc/rust/html'
# info: syncing channel updates for 'nightly-x86_64-apple-darwin'
# warning: Signature verification failed for 'https://static.rust-lang.org/dist/channel-rust-nightly.toml'
# info: latest update on 2023-10-25, rust version 1.75.0-nightly (df871fbf0 2023-10-24)
# info: downloading component 'rls'
# info: downloading component 'rust-src'
# info: downloading component 'rust-analysis'
# info: downloading component 'rust-std' for 'wasm32-unknown-unknown'
# info: downloading component 'cargo'
# info: downloading component 'clippy'
# info: downloading component 'rust-docs'
# info: downloading component 'rust-std'
# info: downloading component 'rustc'
#  54.5 MiB /  54.5 MiB (100 %)  20.4 MiB/s in  2s ETA:  0s
# info: downloading component 'rustfmt'
# info: removing previous version of component 'rls'
# info: removing previous version of component 'rust-src'
# info: removing previous version of component 'rust-analysis'
# info: removing previous version of component 'rust-std' for 'wasm32-unknown-unknown'
# info: removing previous version of component 'cargo'
# info: removing previous version of component 'clippy'
# info: removing previous version of component 'rust-docs'
# info: removing previous version of component 'rust-std'
# info: removing previous version of component 'rustc'
# info: removing previous version of component 'rustfmt'
# info: installing component 'rls'
# info: installing component 'rust-src'
# info: installing component 'rust-analysis'
# info: installing component 'rust-std' for 'wasm32-unknown-unknown'
#  17.2 MiB /  17.2 MiB (100 %)  11.7 MiB/s in  1s ETA:  0s
# info: installing component 'cargo'
# info: installing component 'clippy'
# info: installing component 'rust-docs'
#  14.4 MiB /  14.4 MiB (100 %)   2.0 MiB/s in  6s ETA:  0s
# info: installing component 'rust-std'
#  23.1 MiB /  23.1 MiB (100 %)   9.7 MiB/s in  2s ETA:  0s
# info: installing component 'rustc'
#  54.5 MiB /  54.5 MiB (100 %)  11.6 MiB/s in  4s ETA:  0s
# info: installing component 'rustfmt'
# info: checking for self-updates
# info: downloading self-update
# 
#   stable-x86_64-apple-darwin update failed - rustc 1.50.0 (cb75ad5db 2021-02-10)
#        nightly-x86_64-apple-darwin updated - rustc 1.75.0-nightly (df871fbf0 2023-10-24) (from rustc 1.66.0-nightly (a6b7274a4 2022-10-10))
# 
# info: cleaning up downloads & tmp directories
rustc --version
# rustc 1.75.0-nightly (df871fbf0 2023-10-24)
rustup --version
# rustup 1.26.0 (5af9b9484 2023-04-05)
# info: This is the version for the rustup toolchain manager, not the rustc compiler.
# info: The currently active `rustc` version is `rustc 1.75.0-nightly (df871fbf0 2023-10-24)`
rustdoc --version
# rustdoc 1.75.0-nightly (df871fbf0 2023-10-24)
rustfmt --version
# rustfmt 1.7.0-nightly (df871fbf 2023-10-24)
curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh
# info: downloading wasm-pack
# info: existing wasm-pack installation found at `/Users/richplastow/.cargo/bin/wasm-pack`
# info: would you like to overwrite this file? [y/N]: y
# info: successfully installed wasm-pack to `/Users/richplastow/.cargo/bin/wasm-pack`
wasm-pack --version
# wasm-pack 0.12.1
```

## A command-line "Hello Rust" app

Very simple to get working. Based on the [doc.rust-lang.org example:
](https://doc.rust-lang.org/rust-by-example/hello.html)

```rs
// src/hello.rs
fn main() {
    println!("Hello Rust!"); // print text to the console
}
```

```sh
rustc src/hello.rs
./hello
# Hello Rust!
```

## A web browser "Hello Rust" app

Based on the [wasmbyexample.dev example:
](https://wasmbyexample.dev/examples/hello-world/hello-world.rust.en-us)

```sh
cargo init --name hello-browser-from-rust
# Created binary (application) package
```

Leave the auto-generated .gitignore as it is, but rename the auto-generated
src/main.rs file to src/lib.rs, and change it to:
```rs
// src/lib.rs
// wasm-pack uses wasm-bindgen to build and generate a JavaScript binding file.
// Import the wasm-bindgen crate.
use wasm_bindgen::prelude::*;

// wasm-pack needs exported functions to be prefixed `#[wasm_bindgen]`.
#[wasm_bindgen]
pub fn greet(who: &str) -> String {
  return format!("Hello from Rust, {}!", who)
}
```

Change the auto-generated Cargo.toml to:
```toml
[package]
name = "hello-browser-from-rust"
version = "0.1.0"
authors = ["Your Name <your@name.com>"]
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
```
(Note `edition = "2021"` not `edition = "2018"`)

Use `wasm-pack` to build the pkg/ directory:
```sh
wasm-pack build --target web && rm pkg/.gitignore pkg/README.md
# [INFO]: 🎯  Checking for the Wasm target...
# [INFO]: 🌀  Compiling to Wasm...
#    Compiling hello-browser-from-rust v0.1.0 (/Users/<username>/...)
#     Finished release [optimized] target(s) in 0.22s
# [INFO]: ⬇️  Installing wasm-bindgen...
# [INFO]: Optimizing wasm binaries with `wasm-opt`...
# [INFO]: Optional fields missing from Cargo.toml: 'description', 'repository',
#    and 'license'. These are not necessary, but recommended
# [INFO]: ✨   Done in 0.63s
# [INFO]: 📦   Your wasm pkg is ready to publish at /Users/<username>/.../pkg.
touch pkg/index.js pkg/index.html
ls -la pkg/
# total 80
# drwxr-xr-x   9 <username>  staff    224 <date> .
# drwxr-xr-x  11 <username>  staff    416 <date> ..
# -rw-r--r--   1 <username>  staff   1085 <date> hello_browser_from_rust.d.ts
# -rw-r--r--   1 <username>  staff   5563 <date> hello_browser_from_rust.js
# -rw-r--r--   1 <username>  staff  16907 <date> hello_browser_from_rust_bg.wasm
# -rw-r--r--   1 <username>  staff    438 <date> hello_browser_from_rust_bg.wasm.d.ts
# -rw-r--r--   1 <username>  staff      0 <date> index.html
# -rw-r--r--   1 <username>  staff      0 <date> index.js
# -rw-r--r--   1 <username>  staff    373 <date> package.json
```

Create pkg/index.js and pkg/index.html:
```js
// pkg/index.js
(async function() {
    // Import the JavaScript File.
    const wasm = await import('./hello_browser_from_rust.js');

    // Import the WebAssembly File.
    await wasm.default('./hello_browser_from_rust_bg.wasm');

    // Send WebAssembly code a string, and get another string back.
    const result = wasm.greet('Browser');

    // Display the result in the browser window.
    document.querySelector('pre').innerText = `greet() result: ${result}`;
})();
```

```html
<!-- pkg/index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello Browser from Rust</title>
    <script type="module" src="./index.js"></script>
    <style>body { background:#121; color:#cfc;
      font: 18px/20px Arial, sans-serif }
    </style>
  </head>
  <body>
    <h1>Hello Browser from Rust</h1>
    <pre></pre>
  </body>
</html>
```

Run a local HTTP server, eg `static-server`:
```sh
static-server pkg/
# * Static server successfully started.
# * Serving files at: http://localhost:9080
# * Press Ctrl+C to shutdown.
```

Visit <http://localhost:9080> where you should see:
> greet() result: Hello from Rust, Browser!

