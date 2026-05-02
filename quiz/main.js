const { app, BrowserWindow } = require("electron");
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 700,
        resizable: false,
        maximizable: false,
        fullscreenable: false,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true
        }
    });

    win.loadFile("index.html"); // your starting page
}

app.whenReady().then(() => {
    createWindow();
});