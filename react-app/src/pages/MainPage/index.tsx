import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';

function MainPage() {
  const controlledFormData = useSelector((state: RootState) => state.form.controlledFormData);
  const uncontrolledFormData = useSelector((state: RootState) => state.form.uncontrolledFormData);

  return (
    <div>
      <h1>Main Page</h1>
      <nav>
        <ul>
          <li><Link to="/uncontrolled-form">Uncontrolled Form</Link></li>
          <li><Link to="/controlled-form">Controlled Form (React Hook Form)</Link></li>
        </ul>
      </nav>

      {controlledFormData && (
        <div>
          <h2>Data from Controlled Form:</h2>
          <pre>{JSON.stringify(controlledFormData, null, 2)}</pre>
        </div>
      )}

      {uncontrolledFormData && (
        <div>
          <h2>Data from Uncontrolled Form:</h2>
          <pre>{JSON.stringify(uncontrolledFormData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default MainPage;
