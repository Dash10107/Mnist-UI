import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handlePredict = async () => {
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post('https://mnistbackend.onrender.com/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Simple MNIST Digit Recognition</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handlePredict}>Predict</button>
      {prediction !== null && <p>Prediction: {prediction}</p>}
    </div>
  );
};

export default App;
