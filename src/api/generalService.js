import api from './api';
import {ENDPOINTS} from './endpoints';

export const getNotification = async () => {
  const res = await api.get(ENDPOINTS.GET_NOTIFICATION);
  return res.data;
};

export const getPhotosCategories = async () => {
  const res = await api.get(ENDPOINTS.GET_PHOTOS_CATEGORIES);
  return res.data;
};

export const getGallery = async (signal, photo_cat) => {
  const res = await api.get(ENDPOINTS.GET_GALLERY(photo_cat), {signal});
  return res.data;
};

export const postReviews = async body => {
  console.log("🚀 ~ postReviews ~ body:", body)
  const res = await api.post(ENDPOINTS.POST_REVIEWS, body);
  return res.data;
};
