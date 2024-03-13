<script lang="ts">
import { defineComponent } from 'vue';

import TheForm from '@/components/forms/TheForm.vue';

import type { IField } from '../components/forms/fields/types';

export default defineComponent({
  components: {
    TheForm
  },
  data() {
    return {
      formConfig: {
        fields: [
          {
            name: 'login',
            labelText: 'Login',
            rules: 'required'
          },
          {
            name: 'password',
            labelText: 'Password',
            rules: 'required',
            attrs: {
              type: 'password'
            }
          }
        ] as IField[],
        title: 'Login',
        btnText: 'Login'
      }
    };
  },
  methods: {
    async onSubmit(values: object, { resetForm }: any): Promise<void> {
      resetForm();
      this.$emit('login');
      this.$router.push({ name: 'products.add' });
    }
  }
});
</script>

<template>
  <section id="add-product" class="order">
    <div class="container">
      <TheForm @submit="onSubmit" :config="formConfig" />
    </div>
  </section>
</template>
