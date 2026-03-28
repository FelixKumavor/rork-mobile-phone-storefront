import createContextHook from '@nkzw/create-context-hook';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { CartItem, CartState, Product } from '@/types/product';

const CART_STORAGE_KEY = 'phone_store_cart';

const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      return await AsyncStorage.getItem(key);
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      const AsyncStorage = require('@react-native-async-storage/async-storage').default;
      await AsyncStorage.setItem(key, value);
    }
  },
};

export const [CartProvider, useCart] = createContextHook(() => {
  const [cartState, setCartState] = useState<CartState>({
    items: [],
    total: 0,
    itemCount: 0,
  });

  const calculateTotals = useCallback((items: CartItem[]) => {
    if (!Array.isArray(items) || items.length === 0) {
      return { total: 0, itemCount: 0 };
    }
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    return { total, itemCount };
  }, []);

  const loadCart = useCallback(async () => {
    try {
      const stored = await storage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const items: CartItem[] = JSON.parse(stored);
        const { total, itemCount } = calculateTotals(items);
        setCartState({ items, total, itemCount });
      }
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  }, [calculateTotals]);

  const saveCart = useCallback(async (items: CartItem[]) => {
    if (!Array.isArray(items)) return;
    try {
      await storage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    setCartState(prevState => {
      const existingItemIndex = prevState.items.findIndex(item => item.product.id === product.id);
      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        newItems = [...prevState.items];
        newItems[existingItemIndex].quantity += quantity;
      } else {
        newItems = [...prevState.items, { product, quantity }];
      }

      const { total, itemCount } = calculateTotals(newItems);
      const newState = { items: newItems, total, itemCount };
      
      saveCart(newItems);
      return newState;
    });
  }, [calculateTotals, saveCart]);

  const removeFromCart = useCallback((productId: string) => {
    setCartState(prevState => {
      const newItems = prevState.items.filter(item => item.product.id !== productId);
      const { total, itemCount } = calculateTotals(newItems);
      const newState = { items: newItems, total, itemCount };
      
      saveCart(newItems);
      return newState;
    });
  }, [calculateTotals, saveCart]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartState(prevState => {
      const newItems = prevState.items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      const { total, itemCount } = calculateTotals(newItems);
      const newState = { items: newItems, total, itemCount };
      
      saveCart(newItems);
      return newState;
    });
  }, [calculateTotals, removeFromCart, saveCart]);

  const clearCart = useCallback(() => {
    setCartState({ items: [], total: 0, itemCount: 0 });
    saveCart([]);
  }, [saveCart]);

  const getItemQuantity = useCallback((productId: string): number => {
    const item = cartState.items.find(item => item.product.id === productId);
    return item?.quantity || 0;
  }, [cartState.items]);

  return useMemo(() => ({
    ...cartState,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
  }), [cartState, addToCart, removeFromCart, updateQuantity, clearCart, getItemQuantity]);
});