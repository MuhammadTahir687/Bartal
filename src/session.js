import React from 'react';
import {View,Text} from 'react-native';
import { useState, useEffect } from "react";
import auth from '@react-native-firebase/auth';
import Logout from "./logout";
import Login from "./login";
import {useNavigation} from "@react-navigation/native";


export default function Session (){
    const [userdata,setUserdata]=useState('');
    const navigation = useNavigation();


    useEffect(()=>{
        auth()
            .onAuthStateChanged(user=>{
                if(user)
                {
                    console.log("User Sign in ======================",user)
                    navigation.navigate("Logout")

                }
                else {

                    console.log("user sign out")
                    navigation.navigate("Login")
                }
            })
    },[])

    return(
     <View></View>
    )
}

