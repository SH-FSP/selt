import * as Yup from 'yup';

const reviewFormSchema = Yup.object().shape({
  star: Yup.string().required("Please tap to Add Ratings"),
  description: Yup.string().required('Description is required').min(4).max(200),
});

export default {
  reviewFormSchema,
};
