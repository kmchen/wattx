import React from 'react';
import mrz from 'kmchenmrzgen';

import { Validator, validationRules } from '../util';

const validate = new Validator(validationRules);

export const validateForm = ({fieldType, onSubmit}) => {
  const fieldNames = Object.keys(fieldType);
  const results = fieldNames.reduce((acc, currField) => {
    const validationResult = validate(fieldType[currField].value)[currField];
    acc[currField] = validationResult;
    return acc;
  }, {});

  const areInputsValid = Object.keys(results).reduce((acc, curr) => {
    return acc && !Boolean(results[curr].errMsg) ; 
  }, true)
  if (!areInputsValid) {
    onSubmit({fields: results});
  } else {
    const userUtopia = {
      firstName: 'ANNA MARIA',
      lastName: 'ERIKSSON',
      nationality: 'Utopia',
      issuingState: 'Utopia',
      birthDate: '740812',

      documentType: 'AV',
      documentNumber: 'D23145890',
      expirationDate: '120415',
      gender: 'female',
      option1: '',
      option2: '',
    };
    try {
      mrz.generateMrzCode(userUtopia)
    } catch(err) {
      //results.mrzGenerationErrMsg = err;
      console.log('......', results)
      onSubmit(Object.assign({}, {fields: results}, {mrzErrMsg: err.toString}));
    }
    }
}

export const SubmitButton = (props) => {
  return (
    <div className="field is-grouped has-text-centered">
      <div className="control">
        <button
          type="submit"
          onClick={() => validateForm({...props})}
          className="button is-link is-large"
        >
          <span>Submit</span>
        </button>
      </div>
    </div>
  )
}
