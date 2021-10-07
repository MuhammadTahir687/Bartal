import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerItemList} from "@react-navigation/drawer";
import { DrawerActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text,View,ImageBackground,Image,SafeAreaView,StyleSheet} from "react-native";
import { Avatar,icon,Header } from 'react-native-elements';
import login from "./src/login";
import register from "./src/register";
import seller from "./src/seller";

const Stack = createStackNavigator();
const Toptab=createMaterialTopTabNavigator();
const Tab=createBottomTabNavigator();
const Drawer=createDrawerNavigator();



function Hom(){
    return(
        <View style={{flex:1,alignItems:"center",justifyContent:"center"}}>
            <Text>Home</Text>

        </View>

    );
}
// function Home(){
//
//     return (
//
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//             tabBarIcon: ({ focused, color, size }) => {
//                 let iconName;
//                 if (route.name === 'Home') {
//                     iconName = focused
//                         ? 'home'
//                         : 'home-outline';
//                 } else if (route.name === 'Account') {
//                     iconName = focused ? 'person-circle' : 'person-circle-outline';
//                 }
//                 // You can return any component that you like here!
//                 return <Ionicons name={iconName} size={size} color={color} />;
//             },
//         })}tabBarOptions={{activeTintColor: 'orangered',
//             inactiveTintColor: 'black',}}>
//             <Tab.Screen name="Home" component={Homes}/>
//             {/*<Tab.Screen name="Account" component={login}/>*/}
//             <Tab.Screen name="Account">
//                 {() => (
//                     <Stack.Navigator>
//                         <Stack.Screen name="Account" options={{header:()=>null}} component={login} />
//
//                     </Stack.Navigator>
//                 )}
//             </Tab.Screen>
//
//         </Tab.Navigator>
//
//     );
// }
function Splash({navigation}){


    setTimeout(()=>
        {
            navigation.replace('Hom');
        },3000);

    return(
        <ImageBackground source={require('./src/Images/orange.jpg')} style={{height:'100%',width:'100%'}}>

                <Image source={require('./src/Images/Bartal.png')} style={{width:250,height:200,marginTop:'50%',marginLeft:'16%',borderRadius:40}}/>

        </ImageBackground>
    );
}


function drawers({navigation}){
    return(

            <Drawer.Navigator

                drawerContent={(props)=>{
                return(
                    <SafeAreaView>
                            <View>
                                <Image source={require('./src/Images/Bartal.png')} style={styles.drawerimage}/>
                            </View>
                        <DrawerItemList {...props}/>
                    </SafeAreaView>

                )
            }
            }

               >
                <Drawer.Screen name="Home" options={{
                    drawerIcon:({focused,size})=>(
                        <Ionicons name="home" color="orangered" size={20} />
                    )
                }}
                               component={Hom} />
                <Drawer.Screen name="Seller" options={{
                                   drawerIcon:({focused,size})=>(
                                       <Ionicons name="people" color="orangered" size={20} />
                                   )
                               }}
                               component={seller} />
            </Drawer.Navigator>
        )
}

export default function App() {


        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({route}) => ({
                        tabBarIcon: ({focused, color, size}) => {
                            let iconName;

                            if (route.name === 'Home') {
                                iconName = focused
                                    ? 'home'
                                    : 'home-outline';
                            } else if (route.name === 'Account') {
                                iconName = focused ? 'person-circle' : 'person-circle-outline';

                            }

                            // You can return any component that you like here!
                            return <Ionicons name={iconName} size={size} color={color}/>;
                        },
                    })}

                    tabBarOptions={{activeTintColor: 'orangered', inactiveTintColor: 'black'}}>
                    <Tab.Screen name="Home">
                        {({navigation}) => (
                            <Stack.Navigator mode="modal">
                                <Stack.Screen name="Splash" options={{header: () => null}} component={Splash}/>
                                <Stack.Screen name="Hom"
                                              options={{
                                                  title:"Home",
                                    headerShown:true,
                                    headerTintColor: "orangered",
                                    headerLeft:()=>(
                                        <Ionicons name="menu-outline" color="orangered" size={30} style={{marginLeft:15}}
                                                  onPress={() => {navigation.dispatch(DrawerActions.toggleDrawer());}}
                                        />

                                        )
                                }}
                                              component={drawers}/>
                            </Stack.Navigator>
                        )}
                    </Tab.Screen>

                    <Tab.Screen name="Account">
                        {() => (
                            <Stack.Navigator screenOptions={{headerTintColor: "orangered"}}>
                                <Stack.Screen name="Login" options={{
                                    headerShown:false
                                }} component={login}/>
                                <Stack.Screen name="register" options={{headerTitle: "Sign Up"}} component={register}/>
                            </Stack.Navigator>
                        )}
                    </Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>

        );
    }
    const styles=StyleSheet.create({

        drawerimage:{
            marginLeft:"20%",
            height:150,
            width:150
        }
    })

