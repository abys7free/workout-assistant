// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
	export interface DefaultTheme {
		tabBarBgColor: string;
		tabBarTextColor: string;
		tabBarActiveTintColor: string;
		tabBarInactiveTintColor: string;
		headerStyleBackgroundColor: string;
		headerTitleStyleColor: string;
	}
}

// declare module 'styled-components/native' {
//   export interface DefaultTheme {
// 		tabBarBgColor: string;
// 		tabBarTextColor: string;
// 		tabBarActiveTintColor: string;
// 		tabBarInactiveTintColor: string;
// 		headerStyleBackgroundColor: string;
// 		headerTitleStyleColor: string;
//   }
// }
