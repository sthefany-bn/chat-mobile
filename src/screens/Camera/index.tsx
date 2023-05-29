import { Camera, CameraCapturedPicture, CameraType, FaceDetectionResult } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { styles } from "./styles"
import { MaterialCommunityIcons, FontAwesome, AntDesign } from '@expo/vector-icons';
import { colors } from '../../styles/colors';
import { ComponentButtonInterface } from '../../components';
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import * as FaceDetector from 'expo-face-detector'
import { BarCodeScanner, BarCodeScannerResult } from 'expo-barcode-scanner';

export function CameraScreen() {
  const [type, setType] = useState(CameraType.back);
  const [permissionCamera, requestPermissionCamera] = Camera.useCameraPermissions();
  const [permissionMedia, requestPermissionMedia] = MediaLibrary.usePermissions();
  const [photo, setPhoto] = useState<CameraCapturedPicture | ImagePicker.ImagePickerAsset>();
  const ref = useRef<Camera>(null)
  const [permissionQrCode, requestPermissionQrCode] = BarCodeScanner.usePermissions();
  const [scanned, setScanned] = useState(false);
  const [face, setFace] = useState<FaceDetector.FaceFeature>()

  if (!permissionCamera || !permissionMedia || !permissionQrCode) {
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

  if (!permissionMedia.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to save the image</Text>
        <Button onPress={requestPermissionMedia} title="grant permission" />
      </View>
    );
  }

  if (!permissionQrCode.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to open QrCode</Text>
        <Button onPress={requestPermissionMedia} title="grant permission" />
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

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    alert(data);
  }

  const handleFacesDetected = ({ faces }: FaceDetectionResult): void => {
    if (faces.length > 0) {
      const FaceDetect = faces[0] as FaceDetector.FaceFeature
      setFace(FaceDetect)
    } else {
      setFace(undefined)
    }
  }

  return (
    <View style={styles.container}>
      {photo && photo.uri ? (
        <>
          <View style={styles.showphoto}>
            <TouchableOpacity onPress={() => setPhoto(undefined)} style={styles.voltar}>
              <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
            <Image source={{ uri: photo.uri }} style={styles.img} />
            <ComponentButtonInterface title='Salvar imagem' type='secondary' onPressI={savePhoto} />
          </View>
        </>
      ) : (
        <View style={styles.container}>
          <Camera style={styles.camera} type={type} ref={ref}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            onFacesDetected={handleFacesDetected}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.accurate,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
              runClassifications: FaceDetector.FaceDetectorClassifications.all,
              minDetectionInterval: 1000,
              tracking: true,
            }}>
            <View style={styles.icons}>
              <TouchableOpacity onPress={takePicture} >
                <FontAwesome name="circle" size={60} color="white" />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleCameraType} >
                <MaterialCommunityIcons name="camera-retake" size={50} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
          <View>
            {face && face.smilingProbability && face.smilingProbability > 0.5 ? (
              <Text>SORRINDO</Text>
            ) : (
              <Text>NÃO</Text>
            )}
          </View>
          <ComponentButtonInterface title='Abrir imagem' type='secondary' onPressI={pickImage} />
          {scanned && (
            <ComponentButtonInterface title='Scanear novamente' type='secondary' onPressI={() => setScanned(false)} />
          )}
        </View>
      )}
    </View>
  );
}