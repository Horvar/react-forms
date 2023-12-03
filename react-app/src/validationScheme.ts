import * as yup from 'yup';

const validationScheme = yup.object({
  name: yup
    .string()
    .required('Имя обязательно')
    .matches(/^[A-ZА-Я]/, 'Имя должно начинаться с заглавной буквы'),
  age: yup
    .number()
    .positive('Возраст должен быть положительным')
    .integer('Возраст должен быть целым числом')
    .required('Возраст обязателен'),
  email: yup
    .string()
    .email('Неправильный формат email')
    .required('Email обязателен'),
  password: yup
    .string()
    .min(8, 'Пароль должен быть не менее 8 символов')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Пароль должен содержать как минимум одну цифру, одну прописную букву, одну строчную букву и один специальный символ',
    )
    .required('Пароль обязателен'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
    .required('Подтверждение пароля обязательно'),
  gender: yup.string().required('Пол обязателен'),
  termsAccepted: yup
    .bool()
    .required('Необходимо принять условия')
    .oneOf([true], 'Необходимо принять условия'),
  country: yup.string().required('Выбор страны обязателен'),
});

export default validationScheme;
