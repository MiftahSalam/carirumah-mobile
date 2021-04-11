import React from 'react'
import { View } from 'react-native';
import { Text, Card } from 'react-native-paper'

const Description = ({ route }) => {
    return (
        <View
            style={{
                margin: 10,
                marginTop: 30
            }}
        >
            <Card style={{ marginBottom: 10 }}>
                <Text style={{ margin: 10, fontWeight: "bold" }} >{route.params.item.property_name}</Text>
            </Card>
            <Card>
                <Text style={{ margin: 10 }} >{route.params.item.description}</Text>
            </Card>
        </View>
    )
}

export default Description;