import React from "react";

const Emergency: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-4">🚨 Emergency Contacts</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold">📞 Important Numbers</h3>
        <ul className="list-disc pl-6 mt-2">
          <li><strong>🚑 Ambulance:</strong> 108</li>
          <li><strong>👮 Police:</strong> 100</li>
          <li><strong>🔥 Fire Brigade:</strong> 101</li>
          <li><strong>🏥 Nearest Hospital:</strong> <a href="tel:+911234567890" className="text-blue-600">+91 12345 67890</a></li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">🩹 First-Aid Tips</h3>
        <ul className="list-disc pl-6 mt-2">
          <li><strong>CPR:</strong> If someone is unresponsive, call 108 and begin CPR immediately.</li>
          <li><strong>Burns:</strong> Run cool (not cold) water over the burn for at least 10 minutes.</li>
          <li><strong>Choking:</strong> Perform the Heimlich maneuver if someone is choking.</li>
          <li><strong>Bleeding:</strong> Apply firm pressure to stop bleeding.</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold">🗺️ Find Nearby Hospitals</h3>
        <p className="mt-2">
          Click the button below to find nearby hospitals.
        </p>
        <button
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={() => window.open("https://www.google.com/maps/search/nearby+hospitals", "_blank")}
        >
          🏥 Find Hospitals
        </button>
      </div>
    </div>
  );
};

export default Emergency;
