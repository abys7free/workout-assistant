import React from "react";
import {
	createNativeStackNavigator,
	NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

const ScreenOne: React.FC<NativeStackScreenProps<any, "one">> = ({
	navigation: { navigate },
}) => (
	<TouchableOpacity>
		<Text>One</Text>
	</TouchableOpacity>
);
const ScreenTwo: React.FC<
	NativeStackScreenProps<any, "assistant-settings">
> = ({ navigation: { navigate } }) => {
	return (
		<TouchableOpacity
			onPress={() => navigate("Tabs", { screen: "Assistant" })}
			style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
		>
			<Text>two</Text>
		</TouchableOpacity>
	);
};
const ScreenThree: React.FC<NativeStackScreenProps<any, 'three'>> = ({ navigation: { navigate } }) => (
	<TouchableOpacity onPress={() => navigate("Tabs", { screen: "Assistant" })}>
		<Text>three</Text>
	</TouchableOpacity>
);

const NativeStack = createNativeStackNavigator();

const Stack = () => {
	return (
		<NativeStack.Navigator
			screenOptions={{
				headerBackButtonMenuEnabled: false,
				headerTintColor: "yellow",
				headerShown: false,
			}}
		>
			<NativeStack.Screen name="one" component={ScreenOne}></NativeStack.Screen>
			<NativeStack.Screen
				name="assistant-settings"
				options={{
					presentation: "modal",
				}}
				component={ScreenTwo}
			></NativeStack.Screen>
			<NativeStack.Screen
				name="three"
				component={ScreenThree}
				options={{
					presentation: "modal",
				}}
			></NativeStack.Screen>
		</NativeStack.Navigator>
	);
};

export default Stack;
