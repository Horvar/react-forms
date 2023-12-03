import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUncontrolledFormData } from '../../store/formSlice';
import { RootState } from '../../store/store';

import * as yup from 'yup';
import validationScheme from '../../validationScheme';

const UncontrolledFormPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsAcceptedRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const [pictureBase64, setPictureBase64] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (imageError) {
      alert('Image error: ' + imageError);
      return;
    }
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
      await validationScheme.validate(formData, { abortEarly: false });
      dispatch(setUncontrolledFormData(formData));
      navigate('/');
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log(error.errors);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span>Name:</span>
        <input ref={nameRef} type="text" />
      </label>
      <label>
        <span>Age:</span>
        <input ref={ageRef} type="number" />
      </label>
      <label>
        <span>Email:</span>
        <input ref={emailRef} type="email" />
      </label>
      <label>
        <span>Password:</span>
        <input ref={passwordRef} type="password" />
      </label>
      <label>
        <span>Confirm Password:</span>
        <input ref={confirmPasswordRef} type="password" />
      </label>
      <label>
        <span>Gender:</span>
        <select ref={genderRef}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        <span>Agree to Terms:</span>
        <input ref={termsAcceptedRef} type="checkbox" />
      </label>

      <label>
        <span>Country:</span>
        <input list="countries-list" ref={countryRef} type="text" />
        <datalist id="countries-list">
          {countries.map((country, index) => (
            <option key={index} value={country} />
          ))}
        </datalist>
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

export default UncontrolledFormPage;
