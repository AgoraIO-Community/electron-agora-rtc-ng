import {
  app,
  BrowserWindow,
  systemPreferences,
  ipcMain,
  MessageChannelMain,
  MessagePortMain,
} from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
import EventMessage from '../renderer/examples/util/eventMessage'

const isDevelopment = process.env.NODE_ENV !== 'production'
app.allowRendererProcessReuse = false

if (systemPreferences.askForMediaAccess) {
  systemPreferences.askForMediaAccess('camera')
  systemPreferences.askForMediaAccess('microphone')
}

let port1
let port2

const createMessagePort = () => {
  const messagePort = new MessageChannelMain()
  port1 = messagePort.port1
  port2 = messagePort.port2
  return messagePort
}

ipcMain.handle(
  EventMessage.ChannelForRenderAndMainProcess,
  async (event, args) => {
    const { eventName } = args || {}
    let result = {}
    switch (eventName) {
      case EventMessage.OpenNewWindow:
        if (!mainWindow2) {
          mainWindow2 = createMainWindow()
        }
        break
      case EventMessage.CloseWindow:
        if (!mainWindow2) {
          return
        }
        mainWindow2.close()
        mainWindow2 = null
        break
      case EventMessage.GetPort1:
        const message = createMessagePort()
        mainWindow.webContents.postMessage('port', null, [message.port1])
        break
      case EventMessage.GetPort2:
        mainWindow2.webContents.postMessage('port', null, [port2])
        break
      default:
        break
    }
    return result
  }
)

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow
let mainWindow2

function createMainWindow() {
  const window = new BrowserWindow({
    width: 1024,
    height: 728,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  })

  window.webContents.openDevTools({
    mode: 'detach',
    activate: true,
  })

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file',
        slashes: true,
      })
    )
  }

  window.on('closed', () => {
    // mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})
