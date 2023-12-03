import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUncontrolledFormData } from '../../store/formSlice';

import * as yup from 'yup';
import validationScheme from '../../validationScheme'

const UncontrolledFormPage: React.FC = () => {
  const dispatch = useDispatch();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsAcceptedRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      name: nameRef.current?.value ?? '',
      age: ageRef.current?.value ? parseInt(ageRef.current.value) : 0,
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
      confirmPassword: confirmPasswordRef.current?.value ?? '',
      gender: genderRef.current?.value ?? '',
      termsAccepted: termsAcceptedRef.current?.checked ?? false,
      picture: pictureBase64,
      country: countryRef.current?.value ?? '',
    };

    try {
      // Валидация данных формы
      await validationScheme.validate(formData, { abortEarly: false });
      dispatch(setUncontrolledFormData(formData));
      // Обработка успешной отправки формы
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Обработка ошибок валидации
        console.log(error.errors); // Вывод ошибок валидации
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Имя:</span>
        <input ref={nameRef} type="text" />
      </label>
      <label>
        <span>Возраст:</span>
        <input ref={ageRef} type="number" />
      </label>
      <label>
        <span>Email:</span>
        <input ref={emailRef} type="email" />
      </label>
      <label>
        <span>Пароль:</span>
        <input ref={passwordRef} type="password" />
      </label>
      <label>
        <span>Подтвердите Пароль:</span>
        <input ref={confirmPasswordRef} type="password" />
      </label>
      <label>
        <span>Пол:</span>
        <select ref={genderRef}>
          <option value="male">Мужской</option>
          <option value="female">Женский</option>
          <option value="other">Другое</option>
        </select>
      </label>
      <label>
        <span>Согласие с условиями:</span>
        <input ref={termsAcceptedRef} type="checkbox" />
      </label>
      <label>
        <span>Страна:</span>
        <input ref={countryRef} type="text" />
      </label>
      <label>
        <span>Загрузите изображение:</span>
        <input type="file" accept="image/png, image/jpeg" onChange={handlePictureChange} />
      </label>
      <button type="submit">Отправить</button>
    </form>
  );
};

export default UncontrolledFormPage;
