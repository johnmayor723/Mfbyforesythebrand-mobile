import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const categories = [
    { id: '1', title: 'Grains & Cereals', icon: '🌾' },
    { id: '2', title: 'Tubers & Roots', icon: '🥔' },
    { id: '3', title: 'Vegetables', icon: '🥕' },
    { id: '4', title: 'Fruits', icon: '🍏' },
    { id: '5', title: 'Protein (Animal Products)', icon: '🍗' },
    { id: '6', title: 'Dairy Products', icon: '🥛' },
    { id: '7', title: 'Legumes & Nuts', icon: '🥜' },
    { id: '8', title: 'Oils & Fats', icon: '🛢️' },
    { id: '9', title: 'Spices & Seasonings', icon: '🌶️' },
    { id: '10', title: 'Flour & Baking Products', icon: '🍞' },
    { id: '11', title: 'Beverages & Drinks', icon: '🥤' },
    { id: '12', title: 'Snacks & Processed Foods', icon: '🍫' },
];

const CategoriesScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const [category, setCategory] = useState(route.params?.category || categories[0].title);
    const [products, setProducts] = useState(route.params?.products || []);
    const [loading, setLoading] = useState(false);

    // Update category when route.params changes
    useEffect(() => {
        if (route.params?.category) {
            setCategory(route.params.category);
        }
        if (route.params?.products) {
            setProducts(route.params.products);
        }
    }, [route.params?.category, route.params?.products]);

    const filteredProducts = products.filter(product => product.category === category);

    const handleCategoryPress = (selectedCategory) => {
        navigation.navigate('CategoriesScreen', { category: selectedCategory, products });
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
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

            <Text style={styles.featuredTitle}>{category}</Text>
            <FlatList
                data={filteredProducts}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Single Product', { product: item })}>
                        <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
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
                scrollEnabled={false}
            />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF', padding: 16 },
    categoriesContainer: { paddingVertical: 10, marginTop: 10 },
    categoryButton: { backgroundColor: '#F0F0F0', borderRadius: 15, padding: 8, marginRight: 10, alignItems: 'center', width: 80 },
    categoryIcon: { fontSize: 20 },
    categoryText: { marginTop: 3, textAlign: 'center' },
    featuredTitle: { fontSize: 20, fontWeight: 'bold', color: '#2D7B30', textAlign: 'center', marginVertical: 10 },
    card: { backgroundColor: '#FFFFFF', borderRadius: 10, padding: 10, margin: 5, elevation: 3, width: '48%' },
    cardImage: { width: '100%', height: 100, borderRadius: 10 },
    cardTitle: { fontWeight: 'bold', marginVertical: 5 },
    cardPrice: { color: '#2D7B30' },
    addButton: { backgroundColor: '#2D7B30', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 5 },
    buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
    row: { justifyContent: 'space-between' },
    loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default CategoriesScreen;
