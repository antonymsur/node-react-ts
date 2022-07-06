import "./register.css";

import React, { useState } from "react";

import {useNavigate} from 'react-router-dom';

const Register = () => {
  // The selected category
  const [selectedCategory, setSelectedCategory] = useState<String>();

  // This function will be triggered when a radio button is selected
  const radioHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value);
  };
  const navigate = useNavigate();
  const next = () => {
    navigate('/add',{state:{category:selectedCategory}});
  };

  return (
    <div className="container">
      <h3>My Registration</h3>
      <fieldset>
        <legend>Please tell us about yourself?</legend>
        <p>
          <input
            type="radio"
            name="category"
            value="Student"
            id="student"
            onChange={radioHandler}
          />
          <label htmlFor="student">Student</label>
        </p>

        <p>
          <input
            type="radio"
            name="category"
            value="Parent"
            id="parent"
            onChange={radioHandler}
          />
          <label htmlFor="parent">Parent</label>
        </p>
      </fieldset>
      {selectedCategory && (
        <button onClick={next}>
          {/* Display the selected category */}
          <h2>{selectedCategory + ">>"}</h2>
        </button>
      )}

    </div>
  );
};

export default Register;
