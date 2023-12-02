import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setControlledFormData } from '../../store/formSlice';

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
  const { register, handleSubmit } = useForm<FormData>();
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
      </label>
      <label>
        <span>Возраст:</span>
        <input {...register("age")} type="number" />
      </label>
      <label>
        <span>Email:</span>
        <input {...register("email")} type="email" />
      </label>
      <label>
        <span>Пароль:</span>
        <input {...register("password")} type="password" />
      </label>
      <label>
        <span>Подтвердите Пароль:</span>
        <input {...register("confirmPassword")} type="password" />
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
      </label>
      <label>
        <span>Страна:</span>
        <input {...register("country")} type="text" />
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
