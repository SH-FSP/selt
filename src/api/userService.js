import AsyncStorage from '@react-native-async-storage/async-storage';
//---
import {KEYS} from '../constants';
import {ENDPOINTS} from './endpoints';
import api from './api';
import {objectToFormData} from '../utils';

export const login = async body => {
  const deviceToken = await AsyncStorage.getItem(KEYS.FCM_TOKEN);
  if (deviceToken) {
    body.device_token = deviceToken;
  }
  const response = await api.post(ENDPOINTS.LOGIN, body);

  return response.data;
};

export const register = async body => {
  const response = await api.post(ENDPOINTS.REGISTER, body);
  return response.data;
};

export const verifyEmail = async body => {
  const response = await api.post(ENDPOINTS.VERIFY_OTP, body);
  return response.data;
};

export const resendOtp = async () => {
  const response = await api.get(ENDPOINTS.RESEND_OTP);
  return response.data;
};

export const forgotPassword = async body => {
  const response = await api.post(ENDPOINTS.FORGOT_PASSWORD, body);
  return response.data;
};

export const resetPassword = async body => {
  const response = await api.post(ENDPOINTS.RESET_PASSWORD, body);
  return response.data;
};


export const logout = async () => {
  const response = await api.get(ENDPOINTS.LOGOUT);
  return response.data;
};
export const editProfile = async body => {
  const formData = objectToFormData(body);
  const response = await api.post(ENDPOINTS.EDIT_PROFILE, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
  return response.data;
};

export const deleteAcount = async () => {
  const response = await api.get(ENDPOINTS.DELETE_ACCOUNT);
  return response.data;
};