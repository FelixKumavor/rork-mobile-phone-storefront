import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Heart, ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';
import { useCart } from '@/hooks/cart-store';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  const { addToCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/product/${product.id}`);
    }
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} testID={`product-card-${product.id}`}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        {product.isOnSale && (
          <View style={styles.saleBadge}>
            <Text style={styles.saleText}>SALE</Text>
          </View>
        )}
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart size={20} color={Colors.light.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.brand}>{product.brand}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${product.price}</Text>
          {product.originalPrice && (
            <Text style={styles.originalPrice}>${product.originalPrice}</Text>
          )}
        </View>

        <View style={styles.footer}>
          <View style={styles.stockContainer}>
            <View style={[styles.stockDot, { backgroundColor: product.inStock ? Colors.light.success : Colors.light.error }]} />
            <Text style={[styles.stockText, { color: product.inStock ? Colors.light.success : Colors.light.error }]}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.cartButton, !product.inStock && styles.cartButtonDisabled]}
            onPress={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart size={16} color="white" />
            {quantity > 0 && (
              <View style={styles.quantityBadge}>
                <Text style={styles.quantityText}>{quantity}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  saleBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.light.error,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  saleText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 20,
  },
  content: {
    padding: 12,
  },
  brand: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    fontWeight: '500',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 8,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    textDecorationLine: 'line-through',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
  },
  cartButton: {
    backgroundColor: Colors.light.primary,
    padding: 8,
    borderRadius: 8,
    position: 'relative',
  },
  cartButtonDisabled: {
    backgroundColor: Colors.light.textSecondary,
  },
  quantityBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: Colors.light.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});