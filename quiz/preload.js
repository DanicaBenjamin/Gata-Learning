window.addEventListener('DOMContentLoaded', () => {
  const header = document.createElement('header');
  header.id = 'custom-title-bar';
  header.innerHTML = `
    <div id="drag-handle" style="-webkit-app-region: drag; flex-grow: 1; height: 32px;"></div>
    <div id="window-controls" style="-webkit-app-region: no-drag;">
    </div>
  `;
  document.body.prepend(header); // Adds it to the top of every page
});