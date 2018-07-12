const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.on('ready', function() {
    const mainWindow = new BrowserWindow({
        width: 1800,
        height: 1000,
        darkTheme: true,
        center: true,
        title: "Klaxo - C++ editor",
        vibrancy: "dark"
    });

    mainWindow.loadURL('http://localhost:8080/');
});