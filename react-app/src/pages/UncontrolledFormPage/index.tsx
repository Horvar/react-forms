import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setUncontrolledFormData } from '../../store/formSlice';
import { RootState } from '../../store/store';

import * as yup from 'yup';
import validationScheme from '../../validationScheme';

import styles from '../../index.module.css'

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
    <section className={styles.intro}>
      <h1 className={styles.introTitle}>Uncontrolled Form</h1>
        <form onSubmit={handleSubmit} className={styles.introForm}>
          <label className={styles.introFormLabel}>
            <span className={styles.introFormTitle}>Name:</span>
            <input ref={nameRef} type="text" className={styles.introFormInput} />
          </label>
          <label className={styles.introFormLabel}>
            <span className={styles.introFormTitle}>Age:</span>
            <input ref={ageRef} type="number" className={styles.introFormInput} />
          </label>
          <label className={styles.introFormLabel}>
            <span className={styles.introFormTitle}>Email:</span>
            <input ref={emailRef} type="email" className={styles.introFormInput} />
          </label>
          <label className={styles.introFormLabel}>
            <span className={styles.introFormTitle}>Password:</span>
            <input ref={passwordRef} type="password" className={styles.introFormInput} />
          </label>
          <label className={styles.introFormLabel}>
            <span className={styles.introFormTitle}>Confirm Password:</span>
            <input ref={confirmPasswordRef} type="password" className={styles.introFormInput} />
          </label>
          <label className={styles.introFormLabel}>
            <span className={styles.introFormTitle}>Gender:</span>
            <select ref={genderRef} className={styles.introFormInput}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
          <label className={styles.introFormLabel}>
            <span className={styles.introFormTitle}>Country:</span>
            <input list="countries-list" ref={countryRef} type="text" className={styles.introFormInput} />
            <datalist id="countries-list">
              {countries.map((country, index) => (
                <option key={index} value={country} />
              ))}
            </datalist>
          </label>
          <label className={styles.introFormLabel}>
            <span className={styles.introFormTitle}>Upload Image:</span>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={handlePictureChange}
            />
            {imageError && <p>{imageError}</p>}
          </label>
          <label className={styles.introFormLabel}>
            <input ref={termsAcceptedRef} type="checkbox" className={styles.introFormCheckbox} />
            <span className={styles.introFormAgreeText}>I agree to the Terms and Conditions and the Privacy Policy</span>
          </label>
          <button type="submit" className={styles.introFormSubmit}>Submit</button>
        </form>
    </section>
  );
};

export default UncontrolledFormPage;
