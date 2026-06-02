const { app, BrowserWindow, shell, Menu, dialog } = require("electron");
const { autoUpdater } = require("electron-updater");

// Dedicated desktop app for the AG Holding STAFF portal.
const ORIGIN = "https://agholding.vercel.app";
const APP_URL = `${ORIGIN}/staff`;
const REPO = "daCortex/agholding-staff-desktop";
const RELEASES_PAGE = `https://github.com/${REPO}/releases/latest`;

let win;
let interactiveCheck = false; // true when the user clicked "Check for Updates"

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 820,
    minWidth: 940,
    minHeight: 600,
    title: "AG Holding Staff",
    backgroundColor: "#f1f5f9",
    webPreferences: { contextIsolation: true, nodeIntegration: false },
  });

  win.loadURL(APP_URL);

  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (e, url) => {
    if (!url.startsWith(ORIGIN)) {
      e.preventDefault();
      shell.openExternal(url);
    }
  });
}

// ---------- Updates ----------

function semverNewer(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) > (pb[i] || 0)) return true;
    if ((pa[i] || 0) < (pb[i] || 0)) return false;
  }
  return false;
}

// macOS (ad-hoc signed) can't self-install via Squirrel — check + open download.
async function checkMacUpdate(interactive) {
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    const data = await res.json();
    const latest = String(data.tag_name || "").replace(/^v/, "");
    if (latest && semverNewer(latest, app.getVersion())) {
      const dmg = (data.assets || []).find((a) => a.name.endsWith(".dmg"));
      const { response } = await dialog.showMessageBox(win, {
        type: "info",
        buttons: ["Download update", "Later"],
        defaultId: 0,
        cancelId: 1,
        message: `Update available — v${latest}`,
        detail: `You have v${app.getVersion()}. Download the new version, then drag it into Applications.`,
      });
      if (response === 0) shell.openExternal(dmg ? dmg.browser_download_url : RELEASES_PAGE);
    } else if (interactive) {
      dialog.showMessageBox(win, { message: "You're up to date.", detail: `Version ${app.getVersion()}` });
    }
  } catch (e) {
    if (interactive) dialog.showMessageBox(win, { message: "Update check failed", detail: String(e) });
  }
}

function checkForUpdates(interactive) {
  interactiveCheck = interactive;
  if (process.platform === "darwin") return checkMacUpdate(interactive);
  // Windows / Linux: electron-updater downloads + installs.
  autoUpdater.autoDownload = true;
  autoUpdater.checkForUpdates().catch((e) => {
    if (interactive) dialog.showMessageBox(win, { message: "Update check failed", detail: String(e) });
  });
}

autoUpdater.on("update-not-available", () => {
  if (interactiveCheck) dialog.showMessageBox(win, { message: "You're up to date.", detail: `Version ${app.getVersion()}` });
});
autoUpdater.on("error", (e) => {
  if (interactiveCheck) dialog.showMessageBox(win, { message: "Update error", detail: String(e) });
});
autoUpdater.on("update-available", (info) => {
  if (interactiveCheck) dialog.showMessageBox(win, { message: `Downloading update v${info.version}…`, detail: "You'll be prompted to restart when it's ready." });
});
autoUpdater.on("update-downloaded", async (info) => {
  const { response } = await dialog.showMessageBox(win, {
    type: "info",
    buttons: ["Restart & install", "Later"],
    defaultId: 0,
    cancelId: 1,
    message: `Update v${info.version} ready`,
    detail: "Restart the app to finish installing the update.",
  });
  if (response === 0) autoUpdater.quitAndInstall();
});

function buildMenu() {
  const template = [
    ...(process.platform === "darwin"
      ? [{
          label: app.name,
          submenu: [
            { role: "about" },
            { label: "Check for Updates…", click: () => checkForUpdates(true) },
            { type: "separator" },
            { role: "hide" }, { role: "hideOthers" }, { role: "unhide" },
            { type: "separator" }, { role: "quit" },
          ],
        }]
      : []),
    { label: "File", submenu: [process.platform === "darwin" ? { role: "close" } : { role: "quit" }] },
    { label: "Edit", role: "editMenu" },
    { label: "View", submenu: [{ role: "reload" }, { role: "forceReload" }, { type: "separator" }, { role: "resetZoom" }, { role: "zoomIn" }, { role: "zoomOut" }, { type: "separator" }, { role: "togglefullscreen" }] },
    {
      label: "Help",
      submenu: [
        ...(process.platform !== "darwin" ? [{ label: "Check for Updates…", click: () => checkForUpdates(true) }, { type: "separator" }] : []),
        { label: "Open portal in browser", click: () => shell.openExternal(APP_URL) },
        { label: "Help & downloads", click: () => shell.openExternal(`https://github.com/${REPO}#readme`) },
      ],
    },
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

app.whenReady().then(() => {
  buildMenu();
  createWindow();
  // quiet auto-check shortly after launch
  setTimeout(() => checkForUpdates(false), 4000);
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
