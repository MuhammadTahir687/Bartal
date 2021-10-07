import * as React from "react";
import {View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, SafeAreaView} from "react-native";
import {Avatar, icon} from "react-native-elements";
import {useState, useEffect} from 'react';
import {Input} from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/FontAwesome';
import login from "./login";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import auth from '@react-native-firebase/auth';


// const instance = axios.create({
//     baseURL: "http://3181-119-160-64-117.ngrok.io",
//     timeout: 1000,
//     headers: {
//         Accept: 'application/json',
//         'Content-Type': 'multipart/form-data',
//         //Authorization:"Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiZDNlYmEyMDljNjMyMzI1YjA3OWJkMDcxYjQ5ZWYyNjFjNGU4YzNjMWY1OTIyMmNiNWUyZmQxMGJiNmNkNWVmZmI4Njc0NWVkODhkNTQwMzIiLCJpYXQiOjE2Mjg4NTI5ODEsIm5iZiI6MTYyODg1Mjk4MSwiZXhwIjoxNjYwMzg4OTgxLCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.mMm-6ZL2aO7TuthofUTmqj24HVGaI_IWG2-Vcu02hca3NkpMuuQuhVU_dFV-YUtK68OBNvYHbYo0Fl8Ptt56DuvvmafYEyfxk7mxkiYwAPo1e6G1pM33wqNK2lQh8I8Dy2PgGWaI1SgdNAks_05LLeXWaMY1jdYTwXnflkiaQybgVoDT0DakB5CGiRSqGrn5CUgWKG_xJaQLe0M7yHlNKSTMBvX6flinT8dxaxz3CdBr6fOTPjys5rVoqQMUcHqFpOrORjjGxn3iLxghRGg0A_T6Kjvfh8EHVZ0WPkNZHfFbZXMJmhSwX4wAN0f_Hyb8iAsgvrG6LFy1S2XI1HpkKRXSHf0xoFm2V2F39MP1oJVC-Hcs52Bn3WWA7sOqRlcaEWRWlvqtQVYv8sD23E5gF7BGNXccGP_u8z8jSOOslvlBTZ4sMES7Q_XHRoeSHnLZOXtPnjpPBBIDEMs37OKdhhmNxHU83yR7OqQViR2RJEtzvd0n8o0-rb3ew-TSeTsUuASbeXMeP1b7Ww2V_gbmfR4X3O9UflH-mgDjtrgHa85591AGqQ93yy0wROTmO2hF2dNd2l8cN_ZbQ1BEfo3jr13lZv4XVL5zei9mx-jzWBqdyNjOp8jz9eYeGTPsT5jrNx4-k3JfQkHgFns3xsYHRYjOLWN5vcH7p1dDrpxcRBo"
//     }
// });

export default function register({navigation}) {
    const [fname, setFname] = useState('');
    const [fnamevalidation, setFnamevalidation] = useState('');
    const [lname, setLname] = useState('');
    const [lnamevalidation, setLnamevalidation] = useState('');
    const [email, setEmail] = useState('');
    const [emailvalidation, setEmailvalidation] = useState('');
    const [phone, setPhone] = useState('');
    const [phonevalidation, setPhonevalidation] = useState('');
    const [password, setPassword] = useState('');
    const [passwordvalidation, setPasswordvalidation] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [confirmpasswordvalidation, setconfirmpasswordvalidation] = useState('');
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const [show1, setShow1] = useState(false);
    const [visible1, setVisible1] = useState(true);
    const [filePath, setFilePath] = useState([]);
    const [imageloading, setImageloading] = useState(true);
    const [errormsg, setErrormsg] = useState('');


    const Stack = createStackNavigator();

    const insertdata = async () => {

        let text = email;
        let regex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
        if (fname && lname && phone && email && password && confirmpassword != '') {
            if (regex.test(text) == true) {
                if (password == confirmpassword) {
                    auth()
                        .createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            Alert.alert(
                                'Success',
                                'You are Sign Up Successfully',
                                [
                                    {
                                        text: 'Ok',
                                        // onPress: () =>
                                        //     navigation.goBack(),
                                    },
                                ],
                                {cancelable: false},
                            );
                        })
                        .catch(error => {
                            if (error.code === 'auth/email-already-in-use') {
                                console.log('That email address is already in use!');
                                setErrormsg('That email address is already in use!')
                            }
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


                    // let body = {
                    //     fname: fname,
                    //     lname: lname,
                    //     email: email,
                    //     profile_image: filePath,
                    //     password: password,
                    //     appName: "Bartal"
                    // }
                    // console.log(body);
                    // try {
                    //     let response = await instance.post('/api/register', body);
                    //     console.log(response.data);
                    //     alert("success")
                    //
                    // } catch (error) {
                    //     alert("error")
                    //     console.log(error);
                    // }
                    // ;

                    //     const data={
                    //         Image:filePath.uri,
                    //         Email:email,
                    //         Contact:phone,
                    //         password:password
                    //     }
                    //  try {
                    //      await AsyncStorage.setItem("users",JSON.stringify(data))
                    //     } catch(error){
                    //      console.log(error)
                    //     }

                    //  try {
                    //     let userData = await AsyncStorage.getItem("users");
                    //     let data = JSON.parse(userData);
                    //     console.log("DATA=================",data.Email);
                    //   } catch (error) {
                    //     console.log("Something went wrong", error);
                    //   }
                    // Alert.alert(
                    //     'Success',
                    //     'You are registered successfully',
                    //     [
                    //         {
                    //             text: 'Ok',
                    //             // onPress: () =>navigation.goBack(),
                    //         },
                    //     ],
                    //     {cancelable: false},
                    // );
                } else {
                    setconfirmpasswordvalidation('Password Not Match');
                    setPasswordvalidation('Password Not Match');
                }
            } else {
                setEmailvalidation('Enter Correct Email');
            }
        } else {
            if (fname == '') {
                setFnamevalidation('Required*')
            }
            if (lname == '') {
                setLnamevalidation('Required*')
            }

            if (email == "") {
                setEmailvalidation('Required*');
            }
            if (phone == "") {
                setPhonevalidation('Required*');
            }
            if (password == "") {
                setPasswordvalidation('Required*');
            }
            if (confirmpassword == "") {
                setconfirmpasswordvalidation('Required*');
            }
        }
    }
    const fnamedvalidator = () => {
        if (fname == '') {
            setFnamevalidation('Required*');
        } else {
            setFnamevalidation('');
        }
    };
    const lnamedvalidator = () => {
        if (lname == '') {
            setLnamevalidation('Required*');
        } else {
            setLnamevalidation('');
        }
    };

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

    const phonevalidator = () => {
        if (phone == '') {
            setPhonevalidation('Required*');
        } else if (phone.length < 11) {

            setPhonevalidation('Your Contact must consist of 11 digits*');
        } else {
            setPhonevalidation('');
        }
    };
    const passwordvalidator = () => {
        if (password == '') {
            setPasswordvalidation('Required*');
        } else {
            setPasswordvalidation('');
        }
    };
    const confirmpasswordvalidator = () => {
        if (confirmpassword == '') {
            setconfirmpasswordvalidation('Required*');
        } else {
            setconfirmpasswordvalidation('');
        }
    };
    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log(response);


            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);

            // console.log('width -> ', response.width);
            // console.log('height -> ', response.height);
            // console.log('fileSize -> ', response.fileSize);
            // console.log('type -> ', response.type);
            // console.log('fileName -> ', response.fileName);
            setFilePath(response.assets[0]);
            setImageloading(false);
        });
    };


    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                {
                    imageloading ?
                        <Avatar
                            size="xlarge"
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            activeOpacity={0.7}
                            containerStyle={{marginLeft: "30%", marginTop: 10, backgroundColor: "orangered"}}
                            onPress={() => chooseFile('photo')}
                        /> :
                        <Avatar
                            size="xlarge"
                            rounded
                            icon={{name: 'user', type: 'font-awesome'}}
                            activeOpacity={0.7}
                            containerStyle={{marginLeft: "30%", marginTop: 10, backgroundColor: "orangered"}}
                            source={{uri: filePath.uri}}
                            onPress={() => chooseFile('photo')}
                        />
                }
                <Text style={styles.validatiomessage}>{errormsg}</Text>

                <View style={styles.input}>
                    <Ionicons name="person" color="orangered" size={25} style={{marginTop: '4%'}}/>
                    <TextInput placeholder={"First Name"} style={{width: "82%"}}
                               value={fname}
                               onChangeText={(text) => setFname(text)}
                               autoCapitalize={"none"}
                               onBlur={fnamedvalidator}
                    />
                </View>
                <Text style={styles.validatiomessage}>
                    {fnamevalidation}
                </Text>
                <View style={styles.input}>
                    <Ionicons name="person" color="orangered" size={25} style={{marginTop: '4%'}}/>
                    <TextInput placeholder={"Last Name"} style={{width: "82%"}}
                               value={lname}
                               onChangeText={(text) => setLname(text)}
                               autoCapitalize={"none"}
                               onBlur={lnamedvalidator}
                    />
                </View>
                <Text style={styles.validatiomessage}>
                    {lnamevalidation}
                </Text>
                <View style={styles.input}>
                    <Ionicons name="mail" color="orangered" size={25} style={{marginTop: '4%'}}/>
                    <TextInput placeholder={"Email"} style={{width: "82%"}}
                               value={email}
                               onChangeText={(text) => setEmail(text)}
                               autoCapitalize={"none"}
                               onBlur={emailvalidator}
                    />
                </View>
                <Text style={styles.validatiomessage}>
                    {emailvalidation}
                </Text>
                <View style={styles.input}>
                    <Ionicons name="call" color="orangered" size={25} style={{marginTop: '4%'}}/>
                    <TextInput placeholder={"Phone"} style={{width: "82%"}}
                               value={phone}
                               onChangeText={(text) => setPhone(text)}
                               onBlur={phonevalidator}
                               keyboardType='numeric'
                               minLength={11}
                               maxLength={11}
                    />
                </View>
                <Text style={styles.validatiomessage}>
                    {phonevalidation}
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
                        <Ionicons name={show === false ? "eye-outline" : "eye-off-outline"} color="orangered" size={26}
                                  style={{marginTop: '42%'}}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.validatiomessage}>
                    {passwordvalidation}
                </Text>

                <View style={styles.input}>
                    <Ionicons name="lock-closed" color="orangered" size={25} style={{marginTop: '4%'}}/>
                    <TextInput placeholder={"Confirm Password"} style={{width: "75%"}}
                               value={confirmpassword}
                               onChangeText={(text) => setConfirmpassword(text)}
                               secureTextEntry={visible1}
                               onBlur={confirmpasswordvalidator}
                    />
                    <TouchableOpacity
                        onPress={

                            () => {
                                setVisible1(!visible1)
                                setShow1(!show1)

                            }
                        }
                    >
                        <Ionicons name={show1 === false ? "eye-outline" : "eye-off-outline"} color="orangered" size={26}
                                  style={{marginTop: '42%'}}/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.validatiomessage}>
                    {confirmpasswordvalidation}
                </Text>

            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={insertdata}>
                <Text style={{color: "white", fontSize: 18}}>Sign Up</Text>
            </TouchableOpacity>

        </SafeAreaView>

    );
}
const styles = StyleSheet.create({

    input: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 50,
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: 7,
        backgroundColor: 'white',
        borderColor: "orangered",
        paddingLeft: "5%",
        flexDirection: "row"
    },
    button: {

        marginHorizontal: '32%',
        marginVertical: 10,
        borderRadius: 50,
        borderWidth: 1,
        paddingLeft: "8%",
        padding: '3%',
        textAlign: 'center',
        backgroundColor: "orangered",
        borderColor: 'transparent',
    },
    validatiomessage: {
        color: 'red',
        marginLeft: '12%',
        marginRight: 25,
    }


})
