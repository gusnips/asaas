// No em dash in the text consumers read. ESLint covers every string in src/ (.eslintrc.json,
// no-restricted-syntax); this covers what ESLint does not parse: the README, the docs, the
// changelog and the package description, which npm shows. An em dash gives away AI-written text.

import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const EM_DASH = "—";

const files = [
  "README.md",
  "CHANGELOG.md",
  "package.json",
  ...readdirSync("docs").map((file) => join("docs", file)),
];

const problems = files.flatMap((file) =>
  readFileSync(file, "utf8")
    .split("\n")
    .flatMap((line, i) => (line.includes(EM_DASH) ? [`${file}:${i + 1}: ${line.trim()}`] : [])),
);

if (problems.length > 0) {
  console.error(
    `Em dash found in ${problems.length} user-facing line(s). Use a period, comma, colon or parentheses:\n` +
      problems.join("\n"),
  );
  process.exit(1);
}
console.log(`no em dash in ${files.length} user-facing files`);
