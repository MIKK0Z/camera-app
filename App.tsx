import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import Splash from './components/Splash';
import Galery from './components/Gallery';
import Camera from './components/Camera';

import { RootStackParamList } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	return (
		<>
			<StatusBar />
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='Splash'
						component={Splash}
						options={{
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name='Galery'
						component={Galery}
						options={{
							headerStyle: {
								backgroundColor: 'cornflowerblue'
							},
							headerTitle: 'DCIM',
							headerTintColor: '#fff',
						}}
					/>
					<Stack.Screen
						name='Camera'
						component={Camera}	
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
