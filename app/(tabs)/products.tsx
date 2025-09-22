import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FilterChips from '@/components/FilterChips';
import ProductCard from '@/components/ProductCard';
import SearchBar from '@/components/SearchBar';
import Colors from '@/constants/colors';
import { brands, priceRanges, products } from '@/data/products';
import { Product } from '@/types/product';

export default function ProductsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by brand
    if (selectedBrand !== 'All') {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    // Filter by price range
    if (selectedPriceRange !== 'All Prices') {
      const range = priceRanges.find(r => r.label === selectedPriceRange);
      if (range) {
        filtered = filtered.filter(product => 
          product.price >= range.min && product.price <= range.max
        );
      }
    }

    return filtered;
  }, [searchQuery, selectedBrand, selectedPriceRange]);

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard product={item} />
  );

  const renderHeader = () => (
    <View>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search phones..."
      />
      
      <FilterChips
        title="Brand"
        options={brands}
        selected={selectedBrand}
        onSelect={setSelectedBrand}
      />
      
      <FilterChips
        title="Price Range"
        options={priceRanges.map(r => r.label)}
        selected={selectedPriceRange}
        onSelect={setSelectedPriceRange}
      />

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {filteredProducts.length} phone{filteredProducts.length !== 1 ? 's' : ''} found
        </Text>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>No phones found</Text>
      <Text style={styles.emptyText}>
        Try adjusting your search or filter criteria
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        testID="products-list"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    paddingBottom: 20,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});