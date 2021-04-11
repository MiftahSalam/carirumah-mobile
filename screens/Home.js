import React, {useMemo} from 'react'
import { View, Image, SafeAreaView, FlatList, StatusBar } from 'react-native'
import { Text, Chip, Card } from 'react-native-paper'

import { icons, SIZES } from '../constants'
import { api_getPropertyList } from '../api/property'
import { dummy_data } from '../dummy_data/json_raw _dummy'
import { BriefContent, HomeList } from '../components'

const Home = ({ navigation }) => {
    const [currentItems, setCurrentItems] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const noItemData = [{ "property_name": "No item" },]
    const [currentPage, setCurrentPage] = React.useState(1)

    React.useEffect(() => {
        requestHomeDataList()
    }, [])
    function renderHeader() {
        return (
            <View style={{ marginTop: StatusBar.currentHeight, marginBottom: 20 }}>
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
                                paddingTop: 50
                            }}
                        />
                    </View>
                    <Chip
                        style={{
                            flex: 1,
                            width: "95%",
                            height: 50,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    ><Text style={{ textAlign: "center" }} >Cilame, Bandung Barat</Text></Chip>
                </View>
            </View>
        )
    }
    function requestHomeDataList() {
        setLoading(true)
        api_getPropertyList(getCurrentItem, currentPage, is_ajax = true)
    }
    function getCurrentItem(data, status) {
        console.log("Home -> getCurrentItem -> status: ", status)
        if (status === 200) {
            setCurrentItems(prevItems => {
                return [...prevItems,...data]
            })
            setCurrentPage((prev_page) => {
                return prev_page + 1
            })
        }
        setLoading(false)
    }
    function onEndPage() {
        if(currentItems.length > 0) {
            requestHomeDataList()
        }
    }
    function renderHomeList() {
        return (
            <HomeList 
                navigation={navigation} 
                items={currentItems} 
                loading={loading}
                onRefresh={requestHomeDataList}
                onEndPage={onEndPage}
        />
        )
    }

    return (
        <SafeAreaView>
            {renderHeader()}
            {renderHomeList()}
        </SafeAreaView>
    )
}

export default Home;





// const Home = ({ navigation }) => {
//     const [currentItems, setCurrentItems] = React.useState([])
//     const [loading, setLoading] = React.useState(true)
//     const noItemData = [{ "property_name": "No item" },]
//     const [currentPage, setCurrentPage] = React.useState(1)

//     React.useEffect(() => {
//         requestHomeDataList()
//     }, [])
//     function renderHeader() {
//         return (
//             <View style={{ marginTop: StatusBar.currentHeight, marginBottom: 20 }}>
//                 <View style={{
//                     flex: 1,
//                     flexDirection: 'row',
//                     margin: 10,
//                     alignItems: "center",
//                 }}>
//                     <View
//                         style={{
//                             width: 50,
//                             height: 50,
//                             alignItems: "center",
//                         }}
//                     >
//                         <Image
//                             source={icons.location}
//                             resizeMode="contain"
//                             style={{
//                                 width: 40,
//                                 height: 40,
//                                 paddingTop: 50
//                             }}
//                         />
//                     </View>
//                     <Chip
//                         style={{
//                             flex: 1,
//                             width: "95%",
//                             height: 50,
//                             alignItems: "center",
//                             justifyContent: "center"
//                         }}
//                     ><Text style={{ textAlign: "center" }} >Cilame, Bandung Barat</Text></Chip>
//                 </View>
//             </View>
//         )
//     }
//     function requestHomeDataList() {
//         setLoading(true)
//         api_getPropertyList(getCurrentItem, currentPage, is_ajax = true)
//     }
//     function getCurrentItem(data, status) {
//         console.log("Home -> getCurrentItem -> status: ", status)
//         if (status === 200) {
//             setCurrentItems(prevItems => {
//                 return [...prevItems,...data]
//             })
//             setCurrentPage((prev_page) => {
//                 return prev_page + 1
//             })
//         }
//         setLoading(false)
//     }
//     function onEndPage() {
//         if(currentItems.length <= 0)
//             return
//         requestHomeDataList()
//     }
//     function renderHomeList() {
//         const renderItems = ({ item }) => {
//             // console.log("Home -> renderHomeList -> renderItems")
//             return (
//                 <View>
//                     { item.property_name === "No item" ?
//                         <Card
//                             style={{
//                                 flex: 1,
//                                 justifyContent: "center",
//                                 marginBottom: 10,
//                             }}
//                         >
//                             <Text style={{ textAlign: "center" }} >No item</Text>
//                             {console.log("Home -> renderHomeList -> renderItems -> no item")}
//                         </Card> :
//                         <Card
//                             style={{
//                                 flex: 1,
//                                 justifyContent: "center",
//                                 marginBottom: 10
//                             }}
//                             onPress={() => navigation.navigate('Detail', { "item": item })}
//                         >
//                             <Image
//                                 source={{ uri: item.image_link?.url }}
//                                 resizeMode="stretch"
//                                 style={{
//                                     width: "100%",
//                                     height: 200,
//                                 }}
//                             />
//                             <Text
//                                 style={{
//                                     textAlign: "center",
//                                     color: "white",
//                                     flex: 1,
//                                     position: "absolute",
//                                     alignItems: "center",
//                                     justifyContent: "center",
//                                     left: 10,
//                                     top: 170,
//                                     backgroundColor: "transparent",
//                                     fontWeight: "bold"
//                                 }}
//                             >{item.price}
//                             </Text>
//                             <BriefContent
//                                 homeItem={item}
//                             />
//                         </Card>
//                     }
//                 </View>
//             )
//         }

//         return (
//             <View>
//                 <FlatList
//                     // data={dummy_data}
//                     data={currentItems.length === 0 ? noItemData : currentItems}
//                     renderItem={renderItems}
//                     keyExtractor={(item) => item.property_name}
//                     style={{
//                         margin: 10,
//                         marginBottom: SIZES.BOTTOM_TAB_MARGIN,
//                     }}
//                     onRefresh={() => requestHomeDataList()}
//                     refreshing={loading}
//                     showsVerticalScrollIndicator={false}
//                     onEndReached={onEndPage}
//                     onEndReachedThreshold={0.1}
//                     extraData={currentItems}
//                 />
//             </View>
//         )
//     }

//     return (
//         <SafeAreaView>
//             {renderHeader()}
//             {renderHomeList()}
//         </SafeAreaView>
//     )
// }

// export default Home;