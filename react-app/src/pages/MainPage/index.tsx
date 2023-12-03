import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setCountries } from '../../store/countriesSlice';

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

  return (
    <div>
      <h1>Главная Страница</h1>
      <nav>
        <ul>
          <li>
            <Link to="/uncontrolled-form">Неконтролируемая Форма</Link>
          </li>
          <li>
            <Link to="/controlled-form">
              Контролируемая Форма (React Hook Form)
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MainPage;
