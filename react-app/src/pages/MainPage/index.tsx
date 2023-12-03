import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCountries } from '../../store/countriesSlice';
import { RootState } from '../../store/store';

import styles from '../../index.module.css';

function MainPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    const countriesList = [
      'United States',
      'China',
      'India',
      'Russia',
      'Brazil',
      'Canada',
      'Australia',
      'Germany',
      'United Kingdom',
      'France',
      'Italy',
      'Mexico',
      'Spain',
      'Turkey',
      'South Korea',
      'Japan',
      'Argentina',
      'South Africa',
      'Saudi Arabia',
      'Indonesia',
    ];
    dispatch(setCountries(countriesList));
  }, [dispatch]);
  
  const controlledFormData = useSelector((state: RootState) => state.form.controlledFormData);
  const uncontrolledFormData = useSelector((state: RootState) => state.form.uncontrolledFormData);

  return (
    <section className={styles.intro}>
      <h1 className={styles.introTitle}>Main Page</h1>

      <div className={styles.introWrapper}>
        <h2 className={styles.introSubtitle}>Forms</h2>
        <nav className={styles.introNav}>
          <ul className={styles.introNavList}>
            <li className={styles.introNavItem}><Link to="/uncontrolled-form" className={styles.introNavLink}>Uncontrolled Form</Link></li>
            <li className={styles.introNavItem}><Link to="/controlled-form" className={styles.introNavLink}>Controlled Form</Link></li>
          </ul>
        </nav>
      </div>

      <div className={styles.introWrapper}>
        {(controlledFormData || uncontrolledFormData) && (
          <h2 className={styles.introSubtitle}>Success Data</h2>
        )}
        {controlledFormData && (
          <div className={styles.introSuccess}>
            <h3 className={styles.introSuccessTitle}>Controlled Form:</h3>
            <pre className={styles.introSuccessCode}>{JSON.stringify(controlledFormData, null, 2)}</pre>
          </div>
        )}
        {uncontrolledFormData && (
          <div className={styles.introSuccess}>
            <h3 className={styles.introSuccessTitle}>Uncontrolled Form:</h3>
            <pre className={styles.introSuccessCode}>{JSON.stringify(uncontrolledFormData, null, 2)}</pre>
          </div>
        )}
      </div>

    </section>
  );
}

export default MainPage;
