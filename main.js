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
        vibrancy: "dark",
        frame: false,
        titleBarStyle: "hiddenInset"
    });

    mainWindow.loadURL('http://localhost:8080/');
    BrowserWindow.addDevToolsExtension('C:\\Users\\SaitamaSama\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Extensions\\fmkadmapgofadopljbjfkapdkoienihi\\3.2.3_0');
    mainWindow.openDevTools();
});