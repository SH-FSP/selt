import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

//------
import { Container, Typography } from '../../atomComponents';
import { Button, Header, TextField } from '../../components';
import { BASEOPACITY, COLORS } from '../../globalStyle/Theme';
import InputLabel from '../../components/customFields/InputLabel';
import SlideInView from '../../animations/SlideView';
import Sizer from '../../helpers/Sizer';
import SuccessMessage from '../../components/SuccessMessage/SuccessMessage';
import { useCustomMutation } from '../../query/useCustomMutation';
import { resendOtp, verifyEmail } from '../../api/userService';
import FormController from '../../components/formController/FormController';
import validatoinSchema from '../../validations';
import { useCustomQuery } from '../../query/useCustomQuery';
import { showMessage } from '../../utils';

const VerifyEmailScreen = ({ navigation, route }) => {
  const comeFromLogin = route.params?.fromLogin;

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Custom Query Hook:
  const { refetch: fetchOtp, isFetching } = useCustomQuery({
    queryKey: ['otp'],
    queryFn: resendOtp,
    enabled: false,
  });

  // Custom Mutation Hook:
  const { mutate: requestVerifyEmail, isPending } = useCustomMutation({
    mutationFn: verifyEmail,
    onSuccess: response => {
      if (response.status) {
        setIsEmailVerified(true);
      }
    },
  });

  // Resend Otp Request:
  const handleResendOtp = () => {
    fetchOtp().then(response => {
      showMessage({ type: 'success', message: response.data.message });
    });
  };

  // Enail Vefity Request:
  const handleVerifyEmail = otp => {
    requestVerifyEmail(otp);
  };

  return (
    <Container
      isKeyboardAvoid
      isTextureVisible
      isPaddingVertical={!isEmailVerified}
      conStyle={
        isEmailVerified && { justifyContent: 'center', alignItem: 'center' }
      }
    >
      {!isEmailVerified && (
        <Header isBackVisible={!isEmailVerified} centerType="goback" />
      )}
      {!isEmailVerified && (
        <>
          <Typography size={32} mT={25} fFamily="interTightSemiBold600" mR={10}>
            Verify Your Email{' '}
          </Typography>
          <Typography size={14} mT={25} LineHeight={22}>
            We have sent you a verification code to your provided email address,
            Please enter the code.{' '}
          </Typography>

          <FormController
            initialValues={{
              otp: '',
            }}
            validationSchema={validatoinSchema.AuthValidations.verifyOtpSchema}
            onSubmit={handleVerifyEmail}
          >
            {props => {
              const { handleSubmit, handleChange, values, errors, handleBlur } =
                props;

              return (
                <>
                  <InputLabel title="Enter Code:" mT={30} />
                  <TextField
                    placeholder="Enter 6-Digit Code"
                    leftIcon
                    leftIconName="number"
                    leftIconFamily="Octicons"
                    keyboardType="number-pad"
                    maxLength={6}
                    handleChange={handleChange('otp')}
                    value={values?.otp}
                    error={errors?.otp}
                    onBlur={handleBlur('otp')}
                  />
                  <TouchableOpacity
                    activeOpacity={BASEOPACITY}
                    style={styles.resenStyles}
                    disabled={isFetching}
                    onPress={handleResendOtp}
                  >
                    <Typography fontSize={14} fFamily="poppinsMedium500">
                      Didn’t receive the code?{' '}
                      <Typography
                        fontSize={15}
                        mL={6}
                        fFamily="poppinsMedium500"
                        color={COLORS.primary}
                      >
                        Resend Now{' '}
                      </Typography>
                    </Typography>
                  </TouchableOpacity>
                  <Button
                    label={'Verify Now'}
                    mt={35}
                    type="primary"
                    onPress={handleSubmit}
                    loader={isPending}
                  />
                </>
              );
            }}
          </FormController>
        </>
      )}

      {isEmailVerified && (
        <SlideInView slide="right" slideDuration={350}>
          <SuccessMessage
            title="Email Verified Successfully"
            message="Your email has been successfully verified. You can now log in to your account."
            buttonLabel={comeFromLogin ? 'Go to Home' : 'Login Now'}
            onPress={() => {
              comeFromLogin
                ? navigation.replace('DrawerTabs')
                : navigation.goBack();
            }}
          />
        </SlideInView>
      )}
    </Container>
  );
};

export default VerifyEmailScreen;

const styles = StyleSheet.create({
  resenStyles: {
    justifyContent: 'center',
    marginTop: Sizer.vSize(25),
    alignItems: 'center',
  },
});
