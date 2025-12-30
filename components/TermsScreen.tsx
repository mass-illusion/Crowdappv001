import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TermsScreenProps {
  onBack: () => void;
}

export default function TermsScreen({ onBack }: TermsScreenProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={true}>
        <Text style={styles.lastUpdated}>Last Updated: December 30, 2025</Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing and using Crowd ("the App"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms & Conditions, please do not use the App.
        </Text>

        <Text style={styles.sectionTitle}>2. Use License</Text>
        <Text style={styles.paragraph}>
          Permission is granted to temporarily download one copy of the App for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
        </Text>
        <Text style={styles.bulletPoint}>• Modify or copy the materials</Text>
        <Text style={styles.bulletPoint}>• Use the materials for any commercial purpose</Text>
        <Text style={styles.bulletPoint}>• Attempt to decompile or reverse engineer any software contained in the App</Text>
        <Text style={styles.bulletPoint}>• Remove any copyright or other proprietary notations from the materials</Text>

        <Text style={styles.sectionTitle}>3. User Account</Text>
        <Text style={styles.paragraph}>
          You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
        </Text>

        <Text style={styles.sectionTitle}>4. User Conduct</Text>
        <Text style={styles.paragraph}>
          You agree not to use the App to:
        </Text>
        <Text style={styles.bulletPoint}>• Violate any applicable laws or regulations</Text>
        <Text style={styles.bulletPoint}>• Harass, abuse, or harm another person</Text>
        <Text style={styles.bulletPoint}>• Impersonate or misrepresent your affiliation with any person or entity</Text>
        <Text style={styles.bulletPoint}>• Post or transmit any content that is unlawful, threatening, abusive, or obscene</Text>
        <Text style={styles.bulletPoint}>• Interfere with or disrupt the App or servers</Text>

        <Text style={styles.sectionTitle}>5. Content</Text>
        <Text style={styles.paragraph}>
          Users may post, upload, or submit content to the App. By posting content, you grant Crowd a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content in connection with the service.
        </Text>

        <Text style={styles.sectionTitle}>6. Privacy</Text>
        <Text style={styles.paragraph}>
          Your use of the App is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
        </Text>

        <Text style={styles.sectionTitle}>7. Termination</Text>
        <Text style={styles.paragraph}>
          We may terminate or suspend your account and access to the App immediately, without prior notice or liability, for any reason, including breach of these Terms & Conditions.
        </Text>

        <Text style={styles.sectionTitle}>8. Disclaimers</Text>
        <Text style={styles.paragraph}>
          The App is provided "as is" without any warranties, expressed or implied. Crowd does not warrant that the App will be uninterrupted, secure, or error-free.
        </Text>

        <Text style={styles.sectionTitle}>9. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          In no event shall Crowd or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the App.
        </Text>

        <Text style={styles.sectionTitle}>10. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We reserve the right to modify these terms at any time. We will notify users of any changes by updating the "Last Updated" date. Your continued use of the App after changes constitutes acceptance of the modified terms.
        </Text>

        <Text style={styles.sectionTitle}>11. Contact Information</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these Terms & Conditions, please contact us at support@crowdapp.com
        </Text>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 32,
    color: '#000000',
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
  },
  lastUpdated: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 22,
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 22,
    marginBottom: 5,
    marginLeft: 15,
  },
  bottomSpacer: {
    height: 40,
  },
});
