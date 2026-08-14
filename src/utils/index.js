import { Platform, StatusBar } from 'react-native';
import { showMessage as flashMessage } from 'react-native-flash-message';

export function showMessage({ message = '', type = 'default', bgColor = '' }) {
  const backgroundColor =
    bgColor ||
    (type === 'success'
      ? '#38E54D'
      : type === 'danger'
      ? '#CD1818'
      : '#999999');

  flashMessage({
    message: message,
    type: type,
    backgroundColor: backgroundColor,
    statusBarHeight: StatusBar.currentHeight,
  });

  if (Platform.OS == 'android') {
    StatusBar.setBackgroundColor(backgroundColor);
    StatusBar.setBarStyle('light-content');
  }
}

export const formatBackendErrors = errors => {
  const errObj = {};

  if (errors && typeof errors === 'object') {
    Object.entries(errors).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        errObj[key] = value[0];
      }
    });
  }

  return errObj;
};

export const objectToFormData = (
  obj,
  formData = new FormData(),
  parentKey = '',
) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (value === null || value === undefined) {
      return; // Skip null/undefined values
    }

    const currentKey = parentKey ? `${parentKey}[${key}]` : key;

    if (Array.isArray(value)) {
      // Handle array of files or values
      value.forEach((item, index) => {
        const arrayKey = `${currentKey}[${index}]`;

        if (typeof item === 'object' && item?.uri) {
          // File object in array
          formData.append(arrayKey, {
            uri: item.uri,
            type: item.type,
            name: item.name,
          });
        } else {
          // Primitive value in array
          formData.append(arrayKey, item);
        }
      });
    } else if (typeof value === 'object' && value?.uri) {
      // Single file object
      formData.append(currentKey, {
        uri: value.uri,
        type: value.type,
        name: value.name,
      });
    } else {
      // Primitive value
      formData.append(currentKey, value);
    }

    // FOR FUTURE CODE IF NEEDED FOR MORE NESTED FORM DATA
    //  else if (
    //   typeof value === 'object' &&
    //   !(value instanceof File) &&
    //   !(value instanceof Blob)
    // ) {
    //   // Nested object (recursive handling)
    //   objectToFormData(value, formData, currentKey);
    // }
  });

  return formData;
};

export const maskPhoneNumber = input => {
  if (!input) return '';

  // Clean the input: remove everything except digits
  let digits = input.toString().replace(/\D/g, '');

  // If it's an 11-digit number starting with 1 (standard US/Canada full number),
  // we strip the '1' to isolate the 10-digit local part for formatting.
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }

  // Limit to 10 digits for the US local part
  digits = digits.slice(0, 10);

  if (digits.length === 0) return '';

  let formatted = '+1 ';

  if (digits.length > 0) {
    formatted += '(' + digits.slice(0, 3);
  }

  if (digits.length > 3) {
    formatted += ') ' + digits.slice(3, 6);
  }

  if (digits.length > 6) {
    formatted += '-' + digits.slice(6, 10);
  }

  return formatted;
};

export function discountedPrice(price, discount) {
  const actualPrice = price?.split(' ')?.[1] || 0;
  const salePrice = actualPrice - (actualPrice * discount) / 100 || 0;
  const discountedAmount = actualPrice - salePrice;
  return { salePrice, actualPrice, discount, discountedAmount };
}

export const isFeildEmpty = data => {
  for (const [key, value] of Object.entries(data)) {
    if (!value) {
      showMessage({
        type: 'danger',
        message: `Please select ${key.split('_').join(' ')}`,
      });
      return false; // ⏹ Stops here
    }
  }
  return true;
};

export function transformGalleryData(galleryData) {
  if (!galleryData?.status || !Array.isArray(galleryData.data)) return [];

  const flattened = [];

  galleryData.data.forEach(item => {
    const { type } = item;

    if (type === 'image' && Array.isArray(item.multiple_images)) {
      item.multiple_images.forEach(url => {
        flattened.push({
          type: 'image',
          url,
        });
      });
    }

    if (type === 'video' && typeof item.multiple_images === 'string') {
      flattened.push({
        type: 'video',
        url: item.multiple_images,
        thumbnail: item.thumbnail,
        video_id: item.multiple_images,
      });
    }
  });

  return flattened;
}
