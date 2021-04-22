import React from 'react'
import { 
    Card, 
    IconButton, 
    Menu, 
    Text, 
    Button, 
    Provider,
    Portal, 
    Modal,
} from 'react-native-paper'
import { Image, View } from 'react-native'
import { decode } from 'html-entities'

import { getPropertyType, extractPropertyArea } from '../utils/utils'
import { icons, COLORS } from '../constants'
// import BtnLikes from '../components/BtnLikes'
// import BtnMenu from './BtnMenu'

const BriefContent = ({ homeItem, showMenu }) => {
    return (
        // <Provider>
            <View
                style={{
                    margin: 10,
                }}
            >
                <Text style={{ fontWeight: "bold" }}>{homeItem.property_name}, {homeItem.address}</Text>
                <Text style={{ color: COLORS.darkgray }}>{homeItem.address}</Text>
                <Text style={{ color: COLORS.darkgray }}>{getPropertyType(homeItem.property_type)}</Text>
                <Text style={{ color: COLORS.darkgray }}>Luas Bangunan : {extractPropertyArea(homeItem.LB)} m{decode("\u00b2")} | Luas Tanah : {extractPropertyArea(homeItem.LT)} m{decode("\u00b2")}</Text>
                <View style={{ flexDirection: "row" }}>
                    <Image source={icons.bed} style={{ width: 20, height: 20 }} />
                    <Text style={{ color: COLORS.darkgray }}> {homeItem.KT}  </Text>
                    <Image source={icons.bath} style={{ width: 20, height: 20 }} />
                    <Text style={{ color: COLORS.darkgray }}> {homeItem.KM}  </Text>
                    <Image source={icons.car_port} style={{ width: 20, height: 20 }} />
                    <Text style={{ color: COLORS.darkgray }}> {homeItem.CP}  </Text>
                </View>
            </View>
        // </Provider>
    )
}

export default BriefContent
