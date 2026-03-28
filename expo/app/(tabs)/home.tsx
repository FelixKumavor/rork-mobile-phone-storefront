import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ArrowRight, Phone, Shield, Truck, Zap } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProductCard from '@/components/ProductCard';
import Colors from '@/constants/colors';
import { products } from '@/data/products';

export default function HomeScreen() {
  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 4);
  const saleProducts = products.filter(p => p.isOnSale).slice(0, 3);

  const navigateToProducts = () => {
    router.push('/(tabs)/products');
  };

  const navigateToProduct = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <LinearGradient
        colors={[Colors.light.primary, '#059669']}
        style={styles.hero}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Find Your Perfect Phone</Text>
          <Text style={styles.heroSubtitle}>
            Latest smartphones with best prices and genuine warranty
          </Text>
          <TouchableOpacity style={styles.heroButton} onPress={navigateToProducts}>
            <Text style={styles.heroButtonText}>Shop Now</Text>
            <ArrowRight size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop' }}
          style={styles.heroImage}
          contentFit="cover"
        />
      </LinearGradient>

      {/* Features */}
      <View style={styles.features}>
        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Shield size={24} color={Colors.light.primary} />
          </View>
          <Text style={styles.featureTitle}>Genuine Products</Text>
          <Text style={styles.featureText}>100% authentic phones with warranty</Text>
        </View>
        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Truck size={24} color={Colors.light.primary} />
          </View>
          <Text style={styles.featureTitle}>Fast Delivery</Text>
          <Text style={styles.featureText}>Same day delivery available</Text>
        </View>
        <View style={styles.feature}>
          <View style={styles.featureIcon}>
            <Zap size={24} color={Colors.light.primary} />
          </View>
          <Text style={styles.featureTitle}>Quick Support</Text>
          <Text style={styles.featureText}>24/7 customer support via WhatsApp</Text>
        </View>
      </View>

      {/* Sale Products */}
      {saleProducts.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🔥 Hot Deals</Text>
            <TouchableOpacity onPress={navigateToProducts}>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
            {saleProducts.map((product) => (
              <View key={product.id} style={styles.horizontalCard}>
                <ProductCard 
                  product={product} 
                  onPress={() => navigateToProduct(product.id)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Featured Products */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⭐ Featured Phones</Text>
          <TouchableOpacity onPress={navigateToProducts}>
            <Text style={styles.sectionLink}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.grid}>
          {featuredProducts.map((product) => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard 
                product={product} 
                onPress={() => navigateToProduct(product.id)}
              />
            </View>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Phone size={48} color={Colors.light.primary} />
        <Text style={styles.ctaTitle}>Need Help Choosing?</Text>
        <Text style={styles.ctaText}>
          Our experts are here to help you find the perfect phone for your needs
        </Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Contact Us on WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
  },
  heroContent: {
    flex: 1,
    paddingRight: 16,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 20,
    lineHeight: 22,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: 'white',
    fontWeight: '600',
    marginRight: 8,
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  features: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  feature: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: `${Colors.light.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  sectionLink: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: '600',
  },
  horizontalScroll: {
    paddingLeft: 16,
  },
  horizontalCard: {
    width: 280,
    marginRight: 16,
  },
  grid: {
    paddingHorizontal: 16,
  },
  gridItem: {
    marginBottom: 16,
  },
  ctaSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Colors.light.secondary,
    borderRadius: 16,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginTop: 16,
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  ctaButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});