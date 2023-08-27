import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { FAB, Portal } from 'react-native-paper';
import LoadingScreen from '../../components/loading/LoadingScreen';
import SelectRoute from '../../components/routes/SelectRoutes';
import formattedRoutes from '../../components/routes/walkingRoutes';


export default function MapRoutes() {
    const [route, setRoute] = useState(0);
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [routeCoordinates, setRouteCoordinates] = useState([] as any[]);

    
    const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }: {open:any}) => setState({ open });

  const { open } = state;


const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };
  
  const parseRouteData = (routeData:any) => {
    const coordinates = routeData.map((point:any) => ({
      latitude: point.latitude,
      longitude: point.longitude,
    }));
    setRouteCoordinates(coordinates);
    
    setLoading(false);
  };
  
  const changeRoute = (newRoute:any) => {
    setRoute(newRoute);
    };
  
  useEffect(() => {
    getUserLocation();
  }, []);
  
  useEffect(() => {
    const routeData = formattedRoutes[route];
    parseRouteData(routeData.data);
  }, [route]);
  
  
  if(loading) return <LoadingScreen />
  return (
    <View style={{ flex: 1 }}>
        <SelectRoute onRouteSelect={changeRoute}/>
      {userLocation && (
        <MapView
          style={{ flex: 1 }}
          region={{
            latitude: routeCoordinates[0].latitude,
            longitude: routeCoordinates[0].longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            
          }}
        >
          <Polyline
            coordinates={routeCoordinates}
            strokeColor="red"
            strokeWidth={2}
            lineJoin="round"
            lineCap="round"
            geodesic={true}
          />
        </MapView>
      )}
      
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? 'account-key' : 'plus'}
          actions={[
            {
                icon: 'keyboard-backspace',
                label: 'Back',
                onPress: () => router.back(),
              },
            {
              icon: 'cloud-upload-outline',
              label: 'Upload',
              onPress: () => console.log('Uploading...'),
            },
            {
              icon: 'share-variant-outline', 
              label: 'Share',
              onPress: () => console.log('Sharing profile to interactions'),
            },
            {
              icon: 'access-point',
              label: 'Action',
              onPress: () => console.log('Pressed notifications'),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>

    </View>
    

  );
  
}


const oldRoutes = [
    {
        "route": "Route 1",
        "data": [
          {"latitude": 37.773972, "longitude": -122.431297, "timestamp": 1619378220},
          {"latitude": 37.773972, "longitude": -122.431297, "timestamp": 1619378230},
          {"latitude": 37.773972, "longitude": -122.431297, "timestamp": 1619378240},
          {"latitude": 37.773972, "longitude": -122.431297, "timestamp": 1619378250},
          {"latitude": 37.773972, "longitude": -122.431297, "timestamp": 1619378260},
          {"latitude": 37.774143, "longitude": -122.431364, "timestamp": 1619378270},
          {"latitude": 37.774229, "longitude": -122.431296, "timestamp": 1619378280},
          {"latitude": 37.774296, "longitude": -122.431223, "timestamp": 1619378290},
          {"latitude": 37.774366, "longitude": -122.431143, "timestamp": 1619378300},
          {"latitude": 37.774422, "longitude": -122.431058, "timestamp": 1619378310},
          {"latitude": 37.774470, "longitude": -122.430974, "timestamp": 1619378320},
          {"latitude": 37.774514, "longitude": -122.430887, "timestamp": 1619378330},
          {"latitude": 37.774557, "longitude": -122.430800, "timestamp": 1619378340},
          {"latitude": 37.774603, "longitude": -122.430710, "timestamp": 1619378350},
          {"latitude": 37.774649, "longitude": -122.430623, "timestamp": 1619378360},
          {"latitude": 37.774696, "longitude": -122.430536, "timestamp": 1619378370},
          {"latitude": 37.774738, "longitude": -122.430450, "timestamp": 1619378380},
          {"latitude": 37.774782, "longitude": -122.430365, "timestamp": 1619378390},
          {"latitude": 37.774824, "longitude": -122.430276, "timestamp": 1619378400},
          {"latitude": 37.774866, "longitude": -122.430187, "timestamp": 1619378410},
          {"latitude": 37.774909, "longitude": -122.430101, "timestamp": 1619378420},
          {"latitude": 37.774955, "longitude": -122.430018, "timestamp": 1619378430},
          {"latitude": 37.775001, "longitude": -122.429933, "timestamp": 1619378440}
        ]
    }, 
    {
        "route": "Route 2: New York",
        "data": [
            {"latitude": 40.748817, "longitude": -73.985428, "timestamp": 1621644300},
            {"latitude": 40.749008, "longitude": -73.985382, "timestamp": 1621644310},
            {"latitude": 40.749199, "longitude": -73.985329, "timestamp": 1621644320},
            {"latitude": 40.749390, "longitude": -73.985276, "timestamp": 1621644330},
            {"latitude": 40.749580, "longitude": -73.985223, "timestamp": 1621644340},
            {"latitude": 40.749771, "longitude": -73.985171, "timestamp": 1621644350},
            {"latitude": 40.749961, "longitude": -73.985118, "timestamp": 1621644360},
            {"latitude": 40.750152, "longitude": -73.985065, "timestamp": 1621644370},
            {"latitude": 40.750343, "longitude": -73.985012, "timestamp": 1621644380},
            {"latitude": 40.750533, "longitude": -73.984960, "timestamp": 1621644390},
            {"latitude": 40.750724, "longitude": -73.984907, "timestamp": 1621644400},
            {"latitude": 40.750915, "longitude": -73.984854, "timestamp": 1621644410},
            {"latitude": 40.751105, "longitude": -73.984802, "timestamp": 1621644420},
            {"latitude": 40.751296, "longitude": -73.984749, "timestamp": 1621644430},
            {"latitude": 40.751487, "longitude": -73.984696, "timestamp": 1621644440},
            {"latitude": 40.751677, "longitude": -73.984643, "timestamp": 1621644450},
            {"latitude": 40.751868, "longitude": -73.984591, "timestamp": 1621644460},
            {"latitude": 40.752059, "longitude": -73.984538, "timestamp": 1621644470},
            {"latitude": 40.752249, "longitude": -73.984485, "timestamp": 1621644480},
            {"latitude": 40.752440, "longitude": -73.984432, "timestamp": 1621644490},
            {"latitude": 40.752631, "longitude": -73.984379, "timestamp": 1621644500},
            {"latitude": 40.752821, "longitude": -73.984327, "timestamp": 1621644510},
            {"latitude": 40.753012, "longitude": -73.984274, "timestamp": 1621644520},
            {"latitude": 40.753202, "longitude": -73.984221, "timestamp": 1621644530},
            {"latitude": 40.753393, "longitude": -73.984168, "timestamp": 1621644540},
            {"latitude": 40.753584, "longitude": -73.984115, "timestamp": 1621644550},
            {"latitude": 40.753774, "longitude": -73.984062, "timestamp": 1621644560},
            {"latitude": 40.753965, "longitude": -73.984009, "timestamp": 1621644570},
            {"latitude": 40.754156, "longitude": -73.983956, "timestamp": 1621644580},
            {"latitude": 40.754346, "longitude": -73.983904, "timestamp": 1621644590},
            {"latitude": 40.754537, "longitude": -73.983851, "timestamp": 1621644600},
            {"latitude": 40.754728, "longitude": -73.983798, "timestamp": 1621644610},
            {"latitude": 40.754918, "longitude": -73.983745, "timestamp": 1621644620},
            {"latitude": 40.755109, "longitude": -73.983692, "timestamp": 1621644630},
            {"latitude": 40.755300, "longitude": -73.983639, "timestamp": 1621644640},
            {"latitude": 40.755490, "longitude": -73.983586, "timestamp": 1621644650},
            {"latitude": 40.755681, "longitude": -73.983533, "timestamp": 1621644660},
            {"latitude": 40.755872, "longitude": -73.983480, "timestamp": 1621644670},
            {"latitude": 40.756062, "longitude": -73.983428, "timestamp": 1621644680},
            {"latitude": 40.756253, "longitude": -73.983375, "timestamp": 1621644690},
            {"latitude": 40.756444, "longitude": -73.983322, "timestamp": 1621644700},
            {"latitude": 40.756634, "longitude": -73.983269, "timestamp": 1621644710},
            {"latitude": 40.756825, "longitude": -73.983216, "timestamp": 1621644720},
            {"latitude": 40.757016, "longitude": -73.983163, "timestamp": 1621644730},
            {"latitude": 40.757206, "longitude": -73.983111, "timestamp": 1621644740},
            {"latitude": 40.757397, "longitude": -73.983058, "timestamp": 1621644750},
            {"latitude": 40.757588, "longitude": -73.983005, "timestamp": 1621644760},
            {"latitude": 40.757778, "longitude": -73.982952, "timestamp": 1621644770},
            {"latitude": 40.757969, "longitude": -73.982899, "timestamp": 1621644780},
            {"latitude": 40.758160, "longitude": -73.982846, "timestamp": 1621644790},
            {"latitude": 40.758350, "longitude": -73.982793, "timestamp": 1621644800}
        ]
    }, 
    {
        "route": "Route 3: Hong Kong",
        "data": [
          {"latitude": 22.308506, "longitude": 114.168209, "timestamp": 1630873800},
          {"latitude": 22.308738, "longitude": 114.168376, "timestamp": 1630873810},
          {"latitude": 22.308970, "longitude": 114.168542, "timestamp": 1630873820},
          {"latitude": 22.309202, "longitude": 114.168709, "timestamp": 1630873830},
          {"latitude": 22.309433, "longitude": 114.168876, "timestamp": 1630873840},
          {"latitude": 22.309665, "longitude": 114.169043, "timestamp": 1630873850},
          {"latitude": 22.309896, "longitude": 114.169209, "timestamp": 1630873860},
          {"latitude": 22.310128, "longitude": 114.169376, "timestamp": 1630873870},
          {"latitude": 22.310359, "longitude": 114.169543, "timestamp": 1630873880},
          {"latitude": 22.310591, "longitude": 114.169710, "timestamp": 1630873890},
          {"latitude": 22.310822, "longitude": 114.169876, "timestamp": 1630873900},
          {"latitude": 22.311054, "longitude": 114.170043, "timestamp": 1630873910},
          {"latitude": 22.311286, "longitude": 114.170210, "timestamp": 1630873920},
          {"latitude": 22.311517, "longitude": 114.170376, "timestamp": 1630873930},
          {"latitude": 22.311749, "longitude": 114.170543, "timestamp": 1630873940},
          {"latitude": 22.311980, "longitude": 114.170710, "timestamp": 1630873950},
          {"latitude": 22.312212, "longitude": 114.170876, "timestamp": 1630873960},
          {"latitude": 22.312443, "longitude": 114.171043, "timestamp": 1630873970},
          {"latitude": 22.312675, "longitude": 114.171210, "timestamp": 1630873980},
          {"latitude": 22.312906, "longitude": 114.171376, "timestamp": 1630873990},
          {"latitude": 22.313138, "longitude": 114.171543, "timestamp": 1630874000},
          {"latitude": 22.313369, "longitude": 114.171710, "timestamp": 1630874010},
          {"latitude": 22.313601, "longitude": 114.171876, "timestamp": 1630874020},
          {"latitude": 22.313832, "longitude": 114.172043, "timestamp": 1630874030},
          {"latitude": 22.314064, "longitude": 114.172210, "timestamp": 1630874040},
          {"latitude": 22.314296, "longitude": 114.172376, "timestamp": 1630874050},
          {"latitude": 22.314527, "longitude": 114.172543, "timestamp": 1630874060},
          {"latitude": 22.314759, "longitude": 114.172710, "timestamp": 1630874070},
          {"latitude": 22.314990, "longitude": 114.172876, "timestamp": 1630874080}
        ]
    }
       
    
]