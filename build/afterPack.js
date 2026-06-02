const { execSync } = require("node:child_process");
const path = require("node:path");

/**
 * Ad-hoc code-sign the macOS app after packaging.
 *
 * Without a (paid) Apple Developer certificate we can't notarize, but an
 * ad-hoc signature is required so the app *runs* on Apple Silicon — an
 * unsigned arm64 binary is reported by macOS as "damaged"/malware. With this,
 * users get the normal "unidentified developer" prompt instead, which they can
 * bypass (right-click → Open, or `xattr -cr`).
 */
exports.default = async function afterPack(context) {
  if (context.electronPlatformName !== "darwin") return;
  const appName = `${context.packager.appInfo.productFilename}.app`;
  const appPath = path.join(context.appOutDir, appName);
  console.log(`afterPack: ad-hoc signing ${appPath}`);
  execSync(`codesign --force --deep --sign - ${JSON.stringify(appPath)}`, { stdio: "inherit" });
};
