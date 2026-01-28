import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={true}>
        <Text style={styles.lastUpdated}>Last Updated: December 30, 2025</Text>

        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.paragraph}>
          Welcome to Crowd ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.
        </Text>

        <Text style={styles.sectionTitle}>2. Information We Collect</Text>
        <Text style={styles.paragraph}>
          We collect information that you provide directly to us, including:
        </Text>
        <Text style={styles.bulletPoint}>• Phone number for account registration and verification</Text>
        <Text style={styles.bulletPoint}>• Profile information (name, photo, bio)</Text>
        <Text style={styles.bulletPoint}>• Event attendance and preferences</Text>
        <Text style={styles.bulletPoint}>• Messages and communications with other users</Text>
        <Text style={styles.bulletPoint}>• Location data (with your permission)</Text>
        <Text style={styles.bulletPoint}>• Device information and usage data</Text>

        <Text style={styles.sectionTitle}>3. How We Use Your Information</Text>
        <Text style={styles.paragraph}>
          We use the information we collect to:
        </Text>
        <Text style={styles.bulletPoint}>• Create and manage your account</Text>
        <Text style={styles.bulletPoint}>• Connect you with event attendees and friends</Text>
        <Text style={styles.bulletPoint}>• Send verification codes and notifications</Text>
        <Text style={styles.bulletPoint}>• Improve and personalize your experience</Text>
        <Text style={styles.bulletPoint}>• Analyze usage patterns and trends</Text>
        <Text style={styles.bulletPoint}>• Prevent fraud and ensure platform security</Text>
        <Text style={styles.bulletPoint}>• Comply with legal obligations</Text>

        <Text style={styles.sectionTitle}>4. Information Sharing</Text>
        <Text style={styles.paragraph}>
          We may share your information in the following circumstances:
        </Text>
        <Text style={styles.bulletPoint}>• With other users as part of the social features of the App</Text>
        <Text style={styles.bulletPoint}>• With service providers who assist in operating the App</Text>
        <Text style={styles.bulletPoint}>• When required by law or to protect rights and safety</Text>
        <Text style={styles.bulletPoint}>• In connection with a business transaction (merger, sale, etc.)</Text>
        <Text style={styles.paragraph}>
          We do not sell your personal information to third parties.
        </Text>

        <Text style={styles.sectionTitle}>5. Data Security</Text>
        <Text style={styles.paragraph}>
          We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </Text>

        <Text style={styles.sectionTitle}>6. Data Retention</Text>
        <Text style={styles.paragraph}>
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
        </Text>

        <Text style={styles.sectionTitle}>7. Your Rights</Text>
        <Text style={styles.paragraph}>
          Depending on your location, you may have the following rights:
        </Text>
        <Text style={styles.bulletPoint}>• Access your personal information</Text>
        <Text style={styles.bulletPoint}>• Correct inaccurate or incomplete information</Text>
        <Text style={styles.bulletPoint}>• Request deletion of your information</Text>
        <Text style={styles.bulletPoint}>• Object to or restrict processing</Text>
        <Text style={styles.bulletPoint}>• Data portability</Text>
        <Text style={styles.bulletPoint}>• Withdraw consent at any time</Text>

        <Text style={styles.sectionTitle}>8. Children's Privacy</Text>
        <Text style={styles.paragraph}>
          Our App is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
        </Text>

        <Text style={styles.sectionTitle}>9. Location Data</Text>
        <Text style={styles.paragraph}>
          We may collect and use location data to provide location-based features. You can enable or disable location services through your device settings at any time.
        </Text>

        <Text style={styles.sectionTitle}>10. Third-Party Links</Text>
        <Text style={styles.paragraph}>
          The App may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies.
        </Text>

        <Text style={styles.sectionTitle}>11. Changes to Privacy Policy</Text>
        <Text style={styles.paragraph}>
          We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last Updated" date and, for material changes, we will provide additional notice.
        </Text>

        <Text style={styles.sectionTitle}>12. California Privacy Rights</Text>
        <Text style={styles.paragraph}>
          California residents have specific rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected, the right to delete personal information, and the right to opt-out of the sale of personal information.
        </Text>

        <Text style={styles.sectionTitle}>13. International Users</Text>
        <Text style={styles.paragraph}>
          If you are accessing the App from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located.
        </Text>

        <Text style={styles.sectionTitle}>14. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:
        </Text>
        <Text style={styles.paragraph}>
          Email: privacy@crowdapp.com{'\n'}
          Address: [Your Company Address]
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
