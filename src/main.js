const { app, BrowserWindow, Menu } = require("electron");

let win;
function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		minWidth: 600,
		minHeight: 700,
		icon:__dirname + "favicon.ico",
		webPreferences: {
			nodeIntegration: true
		}
	});

	const mainMenu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(mainMenu);

	// and load the index.html of the app.
	win.loadFile(__dirname + "/index.html");
}

app.whenReady().then(createWindow);

let template = [
	{
		label: "DevTools",
		submenu: [
			{
				label: "Show/Hide Dev Tools",
				accelerator: process.platform == "darwin" ? "Comand+D" : "Ctrl+D",
				click(item, focusedWindow) {
					focusedWindow.toggleDevTools();
				}
			},
			{
				role: "reload"
			}
		]
	}
];