import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
                setCartItems(cart);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCartItems();
    }, []);

    const removeFromCart = async (productId) => {
        try {
            let cart = JSON.parse(await AsyncStorage.getItem('cart')) || [];
            cart = cart.filter(item => item.id !== productId);
            await AsyncStorage.setItem('cart', JSON.stringify(cart));
            setCartItems(cart);
            Alert.alert('Removed from Cart', 'Item has been removed from your cart.');
        } catch (error) {
            console.error(error);
        }
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItemContainer}>
            <Image source={item.image} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemTitle}>{item.title}</Text>
                <Text style={styles.cartItemPrice}>${item.price}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Text style={styles.removeButton}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Open Fashion</Text>
                <Image source={require('../assets/images/Search(3).png')} style={styles.icon} />
            </View>
            <Text style={styles.text}>Checkout</Text>
            <View style={styles.lineContainer}>
                <View style={styles.line} />
                <View style={styles.diamond} />
                <View style={styles.line} />
            </View>
            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.cartList}
            />
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 70,
        marginLeft: 30,
        marginRight: 30,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    icon: {
        width: 24,
        height: 24,
    },
    text: {
        fontSize: 20,
        letterSpacing: 7,
        textAlign: 'center',
        marginBottom: 10,
    },
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    line: {
        height: 1,
        backgroundColor: '#000',
        flex: 1,
    },
    diamond: {
        width: 10,
        height: 10,
        backgroundColor: '#000',
        transform: [{ rotate: '45deg' }],
        marginHorizontal: 10,
    },
    cartList: {
        paddingVertical: 20,
    },
    cartItemContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    cartItemImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
    },
    cartItemDetails: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    cartItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cartItemPrice: {
        fontSize: 16,
        color: '#f00',
        marginVertical: 5,
    },
    removeButton: {
        color: '#ff0000',
        marginTop: 5,
    },
    totalContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
