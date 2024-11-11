import { series, parallel, src, dest, watch } from "gulp";
import { task } from "gulp-execa";
import { readFile } from "node:fs/promises";
import { deleteAsync } from "del";
import zip from "gulp-zip";

const info = JSON.parse(await readFile("src/info.json", "utf8"));
const release_name = `autocraft_${info.version}`;
const output_dir = `dist/${release_name}/`;
const assets_glob = "src/**/*.{json,png,txt,cfg}";

const build_ts = task(`tstl --outDir ${output_dir}`);
const build_lint = task("eslint src");
export const build_assets = () => {
  return src(assets_glob, { encoding: false }).pipe(dest(output_dir));
};

export const clean = async () => {
  await deleteAsync(["dist"]);
};

export const build = series(clean, parallel(build_ts, build_assets, build_lint));

export const dev = async () => {
  await build();
  watch(["src/**/*.ts", "tsconfig.json", "package.json"], parallel(build_ts, build_lint));
  watch(assets_glob, build_assets);
};

export const compress = () => {
  return src("dist/**/*", { encoding: false })
    .pipe(zip(`${release_name}.zip`))
    .pipe(dest("dist"));
};

export const release = series(build, compress);

export default dev;
