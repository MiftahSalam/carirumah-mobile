import React, { useMemo } from 'react'
import { 
    View, 
    Image, 
    SafeAreaView, 
    FlatList, 
    StatusBar,
} from 'react-native'
import { Text, Chip, Card, Provider, Menu, IconButton } from 'react-native-paper'
import { Svg, Circle } from 'react-native-svg'

import { api_getPropertyList } from '../api/property'
import { BriefContent, ProgresiveImage, BtnLikes } from '../components'
import { SIZES } from '../constants'

const HomeList = props => {
    const currentItems = props.items
    const navigation = props.navigation
    const loading = props.loading
    const noItemData = [{ "property_name": "No item" },]

    // console.log("HomeList -> props", currentItems)
    function renderHomeList() {
        const renderItems = ({ item }) => {
            return (
                <View>
                    { item.property_name === "No item" ?
                        <Card
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                marginBottom: 10,
                            }}
                        >
                            <Text style={{ textAlign: "center" }} >No item</Text>
                            {console.log("Home -> renderHomeList -> renderItems -> no item")}
                        </Card> :
                        <Card
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                marginBottom: 10
                            }}
                            onPress={() => navigation.navigate('Detail', { "item": item })}
                        >
                            <View 
                                style={{ 
                                    top: -15,
                                    right: -15,
                                    position: "absolute",
                                    zIndex: 2 
                                }}>
                                    <BtnLikes homeItem={item} />
                            </View>
                            <Svg
                                height="70"
                                width="70"
                                style={{
                                    position: 'absolute',
                                    right: 0,
                                    top: 0,
                                    zIndex: 1
                                }}
                            >
                                <Circle cx="70" cy="0" r="35" fill="white" />
                            </Svg>
                            <ProgresiveImage url={item.image_link?.url} />
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: "white",
                                    flex: 1,
                                    position: "absolute",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    left: 10,
                                    top: 170,
                                    backgroundColor: "transparent",
                                    fontWeight: "bold"
                                }}
                            >{item.price}
                            </Text>
                            <BriefContent
                                homeItem={item} showMenu={true}
                            />
                        </Card>
                    }
                </View>
            )
        }

        return (
            <FlatList
                data={currentItems.length === 0 ? noItemData : currentItems}
                renderItem={renderItems}
                keyExtractor={(item) => item.property_name}
                style={{
                    margin: 10,
                    marginBottom: SIZES.BOTTOM_TAB_MARGIN - 60
                }}
                showsVerticalScrollIndicator={false}
                refreshing={loading}
                extraData={currentItems}
                onRefresh={props.onRefresh ? () => props.onRefresh() : () => { }}
                onEndReached={props.onEndPage ? () => props.onEndPage() : () => { }}
                onEndReachedThreshold={0.1}
            />
        )
    }

    return (
        // <Provider>
            <SafeAreaView>
                {renderHomeList()}
            </SafeAreaView>
        // </Provider>  
    )
}

export default HomeList;