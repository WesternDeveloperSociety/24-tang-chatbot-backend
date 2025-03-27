import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Query.css';

export default function Query() {
  const [startRoom, setStartRoom] = useState('');
  const [endRoom, setEndRoom] = useState('');
  const navigate = useNavigate();

  // List of valid room names
  const validRooms = ['1110','1220']; // Replace with actual room names

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the startRoom and endRoom are valid
    if (!validRooms.includes(startRoom)) {
      alert(`Invalid Starting Room: "${startRoom}". Please enter a valid room.`);
      return;
    }

    if (!validRooms.includes(endRoom)) {
      alert(`Invalid Destination Room: "${endRoom}". Please enter a valid room.`);
      return;
    }

    // Navigate to the Map page with the startRoom and endRoom as query parameters
    navigate(`/map?startRoom=${encodeURIComponent(startRoom)}&endRoom=${encodeURIComponent(endRoom)}`);
  };

  return (
    <div className="query-container">
      <h1 className="query-title">Enter Room Details</h1>
      <form className="query-form" onSubmit={handleSubmit}>
        <div className="query-input-group">
          <label className="query-label" htmlFor="startRoom">Starting Room:</label>
          <input
            className="query-input"
            id="startRoom"
            type="text"
            value={startRoom}
            onChange={(e) => setStartRoom(e.target.value)}
            placeholder="Enter starting room"
          />
        </div>
        <div className="query-input-group">
          <label className="query-label" htmlFor="endRoom">Destination Room:</label>
          <input
            className="query-input"
            id="endRoom"
            type="text"
            value={endRoom}
            onChange={(e) => setEndRoom(e.target.value)}
            placeholder="Enter destination room"
          />
        </div>
        <button className="query-button" type="submit">Navigate</button>
      </form>
    </div>
  );
}