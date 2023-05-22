import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { styles } from "./styles"
import { MaterialCommunityIcons, FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import { ComponentButtonInterface } from '../../components';

export function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions();
  const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset>();
  const ref = useRef<Camera>(null)
  const [takePhoto, setTakePhoto] = useState(false)

  if (!permissionCamera) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permissionCamera.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermissionCamera} title="grant permission" />
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

  if (!permissionMedia) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permissionMedia.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to save the image</Text>
        <Button onPress={requestPermissionMedia} title="grant permission" />
      </View>
    );
  }

  async function savePhoto() {
    const asset = await MediaLibrary.createAssetAsync(photo!.uri)
    MediaLibrary.createAlbumAsync("Images", asset, false)
    Alert.alert("Imagem salva com sucesso!")
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    if (!result.canceled) {
      setPhoto(result.assets[0])
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
            <ComponentButtonInterface title='Salvar imagem' type='secondary' onPressI={savePhoto}/>
            <ComponentButtonInterface title='Abrir imagem' type='secondary' onPressI={pickImage}/>
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