import * as React from "react";
import {View, Text, Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView} from "react-native";
import {useState, useEffect} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import auth, {firebase} from '@react-native-firebase/auth';

export default function Resetpassword() {
    const [email, setEmail] = useState('')
    const [currentpassword, setCurrentpassword] = useState('')
    const [newpassword, setNewpassword] = useState('')
    const [show, setShow] = useState(false);
    const [visible, setVisible] = useState(true);
    const [show1, setShow1] = useState(false);
    const [visible1, setVisible1] = useState(true);

    const reauthenticate = () => {
        var user = firebase.auth().currentUser;
        console.log("Reset Password for ", user)
        var cred = firebase.auth.EmailAuthProvider.credential(
            email, currentpassword);
        return user.reauthenticateWithCredential(cred);
    }
    const changePassword = () => {
        reauthenticate(currentpassword).then(() => {
            var user = firebase.auth().currentUser;
            console.log('hello')
            user.updatePassword(newpassword).then(() => {
                console.log("Password updated!");
                auth().signOut()
            }).catch((error) => {
               alert(error);
            });
        }).catch((error) => {
           alert(error);
        });
    }

    return (

        <SafeAreaView style={{flex: 1}}>
            <Image style={styles.Image} source={require('./Images/Bartal.png')}/>
            <View style={styles.input}>
                <Ionicons name="mail" color="orangered" size={25} style={{marginTop: '4%'}}/>
                <TextInput placeholder={"Email"} style={{width: "82%"}}
                           value={email}
                           autoCapitalize={"none"}
                           onChangeText={(text) => setEmail(text)}
                />
            </View>
            <Text style={styles.validatiomessage}>
            </Text>
            <View style={styles.input}>
                <Ionicons name="lock-closed" color="orangered" size={25} style={{marginTop: '4%'}}/>
                <TextInput placeholder={"Current Password"} style={{width: "75%"}}
                           value={currentpassword}
                           onChangeText={(text) => setCurrentpassword(text)}
                           secureTextEntry={visible}
                />
                <TouchableOpacity onPress={() => {
                    setVisible(!visible), setShow(!show)
                }}>
                    <Ionicons name={show === false ? "eye-outline" : "eye-off-outline"} color="orangered"
                              size={26}
                              style={{marginTop: '42%'}}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.validatiomessage}>
            </Text>
            <View style={styles.input}>
                <Ionicons name="lock-closed" color="orangered" size={25} style={{marginTop: '4%'}}/>
                <TextInput placeholder={"New Password"} style={{width: "75%"}}
                           value={newpassword}
                           onChangeText={(text) => setNewpassword(text)}
                           secureTextEntry={visible1}
                />
                <TouchableOpacity onPress={() => {
                    setVisible1(!visible1), setShow1(!show1)
                }}>
                    <Ionicons name={show1 === false ? "eye-outline" : "eye-off-outline"} color="orangered"
                              size={26}
                              style={{marginTop: '42%'}}/>
                </TouchableOpacity>
            </View>
            <Text style={styles.validatiomessage}></Text>
            <TouchableOpacity style={styles.button} onPress={() => {
                changePassword()
            }}>
                <Text style={{color: "white", fontSize: 18}}>Reset Password</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
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
        marginHorizontal: "20%",
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

        width: '50%',
        height: '28%',
        borderRadius: 20,
        marginLeft: "25%",
        marginTop: "5%",


    },
    icon: {
        width: 50,
        backgroundColor: "orangered"
    },
    validatiomessage: {
        color: 'red',
        marginLeft: '12%',
        marginRight: 25,
    }
})


