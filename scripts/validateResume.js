const fs = require("fs");

const possible = [
  "./resume.json",
  "./data/resume.json",
  "./src/data/resume.json",
  "./app/data/resume.json"
];

let found = null;

for (const p of possible) {
  if (fs.existsSync(p)) {
    found = p;
    break;
  }
}

if (!found) {
  console.error("❌ resume.json not found in expected locations");
  process.exit(1);
}

JSON.parse(fs.readFileSync(found, "utf8"));
console.log("✅ resume.json valid at:", found);
