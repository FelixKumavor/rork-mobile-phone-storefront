import * as Linking from 'expo-linking';
import { ChevronRight, Info, Mail, MapPin, MessageCircle, Phone, Star } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '@/constants/colors';

export default function MoreScreen() {
  const handleWhatsApp = () => {
    const message = "Hello! I need help with choosing a phone.";
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    Linking.openURL(whatsappUrl);
  };

  const handleCall = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@phonestore.com');
  };

  const handleLocation = () => {
    const address = "123 Phone Street, Tech City, TC 12345";
    const url = `https://maps.google.com/?q=${encodeURIComponent(address)}`;
    Linking.openURL(url);
  };

  const MenuItem = ({ icon, title, subtitle, onPress, showChevron = true }: {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress: () => void;
    showChevron?: boolean;
  }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>
        <Text>{icon}</Text>
      </View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      {showChevron && <ChevronRight size={20} color={Colors.light.textSecondary} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* About Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About PhoneStore</Text>
        <View style={styles.aboutCard}>
          <Text style={styles.aboutText}>
            We are your trusted mobile phone retailer, offering the latest smartphones from top brands 
            with genuine warranty and competitive prices. Our mission is to help you find the perfect 
            device that fits your needs and budget.
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>5000+</Text>
              <Text style={styles.statLabel}>Happy Customers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>50+</Text>
              <Text style={styles.statLabel}>Phone Models</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>2+</Text>
              <Text style={styles.statLabel}>Years Experience</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <View style={styles.menuContainer}>
          <MenuItem
            icon={<MessageCircle size={24} color={Colors.light.primary} />}
            title="WhatsApp Support"
            subtitle="Get instant help via WhatsApp"
            onPress={handleWhatsApp}
          />
          <MenuItem
            icon={<Phone size={24} color={Colors.light.accent} />}
            title="Call Us"
            subtitle="+1 (234) 567-8900"
            onPress={handleCall}
          />
          <MenuItem
            icon={<Mail size={24} color={Colors.light.warning} />}
            title="Email Support"
            subtitle="support@phonestore.com"
            onPress={handleEmail}
          />
          <MenuItem
            icon={<MapPin size={24} color={Colors.light.error} />}
            title="Visit Our Store"
            subtitle="123 Phone Street, Tech City"
            onPress={handleLocation}
          />
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Services</Text>
        <View style={styles.servicesGrid}>
          <View style={styles.serviceCard}>
            <Star size={32} color={Colors.light.primary} />
            <Text style={styles.serviceTitle}>Genuine Products</Text>
            <Text style={styles.serviceText}>100% authentic phones with official warranty</Text>
          </View>
          <View style={styles.serviceCard}>
            <Phone size={32} color={Colors.light.accent} />
            <Text style={styles.serviceTitle}>Expert Advice</Text>
            <Text style={styles.serviceText}>Professional guidance to choose the right phone</Text>
          </View>
          <View style={styles.serviceCard}>
            <MessageCircle size={32} color={Colors.light.success} />
            <Text style={styles.serviceTitle}>24/7 Support</Text>
            <Text style={styles.serviceText}>Round-the-clock customer support via WhatsApp</Text>
          </View>
          <View style={styles.serviceCard}>
            <MapPin size={32} color={Colors.light.warning} />
            <Text style={styles.serviceTitle}>Fast Delivery</Text>
            <Text style={styles.serviceText}>Same-day delivery available in your area</Text>
          </View>
        </View>
      </View>

      {/* Info Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information</Text>
        <View style={styles.infoCard}>
          <Info size={24} color={Colors.light.primary} />
          <View style={styles.infoContent}>
            <Text style={styles.infoTitle}>Store Hours</Text>
            <Text style={styles.infoText}>Monday - Saturday: 9:00 AM - 8:00 PM</Text>
            <Text style={styles.infoText}>Sunday: 10:00 AM - 6:00 PM</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.light.text,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  aboutCard: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  aboutText: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.light.primary,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    marginTop: 4,
  },
  menuContainer: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.light.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  menuSubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 2,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
  },
  serviceCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  serviceText: {
    fontSize: 12,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
});