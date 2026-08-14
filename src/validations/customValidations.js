import * as Yup from 'yup';

// Custom regex
export const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

export const nameRegex = /^[a-zA-Z\s]+$/;

export const nameValidation = (min, max) =>
  Yup.string()
    .required('This field is required')
    .min(min, `Name must be at least ${min} characters long.`)
    .max(max, `Name must be at most ${max} characters long.`)
    .matches(
      nameRegex,
      'Name can only contain alphabetic characters and spaces.',
    );

export const imageValidation = Yup.mixed()
  .required('Image is required')
  .test('fileType', 'Only JPEG, PNG, and JPG images are allowed', value => {
    if (!value) return false; // Handle empty case
    if (typeof value === 'string') return true; // If it's a URL (already uploaded)

    // For File objects (new uploads)
    const supportedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    return supportedFormats.includes(value?.type);
  });
// SIZE LIMIT IF YOU WANT.
// .test('fileSize', 'Image must be less than 5MB', value => {
//   // if (!value || typeof value === 'string') return true; // Skip if URL
//   // return value?.size <= 5 * 1024 * 1024; // 5MB max
// });
