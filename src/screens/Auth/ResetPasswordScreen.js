import { BackHandler, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';

//---------
import { Container, Typography } from '../../atomComponents';
import { Button, Header, TextField } from '../../components';
import { COLORS } from '../../globalStyle/Theme';
import InputLabel from '../../components/customFields/InputLabel';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';
import SlideInView from '../../animations/SlideView';
import { CommonActions } from '@react-navigation/native';
import FormController from '../../components/formController/FormController';
import validatoinSchema from '../../validations';
import { useCustomMutation } from '../../query/useCustomMutation';
import { resetPassword } from '../../api/userService';
import { onResetPasswordError } from '../../query/partials/responseManager';

const ResetPasswordScreen = ({ navigation, route }) => {
  const email = route?.params?.email;
  const [screenType, setScreenType] = useState('verification');

  // Custom Mutation Hook:
  const { mutate: resetPass, isPending } = useCustomMutation({
    mutationFn: resetPassword,
    onSuccess: response => {
      if (response?.message) {
        setScreenType('success');
      }
    },
    on422Error: parsedErrors => {
      if (parsedErrors?.otp) {
        setScreenType('verification');
      }
    },
    onError: response =>
      onResetPasswordError(response, setScreenType, navigation),
  });

  //Handle Reset Password
  const handleResetPassword = values => {
    resetPass(values);
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (screenType == 'reset') {
          setScreenType('verification');
          return true;
        } else {
          return false;
        }
      },
    );

    return () => backHandler.remove();
  }, [screenType]);

  return (
    <Container
      isKeyboardAvoid
      isPaddingVertical={screenType !== 'success'}
      isTextureVisible
      conStyle={
        screenType == 'success' && {
          justifyContent: 'center',
          alignItem: 'center',
        }
      }>
      {screenType !== 'success' && (
        <Header
          isBackVisible={screenType !== 'success'}
          centerType="goback"
          onPresBack={
            screenType == 'reset' ? () => setScreenType('verification') : null
          }
        />
      )}

      <FormController
        initialValues={{
          otp: '',
          password: __DEV__ ? 'Admin@1234' : "",
          password_confirmation: __DEV__ ? 'Admin@1234' : "",
          email: email,
        }}
        validationSchema={validatoinSchema.AuthValidations.ResetPasswordSchema}
        onSubmit={handleResetPassword}>
        {props => {
          const {
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            setErrors,
            setFieldTouched,
          } = props;

          return (
            <>
              {screenType === 'verification' && (
                <SlideInView slide="right" lideDuration={400}>
                  <Typography
                    size={32}
                    mT={25}
                    fFamily="interTightSemiBold600"
                    mR={10}>
                    Verify Your Email
                  </Typography>
                  <Typography size={14} mT={25} LineHeight={22}>
                    We have sent you a verification code to{' '}
                    <Typography color={COLORS.primary}> {email}</Typography>.
                    Please enter the code below.
                  </Typography>

                  <InputLabel title="Enter Code:" mT={30} />
                  <TextField
                    placeholder="Enter 6-Digit Code"
                    value={values?.otp}
                    error={errors?.otp}
                    handleChange={handleChange('otp')}
                    handleBlur={handleBlur('otp')}
                    leftIcon
                    leftIconName="number"
                    leftIconFamily="Octicons"
                    keyboardType="number-pad"
                    maxLength={6}
                  />
                  <Button
                    label={'Verify'}
                    mt={35}
                    onPress={async () => {
                      try {
                        await validatoinSchema.AuthValidations.ResetPasswordSchema.validateAt(
                          'otp',
                          values,
                        );
                        setScreenType('reset');
                      } catch (err) {
                        setFieldTouched('otp', true);
                        setErrors({ otp: err.message });
                      }
                    }}
                  />
                </SlideInView>
              )}

              {screenType === 'reset' && (
                <SlideInView slide="right" slideDuration={350}>
                  <Typography
                    size={32}
                    mT={25}
                    fFamily="interTightSemiBold600"
                    mR={10}>
                    Reset Your Password
                  </Typography>
                  <Typography size={14} mT={25} LineHeight={22}>
                    Please enter your new password below.
                  </Typography>

                  <InputLabel title="New Password" />
                  <TextField
                    placeholder="New Password"
                    value={values?.password}
                    error={errors?.password}
                    handleChange={handleChange('password')}
                    handleBlur={handleBlur('password')}
                    leftIcon
                    leftIconName="key"
                    rightIcon
                    password
                  />
                  <InputLabel title="Confirm New Password" />
                  <TextField
                    placeholder="Confirm New Password"
                    value={values?.password_confirmation}
                    error={errors?.password_confirmation}
                    handleChange={handleChange('password_confirmation')}
                    handleBlur={handleBlur('password_confirmation')}
                    leftIcon
                    leftIconName="key"
                    rightIcon
                    password
                  />
                  <Button
                    label={'Change Password'}
                    mt={35}
                    loader={isPending}
                    onPress={handleSubmit}
                  />
                </SlideInView>
              )}

              {screenType === 'success' && (
                <SlideInView slide="right" slideDuration={350}>
                  <SuccessMessage
                    title="Password Changed Successfully"
                    message="You have successfully updated your password. Please use your new password when logging in."
                    buttonLabel="Login Now"
                    onPress={() =>
                      navigation.dispatch(
                        CommonActions.reset({
                          index: 0,
                          routes: [
                            {
                              name: 'LoginScreen',
                            },
                          ],
                        }),
                      )
                    }
                  />
                </SlideInView>
              )}
            </>
          );
        }}
      </FormController>
    </Container>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({});
