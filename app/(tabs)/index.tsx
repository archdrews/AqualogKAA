import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { GradientButton } from '@/components/GradientButton';
import { LuxuryCard } from '@/components/LuxuryCard';
import { Droplets, Smartphone, Heart, TrendingUp } from 'lucide-react-native';

export default function LandingPage() {
  const benefits = [
    {
      icon: <Droplets size={32} color="#40E0D0" />,
      title: "Cross-Device Sync",
      description: "Track seamlessly across all your devices"
    },
    {
      icon: <Heart size={32} color="#40E0D0" />,
      title: "Health Awareness",
      description: "Stay mindful of your hydration goals"
    },
    {
      icon: <Smartphone size={32} color="#40E0D0" />,
      title: "Non-Invasive",
      description: "Simple logging without disruption"
    },
    {
      icon: <TrendingUp size={32} color="#40E0D0" />,
      title: "Long-term Health",
      description: "Build lasting hydration habits"
    }
  ];

  const steps = [
    { step: "1", title: "Set Your Goal", description: "Define your daily water intake target" },
    { step: "2", title: "Log Water", description: "Quick tap to record your intake" },
    { step: "3", title: "Track Progress", description: "Watch your bottle fill up" },
    { step: "4", title: "Build Habits", description: "Celebrate achievements and stay motivated" }
  ];

  return (
    <LinearGradient
      colors={['#0B1E2D', '#121212']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Stay Hydrated{'\n'}Effortlessly</Text>
          <Text style={styles.heroSubtext}>
            Track water intake in real time, across devices, with our beautiful bottle interface
          </Text>
          
          <GradientButton
            title="Get Started"
            onPress={() => console.log('Get Started')}
            size="large"
            style={styles.heroButton}
          />
        </View>

        {/* Social Proof */}
        <View style={styles.socialProof}>
          <Text style={styles.socialText}>Trusted by wellness enthusiasts</Text>
          <View style={styles.logoContainer}>
            <Text style={styles.logoPlaceholder}>WELLNESS+</Text>
            <Text style={styles.logoPlaceholder}>HEALTH CO</Text>
            <Text style={styles.logoPlaceholder}>FIT LIFE</Text>
          </View>
        </View>

        {/* Benefits */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Aqualog?</Text>
          <View style={styles.benefitsGrid}>
            {benefits.map((benefit, index) => (
              <LuxuryCard key={index} style={styles.benefitCard}>
                <View style={styles.benefitContent}>
                  {benefit.icon}
                  <Text style={styles.benefitTitle}>{benefit.title}</Text>
                  <Text style={styles.benefitDescription}>{benefit.description}</Text>
                </View>
              </LuxuryCard>
            ))}
          </View>
        </View>

        {/* How It Works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How It Works</Text>
          {steps.map((item, index) => (
            <LuxuryCard key={index} variant="gradient" style={styles.stepCard}>
              <View style={styles.stepContent}>
                <View style={styles.stepNumber}>
                  <Text style={styles.stepNumberText}>{item.step}</Text>
                </View>
                <View style={styles.stepText}>
                  <Text style={styles.stepTitle}>{item.title}</Text>
                  <Text style={styles.stepDescription}>{item.description}</Text>
                </View>
              </View>
            </LuxuryCard>
          ))}
        </View>

        {/* Testimonials */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Users Say</Text>
          <LuxuryCard style={styles.testimonial}>
            <Text style={styles.testimonialText}>
              "Aqualog transformed my hydration habits. The crystal ball visualization is both beautiful and motivating!"
            </Text>
            <View style={styles.testimonialAuthor}>
              <View style={styles.avatar} />
              <Text style={styles.authorName}>Sarah M.</Text>
            </View>
          </LuxuryCard>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <LuxuryCard variant="light" style={styles.faqCard}>
            <Text style={styles.faqQuestion}>How does cross-device sync work?</Text>
            <Text style={styles.faqAnswer}>Your data syncs seamlessly across all devices using secure cloud storage.</Text>
          </LuxuryCard>
          <LuxuryCard variant="light" style={styles.faqCard}>
            <Text style={styles.faqQuestion}>Is my data private?</Text>
            <Text style={styles.faqAnswer}>Yes, we use enterprise-grade encryption to protect your personal information.</Text>
          </LuxuryCard>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerLogo}>AQUALOG</Text>
          <View style={styles.footerLinks}>
            <Text style={styles.footerLink}>Privacy</Text>
            <Text style={styles.footerLink}>Terms</Text>
            <Text style={styles.footerLink}>Support</Text>
          </View>
          <Text style={styles.footerCopyright}>© 2025 Aqualog. All rights reserved.</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
    padding: 30,
    paddingTop: 80,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F5F5F5',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 40,
  },
  heroSubtext: {
    fontSize: 16,
    color: '#C0C0C0',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  heroButton: {
    width: '80%',
    marginBottom: 40, // Increased bottom margin to provide better spacing
  },
  socialProof: {
    padding: 20,
    alignItems: 'center',
  },
  socialText: {
    color: '#C0C0C0',
    fontSize: 14,
    marginBottom: 15,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  logoPlaceholder: {
    color: '#C0C0C0',
    fontSize: 12,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F5F5F5',
    textAlign: 'center',
    marginBottom: 20,
  },
  benefitsGrid: {
    gap: 15,
  },
  benefitCard: {
    marginBottom: 15,
  },
  benefitContent: {
    alignItems: 'center',
  },
  benefitTitle: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  benefitDescription: {
    color: '#C0C0C0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  stepCard: {
    marginBottom: 15,
  },
  stepContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(245,245,245,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  stepNumberText: {
    color: '#F5F5F5',
    fontSize: 18,
    fontWeight: '700',
  },
  stepText: {
    flex: 1,
  },
  stepTitle: {
    color: '#F5F5F5',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  stepDescription: {
    color: 'rgba(245,245,245,0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
  testimonial: {
    marginBottom: 15,
  },
  testimonialText: {
    color: '#C0C0C0',
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 15,
  },
  testimonialAuthor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#40E0D0',
    marginRight: 10,
  },
  authorName: {
    color: '#F5F5F5',
    fontSize: 14,
    fontWeight: '600',
  },
  faqCard: {
    marginBottom: 15,
  },
  faqQuestion: {
    color: '#0B1E2D',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  faqAnswer: {
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#C0C0C0',
  },
  footerLogo: {
    color: '#40E0D0',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
  },
  footerLinks: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 15,
  },
  footerLink: {
    color: '#C0C0C0',
    fontSize: 14,
  },
  footerCopyright: {
    color: '#C0C0C0',
    fontSize: 12,
  },
});