import React, { useState, useEffect } from "react";
import MapView from "./components/ViewMap.jsx";
import SpotForm from "./components/SpotForm.jsx";

// Base URL for backend API
const API_BASE_URL = "https://discover-jcj0.onrender.com/api";

const App = () => {
  // Stores coordinates selected from the map for adding a new spot
  const [selectedCoords, setSelectedCoords] = useState(null);

  // Stores list of spots fetched from backend
  const [spots, setSpots] = useState([]);

  // Currently selected category filter
  const [selectedCategory, setSelectedCategory] = useState("");

  // Limit for number of spots to fetch and display
  const [limit, setLimit] = useState(4);

  // Coordinates of the spot currently highlighted on the map
  const [highlightedCoords, setHighlightedCoords] = useState(null);

  // 🔥 Carousel state for viewing multiple images
  const [activeImages, setActiveImages] = useState(null); // Array of image URLs
  const [activeIndex, setActiveIndex] = useState(0);      // Current image index

  /**
   * Callback invoked when user clicks on the map to add a new location
   */
  const handleAddLocation = (coords) => {
    setSelectedCoords(coords);
  };

  /**
   * Handles submission of the Add Spot form
   * Sends multipart form data (including images) to backend
   */
  const handleFormSubmit = async (formData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/spots`, {
        method: "POST",
        body: formData,
      });

      // Refresh spots list after successful creation
      if (res.ok) {
        fetchSpots();
      }
    } catch (err) {
      console.error("Submit error:", err);
    }

    // Reset selected coordinates after submission
    setSelectedCoords(null);
  };

  /**
   * Fetches spots from backend with optional
   * category filter and result limit
   */
  const fetchSpots = async () => {
    try {
      let url = `${API_BASE_URL}/spots?limit=${limit}`;

      // Apply category filter if selected
      if (selectedCategory) {
        url += `&category=${selectedCategory}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setSpots(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  /**
   * Re-fetch spots whenever category or limit changes
   */
  useEffect(() => {
    fetchSpots();
  }, [selectedCategory, limit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      {/* 🔷 NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              LocalLens
            </h1>
            <p className="text-sm text-slate-500">
              Mark · Share · Explore hidden places
            </p>
          </div>
        </div>
      </header>

      {/* 🔷 MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-10">

        {/* 🗺 MAP SECTION */}
        <section className="bg-white rounded-xl shadow-md p-5">
          <h2 className="text-xl font-semibold mb-4">Explore Map</h2>

          {/* Map wrapper */}
          <div className="relative overflow-hidden rounded-lg border">
            <MapView
              onAddLocation={handleAddLocation}
              highlightedCoords={highlightedCoords}
            />
          </div>
        </section>

        {/* 📝 ADD SPOT FORM (Shown only after map click) */}
        {selectedCoords && (
          <SpotForm
            coords={selectedCoords}
            onSubmit={handleFormSubmit}
            onCancel={() => setSelectedCoords(null)}
          />
        )}

        {/* 🧱 SPOTS LIST SECTION */}
        <section className="bg-white rounded-xl shadow-md p-5">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Spots</h2>

            <div className="flex gap-3 flex-wrap">
              {/* Category Filter Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border rounded-md text-sm bg-slate-50"
              >
                <option value="">All Categories</option>
                <option value="Nature">Nature</option>
                <option value="Scenic">Scenic / Viewpoint</option>
                <option value="Historical">Historical</option>
                <option value="Spiritual">Spiritual</option>
                <option value="Education">Education / Campus</option>
                <option value="Food">Local Food</option>
                <option value="Cafe">Cafe / Hangout</option>
                <option value="Adventure">Adventure</option>
                <option value="Wildlife">Wildlife</option>
                <option value="Trekking">Trekking / Hiking</option>
                <option value="Local">Local Life</option>
                <option value="Cultural">Cultural / Heritage</option>
                <option value="Shopping">Local Shopping</option>
              </select>

              {/* Result Limit Dropdown */}
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="px-3 py-2 border rounded-md text-sm bg-slate-50"
              >
                <option value={4}>4</option>
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          {/* 🧱 CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
            {spots.length === 0 ? (
              <p className="text-slate-500 text-sm">No spots added yet.</p>
            ) : (
              spots.map((spot) => (
                <article
                  key={spot._id}
                  onClick={() => {
                    // Highlight this spot on the map
                    setHighlightedCoords({
                      lat: spot.coordinates.lat,
                      lng: spot.coordinates.lng,
                    });

                    // Open image carousel with this spot's images
                    setActiveImages(spot.imageUrls);
                    setActiveIndex(0);
                  }}
                  className="group cursor-pointer bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
                >
                  {/* 🔥 Single Image Preview on Card */}
                  <div className="relative h-40 overflow-hidden">
                    {spot.imageUrls?.[0] && (
                      <img
                        src={spot.imageUrls[0]}
                        alt={spot.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    {/* Category Badge */}
                    <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {spot.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg">{spot.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">
                      {spot.description}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(spot.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      {/* 🔥 IMAGE CAROUSEL MODAL */}
      {activeImages && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setActiveImages(null)}
          >
            ✕
          </button>

          {/* Left Navigation */}
          <button
            className="absolute left-6 text-white text-4xl"
            onClick={() =>
              setActiveIndex((prev) =>
                prev === 0 ? activeImages.length - 1 : prev - 1
              )
            }
          >
            ‹
          </button>

          {/* Active Image */}
          <img
            src={activeImages[activeIndex]}
            alt="spot"
            className="max-h-[80vh] max-w-[90vw] object-contain rounded-lg shadow-lg"
          />

          {/* Right Navigation */}
          <button
            className="absolute right-6 text-white text-4xl"
            onClick={() =>
              setActiveIndex((prev) =>
                prev === activeImages.length - 1 ? 0 : prev + 1
              )
            }
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
