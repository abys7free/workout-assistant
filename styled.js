import * as styledComponents from "styled-components/native";

const YELLOW_COLOR = "#ffc048";
const BLACK_COLOR = "#1e272e";
const LIGHT_GRAY_COLOR = "#d2dae2";
const DARK_GRAY_COLOR = "#485460";

export const lightTheme = {
	tabBarBgColor: "white",
	tabBarTextColor: BLACK_COLOR,
	tabBarActiveTintColor: BLACK_COLOR,
	tabBarInactiveTintColor: LIGHT_GRAY_COLOR,
	headerStyleBackgroundColor: "white",
	headerTitleStyleColor: BLACK_COLOR,
};

export const darkTheme = {
	tabBarBgColor: BLACK_COLOR,
	tabBarTextColor: DARK_GRAY_COLOR,
	tabBarActiveTintColor: YELLOW_COLOR,
	tabBarInactiveTintColor: DARK_GRAY_COLOR,
	headerStyleBackgroundColor: BLACK_COLOR,
	headerTitleStyleColor: "white",
};
