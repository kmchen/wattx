import React from 'react';

import { Validator, validationRules } from '../util';

const validate = new Validator(validationRules);

export const SubmitButton = ({fields, onSubmit}) => {
  const validateForm = () => {
    const fieldNames = Object.keys(fields);
    const results = fieldNames.reduce((acc, currField) => {
      const validationResult = validate(fields[currField].value)[currField];
      acc[currField] = validationResult;
      return acc;
    }, {});
    onSubmit(results);
  }
  return (
    <div className="field is-grouped has-text-centered">
      <div className="control">
        <button
          type="submit"
          onClick={validateForm}
          className="button is-link is-large"
        >
          <span className="icon">
            <i className="fas fa-envelope"></i>
          </span>
          <span>Submit</span>
        </button>
      </div>
    </div>
  )
}
