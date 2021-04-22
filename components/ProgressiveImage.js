import React from 'react'
import { View, Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper'

import { SIZES } from '../constants';

const ProgresiveImage = ({ url }) => {
	const [loading, setLoading] = React.useState(true)

	return (
		<View style={{ height: 200 }}>
			<Image
				source={{ uri: url }}
				resizeMode="cover"
				onLoadStart={() => setLoading(true)}
				onLoadEnd={() => setLoading(false)}
				style={{
					width: SIZES.width,
					height: "100%",
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

export default ProgresiveImage;