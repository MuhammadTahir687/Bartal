import * as React from "react";
import { View, Text, FlatList, SafeAreaView, Image, Dimensions, StyleSheet,ActivityIndicator, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useState, useEffect } from "react";

export default function hom({navigation}) {


    const [readdata, setReaddata] = useState();
    const [isloading,setIsloading]=useState(true);

    useEffect(() => {

        getdata();

    }, []);
     

    const getdata = () => {
        var array = [];
        firestore()
            .collection('Products')
            .get()
            .then(querySnapshot => {
                console.log('Total Products: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    array.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
            }).then(testing => {
                console.log('New array is Push:', array);
                setReaddata(array);
                console.log("ReadData=====================",readdata)
                setIsloading(false)

            });

    }
    
    if (isloading) {
        return (
            <View style={{flex:1,justifyContent:"center"}}>
                <ActivityIndicator size="large" color="orangered" />
            </View>
        )
    }

    const itemkey=(item)=>{
        
        alert(item.key)
       
        
    }

    return (
        <SafeAreaView>
            <FlatList data={readdata}
                numColumns={2}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item.Product_Image }} style={styles.imageStyle} />
                            <Text style={styles.Text}>{item.Product_Name}</Text>
                            <Text>{item.Product_Model}</Text>
                            <Text>{item.Product_Category}</Text>
                            <Text>Rs:{item.Product_Price}</Text>
                            {/*<Text>{item.Product_Description}</Text>*/}
                            <TouchableOpacity style={styles.button} onPress={()=>{

                                navigation.navigate("Cart",

                                {items:item}
                                
                                // {name:item.Product_Name,model:item.Product_Model,price:item.Price,image:item.Product_Image}
                                
                                )
                            }}>
                                <Text style={{color:"white",fontSize:15}}>Add to Cart</Text>
                            </TouchableOpacity>
                    </View>
                )}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    imageStyle: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        width: 60,
        height: 80,
        marginTop: "10%",


    },
    item: {
        flex: 1,
        flexDirection: "column",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: 'white',
        borderColor:'white',
        borderWidth:1,
        // paddingLeft: "10%",
        paddingBottom: 20,
        marginTop: 16,
        marginBottom: 16,
        borderRadius: 10,
        marginHorizontal:10,
        elevation:8,
        shadowOpacity:0.1,
        shadowOffset:{width:0,height:1}

    },
    Text:{
    },
    button: {

        // marginLeft: '32%',
        // marginRight: '32%',
        flex:1,
        justifyContent:"center",
        alignItems:"center",

        width:"80%",
        marginTop:"1%",
        borderRadius: 10,
        borderWidth: 1,
        // paddingLeft:'12%',
        // paddingHorizontal:10,
        padding:'3%',
        textAlign:'center',
        backgroundColor: "orangered",
        borderColor: 'transparent',
    }
})
