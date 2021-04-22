import AsyncStorage from '@react-native-async-storage/async-storage'

export function extractPropertyArea(raw) {
    // console.log("raw",raw)
    var regExp = RegExp("\\d+")
    return raw.match(regExp)
    // console.log("extract",raw.match(regExp))
}

export function getPropertyType(raw) {
    var property_type
    if (raw === 'RM') {
        property_type = 'Rumah'
    }
    else if (raw === 'AP') {
        property_type = 'Apartement'
    }
    else if (raw === 'TN') {
        property_type = 'Tanah'
    }

    return property_type
}

export function getPropertyStatus(raw) {
    var property_status
    if (raw === 'SW') {
        property_status = 'Sewa'
    }
    else if (raw === 'JL') {
        property_status = 'Jual'
    }

    return property_status
}

export const fetchData = async (key) => {
    console.log("fetchData -> item key",key)
    var value = undefined
    try {
        value = await AsyncStorage.getItem(key)
        if(value !== null) {
            // console.log("fetchData -> item fetched",value)
            return JSON.parse(value)
        }
    }
    catch (error) {
        console.log("fetchData -> error fetching item key",key,"with error",error)
    }   
    return value
}
export const storeData = async (key, value) => {
    console.log("storeData -> item key",key)
    // console.log("storeData -> item value",value)
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key,jsonValue)
        console.log("storeData -> item saved")
    }
    catch (error) {
        console.log("storeData -> error store item key",key,"with error",error)
    }   
}
export const removeData = async (key) => {
    console.log("removeData -> key",key)
    try {
        await AsyncStorage.removeItem(key)
    } 
    catch (error) {
        console.log("removeData -> error remove item key",key,"with error",error)
    }
}
