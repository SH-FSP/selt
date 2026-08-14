import api from './api';
import {ENDPOINTS} from './endpoints';

export const fetchAllMessages = async (body) => {
  const {data} = await api.post(ENDPOINTS.GET_MESSAGES, body);
  return data?.data?.reverse();
};

export const sendMessage = async fd => {
  const {data} = await api.post(ENDPOINTS.SEND_MESSAGES, fd);

  return data;
};
