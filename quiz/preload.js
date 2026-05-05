window.addEventListener('DOMContentLoaded', () => {
  const header = document.createElement('header');
  header.id = 'custom-title-bar';
  header.innerHTML = `
    <div id="drag-handle" style="-webkit-app-region: drag; flex-grow: 1; height: 32px;"></div>
    <div id="window-controls" style="-webkit-app-region: no-drag;">
    </div>
  `;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'styles.css';
    document.head.appendChild(link);  
    document.body.prepend(header); 
});

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('windowControls', {
    minimize: () => ipcRenderer.send('minimize'),
    close: () => ipcRenderer.send('close')
});