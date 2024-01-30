import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { Entypo } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';




const Solverpage = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState('');
  const cameraRef = useRef(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true)
    if (capturedImage.uri) {
      try {
        const base64Img = await FileSystem.readAsStringAsync(capturedImage.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        const response = await axios.post('http://192.168.8.181:5000/solve_picture', {
          imageData: base64Img,
        });
  
        console.log('image sent', response.data);
        // console.log(response.data['message']);
        if (response.data['message'] === 1) {
          navigation.navigate('Solution', {sudokuMatrix: response.data['solved']});
        } 
        else if (response.data['message'] === -1) {
          navigation.navigate('Editable', {sudokuMatrix: response.data['classified']});
        }
        setLoading(false)
        
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
          <ActivityIndicator size={80}  style={styles.activityind} color="lightgreen" animating={loading} />
          <View style={{alignItems:'flex-end', flexDirection:'row'}}>
            <TouchableOpacity onPress={solvePicture} style={styles.saveButton}>
              <Text style={styles.saveText}>
                <Entypo name="check" size={24} color="black" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCapturedImage('')} style={styles.cancel}>
                <Text style={styles.saveText}>
                    <Entypo name="cross" size={24} color="black" />
                </Text>
            </TouchableOpacity>
            </View>
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
    width :500,
    height:500,
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
    backgroundColor: '#19e1ac',
    borderRadius: 50,
    padding: 15,
    marginTop: -100,
    alignSelf: 'center',
  },
  captureText: {
    fontSize: 18,
    color: 'black',
  },
  previewContainer: {
    position: 'absolute',
    bottom: 8,
    left: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#19e1ac',
    borderRadius: 10,
    padding: 10,
    marginRight: 30,
  },
  cancel: {
    backgroundColor: '#e11919',
    borderRadius: 10,
    padding: 10,
  }
  ,
  saveText: {
    fontSize: 16,
    color: 'white',
  },
  activityind: {
    position: 'absolute',
    alignSelf: 'center',
    marginTop: 60,
  }
});

export default Solverpage;