import api from './api';
import {ENDPOINTS} from './endpoints';

export const socialLogin = async ({provider, ...body}) => {
  const response = await api.post(ENDPOINTS.SOCIAL_LOGIN(provider), body);
  return response.data;
};
