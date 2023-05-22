import { Camera, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View, Image } from 'react-native';
import { styles } from "./styles"
import { MaterialCommunityIcons, FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../styles/colors';

interface IPhoto {
  height: string
  uri: string
  width: string
}

export function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [photo, setPhoto] = useState<IPhoto>();
  const ref = useRef(null)

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    if (ref.current) {
      const picture = await ref.current.takePictureAsync()
      setPhoto(picture)
    }
  }

  return (
    <View style={styles.container}>
      {photo && photo.uri ? (
        <>
          <View style={styles.showphoto}>
            <TouchableOpacity onPress={() => setPhoto(undefined)}>
              <Ionicons name="caret-back-circle" size={40} color={colors.secondary} />
            </TouchableOpacity>
            <Image source={{ uri: photo.uri }} style={styles.img} />
          </View>
        </>
      ) : (
        <Camera style={styles.camera} type={type} ref={ref}>
          <View style={styles.lado}>
            <TouchableOpacity onPress={takePicture} >
              <FontAwesome name="circle" size={60} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleCameraType} >
              <MaterialCommunityIcons name="camera-retake" size={50} color="white" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
}