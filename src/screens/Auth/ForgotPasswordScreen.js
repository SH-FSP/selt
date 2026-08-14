import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
//---
import { Container, SafeAreaWrapper, Typography } from '../../atomComponents';
import { Button, Header, TextField } from '../../components';
import { COLORS } from '../../globalStyle/Theme';
import validatoinSchema from '../../validations';
import FormController from '../../components/formController/FormController';
import { useCustomMutation } from '../../query/useCustomMutation';
import useFormErrorsRef from '../../query/partials/useFormErrorsRef';
import { forgotPassword } from '../../api/userService';

const ForgotPasswordScreen = ({ navigation }) => {
  //422 Errors Handler Hook:
  const { register, apply, reset } = useFormErrorsRef();

  // Custom Mutation Hook:
  const { mutate: fp, isPending } = useCustomMutation({
    mutationFn: forgotPassword,
    reset,
    apply,
    onSuccess: (response, { email }) => {
      if (response.message) {
        navigation.navigate('ResetPasswordScreen', {
          email: email,
        });
      }
    },
  });

  // Handle Forgot Passeord Request:
  const handleForgotPassword = (values, { setErrors }) => {
    register(setErrors);
    fp(values);
  };

  return (
    <Container isKeyboardAvoid isTextureVisible>
      <Header />
      <Typography size={22} mT={25} fFamily="abrilRegular400">
        Password Reset
      </Typography>
      <Typography
        size={14}
        mT={10}
        mB={10}
        color={COLORS.black100}
        LineHeight={22}
      >
        Enter your email address to Verify it's you.
      </Typography>
      <FormController
        initialValues={{ email: __DEV__ ? 'mark@mailinator.com' : '' }}
        validationSchema={validatoinSchema.AuthValidations.ForgotPasswordSchema}
        onSubmit={handleForgotPassword}
      >
        {props => {
          const { handleSubmit, handleBlur, handleChange, values, errors } =
            props;
          return (
            <>
              <TextField
                placeholder="Email"
                handleChange={handleChange('email')}
                handleBlur={handleBlur('email')}
                value={values?.email}
                error={errors?.email}
                leftIcon
                leftIconName="mail"
                leftIconFamily="Octicons"
                keyboardType="email-address"
              />

              <Button
                label={'Get Verification Code'}
                mt={30}
                onPress={handleSubmit}
                loader={isPending}
              />
            </>
          );
        }}
      </FormController>
    </Container>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({});
