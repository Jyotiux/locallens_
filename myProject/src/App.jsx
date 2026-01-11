import React, { useState, useEffect } from "react";
import MapView from "./components/ViewMap.jsx";
import SpotForm from "./components/SpotForm.jsx";

const App = () => {
  const [selectedCoords, setSelectedCoords] = useState(null);
  const [spots, setSpots] = useState([]);

  const handleAddLocation = (coords) => {
    setSelectedCoords(coords);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const res = await fetch("https://discover-jcj0.onrender.com/api/spots", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Spot added!");
        fetchSpots();
      } else {
        alert("❌ Failed: " + data.message);
      }
    } catch (error) {
      alert("⚠️ Error submitting spot.");
    }

    setSelectedCoords(null);
  };

  const fetchSpots = async () => {
    try {
      const res = await fetch("https://discover-jcj0.onrender.com/api/spots");
      const data = await res.json();
      setSpots(data);
    } catch (error) {
      console.error("Error fetching spots:", error);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">Hidden Spots Map</h1>


      <MapView onAddLocation={handleAddLocation} />

      {selectedCoords && (
        <SpotForm
          coords={selectedCoords}
          onSubmit={handleFormSubmit}
          onCancel={() => setSelectedCoords(null)}
        />
      )}


      <h2 className="text-xl font-semibold mt-8 mb-4">Recent Spots</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {spots.length === 0 ? (
          <p className="text-gray-500 text-sm">No spots added yet.</p>
        ) : (
          spots.map((spot) => (
            <div
              key={spot._id}
              className="bg-white border rounded shadow p-4 w-full sm:w-[48%] md:w-[23%]"
            >
              <img
                src={spot.imageUrls[0]}
                alt={spot.title}
                className="h-40 w-full object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold">{spot.title}</h3>
              <p className="text-sm text-gray-600 truncate">{spot.description}</p>
              <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {spot.category}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
