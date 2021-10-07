import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk'
import {useNavigation} from "@react-navigation/native";
import Login from "./login";

export default function Logout() {
    const navigation = useNavigation();
    const endsession =  () => {
            GoogleSignin.signOut();
            LoginManager.logOut();
            auth().signOut();
            navigation.navigate('Login');
    }
    return (
        <View>
            <View>
                <Image source={require('./Images/Bartal.png')} style={styles.Image}/>
            </View>
            <Text style={{textAlign: "center"}}>Welcome</Text>
            <TouchableOpacity style={styles.button} onPress={() => {endsession()}}>
                <Text style={{color: "white", fontSize: 18}}>Sign Out</Text>
            </TouchableOpacity>
            <View style={{alignItems: "center"}}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ResetPassword')
                }}>
                    <Text style={styles.button}>Forgot Pasword</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    button: {
        marginLeft: '32%',
        marginRight: '32%',
        marginTop: "1%",
        borderRadius: 50,
        borderWidth: 1,
        paddingLeft: '10%',
        padding: '3%',
        textAlign: 'center',
        backgroundColor: "orangered",
        borderColor: 'transparent',
    },
    Image: {
        width: 210,
        height: 210,
        borderRadius: 20,
        marginHorizontal: "20%",
        marginVertical: "10%",
    },
})
