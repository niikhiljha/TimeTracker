import ScreenshotMonitoring from './ScreenshotMonitoring';

const Analytics = () => (
  <div className="p-6 space-y-6">
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-2">📊 AI-Powered Analytics</h2>
      <p className="opacity-90">Deep insights into your work patterns and productivity trends</p>
    </div>
    <ScreenshotMonitoring />
  </div>
);

export default Analytics;

