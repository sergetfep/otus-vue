<script lang="ts">
import { defineComponent } from 'vue';

import TheForm from '@/components/forms/TheForm.vue';

import type { IField } from '../components/forms/fields/types.ts';

export default defineComponent({
  components: {
    TheForm
  },
  data() {
    return {
      toastConfig: {
        isShown: false,
        title: 'Success',
        text: 'Product successfully added'
      },
      formConfig: {
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
      }
    };
  },
  methods: {
    async sendOrder(values: object): Promise<void> {
      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          method: 'POST',
          body: JSON.stringify(values)
        });
        console.log(await response.json());
      } catch (error) {
        this.toastConfig.title = 'Error';
        this.toastConfig.text = 'Something went wrong.';
        this.showToast();
      }
      this.showToast();
    },
    async onSubmit(values: object, { resetForm }: any): Promise<void> {
      await this.sendOrder(values);
      resetForm();
    },
    showToast(): void {
      this.toastConfig.isShown = true;

      setTimeout(() => {
        this.toastConfig.isShown = false;
      }, 3000);
    }
  }
});
</script>

<template>
  <section id="add-product" class="order">
    <div class="container">
      <TheForm @submit="onSubmit" :config="formConfig" />
      <BaseToast :config="toastConfig" />
    </div>
  </section>
</template>
