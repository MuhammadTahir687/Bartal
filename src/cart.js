import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";


export default function Cart({ navigation, route }) {

    const [cartdata, setCartdata] = useState()
    //const {name,model,image,price} = route.params;
    const { items } = route.params;

    useEffect(() => {
        setitems();
    }, [])

    const setitems = () => {
        const array = [];
        array.push(items);
        console.log("Array==========",array)
        setCartdata(array);
        console.log ("Cart Data==========",cartdata)
    }

    return (
        <View>
            <FlatList data={cartdata}
                numColumns={2}
                keyExtractor={(item) => item.key}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item.Product_Image }} style={styles.imageStyle} />
                        <Text style={styles.Text}>{item.Product_Name}</Text>
                        <Text>{item.Product_Model}</Text>
                        <Text>{item.Product_Category}</Text>
                        <Text>Rs:{item.Product_Price}</Text>
                    </View>
                )}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    imageStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: 60,
        height: 80,
        marginTop: "10%",


    },
    item: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        // paddingLeft: "10%",
        paddingBottom: 20,
        marginTop: 16,
        marginBottom: 16,
        borderRadius: 10,
        marginHorizontal: 10,
        elevation: 8,
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 1 }

    },
    Text: {
    },
    button: {

        // marginLeft: '32%',
        // marginRight: '32%',
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

        width: "80%",
        marginTop: "1%",
        borderRadius: 10,
        borderWidth: 1,
        // paddingLeft:'12%',
        // paddingHorizontal:10,
        padding: '3%',
        textAlign: 'center',
        backgroundColor: "orangered",
        borderColor: 'transparent',
    }
})
