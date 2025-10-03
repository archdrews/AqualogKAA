import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ScrollView,
  Switch,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Target, Zap, Clock, Bell, Home, BarChart3, LogOut, Settings as SettingsIcon } from 'lucide-react-native';

// Gradient Button Component
const GradientButton = ({ title, onPress, size = 'medium', variant = 'primary', style, children }) => {
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return ['#009688', '#40E0D0'];
      case 'danger':
        return ['#C62828', '#E53935'];
      default:
        return ['#009688', '#40E0D0'];
    }
  };

  const getSize = () => {
    switch (size) {
      case 'small':
        return { paddingHorizontal: 16, paddingVertical: 8, fontSize: 14 };
      case 'large':
        return { paddingHorizontal: 32, paddingVertical: 16, fontSize: 18 };
      default:
        return { paddingHorizontal: 24, paddingVertical: 12, fontSize: 16 };
    }
  };

  const sizeStyle = getSize();

  return (
    <TouchableOpacity onPress={onPress} style={[styles.buttonContainer, style]}>
      <LinearGradient
        colors={getColors()}
        style={[styles.gradientButton, sizeStyle]}
      >
        {title ? (
          <Text style={[styles.buttonText, { fontSize: sizeStyle.fontSize }]}>
            {title}
          </Text>
        ) : (
          children
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

// Luxury Card Component
const LuxuryCard = ({ children, variant = 'default', style }) => {
  return (
    <View style={[
      styles.luxuryCard,
      variant === 'gradient' && styles.gradientCard,
      style
    ]}>
      {variant === 'gradient' && (
        <LinearGradient
          colors={['rgba(0, 150, 136, 0.3)', 'rgba(64, 224, 208, 0.3)']}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {children}
    </View>
  );
};

// Navigation Component
const Navigation = ({ currentPage, onNavigate }) => (
  <View style={styles.navigation}>
    <TouchableOpacity 
      onPress={() => onNavigate('dashboard')}
      style={[
        styles.navButton,
        currentPage === 'dashboard' && styles.activeNavButton
      ]}
    >
      <Home 
        size={24} 
        color={currentPage === 'dashboard' ? '#40E0D0' : '#9CA3AF'} 
      />
    </TouchableOpacity>
    
    <TouchableOpacity 
      onPress={() => onNavigate('settings')}
      style={[
        styles.navButton,
        currentPage === 'settings' && styles.activeNavButton
      ]}
    >
      <SettingsIcon 
        size={24} 
        color={currentPage === 'settings' ? '#40E0D0' : '#9CA3AF'} 
      />
    </TouchableOpacity>
    
    <TouchableOpacity 
      onPress={() => onNavigate('stats')}
      style={[
        styles.navButton,
        currentPage === 'stats' && styles.activeNavButton
      ]}
    >
      <BarChart3 
        size={24} 
        color={currentPage === 'stats' ? '#40E0D0' : '#9CA3AF'} 
      />
    </TouchableOpacity>
  </View>
);

// Settings Component
const Settings = ({ onNavigate }) => {
  const [dailyTarget, setDailyTarget] = useState('2000');
  const [quickButton1, setQuickButton1] = useState('250');
  const [quickButton2, setQuickButton2] = useState('500');
  const [isAnalogClock, setIsAnalogClock] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const saveSettings = () => {
    // Here you would save to AsyncStorage or your preferred storage
    console.log('Settings saved:', {
      dailyTarget,
      quickButton1,
      quickButton2,
      isAnalogClock,
      notificationsEnabled
    });
    
    Alert.alert('Success', 'Settings saved successfully!');
  };

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            console.log('User logged out');
            // Handle logout logic here
          }
        }
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#0B1E2D', '#121212']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <SettingsIcon size={32} color="#40E0D0" />
            <Text style={styles.title}>Settings</Text>
          </View>
          <Text style={styles.subtitle}>Customize your hydration experience</Text>
        </View>

        {/* Settings Cards */}
        <View style={styles.settingsContainer}>
          {/* Daily Target Setting */}
          <LuxuryCard style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <Target size={24} color="#40E0D0" />
              <Text style={styles.settingTitle}>Daily Target</Text>
            </View>
            <Text style={styles.settingDescription}>
              Set your daily water intake goal in milliliters
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={dailyTarget}
                onChangeText={setDailyTarget}
                placeholder="2000"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
              <Text style={styles.inputUnit}>ml</Text>
            </View>
          </LuxuryCard>

          {/* Quick Log Buttons Setting */}
          <LuxuryCard style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <Zap size={24} color="#40E0D0" />
              <Text style={styles.settingTitle}>Quick Log Buttons</Text>
            </View>
            <Text style={styles.settingDescription}>
              Customize the amounts for your quick log buttons
            </Text>
            
            <View style={styles.quickButtonsContainer}>
              <View style={styles.quickButtonSetting}>
                <Text style={styles.quickButtonLabel}>Button 1</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={quickButton1}
                    onChangeText={setQuickButton1}
                    placeholder="250"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                  />
                  <Text style={styles.inputUnit}>ml</Text>
                </View>
              </View>

              <View style={styles.quickButtonSetting}>
                <Text style={styles.quickButtonLabel}>Button 2</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={quickButton2}
                    onChangeText={setQuickButton2}
                    placeholder="500"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                  />
                  <Text style={styles.inputUnit}>ml</Text>
                </View>
              </View>
            </View>
          </LuxuryCard>

          {/* Clock Display Setting */}
          <LuxuryCard style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <Clock size={24} color="#40E0D0" />
              <Text style={styles.settingTitle}>Clock Display</Text>
            </View>
            <Text style={styles.settingDescription}>
              Choose between analog or digital clock in the crystal ball
            </Text>
            
            <View style={styles.switchContainer}>
              <View style={styles.switchOption}>
                <Text style={styles.switchLabel}>Digital</Text>
                <Switch
                  value={isAnalogClock}
                  onValueChange={setIsAnalogClock}
                  trackColor={{ false: '#C0C0C0', true: '#009688' }}
                  thumbColor={isAnalogClock ? '#40E0D0' : '#f4f3f4'}
                />
                <Text style={styles.switchLabel}>Analog</Text>
              </View>
            </View>
          </LuxuryCard>

          {/* Notification Settings */}
          <LuxuryCard style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <Bell size={24} color="#40E0D0" />
              <Text style={styles.settingTitle}>Reminders</Text>
            </View>
            <Text style={styles.settingDescription}>
              Get gentle reminders to stay hydrated throughout the day
            </Text>
            
            <View style={styles.notificationContainer}>
              <View style={styles.notificationRow}>
                <Text style={styles.notificationLabel}>Enable Notifications</Text>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: '#6B7280', true: '#009688' }}
                  thumbColor={notificationsEnabled ? '#40E0D0' : '#f4f3f4'}
                />
              </View>
              
              {notificationsEnabled && (
                <View style={styles.notificationInfo}>
                  <Text style={styles.notificationInfoText}>
                    💡 Reminder intervals and custom messages will be available in the next update!
                  </Text>
                </View>
              )}
            </View>
          </LuxuryCard>

          {/* Account Settings */}
          <LuxuryCard style={styles.settingCard}>
            <View style={styles.settingHeader}>
              <View style={styles.accountIcon} />
              <Text style={styles.settingTitle}>Account</Text>
            </View>
            <Text style={styles.settingDescription}>
              Manage your account preferences and data
            </Text>
            
            <View style={styles.accountOptions}>
              <TouchableOpacity style={styles.accountOption}>
                <Text style={styles.accountOptionText}>Export Data</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.accountOption}>
                <Text style={styles.accountOptionText}>Reset Statistics</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.accountOption}>
                <Text style={styles.accountOptionText}>Privacy Settings</Text>
              </TouchableOpacity>
            </View>
          </LuxuryCard>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <GradientButton
              title="Save Changes"
              onPress={saveSettings}
              size="large"
              style={styles.saveButton}
            />

            <GradientButton
              onPress={logout}
              variant="danger"
              size="medium"
              style={styles.logoutButton}
            >
              <View style={styles.logoutButtonContent}>
                <LogOut size={18} color="#FFFFFF" />
                <Text style={styles.logoutButtonText}>Logout</Text>
              </View>
            </GradientButton>
          </View>
        </View>
      </ScrollView>

      <Navigation currentPage="settings" onNavigate={onNavigate} />
    </LinearGradient>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingBottom: 100,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
    marginLeft: 12,
  },
  subtitle: {
    color: '#C0C0C0',
    fontSize: 16,
    textAlign: 'center',
  },
  settingsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  settingCard: {
    marginBottom: 20,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 12,
  },
  settingDescription: {
    color: '#C0C0C0',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245,245,245,0.1)',
    borderWidth: 1,
    borderColor: '#C0C0C0',
    borderRadius: 12,
  },
  input: {
    flex: 1,
    padding: 16,
    color: '#F5F5F5',
    fontSize: 16,
  },
  inputUnit: {
    color: '#C0C0C0',
    fontSize: 16,
    fontWeight: '600',
    paddingRight: 16,
  },
  quickButtonsContainer: {
    gap: 15,
  },
  quickButtonSetting: {
    gap: 8,
  },
  quickButtonLabel: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
  switchContainer: {
    alignItems: 'center',
  },
  switchOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  switchLabel: {
    color: '#C0C0C0',
    fontSize: 16,
    fontWeight: '600',
  },
  notificationContainer: {
    gap: 15,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  notificationLabel: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
  },
  notificationInfo: {
    padding: 16,
    backgroundColor: 'rgba(64, 224, 208, 0.1)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(64, 224, 208, 0.3)',
  },
  notificationInfoText: {
    color: '#40E0D0',
    fontSize: 14,
  },
  accountIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'linear-gradient(45deg, #009688, #40E0D0)',
  },
  accountOptions: {
    gap: 12,
  },
  accountOption: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.5)',
    backgroundColor: 'rgba(107, 114, 128, 0.1)',
  },
  accountOptionText: {
    color: '#D1D5DB',
    fontSize: 16,
  },
  actionButtons: {
    gap: 16,
    marginTop: 10,
  },
  saveButton: {
    width: '100%',
  },
  logoutButton: {
    width: '100%',
  },
  logoutButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  luxuryCard: {
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(107, 114, 128, 0.3)',
  },
  gradientCard: {
    overflow: 'hidden',
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradientButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(17, 24, 39, 0.9)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(107, 114, 128, 0.3)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  navButton: {
    padding: 12,
    borderRadius: 25,
  },
  activeNavButton: {
    backgroundColor: 'rgba(64, 224, 208, 0.2)',
  },
});

export default function App() {
  const [currentPage, setCurrentPage] = useState('settings');

  return <Settings onNavigate={setCurrentPage} />;
}