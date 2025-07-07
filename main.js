const { app, BrowserWindow, desktopCapturer, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const analyticsDir = path.join(__dirname, '../Backend/uploads/screenshots');

let mainWindow;
let screenshotInterval;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadURL('http://localhost:5173'); // or load your production index.html
  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function startScreenshotCapture() {
  const analyticsDir = path.join(__dirname, 'analytics');
  if (!fs.existsSync(analyticsDir)) {
    fs.mkdirSync(analyticsDir);
    console.log('📁 Created analytics directory:', analyticsDir);
  }

  screenshotInterval = setInterval(async () => {
    try {
      const sources = await desktopCapturer.getSources({ types: ['screen'] });
      if (sources.length === 0) {
        console.warn('⚠ No screen sources found');
        return;
      }
      const screen = sources[0];
      const image = screen.thumbnail.toPNG();
      const filePath = path.join(analyticsDir, `screenshot_${Date.now()}.png`);
      fs.writeFileSync(filePath, image);
      console.log('💾 Screenshot saved:', filePath);
    } catch (err) {
      console.error('❌ Screenshot error:', err);
    }
  }, 5000);
}

ipcMain.handle('get-screenshots', async () => {
  const analyticsDir = path.join(__dirname, 'analytics');
  if (!fs.existsSync(analyticsDir)) return [];

  return fs.readdirSync(analyticsDir)
    .filter(f => f.endsWith('.png'))
    .map(f => ({
      id: f,
      image_url: `http://localhost:3000/screenshots/${f}`,
      taken_at: parseInt(f.match(/\d+/)[0]) || Date.now()
    }))
    .sort((a, b) => b.taken_at - a.taken_at);
});

app.whenReady().then(() => {
  createWindow();
  startScreenshotCapture();
});

app.on('before-quit', () => {
  if (screenshotInterval) clearInterval(screenshotInterval);
});
