import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Image,
  ScrollView,
  Dimensions,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Undo2, Plus, Home, Settings, BarChart3 } from 'lucide-react-native';
import Svg, { Line, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Bottle with Clock Component
const BottleWithClock = ({ waterLevel, clockType }) => {
  const [time, setTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getClockHands = (date) => {
    const hours = date.getHours() % 12;
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const hourAngle = (hours * 30) + (minutes * 0.5);
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;
    return { hourAngle, minuteAngle, secondAngle };
  };

  const { hourAngle, minuteAngle, secondAngle } = getClockHands(time);

  return (
    <View style={styles.bottleContainer}>
      <View style={styles.bottleImageContainer}>
        <Image 
          source={{ uri: "https://raw.githubusercontent.com/archdrews/Bottle-image/refs/heads/main/Bottle%20Aqualog%20New.JPG" }}
          style={styles.bottleImage}
          resizeMode="contain"
        />
        
        {/* Water level overlay */}
        <LinearGradient
          colors={['#40E0D0', '#009688']}
          style={[
            styles.waterOverlay,
            {
              height: `${(waterLevel / 100) * 60}%`,
              opacity: 0.6,
            }
          ]}
        >
          <View style={styles.waterSurface} />
        </LinearGradient>

        {/* Clock */}
        <View style={styles.clockContainer}>
          <View style={styles.clockContent}>
            {clockType === 'digital' ? (
              <Text style={styles.digitalClock}>{formatTime(time)}</Text>
            ) : (
              <View style={styles.analogClock}>
                <Svg width="80" height="80" viewBox="0 0 80 80">
                  {/* Hour markers */}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((hour) => {
                    const angle = (hour * 30) * (Math.PI / 180);
                    const x1 = 40 + 32 * Math.sin(angle);
                    const y1 = 40 - 32 * Math.cos(angle);
                    const x2 = 40 + (hour % 3 === 0 ? 26 : 28) * Math.sin(angle);
                    const y2 = 40 - (hour % 3 === 0 ? 26 : 28) * Math.cos(angle);
                    
                    return (
                      <Line
                        key={hour}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="rgba(192, 192, 192, 0.8)"
                        strokeWidth={hour % 3 === 0 ? "2" : "1"}
                      />
                    );
                  })}
                  
                  {/* Hour hand */}
                  <Line
                    x1="40"
                    y1="40"
                    x2={40 + 18 * Math.sin(hourAngle * Math.PI / 180)}
                    y2={40 - 18 * Math.cos(hourAngle * Math.PI / 180)}
                    stroke="#40E0D0"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  
                  {/* Minute hand */}
                  <Line
                    x1="40"
                    y1="40"
                    x2={40 + 25 * Math.sin(minuteAngle * Math.PI / 180)}
                    y2={40 - 25 * Math.cos(minuteAngle * Math.PI / 180)}
                    stroke="#40E0D0"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  
                  {/* Second hand */}
                  <Line
                    x1="40"
                    y1="40"
                    x2={40 + 28 * Math.sin(secondAngle * Math.PI / 180)}
                    y2={40 - 28 * Math.cos(secondAngle * Math.PI / 180)}
                    stroke="#FFD700"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  
                  {/* Center dot */}
                  <Circle cx="40" cy="40" r="2" fill="#40E0D0" />
                </Svg>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

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
      <Settings 
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

// Main Dashboard Component
const Dashboard = ({ onNavigate }) => {
  const [waterLevel, setWaterLevel] = useState(45);
  const [customAmount, setCustomAmount] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [dailyTarget] = useState(2000);
  const [consumed, setConsumed] = useState(900);
  const [quickButton1] = useState(250);
  const [quickButton2] = useState(500);
  const [showConfetti, setShowConfetti] = useState(false);
  const [clockType, setClockType] = useState('analog');

  useEffect(() => {
    const percentage = (consumed / dailyTarget) * 100;
    setWaterLevel(Math.min(percentage, 100));
    
    if (percentage >= 100 && !showConfetti) {
      triggerConfetti();
    }
  }, [consumed, dailyTarget]);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const logWater = (amount) => {
    const newConsumed = consumed + amount;
    setConsumed(newConsumed);
    
    if (newConsumed >= dailyTarget && consumed < dailyTarget) {
      setTimeout(triggerConfetti, 500);
    }
  };

  const undoLastLog = () => {
    if (consumed > 0) {
      const lastAmount = Math.min(consumed, quickButton1);
      setConsumed(Math.max(0, consumed - lastAmount));
    }
  };

  const logCustomAmount = () => {
    const amount = parseInt(customAmount);
    if (amount && amount > 0) {
      logWater(amount);
      setCustomAmount('');
      setShowCustomInput(false);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <LinearGradient
      colors={['#000000', '#0a0a0a', '#000000']} // Pure black gradient to match bottle exactly
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.target}>Target: {dailyTarget}ml</Text>
        </View>

        {/* Bottle with Clock */}
        <View style={styles.bottleSection}>
          <BottleWithClock 
            waterLevel={waterLevel}
            clockType={clockType}
          />
          
          <View style={styles.consumptionInfo}>
            <Text style={styles.consumptionText}>
              {consumed}ml / {dailyTarget}ml
            </Text>
            <View style={styles.halfwayIndicator}>
              <View style={[
                styles.halfwayBar,
                waterLevel >= 50 && styles.halfwayBarReached
              ]} />
              <Text style={styles.halfwayText}>
                Halfway {waterLevel >= 50 ? '✓' : ''}
              </Text>
            </View>
          </View>
        </View>

        {/* Progress percentage */}
        <View style={styles.progressSection}>
          <Text style={styles.progressPercentage}>{Math.round(waterLevel)}%</Text>
          <Text style={styles.progressLabel}>Daily Goal Progress</Text>
        </View>

        {/* Quick Log Buttons */}
        <View style={styles.quickButtons}>
          <GradientButton
            title={`${quickButton1}ml`}
            onPress={() => logWater(quickButton1)}
            size="large"
            style={styles.quickButton}
          />
          <GradientButton
            title={`${quickButton2}ml`}
            onPress={() => logWater(quickButton2)}
            size="large"
            style={styles.quickButton}
          />
        </View>

        {/* Custom Log */}
        <LuxuryCard style={styles.customLogCard}>
          {!showCustomInput ? (
            <TouchableOpacity 
              onPress={() => setShowCustomInput(true)}
              style={styles.customLogButton}
            >
              <Plus size={20} color="#40E0D0" />
              <Text style={styles.customLogText}>Custom Amount</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.customInputContainer}>
              <TextInput
                value={customAmount}
                onChangeText={setCustomAmount}
                placeholder="Enter ml"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                autoFocus
                style={styles.customInput}
              />
              <View style={styles.customButtonsRow}>
                <GradientButton
                  title="Log"
                  onPress={logCustomAmount}
                  size="medium"
                  style={styles.customConfirmButton}
                />
                <TouchableOpacity 
                  onPress={() => setShowCustomInput(false)}
                  style={styles.customCancelButton}
                >
                  <Text style={styles.customCancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </LuxuryCard>

        {/* Undo Button */}
        <View style={styles.undoContainer}>
          <TouchableOpacity 
            onPress={undoLastLog}
            style={[styles.undoButton, consumed === 0 && styles.undoButtonDisabled]}
            disabled={consumed === 0}
          >
            <Undo2 size={16} color="#9CA3AF" />
            <Text style={styles.undoText}>Undo Last Entry</Text>
          </TouchableOpacity>
        </View>

        {/* Achievement Notification */}
        {waterLevel >= 100 && (
          <LuxuryCard variant="gradient" style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>🎉 Daily Goal Achieved!</Text>
            <Text style={styles.achievementText}>
              Congratulations! You've reached your daily hydration target. Keep up the excellent work!
            </Text>
          </LuxuryCard>
        )}

        {/* Motivational message for low consumption */}
        {waterLevel < 25 && (
          <LuxuryCard style={styles.motivationCard}>
            <Text style={styles.motivationTitle}>💧 Stay Hydrated</Text>
            <Text style={styles.motivationText}>
              You're off to a great start! Remember to drink water regularly throughout the day.
            </Text>
          </LuxuryCard>
        )}
      </ScrollView>

      <Navigation currentPage="dashboard" onNavigate={onNavigate} />
    </LinearGradient>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    color: '#F5F5F5',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 5,
  },
  target: {
    color: '#C0C0C0',
    fontSize: 16,
  },
  bottleSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  bottleContainer: {
    alignItems: 'center',
  },
  bottleImageContainer: {
    position: 'relative',
    width: 250,
    height: 350,
  },
  bottleImage: {
    width: '100%',
    height: '100%',
  },
  waterOverlay: {
    position: 'absolute',
    bottom: '12%',
    left: '30%',
    right: '30%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  waterSurface: {
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  clockContainer: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -40 }],
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockContent: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitalClock: {
    color: '#40E0D0',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  analogClock: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  consumptionInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  consumptionText: {
    color: '#40E0D0',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  halfwayIndicator: {
    alignItems: 'center',
  },
  halfwayBar: {
    width: 60,
    height: 4,
    backgroundColor: '#6B7280',
    borderRadius: 2,
    marginBottom: 5,
  },
  halfwayBarReached: {
    backgroundColor: '#40E0D0',
  },
  halfwayText: {
    color: '#9CA3AF',
    fontSize: 12,
  },
  progressSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  progressPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#40E0D0',
    marginBottom: 5,
  },
  progressLabel: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  quickButtons: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  quickButton: {
    flex: 1,
  },
  luxuryCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Glossy black to match bottle
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(64, 224, 208, 0.2)', // Subtle teal border
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  gradientCard: {
    overflow: 'hidden',
  },
  customLogCard: {
    marginBottom: 20,
  },
  customLogButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    gap: 10,
  },
  customLogText: {
    color: '#40E0D0',
    fontSize: 16,
    fontWeight: '600',
  },
  customInputContainer: {
    gap: 15,
  },
  customInput: {
    backgroundColor: 'rgba(107, 114, 128, 0.2)',
    borderWidth: 1,
    borderColor: '#6B7280',
    borderRadius: 12,
    padding: 16,
    color: '#F5F5F5',
    fontSize: 16,
    textAlign: 'center',
  },
  customButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  customConfirmButton: {
    flex: 1,
  },
  customCancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6B7280',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customCancelText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '600',
  },
  undoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  undoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#6B7280',
  },
  undoButtonDisabled: {
    opacity: 0.5,
  },
  undoText: {
    color: '#9CA3AF',
    fontSize: 14,
    fontWeight: '600',
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
  achievementCard: {
    alignItems: 'center',
    marginBottom: 20,
  },
  achievementTitle: {
    color: '#F5F5F5',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  achievementText: {
    color: '#E5E7EB',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  motivationCard: {
    alignItems: 'center',
    borderColor: 'rgba(251, 146, 60, 0.3)',
    backgroundColor: 'rgba(154, 52, 18, 0.2)',
    marginBottom: 20,
  },
  motivationTitle: {
    color: '#FBBF24',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  motivationText: {
    color: '#FDE68A',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  navigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(26, 26, 26, 0.95)', // Charcoal color (swapped from background)
    borderTopWidth: 1,
    borderTopColor: 'rgba(64, 224, 208, 0.2)', // Subtle teal border
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
  const [currentPage, setCurrentPage] = useState('dashboard');

  return <Dashboard onNavigate={setCurrentPage} />;
}