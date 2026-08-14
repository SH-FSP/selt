import { useMutation } from '@tanstack/react-query';
//---
import { formatBackendErrors } from '../utils';

export const useCustomMutation = ({
  mutationFn,
  mutationKey = null,
  onSuccess,
  onError,
  on422Error,
  apply,
  reset,
  ...mutationProps
}) => {
  return useMutation({
    mutationKey: mutationKey,
    mutationFn: mutationFn,
    onError: error => {
      const response = error.response;
      console.log('Top Level Error:', error?.response?.data, error?.data);
      console.log('🚀 ~ error response in custom Mutation Hook:', response);

      if (response?.status === 422) {
        const parsedErrors = formatBackendErrors(response.data.errors);
        apply?.(parsedErrors);
        on422Error?.(parsedErrors);
      }
      onError?.(response);
    },
    onSuccess: (response, reqData) => {
      reset?.();
      onSuccess?.(response, reqData);
    },
    ...mutationProps,
  });
};
