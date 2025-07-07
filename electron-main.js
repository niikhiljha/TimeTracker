const { desktopCapturer } = require('electron');
const fs = require('fs');
const path = require('path');

async function captureAndSaveScreenshot() {
  const sources = await desktopCapturer.getSources({ types: ['window', 'screen'] });
  
  // You can filter to a specific window here
  const screenSource = sources[0]; // pick primary screen or match by name
  
  const image = await screenSource.thumbnail.toPNG();

  const filePath = path.join(__dirname, 'analytics', `screenshot_${Date.now()}.png`);
  fs.writeFile(filePath, image, (err) => {
    if (err) console.error('Error saving screenshot:', err);
    else console.log('Saved screenshot:', filePath);
    
    // TODO: Upload this image to DB / S3 / analytics store
  });
}

// Run every 5 seconds
setInterval(captureAndSaveScreenshot, 5000);
