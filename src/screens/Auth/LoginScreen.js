import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
//-----------
import { Container, Flex, Typography } from '../../atomComponents';
import { MainLogoSvg } from '../../assets/svgs';
import { wave } from '../../assets/images';
import Sizer from '../../helpers/Sizer';
import InputLabel from '../../components/customFields/InputLabel';
import { Button, Header, TextField } from '../../components';
import { COLORS, GLOBALSTYLE } from '../../globalStyle/Theme';
import FormController from '../../components/formController/FormController';
import validatoinSchema from '../../validations';
import { KEYS } from '../../constants';
import { login } from '../../api/userService';
import useFormErrorsRef from '../../query/partials/useFormErrorsRef';
import { useCustomMutation } from '../../query/useCustomMutation';
import { onLoginSuccess } from '../../query/partials/responseManager';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  //422 Errors Handler Hook:'
  const { register, apply, reset } = useFormErrorsRef();

  // Custom Mutation Hook:
  const { mutate: requestLogin, isPending } = useCustomMutation({
    mutationFn: login,
    reset,
    apply,
    onSuccess: (response, reqData) => {
      onLoginSuccess(response, navigation, dispatch, reqData);
    },
  });

  // Login Request:
  const handleLogin = async (values, { setErrors }) => {
    register(setErrors);
    const device_token = await AsyncStorage.getItem(KEYS.FCM_TOKEN);
    requestLogin({ ...values, device_token });
  };

  return (
    <Container isTextureVisible isKeyboardAvoid>
      <Header
        isBackVisible={false}
        centerType="goback"
        CenterComponent={<MainLogoSvg width={182} height={85} />}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Sizer.vSize(200) }}
      >
        <Flex mT={25} algItems={'center'}>
          <Typography size={32} fFamily="interTightSemiBold600" mR={10}>
            Welcome Back!
          </Typography>
          <Image
            source={wave}
            style={{ height: Sizer.vSize(31), width: Sizer.vSize(32) }}
            resizeMode="contain"
          />
        </Flex>
        <Typography size={14} mT={6} LineHeight={22} style={{ maxWidth: 340 }}>
          Log in to manage your bookings, track service progress, and stay
          updated with ease.
        </Typography>
        <FormController
          initialValues={{
            email: __DEV__ ? 'mark@mailinator.com' : '',
            password: __DEV__ ? 'Admin@1234' : '',
          }}
          validationSchema={validatoinSchema.AuthValidations.SignInSchema}
          onSubmit={handleLogin}
        >
          {props => {
            const { handleSubmit, handleChange, values, errors, handleBlur } =
              props;

            return (
              <>
                <InputLabel title="Email" />
                <TextField
                  placeholder="Email"
                  leftIcon
                  handleChange={handleChange('email')}
                  value={values?.email}
                  error={errors?.email}
                  onBlur={handleBlur('email')}
                />
                <InputLabel title="Password" />
                <TextField
                  placeholder="Password"
                  leftIcon
                  handleChange={handleChange('password')}
                  value={values?.password}
                  error={errors?.password}
                  onBlur={handleBlur('password')}
                  leftIconName="key"
                  rightIcon
                  password
                />

                <Flex jusContent={'space-between'} mT={15} algItems={'center'}>
                  <Flex algItems={'center'}>
                    {/* <View
                    style={[
                      GLOBALSTYLE.checkBoxWrapper,
                      { marginRight: Sizer.hSize(4) },
                    ]}
                  >
                    <Checkbox.Android
                      color={COLORS.primary}
                      uncheckedColor={COLORS.primary}
                      status="checked"
                    />
                  </View>
                  <Typography size={14} fFamily="poppinsMedium500">
                    Remember me
                  </Typography> */}
                  </Flex>
                  <Typography
                    fFamily={'poppinsMedium500'}
                    size={14}
                    mT={2}
                    color={COLORS.primary}
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}
                  >
                    Forgot password?
                  </Typography>
                </Flex>
                <Button
                  label="Login"
                  type="secondary"
                  mt={30}
                  onPress={handleSubmit}
                  loader={isPending}
                />
              </>
            );
          }}
        </FormController>
        <Flex jusContent={'center'} mT={26} extraStyle={{ width: '100%' }}>
          <Typography
            fontSize={14}
            color={COLORS.black100}
            fFamily="poppinsMedium500"
          >
            Don’t have an account?{' '}
            <Typography
              fontSize={15}
              mL={6}
              color={COLORS.primary}
              fFamily="poppinsSemiBold600"
              onPress={() => {
                navigation.navigate('SignupScreen');
              }}
            >
              Register Now
            </Typography>
          </Typography>
        </Flex>
      </ScrollView>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
