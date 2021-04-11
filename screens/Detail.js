import React from 'react'
import { View, Image, SafeAreaView, StatusBar } from 'react-native';
import { Text, Button, Chip, Card, ActivityIndicator, DataTable, Colors } from 'react-native-paper'
import Animated from 'react-native-reanimated';
import { SIZES, COLORS } from '../constants';

import { BriefContent } from '../components'
import { ScrollView } from 'react-native-gesture-handler';
import { getPropertyStatus } from '../utils/utils'
import { api_getPropertyDetail } from '../api/property'
import MapLoc from './MapLoc'

const ProgresiveImage = ({ url }) => {
	const [loading, setLoading] = React.useState(true)

	return (
		<View>
			<Image
				source={{ uri: url }}
				resizeMode="cover"
				onLoadStart={() => setLoading(true)}
				onLoadEnd={() => setLoading(false)}
				style={{
					width: SIZES.width,
					height: "100%"
				}}
			/>
			{/* {console.log("loading state: ", loading)} */}
			{loading &&
				<View
					style={{
						position: "absolute",
						left: 0,
						right: 0,
						top: 0,
						bottom: 0,
						opacity: 0.7,
						backgroundColor: "black",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<ActivityIndicator size="small" color="#FFD700" />
				</View>
			}
		</View>
	)
}

const Detail = ({ route, navigation }) => {
	const [pageNum, setPageNum] = React.useState(1)
    const [loading, setLoading] = React.useState(true)
	const [itemDetail, setItemDetail] = React.useState({})
	const item = route.params.item

	React.useEffect(() => {
		console.log("Detail -> useEffect")
		setLoading(true)
		api_getPropertyDetail(itemDetailCallback,item.id)
	},[])
	const itemDetailCallback = (data, status) => {
		console.log("Detail -> itemDetailCallback -> status: ", status)
        if (status === 200) {
            setItemDetail(data)
        }
        setLoading(false)
	}
	function calcImgViewPage(e) {
		let dimensions_width = e.nativeEvent.layoutMeasurement.width
		let pageNumber = Math.min(Math.max(Math.floor(e.nativeEvent.contentOffset.x / dimensions_width + 0.5) + 1, 0), itemDetail.images.length);

		setPageNum(pageNumber)
	}
	function renderContent() {
		console.log("Detail ->renderContent")
		return (
			<Card
				style={{
					margin: 10,
					// marginTop: 30
				}}
			>
				<Animated.ScrollView
					horizontal
					pagingEnabled
					scrollEventThrottle={16}
					snapToAlignment="center"
					showsHorizontalScrollIndicator={false}
					onMomentumScrollEnd={calcImgViewPage}
				>
					{
						itemDetail.images?.map((item, index) => {
							return (
								<View key={`image-${index}`} style={{ alignItem: "center" }}>
									<View style={{ height: 200 }}>
										<ProgresiveImage url={item.url} />
									</View>
								</View>
							)
						})
					}
				</Animated.ScrollView>
				<Chip
					style={{
						flex: 1,
						position: "absolute",
						width: 50,
						height: 20,
						alignItems: "center",
						justifyContent: "center",
						right: 10,
						top: 170,
						backgroundColor: "rgba(0,0,0,0.3)",
					}}
				>
					<Text style={{ textAlign: "center", color: "white" }} >{pageNum}/{itemDetail.images?.length}</Text>
				</Chip>
				<Text style={{ marginLeft: 10, marginTop: 5, fontWeight: "bold" }}>{itemDetail.price}</Text>
				<BriefContent homeItem={itemDetail} />
				<Text style={{ marginLeft: 10, color: COLORS.darkgray }}>Tanggal tayang: {itemDetail.publish_date}</Text>
				<Text style={{ marginLeft: 10, marginBottom: 5, color: COLORS.darkgray }}>Tanggal rilis: {itemDetail.release_date}</Text>
			</Card>
		)
	}
	function renderBriefDesctiption() {
		return (
			<Card
				style={{
					margin: 10,
					marginTop: 1
				}}
			>
				<Text style={{ margin: 10, fontWeight: "bold" }}>{itemDetail.property_name}, {itemDetail.address}</Text>
				<Text numberOfLines={5} style={{ marginLeft: 10, marginBottom: 5, color: COLORS.darkgray }}>{itemDetail.description}</Text>
				<Button
					color="rgb(7,129,196)"
					onPress={() => navigation.navigate("Description", { "item": itemDetail })}
				>BACA SELENGKAPNYA</Button>
			</Card>
		)
	}
	function renderInformation() {
		return (
			<Card
				style={{
					margin: 10,
					marginTop: 1
				}}
			>
				<Text style={{ margin: 10, fontWeight: "bold" }}>Informasi Property</Text>
				<DataTable
				>
					<DataTable.Row>
						<DataTable.Cell>Jumlah Lantai</DataTable.Cell>
						<DataTable.Cell><Text style={{ color: COLORS.darkgray }} >2</Text></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell>Sertifikat</DataTable.Cell>
						<DataTable.Cell><Text style={{ color: COLORS.darkgray }} >SHM</Text></DataTable.Cell>
					</DataTable.Row>
					<DataTable.Row>
						<DataTable.Cell>Status</DataTable.Cell>
						<DataTable.Cell><Text style={{ color: COLORS.darkgray }} >{getPropertyStatus(itemDetail.status)}</Text></DataTable.Cell>
					</DataTable.Row>
				</DataTable>

			</Card>
		)
	}
	function renderMap() {
		return (
			<MapLoc />
		)
	}
	return (
		<SafeAreaView >
			{ loading ? <ActivityIndicator animating={true} color={Colors.blue300} /> :  
			<ScrollView
				showsVerticalScrollIndicator={false}
			>
				{renderContent()}
				{renderBriefDesctiption()}
				{renderInformation()}
				{renderMap()}
			</ScrollView>
			}
		</SafeAreaView>
	)
}

export default Detail;