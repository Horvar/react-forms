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
        setImageError('File size should not exceed 10 KB');
        return;
      }
      if (!['image/png', 'image/jpeg'].includes(file.type)) {
        setImageError('Only PNG and JPEG image formats are allowed');
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
      alert('Image error: ' + imageError);
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
        <span>Name:</span>
        <input {...register('name')} type="text" />
        {errors.name && <p>{errors.name.message}</p>}
      </label>
      <label>
        <span>Age:</span>
        <input {...register('age')} type="number" />
        {errors.age && <p>{errors.age.message}</p>}
      </label>
      <label>
        <span>Email:</span>
        <input {...register('email')} type="email" />
        {errors.email && <p>{errors.email.message}</p>}
      </label>
      <label>
        <span>Password:</span>
        <input {...register('password')} type="password" />
        {errors.password && <p>{errors.password.message}</p>}
      </label>
      <label>
        <span>Confirm Password:</span>
        <input {...register('confirmPassword')} type="password" />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </label>
      <label>
        <span>Gender:</span>
        <select {...register('gender')}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        <span>Agree to Terms:</span>
        <input {...register('termsAccepted')} type="checkbox" />
        {errors.termsAccepted && <p>{errors.termsAccepted.message}</p>}
      </label>
      <label>
        <span>Country:</span>
        <input {...register('country')} list="countries-list" type="text" />
        <datalist id="countries-list">
          {countries.map((country, index) => (
            <option key={index} value={country} />
          ))}
        </datalist>
        {errors.country && <p>{errors.country.message}</p>}
      </label>
      <label>
        <span>Upload Image:</span>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handlePictureChange}
        />
        {imageError && <p>{imageError}</p>}
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledFormPage;
