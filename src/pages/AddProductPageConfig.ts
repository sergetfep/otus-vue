import type { IField } from '../components/forms/fields/types.js';

export const toastConfig = {
  isShown: false,
  title: 'Success',
  text: 'Product successfully added'
};

export const formConfig = {
  fields: [
    {
      name: 'title',
      labelText: 'Title',
      rules: 'required'
    },
    {
      name: 'price',
      labelText: 'Price',
      rules: 'required|numeric'
    },
    {
      name: 'description',
      labelText: 'Description',
      rules: 'required'
    },
    {
      name: 'image',
      labelText: 'Image',
      placeholder: 'Input image url',
      rules: 'required|url'
    },
    { name: 'category', labelText: 'Category', rules: 'required' }
  ] as IField[],
  title: 'Add product',
  btnText: 'Add'
};
