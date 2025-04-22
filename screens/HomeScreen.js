import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import addToCartService from "../services/addToCartService";

// Categories Data
const fashionCategories = [
    { id: '1', title: 'Ankara & Wax Prints', icon: '🖌️' },
    { id: '2', title: 'Kente & Woven Fabrics', icon: '🎭' },
    { id: '3', title: 'Mudcloth & Tie-Dye', icon: '🎨' },
    { id: '4', title: 'Beaded & Embellished Wear', icon: '📿' },
    { id: '5', title: 'Jewelry & Accessories', icon: '💍' },
    { id: '6', title: 'Headwraps & Turbans', icon: '👳🏾' },
    { id: '7', title: 'Dashikis & Kaftans', icon: '👕' },
    { id: '8', title: 'Leather & Traditional Footwear', icon: '🥿' },
    { id: '9', title: 'Bags & Woven Accessories', icon: '👜' },
    { id: '10', title: 'Men’s Traditional Wear', icon: '🦺' },
    { id: '11', title: 'Women’s Traditional Wear', icon: '👗' },
    { id: '12', title: 'Urban Afrocentric Wear', icon: '🧢' },
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Fetch all products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://93.127.160.233:3060/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    // Navigate to CategoriesScreen with selected category
    const handleCategoryPress = (category) => {
        navigation.navigate('CategoriesScreen', { category, products });
    };

    return (
        <ScrollView style={styles.container}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
                <Image source={require('../assets/mfbhero.jpg')} style={styles.heroImage} />
            </View>

            {/* Categories Section */}
            <FlatList
                data={categories}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategoryPress(item.title)}>
                        <Text style={styles.categoryIcon}>{item.icon}</Text>
                        <Text style={styles.categoryText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesContainer}
            />

            {/* Featured Products */}
            <Text style={styles.featuredTitle}>Featured Products</Text>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Single Product', { product: item })}>
                        <Image source={{ uri: item.images[0] }} style={styles.cardImage} />
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <Text style={styles.cardPrice}>From ₦{item.price}</Text>
                        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Single Product', { product: item })}>
                            <Text style={styles.buttonText}>Add to Cart</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                scrollEnabled={false} // Prevent internal FlatList scrolling
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    padding: 16 
  },
  heroSection: { 
    alignItems: 'center', 
    marginBottom: 16, 
    marginTop: 20 
  },
  heroImage: { 
    width: '100%', 
    height: 130, 
    borderRadius: 10 
  },
  categoriesContainer: { 
    paddingVertical: 10, 
    marginTop: 10 
  },
  categoryButton: { 
    backgroundColor: '#F0F0F0', 
    borderRadius: 15, 
    padding: 8, 
    marginRight: 10, 
    alignItems: 'center', 
    width: 80 
  },
  categoryIcon: { 
    fontSize: 20, 
    color: '#000' // Black for contrast
  },
  categoryText: { 
    marginTop: 3, 
    textAlign: 'center', 
    color: '#000' // Black text
  },
  featuredTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#9B0D54', // Reddish-purple
    textAlign: 'center', 
    marginVertical: 10 
  },
  card: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 10, 
    padding: 10, 
    margin: 5, 
    elevation: 3, 
    width: '48%' 
  },
  cardImage: { 
    width: '100%', 
    height: 100, 
    borderRadius: 10 
  },
  cardTitle: { 
    fontWeight: 'bold', 
    marginVertical: 5, 
    color: '#000' // Black text
  },
  cardPrice: { 
    color: '#9B0D54' // Reddish-purple
  },
  addButton: { 
    backgroundColor: '#9B0D54', // Reddish-purple button
    padding: 10, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginTop: 5 
  },
  buttonText: { 
    color: '#FFFFFF', 
    fontWeight: 'bold' 
  },
  row: { 
    justifyContent: 'space-between' 
  },
  loader: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});

export default HomeScreen;
