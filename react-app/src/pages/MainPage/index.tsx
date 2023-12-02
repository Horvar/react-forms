import React from 'react';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div>
      <h1>Главная Страница</h1>
      <nav>
        <ul>
          <li><Link to="/uncontrolled-form">Неконтролируемая Форма</Link></li>
          <li><Link to="/controlled-form">Контролируемая Форма (React Hook Form)</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default MainPage;
