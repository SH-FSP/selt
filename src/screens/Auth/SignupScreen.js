import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

//-----------
import { Container, Flex, Typography } from '../../atomComponents';
import { MainLogoSvg } from '../../assets/svgs';
import Sizer from '../../helpers/Sizer';
import InputLabel from '../../components/customFields/InputLabel';
import { Button, Header, TextField } from '../../components';
import { COLORS } from '../../globalStyle/Theme';
import FormController from '../../components/formController/FormController';
import validatoinSchema from '../../validations';
import { maskPhoneNumber } from '../../utils';
import { register } from '../../api/userService';
import { useCustomMutation } from '../../query/useCustomMutation';
import { onRegisterSuccess } from '../../query/partials/responseManager';
import useFormErrorsRef from '../../query/partials/useFormErrorsRef';

const SignupScreen = ({ navigation }) => {
  //422 Errors Handler Hook:
  const { register: setErrorHandler, apply, reset } = useFormErrorsRef();

  // Custom Mutation Hook:
  const { mutate: requestRegister, isPending } = useCustomMutation({
    mutationFn: register,
    apply,
    reset,
    onSuccess: response => {
      onRegisterSuccess(response, navigation);
    },
  });

  // Handle Register:
  const handleRegister = async (values, { setErrors }) => {
    setErrorHandler(setErrors);
    requestRegister({ ...values, navigation });
  };

  return (
    <Container isTextureVisible isKeyboardAvoid>
      <Header
        isBackVisible
        centerType="goback"
        CenterComponent={<MainLogoSvg width={182} height={85} />}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Sizer.vSize(200) }}
      >
        <Typography size={32} mT={25} fFamily="interTightSemiBold600" mR={10}>
          Create An Account{' '}
        </Typography>
        {/* <Typography size={14} mT={6} LineHeight={22} style={{ maxWidth: 340 }}>
          Sign up to book expert roofing services quickly and easily—your roof deserves the best.

        </Typography> */}

        <FormController
          initialValues={{
            name: __DEV__ ? 'Mark Doeson' : '',
            email: __DEV__ ? 'mark1@mailinator.com' : '',
            password: __DEV__ ? 'Admin@1234' : '',
            password_confirmation: __DEV__ ? 'Admin@1234' : '',
            phone: '',
          }}
          validationSchema={validatoinSchema.AuthValidations.SignUpSchema}
          onSubmit={handleRegister}
        >
          {props => {
            const { handleSubmit, handleChange, values, errors, handleBlur } =
              props;

            return (
              <>
                <InputLabel title="Name" />
                <TextField
                  placeholder="Name"
                  leftIcon
                  leftIconName="person-outline"
                  leftIconFamily="Ionicons"
                  handleChange={handleChange('name')}
                  value={values.name}
                  error={errors.name}
                  onBlur={handleBlur('name')}
                />
                <InputLabel title="Email" />
                <TextField
                  placeholder="Email"
                  leftIcon
                  leftIconName="mail-outline"
                  leftIconFamily="Ionicons"
                  handleChange={handleChange('email')}
                  value={values.email}
                  error={errors.email}
                  onBlur={handleBlur('email')}
                />
                <InputLabel title="Password" />
                <TextField
                  placeholder="Password"
                  leftIcon
                  leftIconName="key"
                  rightIcon
                  password
                  handleChange={handleChange('password')}
                  value={values.password}
                  error={errors.password}
                  onBlur={handleBlur('password')}
                />
                <InputLabel title="Confirm Password" />
                <TextField
                  placeholder="Confirm Password"
                  leftIcon
                  leftIconName="key"
                  rightIcon
                  password
                  handleChange={handleChange('password_confirmation')}
                  value={values.password_confirmation}
                  error={errors.password_confirmation}
                  onBlur={handleBlur('password_confirmation')}
                />
                <InputLabel title="Phone Number" />
                <TextField
                  placeholder="+1 (123) 456-7890"
                  leftIcon
                  leftIconName="phone"
                  handleChange={number => {
                    let digits = number?.replace(/\D/g, '');
                    if (digits?.startsWith('1')) {
                      digits = digits.slice(1);
                    }
                    handleChange('phone')(digits);
                  }}
                  value={maskPhoneNumber(values?.phone)}
                  error={errors.phone}
                  onBlur={handleBlur('phone')}
                  maxLength={17}
                  keyboardType="phone-pad"
                />

                <Button
                  label={'Sign Up'}
                  type="secondary"
                  mt={26}
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
            Already have an account?{' '}
            <Typography
              fontSize={15}
              mL={6}
              color={COLORS.primary}
              fFamily="poppinsSemiBold600"
              onPress={() => {
                navigation.goBack();
              }}
            >
              Login Now{' '}
            </Typography>
          </Typography>
        </Flex>
      </ScrollView>
    </Container>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({});
