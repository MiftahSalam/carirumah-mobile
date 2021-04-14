import React from 'react'
import { View, Image, StatusBar } from 'react-native'
import { Text, Chip } from 'react-native-paper'
import GeoLocation from 'react-native-get-location'
import { icons, SIZES } from '../constants'
import { api_getLocationReverse } from '../api/location'

const HomeHeader = () => {
    const [currentPosition, setCurrentPosition] = React.useState({})
    const [currentLocation, setCurrentLocation] = React.useState("")

    React.useEffect(() => {
        getLocation()
    }, [])
    React.useEffect(() =>{
        if(currentPosition.appendPosition !== undefined){
            api_getLocationReverse((data, status) => {
                console.log("HomeHeader -> useEffect for currentPosition -> resp status", status)
                if(status == 200){
                    console.log("HomeHeader -> useEffect for currentPosition -> getLocation", data.data[0].label)
                    setCurrentLocation(data.data[0].label)
                }
            },currentPosition.appendPosition)
        }
    },[currentPosition])
    async function getLocation() {
        GeoLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000
        })
        .then(location => {
            console.log("HomeHeader -> getCurrentPosition location",location)
            setCurrentPosition({
                latitude: location.latitude,
                longitude: location.longitude,
                appendPosition: location.latitude.toString()+","+location.longitude.toString()
            })
            console.log("HomeHeader -> setCurrentPosition append",appendPosition)
        })
        .catch(error => {
            const { code, message } = error
            console.warn("HomeHeader -> getCurrentPosition error",code,message)
        })    
    }

    return (
            <View style={{ marginBottom: 20 }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    margin: 10,
                    alignItems: "center",
                }}>
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            alignItems: "center",
                        }}
                    >
                        <Image
                            source={icons.location}
                            resizeMode="contain"
                            style={{
                                width: 40,
                                height: 40,
                                paddingTop: 50,
                                tintColor: "rgb(61,147,204)"
                            }}
                            
                        />
                    </View>
                    <Chip
                        style={{
                            flex: 1,
                            width: "95%",
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: 'lightgrey'
                        }}
                    ><Text style={{ textAlign: "center" }} >{currentLocation}</Text></Chip>
                </View>
            </View>
        )
}

export default HomeHeader;