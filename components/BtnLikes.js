import React from 'react'
import {
    IconButton,
} from 'react-native-paper'
import { View, DeviceEventEmitter } from 'react-native'

import { fetchData, storeData, removeData } from '../utils/utils'

const BtnLikes = ({ homeItem }) => {
    const curPropertyItem = homeItem
    const [savedItem, setSavedItem] = React.useState({})

    function pressEventListenerHandler() {
        console.log(`BtnLikes.${homeItem.id}.event.press callback`)
        fetchData(`@property_${curPropertyItem.id}`)
        .then(value => {
            if(value !== null) {
                console.log("BtnLikes useEffect -> init -> loaded",`@property_${curPropertyItem.id}`)
                setSavedItem(value)
            }
            else {
                setSavedItem({})
            }
        })
        .catch(error => {
            console.log("BtnLikes useEffect -> init -> fetchData error",error)
            setSavedItem({})
        })
    }
    React.useEffect(() => {
        console.log("BtnLikes useEffect -> init",curPropertyItem.id)
        fetchData(`@property_${curPropertyItem.id}`)
        .then(value => {
            if(value !== null) {
                console.log("BtnLikes useEffect -> init -> loaded",`@property_${curPropertyItem.id}`)
                // console.log("BtnLikes useEffect -> init -> fetchData",value)
                setSavedItem(value)
            }
        })
        .catch(error => console.log("BtnLikes useEffect -> init -> fetchData error",error))

        DeviceEventEmitter.addListener(`BtnLikes.${homeItem.id}.event.press`,pressEventListenerHandler)    

        return () => {
            console.log("BtnLikes cleanup",homeItem.id)
            DeviceEventEmitter.removeListener(`BtnLikes.${homeItem.id}.event.press`,pressEventListenerHandler)        
        }
    }
    ,[])
    function btnPressed() {
        console.log("BtnLikes pressed")
        if(savedItem.id === undefined) {
            storeData(`@property_${curPropertyItem.id}`,curPropertyItem)
            setSavedItem(curPropertyItem)
        } else {
            removeData(`@property_${savedItem.id}`)
            setSavedItem({})
        }
        DeviceEventEmitter.emit(`BtnLikes.${homeItem.id}.event.press`)
    }

    return (
        <>
            <IconButton 
                icon={savedItem.id ? 'heart' : 'heart-outline'}
                // icon='heart' 
                size={30}
                animated={true}
                color="rgb(61,147,204)"
                onPress={btnPressed}
            />
        </>
)
}

export default BtnLikes
