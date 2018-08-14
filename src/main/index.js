'use strict'

import {app, BrowserWindow} from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080/`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  let options = {
    height: 563,
    useContentSize: true,
    width: 1000
  }

  options = require('assignment')(options, global.settings.window)
  mainWindow = new BrowserWindow(options)
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

global.settings = require('standard-settings').getSettings()

if (global.settings.appendSwitch) {
  Object.keys(global.settings.appendSwitch).forEach((key) => {
    if (global.settings.appendSwitch[key] !== '') {
      app.commandLine.appendSwitch(key, global.settings.appendSwitch[key])
    } else {
      app.commandLine.appendSwitch(key)
    }
  })
}
if (global.settings.appendArgument) {
  Object.values(global.settings.appendArgument).forEach((value) => {
    app.commandLine.appendArgument(value)
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

const mdns = require('mdns')

const resolve = [
  mdns.rst.DNSServiceResolve(),
  'DNSServiceGetAddrInfo' in mdns.dns_sd
    ? mdns.rst.DNSServiceGetAddrInfo()
    : mdns.rst.getaddrinfo({ families: [0] }),
  mdns.rst.makeAddressesUnique()
]

const br = mdns.browseThemAll()
const ipc = require('electron-better-ipc')

br.on('serviceUp', async service => {
  const serv = mdns.createBrowser(mdns.tcp(service.type.name), { resolverSequence: resolve })
  serv
    .on('serviceUp', function (service) {
      console.log('new service up: ', service);
      (async () => {
        await ipc.callRenderer(mainWindow, 'send-services', service)
      })()
    })
    .on('serviceChanged', function (service) {
      console.log('service changed: ', service);
      (async () => {
        await ipc.callRenderer(mainWindow, 'change-services', service)
      })()
    })
    .on('serviceDown', function (service) {
      console.log('down');
      (async () => {
        await ipc.callRenderer(mainWindow, 'down-services', service)
      })()
    })
    .start()
})

br.start()
