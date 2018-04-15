import log from 'electron-log' // eslint-disable-line

export default function (app, myWindow) {
  const shouldQuit = app.makeSingleInstance((argv, workingDirectory) => {
    log.info('Got: ', argv, workingDirectory)
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      log.info('isMinimized: ', myWindow.isMinimized())
      if (myWindow.isMinimized()) myWindow.restore()
      myWindow.focus()
    }
  })

  if (shouldQuit) {
    log.info('Quit')
    app.quit()
  }
}
