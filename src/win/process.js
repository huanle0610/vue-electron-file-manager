import path from 'path'
import fs from 'fs'
export default function () {
  const shell = require('node-powershell')

  const ps = new shell({ // eslint-disable-line
    executionPolicy: 'Bypass',
    noProfile: true,
  })

  // ps.addCommand('Get-Process -Name electron')
  // const fileContents = fs.readFileSync(path.join(__static, '/User.ps1'), 'utf8')
  // const fileContents = fs.readFileSync(path.join(__static, '/Get-Drivers.ps1'), 'utf8')
  // const fileContents = fs.readFileSync(path.join(__static, '/Get-Performance.ps1'), 'utf8')
  const fileContents = fs.readFileSync(path.join(__static, '/Get-Process.ps1'), 'utf8')
  ps.addCommand(fileContents)
  return ps.invoke()
}
