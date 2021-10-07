
import React, {useState} from 'react';

import Modal from 'react-native-modal';

// Import required components
import {SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity, Image, Platform, PermissionsAndroid, ScrollView
} from 'react-native';

// Import Image Picker
// import ImagePicker from 'react-native-image-picker';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';

export default function App() {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const [filePath, setFilePath] = useState({});

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };

    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    const captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            videoQuality: 'low',
            durationLimit: 30, //Video max duration in seconds
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                console.log('Response = ', response);

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
                console.log('width -> ', response.width);
                console.log('height -> ', response.height);
                console.log('fileSize -> ', response.fileSize);
                console.log('type -> ', response.type);
                console.log('fileName -> ', response.fileName);
                setFilePath(response);
            });
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
            console.log('Response = ', response);

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
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            setFilePath(response);
        });
    };

    return (
        <View style={{flex: 1}}>
            <Button title="Show modal" onPress={toggleModal} />
            <ScrollView style={{flex: 1}}>
                <Text style={styles.titleText}>
                    Image Picker in React Native
                </Text>
                <View style={styles.container}>
                    {/* <Image
          source={{
            uri: 'data:image/jpeg;base64,' + filePath.data,
          }}
          style={styles.imageStyle}
        /> */}
                    <Image
                        source={{uri: filePath.uri}}
                        style={styles.imageStyle}
                    />
                    <Text style={styles.textStyle}>{filePath.uri}</Text>
                    <TouchableOpacity
                        activeOpacity={0.15}
                        style={styles.buttonStyle}
                        onPress={() => captureImage('photo')}>
                        <Text style={styles.textStyle}>
                            Launch Camera for Image
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={() => captureImage('video')}>
                        <Text style={styles.textStyle}>
                            Launch Camera for Video
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={() => chooseFile('photo')}>
                        <Text style={styles.textStyle}>Choose Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={styles.buttonStyle}
                        onPress={() => chooseFile('video')}>
                        <Text style={styles.textStyle}>Choose Video</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Modal isVisible={isModalVisible}>
                <View style={{flex: 1}}>
                    <Text>Hello!</Text>
                    <Text>bjdhfbsdjkbfsdjbvxcjb vjxcbvjdbvdfb</Text>

                    <Button title="Hide modal" onPress={toggleModal} />
                </View>
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
        // fontFamily: 'Arial'
        backgroundColor: '#6e4747',
        color:'white'
    },
    textStyle: {
        padding: 10,
        color: 'white',
        textAlign: 'center',

        fontStyle:'italic',
        fontWeight: 'bold'
    },
    buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#6e4747',
        padding: 5,
        marginVertical: 10,
        width: 250,
        borderRadius: 10


    },
    imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
        borderRadius:100,

    },
});


