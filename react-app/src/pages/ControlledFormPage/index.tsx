import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationScheme from '../../validationScheme';

import { RootState } from '../../store/store';
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
  const navigate = useNavigate();
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationScheme),
  });
  const [pictureBase64, setPictureBase64] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10240) {
        setImageError('Размер файла не должен превышать 10 КБ');
        return;
      }
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setImageError('Допустимы только изображения в форматах PNG и JPEG');
        return;
      }
      setImageError('');

      const reader = new FileReader();
      reader.onloadend = () => {
        setPictureBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    if (imageError) {
      alert('Ошибка в изображении: ' + imageError);
      return;
    }
    const formData = {
      ...data,
      picture: pictureBase64,
    };
    dispatch(setControlledFormData(formData));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        <span>Имя:</span>
        <input {...register('name')} type="text" />
        {errors.name && <p>{errors.name.message}</p>}
      </label>
      <label>
        <span>Возраст:</span>
        <input {...register('age')} type="number" />
        {errors.age && <p>{errors.age.message}</p>}
      </label>
      <label>
        <span>Email:</span>
        <input {...register('email')} type="email" />
        {errors.email && <p>{errors.email.message}</p>}
      </label>
      <label>
        <span>Пароль:</span>
        <input {...register('password')} type="password" />
        {errors.password && <p>{errors.password.message}</p>}
      </label>
      <label>
        <span>Подтвердите Пароль:</span>
        <input {...register('confirmPassword')} type="password" />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </label>
      <label>
        <span>Пол:</span>
        <select {...register('gender')}>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="other">Другое</option>
        </select>
      </label>
      <label>
        <span>Согласие с условиями:</span>
        <input {...register('termsAccepted')} type="checkbox" />
        {errors.termsAccepted && <p>{errors.termsAccepted.message}</p>}
      </label>
      <label>
        <span>Страна:</span>
        <input {...register('country')} list="countries-list" type="text" />
        <datalist id="countries-list">
          {countries.map((country, index) => (
            <option key={index} value={country} />
          ))}
        </datalist>
        {errors.country && <p>{errors.country.message}</p>}
      </label>
      <label>
        <span>Загрузите изображение:</span>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handlePictureChange}
        />
        {imageError && <p>{imageError}</p>}
      </label>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default ControlledFormPage;
