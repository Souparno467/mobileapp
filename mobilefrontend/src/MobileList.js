import React, { useEffect, useState } from "react";
import axios from "axios";

function MobileList() {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8080/api/mobiles")
      .then(res => {
        setMobiles(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="form-card">
        <div className="loading"></div>
        <p>Loading mobiles...</p>
      </div>
    );
  }

  return (
    <div className="form-card">
      <h2>Available Mobiles</h2>
      <ul>
        {mobiles.map(m => (
          <li key={m.id} className="mobile-item">
            <strong>{m.brand} {m.model}</strong>
            <div>₹{m.price}</div>
            <small>{m.stock} in stock</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MobileList;