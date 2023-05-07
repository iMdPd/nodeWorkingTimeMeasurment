"use strict";

const path = require("path");
const { app, BrowserWindow } = require("electron");

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

function main() {
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    width: 520,
    height: 650,
    frame: false,
    resizable: false,
  });

  mainWindow.loadFile(path.join("app", "index.html"));
}

app.on("ready", main);

app.on("window-all-closed", function () {
  app.quit();
});
