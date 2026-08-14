import {STATUS} from '../constants';
import api from './api';
import {ENDPOINTS} from './endpoints';

export const getServices = async () => {
  const response = await api.get(ENDPOINTS.GET_ALL_SERVICES);
  return response.data.data;
};

export const getServiceDetails = async (signal, service_id, rating) => {

  const response = await api.get(
    ENDPOINTS.GET_SERVICE_DETAILS(service_id, rating),
    {signal: signal},
  );
  return response.data.data;
};

export const getServiceCategories = async () => {
  const response = await api.get(ENDPOINTS.GET_SERVICE_CATEGORIES);

  return response.data.data;
};

export const getBookingSlots = async (serviceId, date, signal) => {
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const response = await api.get(
    ENDPOINTS.GET_SERVICE_SLOT(date, serviceId, localTimezone),
    {
      signal: signal,
    },
  );

  return response.data;
};

export const storeBooking = async body => {
  let bodyPayload = body?.addon
    ? {
        ...body,
        addon: {
          ...body?.addon,
          price: Number(body?.addon?.price?.split(' ')[1] || 0),
        },
      }
    : body;
  const response = await api.post(ENDPOINTS.BOOK_APPOINTMENT, bodyPayload);

  return response.data;
};

export const getBookings = async () => {
  const response = await api.get(ENDPOINTS.GET_BOOKING);

  const bookings = response?.data?.data || [];
  const {pending, confirmed, completed, cancelled} = STATUS;
  const updatedData = {
    upcoming: [],
    past: [],
  };

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  bookings?.forEach(item => {
    const bookingDateStr = item?.booking_date;
    if ([pending, confirmed].includes(item?.status)) {
      if (bookingDateStr < todayStr) {
        updatedData.past.push(item);
      } else {
        updatedData.upcoming.push(item);
      }
    } else if ([completed, cancelled].includes(item?.status)) {
      updatedData.past.push(item);
    }
  });

  return updatedData;
};

export const fetchPaymentIntent = async booking_id => {
  console.log('🚀 ~ booking_id:', booking_id);
  const response = await api.post(ENDPOINTS.SETUP_INTENT, {
    booking_id,
  });

  return response;
};

export const handlePaymentSuccess = async payment_intent_id => {
  const res = await api.post(ENDPOINTS.PAYMENT, {
    payment_intent_id,
  });
  return res;
};
