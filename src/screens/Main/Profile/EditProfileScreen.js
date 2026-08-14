import {
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Avatar } from 'react-native-paper';
//----
import { Container, Flex } from '../../../atomComponents';
import { avatar, edit as Edit } from '../../../assets/images';
import { BASEOPACITY, GLOBALSTYLE } from '../../../globalStyle/Theme';
import Sizer from '../../../helpers/Sizer';
import { Button, Header, TextField } from '../../../components';
import InputLabel from '../../../components/customFields/InputLabel';
import FormController from '../../../components/formController/FormController';
import { maskPhoneNumber, objectToFormData, showMessage } from '../../../utils';
import useImagePicker from '../../../hooks/useImagePicker';
import { useCustomMutation } from '../../../query/useCustomMutation';
import { editProfile } from '../../../api/userService';
import { setUser } from '../../../redux/slices/appSlice';

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.app);

  const { openGallery, images, clearImages } = useImagePicker(1);

  const [edit, setIsEdit] = useState(false);

  //Custom Mutation Hook:
  const { mutate: editProf, isPending } = useCustomMutation({
    mutationFn: editProfile,
    onSuccess: response => {
      console.log('🚀 ~ EditProfileScreen ~ response:', response);
      if (response?.status) {
        dispatch(setUser({ ...response?.user }));
        setIsEdit(false);
        showMessage({
          type: 'success',
          message: response?.message,
        });
        navigation.goBack();
      }
    },
    onSettled: () => {
      clearImages();
    },
  });

  //Handle Edit Profile:
  const handleEditProfile = values => {
    if (images[0]?.uri) {
      values.image = {
        uri: images[0]?.uri,
        name: images[0]?.fileName,
        type: images[0]?.type,
      };
    } else {
      delete values.image;
    }

    editProf({ id: user?.id, ...values });
  };

  const initialValues = {
    email: user?.email || '',
    name: user?.name || '',
    phone: user?.phone || '',
    image: user?.image || null,
    address: user?.address || null,
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (edit) {
          setIsEdit(false);
          clearImages();
          return true;
        } else {
          return false;
        }
      },
    );

    return () => backHandler.remove();
  }, [edit]);

  return (
    <Container isPadding={false} isPaddingVertical={false} isTextureVisible>
      <Header
        type="app"
        title={'Edit Profile'}
        onPresBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={-100}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={GLOBALSTYLE.paddingHor}
          contentContainerStyle={{ paddingBottom: Sizer.hSize(50) }}
        >
          <FormController
            initialValues={initialValues}
            onSubmit={handleEditProfile}
          >
            {props => {
              const { handleSubmit, handleChange, handleBlur, values, errors } =
                props;

              return (
                <>
                  <Flex
                    algItems={'center'}
                    direction={'column'}
                    mT={25}
                    mb={30}
                  >
                    <TouchableOpacity
                      activeOpacity={BASEOPACITY}
                      onPress={() => {
                        openGallery();
                      }}
                      style={{ position: 'relative' }}
                    >
                      <Avatar.Image
                        source={{ uri: images[0]?.uri || user?.image }}
                        size={Sizer.hSize(88)}
                        style={{ backgroundColor: 'grey' }}
                      />

                      <Image
                        source={Edit}
                        resizeMode="contain"
                        style={{
                          height: Sizer.vSize(24),
                          width: Sizer.vSize(24),
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                        }}
                      />
                    </TouchableOpacity>
                  </Flex>

                  <InputLabel title="Email" />
                  <TextField
                    placeholder="email"
                    value={values?.email}
                    error={errors?.email}
                    handleChange={handleChange('email')}
                    handleBlur={handleBlur('email')}
                    leftIcon
                    leftIconName="mail"
                    disable={false}
                  />
                  <InputLabel title="Name" />
                  <TextField
                    placeholder="William"
                    value={values?.name}
                    error={errors?.name}
                    handleChange={handleChange('name')}
                    handleBlur={handleBlur('name')}
                    leftIcon
                    leftIconName="user"
                    disable={true}
                  />
                  <InputLabel title="Address" />
                  <TextField
                    placeholder="address"
                    value={values?.address}
                    error={errors?.address}
                    handleChange={handleChange('address')}
                    handleBlur={handleBlur('address')}
                    leftIcon
                    leftIconName="info"
                    disable={true}
                  />

                  <InputLabel title="Phone Number" />
                  <TextField
                    placeholder="123-456-7890"
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
                    disable={true}
                  />

                  <Button
                    label="Save Changes"
                    type="secondary"
                    mt={48}
                    onPress={handleSubmit}
                    loader={isPending}
                  />
                </>
              );
            }}
          </FormController>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  formWrapper: {
    paddingHorizontal: Sizer.hSize(20),
  },
});
