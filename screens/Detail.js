import React from 'react'
import { View, Image, SafeAreaView, StatusBar, DeviceEventEmitter } from 'react-native';
import { Text, Button, Chip, Card, ActivityIndicator, DataTable, Colors } from 'react-native-paper'
import Animated from 'react-native-reanimated';
import { Circle, Svg } from 'react-native-svg'

import { SIZES, COLORS } from '../constants';
import { BriefContent, ProgresiveImage, BtnLikes } from '../components'
import { ScrollView } from 'react-native-gesture-handler';
import { getPropertyStatus } from '../utils/utils'
import { api_getPropertyDetail } from '../api/property'
import MapLoc from './MapLoc'

const Detail = ({ route, navigation }) => {
	const [pageNum, setPageNum] = React.useState(1)
	const [loading, setLoading] = React.useState(true)
	const [itemDetail, setItemDetail] = React.useState({})
	const item = route.params.item

	React.useEffect(() => {
		console.log("Detail -> useEffect init")
		setLoading(true)
		api_getPropertyDetail(itemDetailCallback, item.id)
	}, [])
    React.useEffect(() => {
        navigation.addListener('beforeRemove', () => {
			console.log("Detail -> useEffect add navigation listener")
			DeviceEventEmitter.emit(`BtnLikes.${item.id}.event.press`)
		})

		return () => {
			console.log("Detail -> useEffect remove navigation listener")
			navigation.removeListener('beforeRemove')
		}
    }
    ,[navigation])

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
				<View
					style={{
						top: -15,
						right: -15,
						position: "absolute",
						zIndex: 3
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
									<ProgresiveImage url={item.url} />
								</View>
							)
						})
					}
				</Animated.ScrollView>
				<Chip
					style={{
						flex: 1,
						position: "absolute",
						width: 70,
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
					{itemDetail.lantai &&
						<DataTable.Row>
							<DataTable.Cell>Jumlah Lantai</DataTable.Cell>
							<DataTable.Cell>
								<Text style={{ color: COLORS.darkgray }}>
									{itemDetail.lantai}
								</Text>
							</DataTable.Cell>
						</DataTable.Row>
					}
					{itemDetail.certificate &&
						<DataTable.Row>
							<DataTable.Cell>Sertifikat</DataTable.Cell>
							<DataTable.Cell>
								<Text style={{ color: COLORS.darkgray }} >
									{itemDetail.certificate}
								</Text>
							</DataTable.Cell>
						</DataTable.Row>
					}
					{itemDetail.status &&
						<DataTable.Row>
							<DataTable.Cell>Status</DataTable.Cell>
							<DataTable.Cell>
								<Text style={{ color: COLORS.darkgray }} >
									{getPropertyStatus(itemDetail.status)}
								</Text>
							</DataTable.Cell>
						</DataTable.Row>
					}
					{itemDetail.condition &&
						<DataTable.Row>
							<DataTable.Cell>Kondisi</DataTable.Cell>
							<DataTable.Cell>
								<Text style={{ color: COLORS.darkgray }} >
									{itemDetail.condition}
								</Text>
							</DataTable.Cell>
						</DataTable.Row>
					}
				</DataTable>
			</Card>
		)
	}
	function renderMap() {
		return (
			<MapLoc address={itemDetail.address} />
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