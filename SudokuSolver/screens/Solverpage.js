import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';




const Solverpage = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState('');
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo);
    }
  };

  const solvePicture = async () => {
    if (capturedImage.uri) {
      try {
        const base64Img = await FileSystem.readAsStringAsync(capturedImage.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const response = await axios.post('http://192.168.8.163:5000/solve_picture', {
          imageData: base64Img,
        });
  
        console.log('image sent:', response.status);
        
      } catch (error) {
        console.error('Error sending image to backend:', error);
      }
    }
  };  

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.overlay}>
    
        </View>
      </Camera>
      <View style={styles.captureButtonContainer}>
        <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
        <Entypo name="camera" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {capturedImage && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: capturedImage.uri }} style={styles.previewImage} />
          <TouchableOpacity onPress={solvePicture} style={styles.saveButton}>
            <Text style={styles.saveText}>Solve</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    width :300,
    height: 300,
    overflow: 'hidden',
    alignSelf:'center',
    marginTop: 50,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  captureButtonContainer: {
    marginBottom: 30,
  },
  captureButton: {
    backgroundColor: 'lightgreen',
    borderRadius: 50,
    padding: 15,
    marginTop: 30,
    alignSelf: 'center',
  },
  captureText: {
    fontSize: 18,
    color: 'black',
  },
  previewContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'lightgreen',
    borderRadius: 10,
    padding: 10,
  },
  saveText: {
    fontSize: 16,
    color: 'black',
  },
});

export default Solverpage;