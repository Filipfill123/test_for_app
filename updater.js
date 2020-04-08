// Modules
const { autoUpdater } = require('electron-updater');
const { dialog } = require('electron');

autoUpdater.logger = require('electron-log');
autoUpdater.logger.transports.file.level = 'info';

autoUpdater.autoDownload = false;

module.exports = () => {
    autoUpdater.checkForUpdates();
    console.log('checking for updates')
    autoUpdater.on('update-available', () =>{

        dialog.showMessageBox({
            type: 'info',
            title: 'Update available',
            message: 'A new version of app is available. Do you want to download now?',
            buttons: ['Download', 'No']
        }, buttonIndex => {
            if (buttonIndex === 0) autoUpdater.downloadUpdate()
        });

    });
    autoUpdater.on('update-downloaded',() =>{
        dialog.showMessageBox({
            type: 'info',
            title: 'Update ready',
            message: 'Install update and restart now?',
            buttons: ['Yes', 'Later']

        }, buttonIndex => {
            if (buttonIndex === 0) autoUpdater.quitAndInstall(false, true)
        })
    });
};
