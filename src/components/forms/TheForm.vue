<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import { Form } from 'vee-validate';

import FormGroup from './FormGroup.vue';

import type { IField } from './fields/types.ts';

interface IConfig {
  fields: Array<IField>;
  twoCols?: boolean;
  title: string;
  btnText: string;
}

export default defineComponent({
  components: {
    VForm: Form,
    FormGroup,
  },
  props: {
    config: {
      type: Object as PropType<IConfig>,
      required: true,
    },
  },
});
</script>

<template>
  <VForm class="form">
    <div class="form__container p-2">
      <h1 class="form__title">{{ config.title }}</h1>
      <div class="grid mt-4 gap-4" :class="{ 'grid-cols-2': config.twoCols }">
        <FormGroup v-for="field in config.fields" :key="field.name" :field="field" />
      </div>
      <button class="btn mt-4 w-[284px] min-w-fit mx-auto block">{{ config.btnText }}</button>
    </div>
  </VForm>
</template>
