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
      const response = await fetch('https://mnistbackend.onrender.com/predict', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }, // Accept JSON response
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(()=>{
    const getReq = async function (){
      const response = await axios.get('https://mnistbackend.onrender.com/',  {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response)
    }

    getReq()

  },[])

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
