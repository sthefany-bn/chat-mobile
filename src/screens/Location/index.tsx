import React, { useState, useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Region, Marker, Polyline } from 'react-native-maps';
import { styles } from './styles';
import { colors } from '../../styles/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import { API_GOOGLE } from '@env'

type ICoords = {
  latitude: number
  longitude: number
}

export function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [region, setRegion] = useState<Region>()
  const [marker, setMarker] = useState<Region[]>()
  const [coords, setCoords] = useState<ICoords[]>([])
  const [destination, setDestination] = useState<Region | null>(null)
  const mapRef = useRef<MapView>(null)

  useEffect(() => {
    let subscription: Location.LocationSubscription
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      })
      setMarker([
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005
        }
      ])
      subscription = await Location.watchPositionAsync({
        accuracy: Location.LocationAccuracy.High,
        timeInterval: 1000,
        distanceInterval: 1
      }, (location) => {
        setCoords((prevState) => [...prevState, location.coords])
      });
    })();

    return () => {
      if (subscription) {
        subscription.remove()
      }
    }
  }, []);

  async function handleDestination(data: GooglePlaceData, details: GooglePlaceDetail | null) {
    if (details) {
      setDestination({
        latitude: details?.geometry.location.lat,
        longitude: details?.geometry.location.lng,
        latitudeDelta: 0.004,
        longitudeDelta: 0.004
      })
      if (marker) {
        setMarker([...marker, {
          latitude: details?.geometry.location.lat,
          longitude: details?.geometry.location.lng,
          latitudeDelta: 0.004,
          longitudeDelta: 0.004
        }])
      }
    }
  }
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  } else if (destination) {
    text = JSON.stringify(destination);
  }

  return (
    <View style={styles.container}>
      {region ? (
        <>
          <GooglePlacesAutocomplete
            styles={{ container: styles.searchContainer, textInput: styles.searchInput }}
            placeholder="Para onde?"
            fetchDetails={true}
            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            enablePoweredByContainer={false}
            query={{
              key: API_GOOGLE,
              language: 'pt-BR'
            }}
            onFail={setErrorMsg}
            onPress={handleDestination}
          />
          <MapView ref={mapRef} style={styles.map} region={region} showsUserLocation={true}>
            {coords && <Polyline
              coordinates={coords}
              strokeColor={colors.black}
              strokeWidth={7}
            />}
            {marker && marker.map((i) => (
              <Marker key={i.latitude} coordinate={i}>
                <MaterialCommunityIcons name="map-marker" size={40} color="black" />
              </Marker>
            ))}
            {destination && (
              <MapViewDirections
                origin={region}
                destination={destination}
                apikey={API_GOOGLE}
                strokeColor={colors.black}
                strokeWidth={6}
                onReady={(result) => {
                  mapRef.current?.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      top: 24,
                      bottom: 24,
                      left: 24,
                      right: 24
                    }
                  })
                }}
              />
            )}
          </MapView>
        </>
      ) : (
        <Text style={styles.paragraph}>{text}</Text>
      )}
    </View>
  );
}