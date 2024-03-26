<script lang="ts">
import { defineComponent } from 'vue';

import TheForm from '@/components/forms/TheForm.vue';

import { toastConfig, formConfig } from '@/pages/AddProductPageConfig';

export default defineComponent({
  components: {
    TheForm,
  },
  data() {
    return { toastConfig, formConfig };
  },
  methods: {
    async sendOrder(values: object): Promise<void> {
      try {
        const response = await fetch('https://fakestoreapi.com/products', {
          method: 'POST',
          body: JSON.stringify(values),
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
    },
  },
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
