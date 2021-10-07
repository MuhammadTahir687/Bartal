import * as React from "react";
import {Text, View, TextInput, StyleSheet, TouchableOpacity, Button, Image, ScrollView, Alert} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {SocialIcon} from 'react-native-elements';
import register from "./register";
import Ionicons from "react-native-vector-icons/Ionicons";
import {useState, useEffect} from "react";
import auth from '@react-native-firebase/auth';
import {LoginManager, AccessToken} from 'react-native-fbsdk';
import onFacebookButtonPress from "./fb";
import onGoogleButtonPress from "./google";
import AsyncStorage from "@react-native-community/async-storage";
import PushNotification, {Importance} from 'react-native-push-notification';
import Logout from "./logout";
import {useNavigation} from "@react-navigation/native";

export default function Login({navigation}) {
    const [email, setEmail] = useState('tahir@yahoo.com');
    const [emailvalidation, setEmailvalidation] = useState('');
    const [password, setPassword] = useState('123456');
    const [passwordvalidation, setPasswordvalidation] = useState('');
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const [errormsg, setErrormsg] = useState('');
    const naviagtion = useNavigation();

    const insertdata = () => {
        let text = email;
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if (email && password != '') {
            if (regex.test(text) == true) {
                if (password.length >= 6) {
                    console.log("hello")
                    auth()
                        .signInWithEmailAndPassword(email, password)
                        .then(() => {
                            Alert.alert(
                                'Success',
                                'You are registered successfully',
                                [
                                    {
                                        text: 'Ok',
                                        onPress: () =>navigation.navigate('Logout'),
                                    },
                                ],
                                {cancelable: false},
                            );
                        })
                        .catch(error => {
                            if (error.code === 'auth/user-not-found') {
                                console.log('Sign Up First!');
                                setErrormsg('Sign Up First!')
                            }
                            if (error.code === 'auth/invalid-email') {
                                console.log('That email address is invalid!');
                                setErrormsg('That email address is invalid!')
                            }
                            if (error.code === 'auth/invalid-password') {
                                setErrormsg('That Password is invalid!')
                            }
                            setErrormsg(error)
                            console.error(error);
                        });
                } else {
                    setPasswordvalidation('Password must be atleast 6 alphabets');
                }
            } else {
                setEmailvalidation('Incorrect Email');
            }
        } else {

            setEmailvalidation('Required*');
            setPasswordvalidation('Required*');
        }
    }
    const emailvalidator = () => {
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if (email == '') {
            setEmailvalidation('Required*')
        } else if (regex.test(email) == false) {
            setEmailvalidation('Incorrect Email');
        } else (
            setEmailvalidation('')
        )
    };
    const passwordvalidator = () => {
        if (password == '') {
            setPasswordvalidation('Required*');
        } else if (password.length < 6) {
            setPasswordvalidation('Password must be atleast 6 alphabets');
        } else {
            setPasswordvalidation('')
        }
    };

    return (
        <View>
            <View style={styles.container}>
                <Image
                    style={styles.Image}
                    source={require('../src/Images/Bartal.png')}/>
                <Text style={styles.validatiomessage}>
                    {errormsg}
                </Text>
                <View style={styles.input}>
                    <Ionicons name="mail" color="orangered" size={25} style={{marginTop: '4%'}}/>
                    <TextInput placeholder={"Email"} style={{width: "82%"}}
                               value={email}
                               autoCapitalize={"none"}
                               onChangeText={(text) => setEmail(text)}
                               onBlur={emailvalidator}
                    />
                </View>
                <Text style={styles.validatiomessage}>
                    {emailvalidation}
                </Text>
                <View style={styles.input}>
                    <Ionicons name="lock-closed" color="orangered" size={25} style={{marginTop: '4%'}}/>
                    <TextInput placeholder={"Password"} style={{width: "75%"}}
                               value={password}
                               onChangeText={(text) => setPassword(text)}
                               secureTextEntry={visible}
                               onBlur={passwordvalidator}
                    />
                    <TouchableOpacity onPress={
                        () => {
                            setVisible(!visible)
                            setShow(!show)
                        }
                    }>
                        <Ionicons name={show === false ? "eye-outline" : "eye-off-outline"} color="orangered"
                                  size={26}
                                  style={{marginTop: '42%'}}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.validatiomessage}>
                    {passwordvalidation}
                </Text>
                <View style={{flexDirection: 'row', marginTop: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>No Existing Account ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('register')}>
                        <Text style={{color: 'red'}}>Sign Up </Text>
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: "center"}}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ResetPassword')
                    }}>
                        <Text style={styles.fg}>Forgot Pasword</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {/*<Button title="Log In" color="orangered" borderRadius='50'> </Button>*/}
                    <TouchableOpacity style={styles.button} onPress={insertdata}>
                        <Text style={{color: "white", fontSize: 18}}>Log In</Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{flexDirection: 'row', marginTop: "1%", justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity>
                        <SocialIcon
                            button
                            type='facebook'
                            style={styles.icon}
                            onPress={onFacebookButtonPress}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SocialIcon
                            button
                            type='google'
                            style={styles.icon}
                            onPress={onGoogleButtonPress}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <SocialIcon
                            button
                            type='twitter'
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderRadius: 50,
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: 10,
        backgroundColor: 'white',
        borderColor: "orangered",
        paddingLeft: "5%",
        flexDirection: "row"

    },
    container: {
        marginTop: 6,
        marginBottom: 0
    },
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
    text: {
        color: 'red'
    },
    Image: {
        width: '40%',
        height: '31%',
        alignItems: 'center',
        marginLeft: "30%",
        marginTop: "0%",
        borderRadius: 20,
        backgroundColor: 'transparent'

    },
    icon: {
        width: 50,
        backgroundColor: "orangered"
    },
    fg: {
        color: "orangered",
        textDecorationLine: "underline"
    },
    validatiomessage: {
        color: 'red',
        marginLeft: '12%',
        marginRight: 25,
    }
})
