import { DrawerActions, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Login from "./login";
import register from "./register";
import { Avatar, icon, Header } from 'react-native-elements';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';

import * as React from "react";
import { useEffect } from "react";
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DrawerItemList } from "@react-navigation/drawer";
import sellproducts from "./seller";
import hom from './home';
import Resetpassword from './resetpassword';
import Logout from "./logout";
import Session from "./session";
import Cart from "./cart";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();


function getHeaderTitle(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';
    switch (routeName) {
        case 'Home':
            return 'Home';
        case 'Account':
            return 'Login';
        case 'register':
            return 'Sign Up';
    }
}

function Splash({ navigation }) {
    setTimeout(() => {
        navigation.replace('Home');
    }, 3000);

    return (
        <ImageBackground source={require('./Images/orange.jpg')} style={{ height: '100%', width: '100%' }}>

            <Image source={require('./Images/Bartal.png')}
                style={{ width: 250, height: 240, marginTop: '50%', marginLeft: '16%', borderRadius: 40 }} />

        </ImageBackground>
    );
}
function accounts() {
    <Stack.Navigator screenOptions={{ headerTintColor: "orangered", headerShown: false }}>
        <Stack.Screen name="Session" component={Session} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name='register' options={{ headerShown: false }} component={register} />
        <Stack.Screen name='ResetPassword' options={{ headerShown: false }} component={Resetpassword} />
    </Stack.Navigator>
}

function home() {
    return (

        <Tab.Navigator tabBarOptions={{ activeTintColor: 'orangered', inactiveTintColor: 'black' }}
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'home'
                                : 'home-outline';
                        } else if (route.name === 'Account') {
                            iconName = focused ? 'person-circle' : 'person-circle-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}>

            <Tab.Screen name='Home' options={{ headerShown: false }} component={hom} />
            <Tab.Screen name='Account' options={{ headerShown: false }}>
                {() => (
                    <Stack.Navigator screenOptions={{ headerTintColor: "orangered", headerShown: false }}>
                        <Stack.Screen name="Session" component={Session} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Logout" component={Logout} />
                        <Stack.Screen name='register' options={{ headerShown: false }} component={register} />
                        <Stack.Screen name='ResetPassword' options={{ headerShown: false }} component={Resetpassword} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>

        </Tab.Navigator>

    )
}

function Stacked({ navigation }) {
    return (
        <Stack.Navigator screenOptions={{ headerTintColor: "orangered" }}>
            <Stack.Screen name="Splash" options={{ header: () => null }} component={Splash} />
            <Stack.Screen name="Home" options={({ route }) => ({
                headerTitle: getHeaderTitle(route),
                headerLeft: () => (
                    <Ionicons name="menu-outline" color="orangered" size={30} style={{ marginLeft: 15 }}
                        onPress={() => {
                            navigation.dispatch(DrawerActions.toggleDrawer());
                        }}
                    />
                )
            })} component={home} />


        </Stack.Navigator>
    )
}

export default function rough() {

    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContent={(props) => {
                    return (
                        <SafeAreaView>
                            <View>
                                <Image source={require('./Images/Bartal.png')} style={styles.drawerimage} />
                            </View>
                            <DrawerItemList {...props} />
                        </SafeAreaView>
                    )
                }
                }
            >
                <Drawer.Screen
                    name="Home"
                    options={{
                        headerShown: false,
                        drawerIcon: ({ focused, size }) => (<Ionicons name="home" color="orangered" size={20} />)
                    }}
                    component={Stacked}
                />

                <Drawer.Screen
                    name="Sell Products"
                    options={{
                        headerShown: false,
                        drawerIcon: ({ focused, size }) => (<Ionicons name="people" color="orangered" size={20} />)
                    }} component={sellproducts}
                />
                
                <Drawer.Screen
                    name="Cart"
                    options={{
                        headerShown: false,
                        drawerIcon: ({ focused, size }) => (<Ionicons name="cart" color="orangered" size={20} />)
                    }} component={Cart}
                />

            </Drawer.Navigator>

        </NavigationContainer>
    );

}
const styles = StyleSheet.create({

    drawerimage: {
        marginLeft: "20%",
        height: 150,
        width: 150
    }
})


