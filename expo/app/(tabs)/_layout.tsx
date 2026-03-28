import { Tabs } from 'expo-router';
import { Home, MoreHorizontal, Search, ShoppingCart } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '@/constants/colors';
import { useCart } from '@/hooks/cart-store';

function CartTabIcon({ color, focused }: { color: string; focused: boolean }) {
  const { itemCount } = useCart();

  return (
    <View style={styles.cartIconContainer}>
      <ShoppingCart color={color} size={focused ? 24 : 22} />
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {itemCount > 99 ? '99+' : itemCount}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        tabBarInactiveTintColor: Colors.light.tabIconDefault,
        headerShown: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerTitle: "PhoneStore",
          tabBarIcon: ({ color, focused }) => <Home color={color} size={focused ? 24 : 22} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          headerTitle: "All Phones",
          tabBarIcon: ({ color, focused }) => <Search color={color} size={focused ? 24 : 22} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          headerTitle: "Shopping Cart",
          tabBarIcon: CartTabIcon,
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          headerTitle: "More",
          tabBarIcon: ({ color, focused }) => <MoreHorizontal color={color} size={focused ? 24 : 22} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  cartIconContainer: {
    position: 'relative',
  },
  badge: {
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
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tabBar: {
    backgroundColor: 'white',
    borderTopColor: Colors.light.border,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4,
  },
});