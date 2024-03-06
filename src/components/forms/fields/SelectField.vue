<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

import { Field } from 'vee-validate';

import type { IField } from './types.ts';

export default defineComponent({
  components: {
    VField: Field
  },
  props: {
    field: {
      type: Object as PropType<IField>,
      required: true
    }
  }
});
</script>

<template>
  <VField class="form__select" :name="field.name" :id="field.name" :rules="field.rules" as="select">
    <option v-for="(text, option) in field.options" :key="option" :value="option">
      {{ text }}
    </option>
  </VField>
</template>
