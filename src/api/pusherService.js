import api from './api';
import {ENDPOINTS} from './endpoints';

export const onAuthorizer = async (channel_name, socket_id) => {
  try {
    let {data} = await api.post(ENDPOINTS.PUSHER_AUTH, {
      socket_id,
      channel_name,
    });
    data = JSON.parse(data.data); //parse ERROR exist here due to wrong way of handling data
    return {
      auth: data.auth,
      channel_data: data.channel_data,
    };
  } catch (e) {
    console.error('Pusher Authorization error:', e.nessage);
    return null;
  }
};
