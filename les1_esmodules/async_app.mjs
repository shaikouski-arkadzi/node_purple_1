async function main() {
  const module = await import("./characters.mjs");
  const { characters, greet } = module;
  module.default(); //вызовется log

  for (const c of characters) {
    greet(c);
  }
}

main();
