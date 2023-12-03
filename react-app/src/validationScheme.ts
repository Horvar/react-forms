import * as yup from 'yup';

const validationScheme = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-ZА-Я]/, 'Name must start with a capital letter'),
  age: yup
    .number()
    .transform(value => (isNaN(value) ? undefined : value))
    .positive('Age must be positive')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least one digit, one uppercase letter, one lowercase letter, and one special character',
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
  gender: yup.string().required('Gender is required'),
  termsAccepted: yup
    .bool()
    .required('You must accept the terms')
    .oneOf([true], 'You must accept the terms'),
  country: yup.string().required('Country selection is required'),
});

export default validationScheme;
