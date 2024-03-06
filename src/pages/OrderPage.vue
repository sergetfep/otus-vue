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
        text: 'Purchase is successful'
      },
      formConfig: {
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
      }
    };
  },
  methods: {
    async sendOrder(values: object): Promise<void> {
      try {
        const response = await fetch('https://httpbin.org/post', {
          method: 'POST',
          body: JSON.stringify(values)
        });
        await response.json();
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
  <section id="order" class="order">
    <div class="container">
      <TheForm @submit="onSubmit" :config="formConfig" />
      <BaseToast :config="toastConfig" />
    </div>
  </section>
</template>
