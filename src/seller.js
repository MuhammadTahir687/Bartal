import * as React from "react";
import {
    SafeAreaView,
    Text,
    ScrollView,
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    Image,
    Platform,
    PermissionsAndroid,
    Alert
} from "react-native";


import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {firebase} from "@react-native-firebase/storage";
import {useState, useEffect} from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Picker} from '@react-native-picker/picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Avatar} from "react-native-elements";
import chooseFile from './ImagePicker/choosefile';
import * as ImagePicker from 'react-native-image-picker';


export default function sellproducts() {
    const [productname, setProductname] = useState('');
    const [productmodel, setProductmodel] = useState('');
    const [productcategory, setProductcategory] = useState();
    const [productprice, setProductprice] = useState('');
    const [productdescription, setProductdescription] = useState('');
    const [filePath, setFilePath] = useState([]);
    const [imageloading, setImageloading] = useState(true);

    const [productnamemsg, setProductnamemsg] = useState('');
    const [productmodelmsg, setProductmodelmsg] = useState('');
    const [productcategorymsg, setProductcategorymsg] = useState('');
    const [productpricemsg, setProductpricemsg] = useState('');
    const [productdescriptionmsg, setProductdescriptionmsg] = useState('');
    const [productimagemsg, setProductimagemsg] = useState('');
    const [downloadURL, setDownloadURL] = useState();


    const chooseFile = (type) => {
        let options = {
            allowsEditing: true,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                setProductimagemsg('Required*')
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
            } else {
                console.log('base64 -> ', response.assets[0].base64);
                console.log('uri -> ', response.assets[0].uri);
                console.log('width -> ', response.assets[0].width);
                console.log('height -> ', response.assets[0].height);
                console.log('fileSize -> ', response.assets[0].fileSize);
                console.log('type -> ', response.assets[0].type);
                console.log('fileName -> ', response.assets[0].fileName);
                setFilePath(response.assets[0])
                setImageloading(false)
                console.log("Reasponse==============", filePath)
            }

        });
    };

    const adddata = async () => {
        if (productname == "" && productmodel == "" && filePath == "" && productprice == "" && productdescription == '') {

            setProductimagemsg('Required*');
            setProductnamemsg('Required*');
            setProductmodelmsg('Required*');
            setProductcategorymsg('Required*');
            setProductpricemsg('Required*');
            setProductdescriptionmsg('Required*')

        } else if (productname == " ") {
            setProductnamemsg('Required*');
        } else if (productmodel == " ") {
            setProductmodelmsg('Required*');
        } else if (productcategory == " ") {
            setProductcategorymsg('Required*');
        } else if (productprice == " ") {
            setProductpricemsg('Required*');
        } else if (filePath == " ") {
            setProductimagemsg('Required*');
        } else if (productdescription == " ") {
            setProductdescriptionmsg('Required*')
        } else {
            const reference = storage().ref("gs://bartal-7aa33.appspot.com");
            const task = reference.putFile(filePath.uri);
            task.then(async () => {
                // Get Download URL Here
                const downloadURL = await reference.getDownloadURL();
                setDownloadURL(downloadURL);
                console.log("URL===========", downloadURL)
            });

            firestore()
                .collection('Products')
                .add({
                    Product_Name: productname,
                    Product_Model: productmodel,
                    Product_Category: productcategory,
                    Product_Price:productprice,
                    Product_Description: productdescription,
                    Product_Image: downloadURL
                })
                .then(() => {
                    console.log('Product added!');
                    Alert.alert(
                        'Product Added',
                        'You are add product successfully',
                        [
                            {
                                text: 'Ok',
                            },
                        ],
                        {cancelable: false},
                    );
                });

            setFilePath('');
            setProductname('');
            setProductmodel('');
            setProductcategory('');
            setProductprice('');
            setProductdescription('');

        }

    }
    const producttitlevalidator = () => {
        if (productname == '') {
            setProductnamemsg('Required*');
        } else {
            setProductnamemsg('');
        }
    };
    const productmodelvalidator = () => {
        if (productmodel == '') {
            setProductmodelmsg('Required*');
        } else {
            setProductmodelmsg('');
        }
    };
    const productcategoryvalidator = () => {
        if (productcategory == '') {
            setProductcategorymsg('Required*');
        } else {
            setProductcategorymsg('');
        }
    };
    const productpricevalidator = () => {
        if (productprice == '') {
            setProductpricemsg('Required*');
        } else {
            setProductpricemsg('');
        }
    };
    const productdescriptionvalidator = () => {
        if (productdescription == '') {
            setProductdescriptionmsg('Required*');
        } else {
            setProductdescriptionmsg('');
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>

                {
                    imageloading ?
                        <Avatar
                            size="xlarge"
                            rounded
                            icon={{name: "camera", type: 'font-awesome'}}
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
                <Text style={styles.validatiomessage}>{productimagemsg}</Text>

                <TextInput style={styles.input}
                           value={productname}
                           placeholder="Product Title"
                           onBlur={producttitlevalidator}
                           onChangeText={(text) => setProductname(text)}
                />

                <Text style={styles.validatiomessage}>{productnamemsg}</Text>

                <TextInput style={styles.input} placeholder="Product Model"
                           value={productmodel}
                           onChangeText={(text) => setProductmodel(text)}
                           onBlur={productmodelvalidator}
                />
                <Text style={styles.validatiomessage}>{productmodelmsg}</Text>

                <View style={styles.Picker}>
                    <Picker
                        style={{width: 270}}

                        selectedValue={productcategory}
                        onValueChange={(itemValue, itemIndex) =>
                            setProductcategory(itemValue)
                        }
                        onBlur={productcategoryvalidator}

                    >
                        <Picker.Item label="Select Category" style={{color: 'grey', fontSize: 13}}/>
                        <Picker.Item label="Laptop" value="Laptop"/>
                        <Picker.Item label="Mobile" value="Mobile"/>
                        <Picker.Item label="Accessoies" value="Accessories"/>
                    </Picker>
                </View>
                <Text style={styles.validatiomessage}>{productcategorymsg}</Text>
                <TextInput
                    style={styles.input} placeholder="Product Price"
                    value={productprice}
                    keyboardType="numeric"
                    onChangeText={(text) => setProductprice(text)}
                    onBlur={productpricevalidator}
                />
                <Text style={styles.validatiomessage}>{productpricemsg}</Text>
                <TextInput
                    style={styles.input} placeholder="Product Description"
                    value={productdescription}
                    onChangeText={(text) => setProductdescription(text)}
                    onBlur={productdescriptionvalidator}
                />
                <Text style={styles.validatiomessage}>{productdescriptionmsg}</Text>
                <TouchableOpacity style={styles.button} onPress={adddata}>
                    <Text style={{color: "white", fontSize: 18}}>Add Product</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    input: {
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: 7,
        backgroundColor: 'white',
        borderColor: "orangered",
        paddingLeft: "5%",
        flexDirection: "row"
    },
    button: {

        marginLeft: '21%',
        marginRight: '20%',
        marginTop: 7,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: '15%',
        padding: '3%',
        textAlign: 'center',
        backgroundColor: "orangered",
        borderColor: 'transparent',
    },
    Picker: {
        borderWidth: 1,
        borderRadius: 10,
        marginLeft: "10%",
        marginRight: "10%",
        marginTop: 7,
        backgroundColor: 'white',
        borderColor: "orangered",
        paddingLeft: 9,
        flexDirection: "row"
    },
    circle: {
        width: '2%',
        height: '20%',
        backgroundColor: 'orangered',
        borderRadius: 100,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').width * 0.4,
        margin: 5
    },
    validatiomessage: {
        color: 'red',
        marginLeft: '12%',
        marginRight: 25,
    }
})
