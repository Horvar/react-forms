import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { setControlledFormData } from '../../store/formSlice';
import validationSchema from '../../validationScheme'; // Убедитесь, что путь к файлу схемы валидации верный

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  country: string;
}

const ControlledFormPage: React.FC = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });
  const [pictureBase64, setPictureBase64] = useState<string>('');

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPictureBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    const formData = {
      ...data,
      picture: pictureBase64
    };
    dispatch(setControlledFormData(formData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>Имя:</span>
        <input {...register("name")} type="text" />
        {errors.name && <p>{errors.name.message}</p>}
      </label>
      <label>
        <span>Возраст:</span>
        <input {...register("age")} type="number" />
        {errors.age && <p>{errors.age.message}</p>}
      </label>
      <label>
        <span>Email:</span>
        <input {...register("email")} type="email" />
        {errors.email && <p>{errors.email.message}</p>}
      </label>
      <label>
        <span>Пароль:</span>
        <input {...register("password")} type="password" />
        {errors.password && <p>{errors.password.message}</p>}
      </label>
      <label>
        <span>Подтвердите Пароль:</span>
        <input {...register("confirmPassword")} type="password" />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </label>
      <label>
        <span>Пол:</span>
        <select {...register("gender")}>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="other">Другое</option>
        </select>
      </label>
      <label>
        <span>Согласие с условиями:</span>
        <input {...register("termsAccepted")} type="checkbox" />
        {errors.termsAccepted && <p>{errors.termsAccepted.message}</p>}
      </label>
      <label>
        <span>Страна:</span>
        <input {...register("country")} type="text" />
        {errors.country && <p>{errors.country.message}</p>}
      </label>
      <label>
        <span>Загрузите изображение:</span>
        <input type="file" accept="image/png, image/jpeg" onChange={handlePictureChange} />
      </label>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default ControlledFormPage;
