import React, { useState } from "react";

/**
 * SpotForm Component
 * ------------------
 * Renders a form to add a new location/spot.
 * Collects title, description, category, coordinates, and images,
 * and submits the data as FormData to the parent component.
 */
const SpotForm = ({ onSubmit, coords, onCancel }) => {
  // Local state for controlled form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  /**
   * Handle form submission
   * - Prevents default browser reload
   * - Validates required fields
   * - Prepares multipart FormData for backend upload
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!title || !description || !category || !coords) {
      alert("Please fill all required fields.");
      return;
    }

    // Create FormData to support text + file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("lat", coords.lat);
    formData.append("lng", coords.lng);

    // Append multiple images under the same field name "images"
    if (image && image.length > 0) {
      image.forEach((img) => {
        formData.append("images", img);
      });
    }

    // Send prepared data to parent handler (API call is in parent)
    onSubmit(formData);

    // Reset form state after successful submission
    setTitle("");
    setDescription("");
    setCategory("");
    setImage(null);
  };

  return (
    <div className="card p-6 w-full max-w-lg mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Add Hidden Spot</h2>

      {/* Form wrapper */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Spot Title Input */}
        <input
          type="text"
          placeholder="Spot Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-default"
          required
        />

        {/* Description Textarea */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input-default"
          rows={4}
          required
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input-default"
          required
        >
          <option value="">Select Category</option>
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

        {/* Display Selected Coordinates */}
        <div className="text-sm text-slate-600">
          Coordinates:{" "}
          <strong>
            {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
          </strong>
        </div>

        {/* Image File Input (Multiple Upload) */}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImage([...e.target.files])}
          className="w-full"
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm border rounded text-slate-600"
          >
            Cancel
          </button>

          <button type="submit" className="btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SpotForm;
