import React from 'react'
import { View, Image } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import { icons } from '../constants'

const MapLoc = () => {
    const mapRegion = {
        latitude: -6.8499581,
        longitude: 107.5120987,
        latitudeDelta: 0.001,
        longitudeDelta: 0.005
    }
    console.log("MapLoc")

    return (
        <View style={{ margin: 10, flex: 1, width: "100%", height: 300 }}>
            <MapView
                style={{
                    flex: 1,
                }}
                provider={PROVIDER_GOOGLE}
                initialRegion={mapRegion}
            >
                <Marker
                    coordinate={{ latitude: -6.8499581, longitude: 107.5120987 }}
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
        </View>)
}

export default MapLoc