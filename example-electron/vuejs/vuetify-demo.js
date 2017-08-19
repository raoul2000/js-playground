'use strict';
const electron = require('electron');
const ipcMain = require('electron').ipcMain;

const app = electron.app; // Module to control application life.
const BrowserWindow = electron.BrowserWindow; // Module to create native browser window.


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
	// On OS X it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
	// Create the browser window.
	mainWindow = new BrowserWindow({
		width : 800,
		height : 600,
		show:true
	});

	mainWindow.once('ready-to-show', () => {
		console.log('ready-to-show');
	  mainWindow.show();
	});
	// and load the index.html of the app.
	mainWindow.loadURL('file://' + __dirname + '/app-vuetify/index.html');

	// Open the DevTools.
	require('vue-devtools').install();
	mainWindow.webContents.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
});
