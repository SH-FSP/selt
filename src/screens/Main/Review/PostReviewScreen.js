import {Image, Keyboard, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Container, Typography} from '../../../atomComponents';
import {Button, Header, TextField} from '../../../components';
import SlideInView from '../../../animations/SlideView';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, GLOBALSTYLE} from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import StarRating from '../../_partials/Reviews/StarRating';
import FormController from '../../../components/formController/FormController';
import validatoinSchema from '../../../validations';
import {useCustomMutation} from '../../../query/useCustomMutation';
import {postReviews} from '../../../api/generalService';
import {showMessage} from '../../../utils';
import {queryClient} from '../../../api/api';

const PostReviewScreen = ({route, navigation}) => {
  const booking_id = route?.params?.booking_id;

  const {mutate: submitReviews, isPending} = useCustomMutation({
    mutationFn: postReviews,
    onSuccess: (response, {resetForm}) => {
      if (response?.status) {
        queryClient.invalidateQueries({queryKey: ['bookings']});
        showMessage({type: 'success', message: response?.message});
        resetForm();
        navigation.goBack();
      }
    },
  });

  const {user} = useSelector(state => state.app);

  const handleSubmitReviews = (values, {resetForm}) => {
    Keyboard.dismiss();
    submitReviews({...values, booking_id, resetForm});
  };

  return (
    <Container
      isTextureVisible
      isPaddingVertical={false}
      isPadding={false}
      isKeyboardAvoid>
      <Header title="Post Review" type="app" />
      <View style={GLOBALSTYLE.paddingHor}>
        <View style={styles.userInfo}>
          <Image source={{uri: user?.image}} style={styles.avatar} />
          <View style={{flex: 1}}>
            <Typography style={styles.userName}>
              {user?.name?.substring(0, 15)}
            </Typography>
            <Typography style={styles.info}>
              Reviews are public and include your account name
            </Typography>
          </View>
        </View>
        <FormController
          initialValues={{
            star: '',
            description: '',
          }}
          validationSchema={validatoinSchema.UserValidations.reviewFormSchema}
          onSubmit={handleSubmitReviews}>
          {props => {
            const {
              handleSubmit,
              handleChange,
              values,
              errors,
              handleBlur,
              setFieldValue,
            } = props;

            return (
              <>
                <StarRating
                  allowRate
                  onPressRating={rating => setFieldValue('star', rating)}
                  ratingStar={values?.star}
                />
                {errors?.star ? (
                  <Typography
                    size={13}
                    color={COLORS.red}
                    mT={6}
                    style={styles.errorText}
                    LineHeight={16}>
                    {errors?.star}
                  </Typography>
                ) : null}
                <TextField
                  placeholder="Describe your experience"
                  multiline={true}
                  containerSt={styles.cont}
                  inputStyle={{
                    textAlignVertical: 'top',
                    paddingTop:
                      Platform.OS === 'ios' ? Sizer.vSize(10) : undefined,
                  }}
                  handleChange={handleChange('description')}
                  value={values?.description}
                  error={errors?.description}
                  onBlur={handleBlur('description')}
                  maxLength={500}
                  borderInactiveColor={COLORS.grey100}
                  borderInactiveWidth={Sizer.fS(1.3)}
                  numberOfLines={10}
                  mT={24}
                />
                <Button
                  label="Post"
                  type="secondary"
                  mt={26}
                  onPress={handleSubmit}
                  loader={isPending}
                />
              </>
            );
          }}
        </FormController>
      </View>
    </Container>
  );
};

export default PostReviewScreen;

const styles = StyleSheet.create({
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Sizer.hSize(20),
    marginTop: Sizer.hSize(24),
  },
  userName: {
    fontSize: Sizer.fS(18),
    fontFamily: FONTS.poppinsMedium500,
    color: COLORS.black100,
  },
  info: {
    color: COLORS.black400,
    fontSize: Sizer.fS(16),
    fontFamily: FONTS.poppinsRegular400,
    width: Sizer.hSize(260),
  },
  avatar: {
    height: Sizer.hSize(59),
    width: Sizer.hSize(59),
    borderRadius: Sizer.hSize(35),
    marginRight: Sizer.vSize(12),
    borderWidth: Sizer.fS(2),
    borderColor: COLORS.secondary,
    boxSizing: 'content-box',
  },
  cont: {
    height: Sizer.vSize(138),
    borderRadius: Sizer.vSize(20),
    alignItems: 'flex-start',
    paddingLeft: Sizer.hSize(6),
    paddingTop: Sizer.hSize(6),
  },
  errorText: {
    marginLeft: Sizer.hSize(6),
    marginRight: Sizer.hSize(6),
  },
});
