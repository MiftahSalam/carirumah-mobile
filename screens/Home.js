import React from 'react'
import { View, Image, SafeAreaView, FlatList, StatusBar } from 'react-native'
import { Text, Card } from 'react-native-paper'
import { api_getPropertyList } from '../api/property'
import { dummy_data } from '../dummy_data/json_raw _dummy'
import { BriefContent, HomeList, HomeHeader } from '../components'

const Home = ({ navigation }) => {
    const [currentItems, setCurrentItems] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)
    const [loading, setLoading] = React.useState(true)
    const noItemData = [{ "property_name": "No item" },]

    React.useEffect(() => {
        requestHomeDataList();
    }, [])
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
        <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
            <HomeHeader />
            {renderHomeList()}
        </SafeAreaView>
    )
}

export default Home;