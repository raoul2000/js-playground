'use strict';
const electron = require('electron');
const ipcMain = require('electron').ipcMain;
const Positioner = require('electron-positioner');

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
		width : 400,
		height : 600,
		resizable : false,
		//minWidth: 400,
    //minHeight: 600,
		kiosk : false, // fullscreen
		title : "Super Cool Title",
		// The window will not appear in the task bar. When minimized, the window
		// simply doesn't appear and under win you must use the task manager to bring it
		// to foreground
		"skip-taskbar" : false,
		movable : false,
		show : true

	});
	var positioner = new Positioner(mainWindow);
  positioner.move('bottomRight');

	// and load the index.html of the app.
	mainWindow.loadURL('file://' + __dirname + '/index.html');

	// Open the DevTools.
	// mainWindow.webContents.openDevTools();

	// Emitted when the window is closed.
	mainWindow.on('closed', function() {
		// Dereference the window object, usually you would store windows
		// in an array if your app supports multi windows, this is the time
		// when you should delete the corresponding element.
		mainWindow = null;
	});
});
