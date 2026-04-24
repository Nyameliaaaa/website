// deploy.mjs
import { execSync } from "child_process";

const run = (cmd) => execSync(cmd, { stdio: "inherit" });

run("npx astro build");
run("git checkout --orphan pages-temp");
run("git rm -rf --cached .");
run("git add -f dist/");
run('git commit -m "deploy :3"');
run("git push origin pages-temp:pages --force");
run("git checkout -");
run("git branch -D pages-temp");
