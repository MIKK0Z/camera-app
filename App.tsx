import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { useFonts } from 'expo-font';

import Splash from './components/Splash';
import Galery from './components/Gallery';
import CameraScreen from './components/CameraScreen';

import { RootStackParamList } from './RootStackParamList';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
	const [_fontsLoaded] = useFonts({
		'Material-Icons': require('./assets/fonts/material-icons-latin-400-normal.ttf'),
	});

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
						name='CameraScreen'
						component={CameraScreen}
						options={{
							headerStyle: {
								backgroundColor: 'cornflowerblue'
							},
							headerTitle: 'Camera',
							headerTintColor: '#fff',
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
