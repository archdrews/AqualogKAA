import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CrystalBallProps {
  waterLevel: number; // 0-100 percentage
  showClock?: boolean;
  clockType?: 'analog' | 'digital';
}

export function CrystalBall({ waterLevel, showClock = true, clockType = 'analog' }: CrystalBallProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const rotateValue = useRef(new Animated.Value(0)).current;
  const currentTime = new Date();

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: waterLevel / 100,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    // Continuous rotation animation for analog clock
    if (clockType === 'analog') {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 60000, // 1 minute rotation
          useNativeDriver: true,
        })
      ).start();
    }
  }, [waterLevel, clockType]);

  const waterHeight = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const formatTime = () => {
    return currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.crystalBall}>
        {/* Water animation */}
        <View style={styles.waterContainer}>
          <Animated.View style={[styles.water, { height: waterHeight }]}>
            <LinearGradient
              colors={['#009688', '#40E0D0']}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        </View>

        {/* Clock overlay */}
        {showClock && (
          <View style={styles.clockContainer}>
            {clockType === 'analog' ? (
              <View style={styles.analogClock}>
                <View style={styles.clockFace}>
                  <Animated.View style={[styles.clockHand, { transform: [{ rotate }] }]} />
                  <View style={styles.clockCenter} />
                </View>
              </View>
            ) : (
              <Text style={styles.digitalClock}>{formatTime()}</Text>
            )}
          </View>
        )}

        {/* Crystal reflection */}
        <LinearGradient
          colors={['rgba(255,255,255,0.3)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.reflection}
        />
      </View>

      {/* Water level indicator */}
      <Text style={styles.levelText}>{Math.round(waterLevel)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  crystalBall: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderColor: '#C0C0C0',
    overflow: 'hidden',
    shadowColor: '#40E0D0',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 16,
    position: 'relative',
  },
  waterContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '100%',
    justifyContent: 'flex-end',
  },
  water: {
    width: '100%',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    overflow: 'hidden',
  },
  clockContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
  },
  analogClock: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clockFace: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(11,30,45,0.8)',
  },
  clockHand: {
    position: 'absolute',
    width: 2,
    height: 20,
    backgroundColor: '#F5F5F5',
    top: 5,
  },
  clockCenter: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#F5F5F5',
  },
  digitalClock: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    backgroundColor: 'rgba(11,30,45,0.8)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  reflection: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: '50%',
    height: '30%',
    borderRadius: 100,
  },
  levelText: {
    color: '#40E0D0',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
  },
});