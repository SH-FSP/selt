import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';

import { Container, Typography } from '../../../atomComponents';
import { Header } from '../../../components';
import { CLIENT_PROFILE } from '../../../constants/clientProfile';
import { COLORS, GLOBALSTYLE } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';

const HIGHLIGHTS = [
  { title: 'Experience', description: 'Years of trusted business guidance.' },
  { title: 'Integrity', description: 'Honest advice you can rely on.' },
  { title: 'Personalized', description: 'Solutions tailored to your goals.' },
];

const AdvisorScreen = () => {
  return (
    <Container
      conStyle={styles.container}
      isPadding={false}
      isPaddingVertical={false}
    >
      <Header type="app" title="Your Advisor" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.heroSection}>
          <Image
            source={CLIENT_PROFILE.image}
            style={styles.avatar}
            resizeMode="cover"
          />
          <Typography
            size={22}
            color={COLORS.white100}
            fFamily="interTightSemiBold600"
            textAlign="center"
            mT={20}
            LineHeight={28}
          >
            {CLIENT_PROFILE.name}
          </Typography>
          <Typography
            size={14}
            color={COLORS.grey100}
            fFamily="poppinsRegular400"
            textAlign="center"
            mT={6}
          >
            {CLIENT_PROFILE.role}
          </Typography>
        </View>

        <View style={styles.body}>
          <Typography size={15} color={COLORS.grey100} LineHeight={24} mB={20}>
            {CLIENT_PROFILE.bio}
          </Typography>

          <View style={styles.divider} />

          <Typography
            size={14}
            color={COLORS.white100}
            fFamily="poppinsMedium500"
            mB={12}
          >
            {CLIENT_PROFILE.tagline}
          </Typography>

          <View style={styles.divider} />

          {HIGHLIGHTS.map(item => (
            <View key={item.title} style={styles.row}>
              <Typography
                size={14}
                color={COLORS.white100}
                fFamily="poppinsMedium500"
                style={styles.rowTitle}
              >
                {item.title}
              </Typography>
              <Typography size={13} color={COLORS.grey100} LineHeight={20}>
                {item.description}
              </Typography>
            </View>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
};

export default AdvisorScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    paddingBottom: Sizer.hSize(24),
  },
  heroSection: {
    alignItems: 'center',
    ...GLOBALSTYLE.paddingHor,
    paddingTop: Sizer.vSize(8),
    paddingBottom: Sizer.vSize(24),
  },
  avatar: {
    width: Sizer.hSize(120),
    height: Sizer.hSize(120),
    borderRadius: Sizer.hSize(60),
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  body: {
    ...GLOBALSTYLE.paddingHor,
    paddingTop: Sizer.vSize(8),
    paddingBottom: Sizer.vSize(32),
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginVertical: Sizer.vSize(20),
  },
  row: {
    marginBottom: Sizer.vSize(18),
  },
  rowTitle: {
    marginBottom: Sizer.vSize(4),
  },
});
