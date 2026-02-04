import log, { characters, greet } from "./characters.mjs";

log();

for (const c of characters) {
  greet(c);
}
