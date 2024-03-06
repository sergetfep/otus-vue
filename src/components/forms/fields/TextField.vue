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
  <VField
    type="text"
    class="form__input"
    :name="field.name"
    :id="field.name"
    :placeholder="field.placeholder || field.labelText"
    :rules="field.rules"
  />
</template>
