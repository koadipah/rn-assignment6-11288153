import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
    { id: '1', title: 'Office Wear', description: 'reversible angora cardigan', price: 120, image: require('../assets/images/dress1.png') },
    { id: '2', title: 'Black', description: 'reversible angora cardigan', price: 120, image: require('../assets/images/dress2.png') },
    { id: '3', title: 'Church Wear', description: 'reversible angora cardigan', price: 120, image: require('../assets/images/dress3.png') },
    { id: '4', title: 'Lamerei', description: 'reversible angora cardigan', price: 120, image: require('../assets/images/dress4.png') },
    { id: '5', title: '21WN', description: 'reversible angora cardigan', price: 120, image: require('../assets/images/dress5.png') },
    { id: '6', title: 'Lopo', description: 'reversible angora cardigan', price: 120, image: require('../assets/images/dress6.png') },
    { id: '7', title: '21WN', description: 'reversible angora cardigan', price: 120, image: require('../assets/images/dress7.png') },
    { id: '8', title: 'Lame', description: 'reversible angora cardigan', price: 120, image: require('../assets/images/dress3.png') },
];

export default function HomeScreen({ navigation }) {
    const addToCart = async (product) => {
        try {
            const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
            cart.push(product);
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            Alert.alert('Success', 'Product added to cart');
        } catch (error) {
            console.error(error);
        }
    };

    const renderProduct = ({ item }) => (
        <View style={styles.productContainer}>
            <Image source={item.image} style={styles.productImage} />
            <TouchableOpacity onPress={() => addToCart(item)}>
                <Image source={require('../assets/images/add_circle.png')} style={styles.plusIcon} />
            </TouchableOpacity>
            <Text style={styles.productTitle}>{item.title}</Text>
            <Text style={styles.productDescription}>{item.description}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </View>
    );

    return (
        <View style={styles.homeContainer}>
            <View style={styles.headerContainer}>
                <Image source={require('../assets/images/Menu.png')} style={styles.icon} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Open Fashion</Text>
                </View>
                <View style={styles.iconContainer}>
                    <Image source={require('../assets/images/Search(3).png')} style={styles.icon} />
                    <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
                        <Image source={require('../assets/images/shoppingBag.png')} style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style = {styles.headerContainer}>
                <Text style = {styles.text}>OUR STORY</Text>
                <View style ={styles.iconContainer}>
                    <Image source={require('../assets/images/Listview.png')} style={styles.icon} />
                    <Image source={require('../assets/images/Filter.png')} style={styles.icon} />
                </View>
            </View>
            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
                numColumns={2}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        paddingTop: 70,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    titleContainer: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20,
        letterSpacing: 7,
        textAlign: 'center',
        marginBottom: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 5,
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    productContainer: {
        flex: 1,
        margin: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        position: 'relative',
    },
    productImage: {
        width: 150,
        height: 200,
        resizeMode: 'cover',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    productPrice: {
        fontSize: 16,
        color: '#f00',
        marginTop: 10,
    },
    plusIcon: {
        width: 24,
        height: 24,
        left: 120,
        bottom: 30
    },
});
