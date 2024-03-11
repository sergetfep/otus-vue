import type { IField } from '../components/forms/fields/types.js';

export const toastConfig = {
  isShown: false,
  title: 'Success',
  text: 'Purchase is successful'
};

export const formConfig = {
  fields: [
    {
      name: 'name',
      labelText: 'Name',
      rules: 'required'
    },
    {
      name: 'birthdate',
      labelText: 'Date of Birth (DD.MM.YYYY)',
      placeholder: 'DD.MM.YYYY',
      rules: {
        required: true,
        regex: /^(0[1-9]|[12][0-9]|3[01]).(0[1-9]|1[1,2]).(19|20)\d{2}$/
      }
    },
    {
      name: 'email',
      labelText: 'Email',
      rules: 'required|email'
    },
    {
      name: 'country',
      labelText: 'Country',
      component: 'SelectField',
      rules: 'required',
      options: {
        uk: 'United Kingdom',
        usa: 'United States of America'
      }
    },
    { name: 'address', labelText: 'Address', rules: 'required' },
    {
      name: 'cardNumber',
      labelText: 'Card Number',
      placeholder: '**** **** **** ****',
      rules: {
        required: true,
        regex: /^\d{4} \d{4} \d{4} \d{4}$/
      }
    },
    {
      name: 'expirationDate',
      labelText: 'Expiration (MM/YY)',
      placeholder: 'MM/YY',
      rules: {
        required: true,
        regex: /^\d{2}\/\d{2}$/
      }
    },
    {
      name: 'securityCode',
      labelText: 'Security Code',
      placeholder: '***',
      rules: 'required|digits:3'
    },
    {
      name: 'policy',
      labelText: 'Я ознакомлен с политкой безопасности',
      component: 'CheckboxField',
      rules: 'required'
    }
  ] as IField[],
  twoCols: true,
  title: 'Order',
  btnText: 'Order'
};
