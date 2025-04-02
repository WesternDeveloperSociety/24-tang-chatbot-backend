import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Query.css';

export default function Query() {
  const [startRoom, setStartRoom] = useState('');
  const [endRoom, setEndRoom] = useState('');
  const [validRooms, setValidRooms] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('https://api.mappedin.com/maps/67bf33fc06c161000b65f558/rooms');
        if (!response.ok) {
          throw new Error('Failed to fetch rooms');
        }
        const data = await response.json();
        const rooms = data.map((room: { name: string }) => room.name);
        setValidRooms(rooms);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the startRoom and endRoom values against the fetched rooms
    if (!validRooms.includes(startRoom)) {
      alert(`Invalid Starting Room: "${startRoom}". Please enter a valid room.`);
      return;
    }

    if (!validRooms.includes(endRoom)) {
      alert(`Invalid Destination Room: "${endRoom}". Please enter a valid room.`);
      return;
    }
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
