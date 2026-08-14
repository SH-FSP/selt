import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
//---------
import {Container, Typography} from '../../../atomComponents';
import {Header} from '../../../components';
import {COLORS, GLOBALSTYLE} from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import {SubTitle} from '../../../components/Text/SubTitle';
import ImageGrid from '../../../components/imagePicker/ImageGrid';

const ServicePhotosScreen = ({navigation, route}) => {
  const serviceImages = route.params?.serviceImages;

  return (
    <Container isPaddingVertical={false} isTextureVisible>
      <Header  title="Photos" />
      <ScrollView
        contentContainerStyle={{paddingBottom: 200}}
        showsVerticalScrollIndicator={false}>
        <ImageGrid images={serviceImages} />
      </ScrollView>
    </Container>
  );
};

export default ServicePhotosScreen;

const styles = StyleSheet.create({
  headerBackground: {
    height: Sizer.vSize(377),
    borderBottomLeftRadius: Sizer.hSize(24),
    borderBottomRightRadius: Sizer.hSize(24),
    overflow: 'hidden',
    paddingHorizontal: Sizer.hSize(24),
    paddingTop: Sizer.vSize(24),
    alignItems: 'center',
  },
  time: {
    width: Sizer.vSize(15),
    height: Sizer.vSize(15),
  },
  separator: {
    marginTop: Sizer.vSize(27),
  },
});
