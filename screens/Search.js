import React from 'react'
import { View, StatusBar, SafeAreaView } from 'react-native';
import { Searchbar, Text } from 'react-native-paper'
import ButtonToggleGroup from 'react-native-button-toggle-group'
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import { GOOGLE_API_KEY, SIZES } from '../constants'
import { api_getPropertyBySearch } from '../api/property'
import { HomeList } from '../components'

const Search = ({ navigation }) => {
	const [toggleButtonValue, setToggleButtonValue] = React.useState("Jual")
	const [searchText, setSearchText] = React.useState('')
	const [items, setItems] = React.useState([])
    const [loading, setLoading] = React.useState(true)

	const onSearchChange = (query) => {
		setSearchText(query)
	}
	const onSearch = () => {
		setLoading(true)
		console.log("Search -> onSearch query", searchText)
		api_getPropertyBySearch(searchResult,searchText)
	}
	const searchResult = (data, status) => {
		console.log("Search -> searchResult status", status)
		if(status === 200){
			setItems(data)
		}
		setLoading(false)
	}
	function renderSearchBar() {
		return (
			<View style={{ backgroundColor: "rgb(41,127,184)" }}>
				<View style={{ marginTop: StatusBar.currentHeight, backgroundColor: "rgb(61,147,204)" }}>
					<View style={{ margin: 10, marginTop: 20 }}>
						<ButtonToggleGroup
							highlightBackgroundColor="rgb(41,127,184)"
							highlightTextColor={'white'}
							inactiveBackgroundColor="rgba(41,41,41,0.0)"
							inactiveTextColor={'black'}
							values={['Jual', 'Sewa']}
							onSelect={val => console.log(val)}
							value={toggleButtonValue}
							onSelect={(val) => setToggleButtonValue(val)}
							style={{ 
								borderWidth: 1, 
								borderColor: 'white', 
								borderRadius: 5, 
								marginBottom: 2, 
							}}
						/>
						<Searchbar 
							placeholder="Cari nama lokasi/property"
							value={searchText}
							onChangeText={onSearchChange}
							onIconPress={onSearch}
							onSubmitEditing={onSearch}
							inputStyle={{ fontSize: 15 }}
						/>
					</View>
				</View>
			</View>
		)
	}
	return (
		<SafeAreaView style={{ paddingBottom: SIZES.BOTTOM_TAB_MARGIN*2}}>
			{renderSearchBar()}
			{items.length === 0 || 
			<HomeList 
				navigation={navigation} 
				items={items} 
				loading={loading}
			/>}
		</SafeAreaView>
	)
}

export default Search;