// ---( Live URL )--- //
export const API_DOMAIN = __DEV__
  ? 'https://pro-fixer.demoappprojects.com/lambs-solutions/api'
  : 'https://pro-fixer.demoappprojects.com/lambs-solutions/api';

export const ENDPOINTS = {
  //Auth End Points:
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  EDIT_PROFILE: '/edit-profile',
  FORGOT_PASSWORD: '/forgot/password',
  RESET_PASSWORD: '/verify/otp/password',
  VERIFY_OTP: '/email/verify/otp',
  RESEND_OTP: '/email/resend-otp',
  PUSHER_AUTH: '/user/pusher/auth',
  DELETE_ACCOUNT: '/delete/user',

  SOCIAL_LOGIN: provider => `social/auth/${provider}`,

  // Service End Points:
  GET_ALL_SERVICES: '/get-services',
  GET_SERVICE_CATEGORIES: '/get-categories',
  GET_SERVICE_DETAILS: (service_id, rating) =>
    `/services-detail/${service_id}/${rating}`,
  GET_SERVICE_SLOT: (date, serviceId, timezone) =>
    `/get-service-slot/${date}/${serviceId}?timezone=${timezone}`,

  // Booking End Points:
  BOOK_APPOINTMENT: '/store-booking',
  GET_BOOKING: '/get-bookings',
  SETUP_INTENT: '/setup/intent',
  PAYMENT: '/payment',

  // Chat Endpoints5
  GET_MESSAGES: '/get-user-messages',
  SEND_MESSAGES: '/send-message',

  //  General Endpoints  //
  GET_NOTIFICATION: `get-notifications`,
  GET_PHOTOS_CATEGORIES: '/get/gallery/categories',
  GET_GALLERY: photo_cat_id => `/get/gallery/${photo_cat_id}`,
  POST_REVIEWS: '/review',
};
