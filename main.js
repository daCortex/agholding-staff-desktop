const { app, BrowserWindow, shell } = require("electron");

// Dedicated desktop app for the AG Holding STAFF portal.
const ORIGIN = "https://agholding.vercel.app";
const APP_URL = `${ORIGIN}/staff`;

let win;

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

  // Open external links (mailto:, tel:, other sites) in the default browser.
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

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
