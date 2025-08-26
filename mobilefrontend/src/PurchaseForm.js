import React, { useState } from "react";
import axios from "axios";

function PurchaseForm() {
  const [mobileId, setMobileId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePurchase = () => {
    if (!mobileId || !customerName || quantity < 1) {
      setMessage("Please fill in all fields correctly");
      return;
    }

    setLoading(true);
    axios.post("http://localhost:8080/api/mobiles/purchase", {
      mobileId,
      customerName,
      quantity
    })
      .then(res => {
        setMessage(res.data);
        setLoading(false);
        // Clear form on success
        if (res.data.includes("success") || res.data.includes("Success")) {
          setMobileId("");
          setCustomerName("");
          setQuantity(1);
        }
      })
      .catch(err => {
        if (err.response && err.response.data) {
          setMessage(JSON.stringify(err.response.data));
        } else {
          setMessage("Error: " + err.message);
        }
        setLoading(false);
      });
  };

  const handleQuantityChange = (increment) => {
    const newQuantity = quantity + increment;
    if (newQuantity >= 1 && newQuantity <= 100) {
      setQuantity(newQuantity);
      
      // Add animation class
      const quantityInput = document.querySelector('input[type="number"]');
      if (quantityInput) {
        quantityInput.classList.add('quantity-changed');
        setTimeout(() => {
          quantityInput.classList.remove('quantity-changed');
        }, 600);
      }
    }
  };

  const isSuccess = message && (message.includes("success") || message.includes("Success"));
  const isError = message && (message.includes("Error") || message.includes("error"));

  return (
    <div className="form-card">
      <h2>Purchase Mobile</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <input 
          type="number" 
          placeholder="Mobile ID"
          value={mobileId} 
          onChange={e => setMobileId(e.target.value)}
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <input 
          type="text" 
          placeholder="Your Name"
          value={customerName} 
          onChange={e => setCustomerName(e.target.value)}
        />
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <div className="number-input-container">
          <input 
            type="number" 
            placeholder="Quantity"
            value={quantity} 
            onChange={e => setQuantity(parseInt(e.target.value) || 1)}
            min="1"
            max="100"
          />
          <div className="custom-number-arrows">
            <button 
              type="button"
              className="custom-arrow-btn up"
              onClick={() => handleQuantityChange(1)}
              title="Increase quantity"
              disabled={quantity >= 100}
            />
            <button 
              type="button"
              className="custom-arrow-btn down"
              onClick={() => handleQuantityChange(-1)}
              title="Decrease quantity"
              disabled={quantity <= 1}
            />
          </div>
        </div>
        <small style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.5rem', display: 'block' }}>
          Quantity: {quantity} (1-100)
        </small>
      </div>
      
      <button 
        onClick={handlePurchase}
        disabled={loading}
        style={{ width: '100%' }}
      >
        {loading ? <div className="loading"></div> : 'Purchase'}
      </button>
      
      {message && (
        <div className={isSuccess ? "success-message" : isError ? "error-message" : ""}>
          {message}
        </div>
      )}
    </div>
  );
}

export default PurchaseForm;