import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';

const useImagePicker = (selectionLimit = 5, handleChange = () => {}) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  const options = {
    mediaType: 'photo',
    includeBase64: false,
    maxHeight: 2000,
    maxWidth: 3000,
    selectionLimit,
  };

  const isValidImageType = uri => {
    const fileExtension = uri?.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png'].includes(fileExtension);
  };

  const openGallery = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) return;
      if (response.errorCode) {
        setError(`Image Picker Error: ${response.errorCode}`);
        return;
      }
      
      const newAssets = response.assets || [];
      
      const validImages = newAssets.filter(asset =>
        isValidImageType(asset.uri),
      );
      
      if (validImages.length !== newAssets.length) {
        setError(
          'Some images were skipped. Only jpg, jpeg, and png are allowed.',
        );
      } else {
        setError(null);
      }
      
      const updatedImages = [...images, ...validImages].slice(
        0,
        selectionLimit,
      );
      
      console.log("🚀 ~ openGallery ~ updatedImages:", updatedImages)
      setImages(updatedImages);
      handleChange(updatedImages);
    });
  };

  const removeImage = indexToRemove => {
    const updated = images.filter((_, index) => index !== indexToRemove);
    setImages(updated);
    handleChange(updated);
  };

  const clearImages = () => {
    setImages([]);
    handleChange([]);
  };

  return {
    images,
    error,
    openGallery,
    removeImage,
    clearImages,
  };
};

export default useImagePicker;
