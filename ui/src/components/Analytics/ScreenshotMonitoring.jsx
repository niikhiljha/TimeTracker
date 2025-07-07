import { useEffect, useState } from 'react';
import { Camera, CheckCircle } from 'lucide-react';

const ScreenshotMonitoring = () => {
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    const loadScreenshots = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/screenshots');
        const data = await res.json();
        if (Array.isArray(data)) {
          setScreenshots(data);
        } else {
          console.error('Unexpected data:', data);
          setScreenshots([]);
        }
      } catch (err) {
        console.error('Failed to load screenshots:', err);
        setScreenshots([]);
      }
    };

    loadScreenshots();
    const interval = setInterval(loadScreenshots, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">Screenshot Monitoring</h3>
        <Camera className="w-6 h-6 text-gray-500" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {screenshots.length === 0 ? (
          <div className="col-span-full text-gray-500">No screenshots found</div>
        ) : (
          screenshots.map(s => (
            <div key={s.id} className="bg-gray-100 p-4 rounded-lg">
              <img
                src={`http://localhost:3000/screenshots/${s.filename}`}
                alt={`Screenshot at ${new Date(s.taken_at).toLocaleTimeString()}`}
                className="w-full h-auto rounded mb-2"
              />
              <div className="text-sm">
                <p className="font-semibold">{new Date(s.taken_at).toLocaleTimeString()}</p>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-600">Verified</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScreenshotMonitoring;

