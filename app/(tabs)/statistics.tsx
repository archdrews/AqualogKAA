import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart3, TrendingUp, Award, Home, Settings } from 'lucide-react-native';

const { width } = Dimensions.get('window');

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

// Bar Chart Component
const BarChart = ({ data, type }) => {
  const maxBarWidth = type === 'monthly' ? 8 : 25;
  const chartWidth = width - 80; // Account for card padding
  const availableWidth = chartWidth - 40; // Account for chart padding
  const barWidth = type === 'monthly' ? 6 : Math.min(maxBarWidth, availableWidth / data.length - 4);
  
  return (
    <View style={styles.chartContainer}>
      <View style={styles.chart}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chartContent}
        >
          {data.map((item, index) => {
            const height = (item.percentage / 100) * 150;
            return (
              <View key={index} style={styles.barContainer}>
                <View style={[styles.barBackground, { width: barWidth }]}>
                  <LinearGradient
                    colors={['#40E0D0', '#009688']}
                    style={[
                      styles.bar,
                      { 
                        height: Math.max(height, 2), // Minimum height for visibility
                        width: barWidth,
                      }
                    ]}
                  />
                </View>
                {type !== 'monthly' && (
                  <Text style={styles.barLabel}>
                    {type === 'yearly' ? item.month : item.day}
                  </Text>
                )}
              </View>
            );
          })}
        </ScrollView>
      </View>
      
      {/* Grid lines */}
      <View style={styles.gridLines}>
        {[25, 50, 75, 100].map((percentage) => (
          <View
            key={percentage}
            style={[
              styles.gridLine,
              { bottom: (percentage / 100) * 150 }
            ]}
          />
        ))}
      </View>
    </View>
  );
};

// Tab Button Component
const TabButton = ({ title, isActive, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.tabButtonContainer}>
    {isActive ? (
      <LinearGradient
        colors={['#009688', '#40E0D0']}
        style={styles.tabButton}
      >
        <Text style={styles.activeTabText}>{title}</Text>
      </LinearGradient>
    ) : (
      <View style={styles.inactiveTabButton}>
        <Text style={styles.inactiveTabText}>{title}</Text>
      </View>
    )}
  </TouchableOpacity>
);

// Main Statistics Component
const Statistics = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('weekly');

  // Mock data
  const weeklyData = [
    { day: 'Mon', percentage: 85, amount: 1700 },
    { day: 'Tue', percentage: 92, amount: 1840 },
    { day: 'Wed', percentage: 78, amount: 1560 },
    { day: 'Thu', percentage: 100, amount: 2000 },
    { day: 'Fri', percentage: 95, amount: 1900 },
    { day: 'Sat', percentage: 100, amount: 2000 },
    { day: 'Sun', percentage: 88, amount: 1760 },
  ];

  const monthlyData = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    percentage: Math.floor(Math.random() * 40) + 60, // 60-100%
  }));

  const yearlyData = [
    { month: 'Jan', percentage: 82 },
    { month: 'Feb', percentage: 88 },
    { month: 'Mar', percentage: 75 },
    { month: 'Apr', percentage: 90 },
    { month: 'May', percentage: 95 },
    { month: 'Jun', percentage: 92 },
    { month: 'Jul', percentage: 98 },
    { month: 'Aug', percentage: 85 },
    { month: 'Sep', percentage: 91 },
    { month: 'Oct', percentage: 87 },
    { month: 'Nov', percentage: 93 },
    { month: 'Dec', percentage: 89 },
  ];

  const getAverageForPeriod = () => {
    let data;
    switch (activeTab) {
      case 'weekly':
        data = weeklyData;
        break;
      case 'monthly':
        data = monthlyData;
        break;
      case 'yearly':
        data = yearlyData;
        break;
      default:
        data = weeklyData;
    }
    return Math.round(data.reduce((acc, item) => acc + item.percentage, 0) / data.length);
  };

  const getCurrentData = () => {
    switch (activeTab) {
      case 'weekly':
        return weeklyData;
      case 'monthly':
        return monthlyData;
      case 'yearly':
        return yearlyData;
      default:
        return weeklyData;
    }
  };

  const getInsightsForPeriod = () => {
    switch (activeTab) {
      case 'weekly':
        return [
          '• Best day: Thursday (100% target)',
          '• Most consistent: Weekend performance',
          '• Improvement: +12% from last week'
        ];
      case 'monthly':
        return [
          '• Best streak: 5 consecutive days at 100%',
          '• Average daily intake: 1,847ml',
          '• Monthly improvement: +8%'
        ];
      case 'yearly':
        return [
          '• Best month: July (98% average)',
          '• Most improved: May (+15% from April)',
          '• Yearly consistency: 89% average'
        ];
      default:
        return [];
    }
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
            <BarChart3 size={32} color="#40E0D0" />
            <Text style={styles.title}>Statistics</Text>
          </View>
          <Text style={styles.subtitle}>Track your hydration journey</Text>
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <LuxuryCard style={styles.summaryCard}>
            <TrendingUp size={24} color="#40E0D0" />
            <Text style={styles.summaryValue}>{getAverageForPeriod()}%</Text>
            <Text style={styles.summaryLabel}>Average Achievement</Text>
          </LuxuryCard>

          <LuxuryCard style={styles.summaryCard}>
            <Award size={24} color="#FFD700" />
            <Text style={styles.summaryValue}>7</Text>
            <Text style={styles.summaryLabel}>Perfect Days</Text>
          </LuxuryCard>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TabButton
            title="Weekly"
            isActive={activeTab === 'weekly'}
            onPress={() => setActiveTab('weekly')}
          />
          <TabButton
            title="Monthly"
            isActive={activeTab === 'monthly'}
            onPress={() => setActiveTab('monthly')}
          />
          <TabButton
            title="Yearly"
            isActive={activeTab === 'yearly'}
            onPress={() => setActiveTab('yearly')}
          />
        </View>

        {/* Chart Card */}
        <LuxuryCard style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Progress
            </Text>
            <Text style={styles.chartSubtitle}>
              Percentage of daily target achieved
            </Text>
          </View>

          <BarChart data={getCurrentData()} type={activeTab} />
        </LuxuryCard>

        {/* Insights */}
        <LuxuryCard variant="gradient" style={styles.insightsCard}>
          <Text style={styles.insightsTitle}>
            💡 {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Insights
          </Text>
          <View style={styles.insights}>
            {getInsightsForPeriod().map((insight, index) => (
              <Text key={index} style={styles.insightItem}>{insight}</Text>
            ))}
          </View>
        </LuxuryCard>

        {/* Achievement Badges */}
        <LuxuryCard style={styles.achievementsCard}>
          <Text style={styles.achievementsTitle}>🏆 Achievements</Text>
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeEmoji}>🌊</Text>
              <Text style={styles.badgeText}>Week Warrior</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeEmoji}>💪</Text>
              <Text style={styles.badgeText}>Consistency King</Text>
            </View>
            <View style={[styles.badge, styles.lockedBadge]}>
              <Text style={styles.badgeEmoji}>🔒</Text>
              <Text style={styles.badgeText}>Perfect Month</Text>
            </View>
          </View>
        </LuxuryCard>
      </ScrollView>

      <Navigation currentPage="stats" onNavigate={onNavigate} />
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
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    gap: 10,
    paddingVertical: 15,
  },
  summaryValue: {
    color: '#F5F5F5',
    fontSize: 24,
    fontWeight: '700',
  },
  summaryLabel: {
    color: '#C0C0C0',
    fontSize: 12,
    textAlign: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  tabButtonContainer: {
    flex: 1,
  },
  tabButton: {
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  inactiveTabButton: {
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  activeTabText: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  inactiveTabText: {
    color: '#C0C0C0',
    fontSize: 14,
    fontWeight: '600',
  },
  chartCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  chartHeader: {
    marginBottom: 20,
  },
  chartTitle: {
    color: '#F5F5F5',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  chartSubtitle: {
    color: '#C0C0C0',
    fontSize: 14,
  },
  chartContainer: {
    position: 'relative',
    height: 180,
  },
  chart: {
    height: 150,
    justifyContent: 'flex-end',
  },
  chartContent: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    minWidth: '100%',
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 2,
    gap: 8,
  },
  barBackground: {
    backgroundColor: 'rgba(192,192,192,0.2)',
    height: 150,
    borderRadius: 4,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  bar: {
    borderRadius: 4,
    minHeight: 2,
  },
  barLabel: {
    color: '#C0C0C0',
    fontSize: 12,
    fontWeight: '600',
  },
  gridLines: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 150,
  },
  gridLine: {
    position: 'absolute',
    left: 10,
    right: 10,
    height: 1,
    backgroundColor: 'rgba(192,192,192,0.2)',
  },
  insightsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  insightsTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  insights: {
    gap: 8,
  },
  insightItem: {
    color: 'rgba(245,245,245,0.9)',
    fontSize: 14,
    lineHeight: 20,
  },
  achievementsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  achievementsTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  badges: {
    flexDirection: 'row',
    gap: 15,
  },
  badge: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  badgeEmoji: {
    fontSize: 24,
  },
  badgeText: {
    color: '#C0C0C0',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  lockedBadge: {
    opacity: 0.5,
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
  const [currentPage, setCurrentPage] = useState('stats');

  return <Statistics onNavigate={setCurrentPage} />;
}