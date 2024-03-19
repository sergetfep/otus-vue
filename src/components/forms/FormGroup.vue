<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import { ErrorMessage } from 'vee-validate';

import TextField from './fields/TextField.vue';
import SelectField from './fields/SelectField.vue';
import CheckboxField from './fields/CheckboxField.vue';

import type { IField } from './fields/types.ts';

export default defineComponent({
  components: {
    VErrorMessage: ErrorMessage,
    TextField,
    SelectField,
    CheckboxField
  },
  props: {
    field: {
      type: Object as PropType<IField>,
      required: true
    }
  },
  computed: {
    isCheckbox(): boolean {
      return this.field.component === 'CheckboxField';
    }
  }
});
</script>

<template>
  <div class="form__group">
    <div class="flex gap-2" :class="{ 'flex-col': !isCheckbox, 'items-center': isCheckbox }">
      <label :for="field.name" class="form__label">{{ field.labelText }}</label>
      <component
        :is="field.component || 'TextField'"
        v-bind="field.attrs"
        :field="field"
      ></component>
    </div>
    <VErrorMessage :name="field.name" class="form__error" />
  </div>
</template>
