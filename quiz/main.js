const { app, BrowserWindow, ipcMain } = require("electron");
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 565,
        height: 760,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        transparent: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        }
    });

    win.loadFile("index.html"); 
}

app.whenReady().then(() => {
    createWindow();

    // ✅ PUT THEM HERE
    ipcMain.on("minimize", () => {
        win.minimize();
    });

    ipcMain.on("close", () => {
        win.close();
    });
});
