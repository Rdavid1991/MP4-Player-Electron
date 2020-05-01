const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron')

let win;
function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        minWidth: 600,
        minHeight: 700,
        webPreferences: {
            nodeIntegration: true
        }

    })

    const mainMenu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(mainMenu);

    // and load the index.html of the app.
    win.loadFile(__dirname + '/index.html')
}

app.whenReady().then(createWindow)

template = [
    {
        label: "File",
        submenu: [
            {
                label: "Open Folder",
                click() {
                    win.webContents.send("hola",dialog.showOpenDialogSync({ properties: ['openDirectory', 'multiSelections'] }))
                }
            }
        ]
    },
    {
        label: 'DevTools',
        submenu: [
          {
            label: 'Show/Hide Dev Tools',
            accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
            click(item, focusedWindow) {
              focusedWindow.toggleDevTools();
            }
          },
          {
            role: 'reload'
          }
        ]
      } 
]