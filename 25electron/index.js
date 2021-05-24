const { app, BrowserWindow, Menu } = require('electron');

let win = null;

const template = [
    {
        label : 'miomenu',
        submenu : [
            {
                label: 'voce1',
                click(){win.webContents.executeJavaScript("alert('cliccata voce1');")}
            },
            {
                label: 'mio sito',
                click(){win.loadURL('https://www.onyrix.com')}
            }
        ]
    },
    {
        label: 'View',
        submenu: [
          {role: 'reload'},
          {role: 'forcereload'},
          {role: 'toggledevtools'},
          {type: 'separator'},
          {role: 'resetzoom'},
          {role: 'zoomin'},
          {role: 'zoomout'},
          {type: 'separator'},
          {role: 'togglefullscreen'}
        ]
      }
];

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})