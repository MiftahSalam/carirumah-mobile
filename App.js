import 'react-native-gesture-handler'
import React from "react";
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack'

import { Detail, Home, Description } from './screens'
import { BottomTabs } from './navigation'

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Beranda" screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Beranda" component={BottomTabs} />
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Detail" component={Detail} />
				<Stack.Screen name="Description" component={Description} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
