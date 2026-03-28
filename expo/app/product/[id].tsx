import { Image } from 'expo-image';
import * as Linking from 'expo-linking';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { products } from '@/data/products';
import { useCart } from '@/hooks/cart-store';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { addToCart, getItemQuantity } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const cartQuantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    if (Platform.OS !== 'web') {
      Alert.alert(
        'Added to Cart',
        `${product.name} has been added to your cart`,
        [{ text: 'OK' }]
      );
    }
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello! I'm interested in the ${product.name} priced at $${product.price}. Is it available?`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappUrl);
  };

  const SpecRow = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.specRow}>
      <Text style={styles.specLabel}>{label}</Text>
      <Text style={styles.specValue}>{value}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.light.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Heart size={24} color={Colors.light.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Gallery */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.images[selectedImageIndex] || product.image }}
            style={styles.mainImage}
            contentFit="cover"
            transition={300}
          />
          {product.isOnSale && (
            <View style={styles.saleBadge}>
              <Text style={styles.saleText}>SALE</Text>
            </View>
          )}
        </View>

        {/* Image Thumbnails */}
        {product.images.length > 1 && (
          <ScrollView horizontal style={styles.thumbnailContainer} showsHorizontalScrollIndicator={false}>
            {product.images.map((image, index) => (
              <TouchableOpacity
                key={`image-${index}-${image.slice(-10)}`}
                style={[styles.thumbnail, selectedImageIndex === index && styles.thumbnailSelected]}
                onPress={() => setSelectedImageIndex(index)}
              >
                <Image source={{ uri: image }} style={styles.thumbnailImage} contentFit="cover" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.brand}>{product.brand}</Text>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={`star-${star}`} size={16} color={Colors.light.warning} fill={Colors.light.warning} />
              ))}
            </View>
            <Text style={styles.ratingText}>4.8 (124 reviews)</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice}</Text>
            )}
          </View>

          <View style={styles.stockContainer}>
            <View style={[styles.stockDot, { backgroundColor: product.inStock ? Colors.light.success : Colors.light.error }]} />
            <Text style={[styles.stockText, { color: product.inStock ? Colors.light.success : Colors.light.error }]}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>

          <Text style={styles.description}>{product.description}</Text>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.sectionTitle}>Key Features</Text>
            <View style={styles.features}>
              {product.features.map((feature, index) => (
                <View key={`feature-${index}-${feature.slice(0, 10)}`} style={styles.feature}>
                  <Text style={styles.featureText}>• {feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Specifications */}
          <View style={styles.specsContainer}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specs}>
              <SpecRow label="Display" value={product.specs.display} />
              <SpecRow label="Processor" value={product.specs.processor} />
              <SpecRow label="RAM" value={product.specs.ram} />
              <SpecRow label="Storage" value={product.specs.storage} />
              <SpecRow label="Camera" value={product.specs.camera} />
              <SpecRow label="Battery" value={product.specs.battery} />
              <SpecRow label="OS" value={product.specs.os} />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={[styles.bottomActions, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus size={20} color={Colors.light.text} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => setQuantity(quantity + 1)}
          >
            <Plus size={20} color={Colors.light.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.addToCartButton, !product.inStock && styles.buttonDisabled]}
            onPress={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart size={20} color="white" />
            <Text style={styles.addToCartText}>
              Add to Cart {cartQuantity > 0 && `(${cartQuantity})`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsAppOrder}>
            <Text style={styles.whatsappText}>Order via WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 400,
    backgroundColor: 'white',
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  saleBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: Colors.light.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  saleText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  thumbnailContainer: {
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailSelected: {
    borderColor: Colors.light.primary,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  productInfo: {
    padding: 20,
    backgroundColor: 'white',
    marginTop: 8,
  },
  brand: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontWeight: '500',
    marginBottom: 4,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
    lineHeight: 30,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: Colors.light.textSecondary,
    textDecorationLine: 'line-through',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 12,
  },
  features: {
    gap: 8,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  specsContainer: {
    marginBottom: 24,
  },
  specs: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 12,
    padding: 16,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  specLabel: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    fontWeight: '500',
    flex: 1,
  },
  specValue: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '600',
    flex: 2,
    textAlign: 'right',
  },
  bottomActions: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.secondary,
    borderRadius: 12,
    padding: 8,
    marginBottom: 16,
    alignSelf: 'center',
  },
  quantityButton: {
    padding: 8,
  },
  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
  },
  actionButtons: {
    gap: 12,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  buttonDisabled: {
    backgroundColor: Colors.light.textSecondary,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  whatsappButton: {
    backgroundColor: Colors.light.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  whatsappText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: Colors.light.text,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});