import * as Linking from 'expo-linking';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';
import { useCart } from '@/hooks/cart-store';
import { CartItem } from '@/types/product';

export default function CartScreen() {
  const { items, total, itemCount, updateQuantity, removeFromCart, clearCart } = useCart();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity >= 0 && newQuantity <= 999) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    Alert.alert(
      'Remove Item',
      `Remove ${productName} from cart?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: () => removeFromCart(productId) },
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Remove all items from cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearCart },
      ]
    );
  };

  const handleWhatsAppOrder = () => {
    const orderDetails = items.map(item => 
      `${item.product.name} (Qty: ${item.quantity}) - $${item.product.price * item.quantity}`
    ).join('\n');
    
    const message = `Hello! I'd like to order the following phones:\n\n${orderDetails}\n\nTotal: $${total.toFixed(2)}\n\nPlease confirm availability and delivery details.`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappUrl);
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.product.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemBrand}>{item.product.brand}</Text>
        <Text style={styles.itemName} numberOfLines={2}>{item.product.name}</Text>
        <Text style={styles.itemPrice}>${item.product.price}</Text>
      </View>

      <View style={styles.itemActions}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.product.id, item.quantity - 1)}
          >
            <Minus size={16} color={Colors.light.text} />
          </TouchableOpacity>
          
          <Text style={styles.quantity}>{item.quantity}</Text>
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => handleQuantityChange(item.product.id, item.quantity + 1)}
          >
            <Plus size={16} color={Colors.light.text} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => handleRemoveItem(item.product.id, item.product.name)}
        >
          <Trash2 size={18} color={Colors.light.error} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <ShoppingBag size={64} color={Colors.light.textSecondary} />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptyText}>
        Browse our products and add items to your cart
      </Text>
    </View>
  );

  const renderFooter = () => {
    if (items.length === 0) return null;

    return (
      <View style={styles.footer}>
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Items ({itemCount})</Text>
            <Text style={styles.summaryValue}>${total.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.clearButton} onPress={handleClearCart}>
            <Text style={styles.clearButtonText}>Clear Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.orderButton} onPress={handleWhatsAppOrder}>
            <Text style={styles.orderButtonText}>Order via WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.product.id}
        ListEmptyComponent={renderEmpty}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    flexGrow: 1,
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemBrand: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    fontWeight: '500',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  itemActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.secondary,
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    padding: 8,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 8,
    marginTop: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    backgroundColor: 'white',
    marginTop: 16,
    paddingTop: 20,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  summary: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.light.textSecondary,
  },
  summaryValue: {
    fontSize: 16,
    color: Colors.light.text,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  clearButton: {
    flex: 1,
    backgroundColor: Colors.light.secondary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  orderButton: {
    flex: 2,
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  orderButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
});