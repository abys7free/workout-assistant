import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import Assistant from "../screens/Assistant";
import Planner from "../screens/Planner";
import Records from "../screens/Records";

const Tab = createBottomTabNavigator();

const Tabs = () => {
	const theme = useTheme();

	return (
		<Tab.Navigator
			initialRouteName="Planner"
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.tabBarBgColor,
					height: 60,
				},
				tabBarActiveTintColor: theme.tabBarActiveTintColor,
				tabBarInactiveTintColor: theme.tabBarInactiveTintColor,
				headerStyle: {
					backgroundColor: theme.headerStyleBackgroundColor
				},
				headerTitleStyle: {
					color: theme.headerTitleStyleColor
				},
				tabBarIconStyle: {
					marginTop: 5,
					// marginBottom: -2.5,
				},
				tabBarLabelStyle: {
					// marginTop: -2.5,
					marginBottom: 5,
					fontSize: 12,
					fontWeight: '600'
				},
			}}
		>
			<Tab.Screen
				name="Planner"
				component={Planner}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return <Ionicons name={"list-outline"} size={size} color={color} />;
					},
				}}
			/>
			<Tab.Screen
				name="Assistant"
				component={Assistant}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<Ionicons name={"alarm-outline"} size={size} color={color} />
						);
					},
				}}
			/>
			<Tab.Screen
				name="Records"
				component={Records}
				options={{
					tabBarIcon: ({ focused, color, size }) => {
						return (
							<Ionicons name={"bar-chart-outline"} size={size} color={color} />
						);
					},
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
