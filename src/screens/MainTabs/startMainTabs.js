// in this component we will have navigation code to start tab based app
// use startTabBasedApp
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import { Platform } from 'react-native';
// Promise object is available in RN
// Promise.all takes an array of Promises and wait for all promises to resolve
// once they are resolved then() is executed

// to add side drawer we add drawer in startTabBasedApp 
// drawer contain key left, right (to determine position of drawer)
// we will have icon for drawer 
// we need to specify navigatorButtons in each tabs (FindPlaces, SharePlaces)
// if we dont write navigatorButton in any tab drawer wont be shown for that tab
// navigatorButtons -> helps u to specify any buttons u want in that tab screen
// leftButtons -> array of all the buttons we want to add
// leftButtons should have id property which determine which button is clicked
const startTabs = () => {
    Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? "md-map" : "ios-map", 30),           // Icon.getImageSource(icon_name, size)
        Icon.getImageSource(Platform.OS === 'android' ? "md-share" : "ios-share", 30),
        Icon.getImageSource(Platform.OS === 'android' ? "md-menu" :"ios-menu", 30)
    ]).then(sources => {
        Navigation.startTabBasedApp({
            tabs:[
                {
                    screen: "awesome-places.FindPlaceScreen",
                    title: "Find Place",
                    label: "Find Place",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "awesome-places.SharePlaceScreen",
                    title: "Share Place",
                    label: "Share Place",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[2],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                }
            ],
            // tabsStyle is used to style the tabs in app, see react-native-navigation DOCS
            tabsStyle: {
                tabBarSelectedButtonColor: "orange"
            },
            // to style tabs in android we need to use appStyle, see react-native-navigation DOCS
            appStyle: {
                tabBarSelectedButtonColor: "orange"
            },
            drawer: {
                left: {
                    screen: "awesome-places.SideDrawerScreen"
                }
            }
        })
    });
};

export default startTabs;
