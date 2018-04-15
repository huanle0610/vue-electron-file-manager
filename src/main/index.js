import { app, BrowserWindow, dialog } from 'electron' // eslint-disable-line
import EnsureSingleton from './singleton'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

const autoUpdate = false
let mainWindow = null
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    frame: false, // (process.env.NODE_ENV !== 'production'),
    show: false,
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  EnsureSingleton(app, mainWindow)
  const firstURL = (autoUpdate && process.env.NODE_ENV === 'production') ? `${winURL}#check-update` : winURL
  mainWindow.loadURL(firstURL)

  mainWindow.on('close', (event) => {
    event.preventDefault()
  })

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */
import log from 'electron-log' // eslint-disable-line
import { autoUpdater } from 'electron-updater' // eslint-disable-line
if (autoUpdate) {
  autoUpdater.logger = require('electron-log') // eslint-disable-line
  autoUpdater.logger.transports.file.level = 'info'

  autoUpdater.on('update-available', (info) => {
    log.info(`发现新版本 v${info.version}，即将自动更新...`)
  })

  autoUpdater.on('update-not-available', () => {
    mainWindow.loadURL(`${winURL}`)
  })

  autoUpdater.on('download-progress', (progress) => {
    mainWindow.setProgressBar(progress.percent)
  })

  autoUpdater.on('update-downloaded', () => {
    mainWindow.setProgressBar(-1)
    autoUpdater.quitAndInstall()
  })

  app.on('ready', () => {
    if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
  })
}
