import React, { useRef } from 'react';
import { View, Button, Alert } from 'react-native';
import CanvasDraw from '../components/CanvasDraw';
import { capture } from '@shopify/react-native-skia';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DrawingScreen = () => {
  const canvasRef = useRef();

  const handlePredict = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const image = capture(canvasRef.current);
      const base64 = image.encodeToBase64();

      const response = await axios.post(
        'http://<YOUR_BACKEND_IP>:5000/predict',
        { image: base64 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      Alert.alert('Result', `Prediction: ${response.data.result}`);
    } catch (error) {
      Alert.alert('Error', 'Prediction failed');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CanvasDraw ref={canvasRef} />
      <Button title="Predict" onPress={handlePredict} />
    </View>
  );
};

export default DrawingScreen;