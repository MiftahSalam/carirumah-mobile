import React from 'react'
import { View, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import { icons } from '../constants'
import { api_getLocatioForward } from '../api/location'

const MapLoc = ({address}) => {
    const [mapRegion, setMapRegion] = React.useState({})
    console.log("MapLoc -> address props", address)

    React.useEffect(() => {
        api_getLocatioForward((data, status) => {
            console.log("MapLoc -> useEffect for currentLocation -> resp status", status)
            if(status == 200){
                try {
                    // console.log("MapLoc -> useEffect for currentLocation -> getPosition", data.data[0])
                    setMapRegion(cur_region => {
                        let new_region = {...cur_region}
                        new_region.latitude = data.data[0].latitude
                        new_region.longitude = data.data[0].longitude
                        new_region.latitudeDelta = 0.01
                        new_region.longitudeDelta = 0.01
                
                        return new_region
                    })                        
                } catch (error) {
                    console.error(error)
                }
            }
        },address)
    },[])
    return (
        <View style={{ margin: 10, flex: 1, width: "100%", height: 300 }}>
            {console.log("MapLoc -> return -> mapRegion",mapRegion)}
            { mapRegion.latitude &&
            <MapView
                style={{
                    flex: 1,
                }}
                provider={PROVIDER_GOOGLE}
                initialRegion={mapRegion}
            >
                <Marker
                    coordinate={{ latitude: mapRegion.latitude, longitude: mapRegion.longitude }}
                    flat={true}
                >
                    <Image
                        source={icons.pin}
                        style={{
                            width: 30,
                            height: 30,
                            tintColor: "red"
                        }}
                    />
                </Marker>
            </MapView>
            }
        </View>)
}

export default MapLoc