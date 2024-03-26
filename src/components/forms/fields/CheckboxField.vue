<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

import { Field } from 'vee-validate';

import type { IField } from './types.ts';

export default defineComponent({
  components: {
    VField: Field,
  },
  props: {
    field: {
      type: Object as PropType<IField>,
      required: true,
    },
  },
});
</script>

<template>
  <VField
    type="checkbox"
    class="form__checkbox"
    :name="field.name"
    :id="field.name"
    :rules="field.rules"
    :value="true"
    :unchecked-value="false"
  />
</template>
