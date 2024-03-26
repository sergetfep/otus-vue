<script lang="ts">
import { defineComponent, type PropType } from 'vue';

interface IConfig {
  title: string;
  text: string;
  isShown: boolean;
}

export default defineComponent({
  props: {
    config: {
      type: Object as PropType<IConfig>,
      required: true,
    },
  },
});
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div v-if="config.isShown" class="toast">
        <div class="toast__title">{{ config.title }}</div>
        <div class="toast__text">{{ config.text }}</div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.toast {
  position: fixed;
  top: 70px;
  right: 20px;
  border-radius: 10px;
  box-shadow: 0px 1px 20px 0px rgba(208, 208, 208, 0.4);
  background: rgb(255, 255, 255);
  padding: 15px 30px;

  display: flex;
  flex-direction: column;
  gap: 11px;
  transition: all 0.9s;

  &.v-enter-from,
  &.v-leave-to {
    right: -100%;
  }

  &.v-enter-to,
  &.v-leave-from {
    right: 20px;
  }

  &__title {
    color: rgb(39, 39, 39);
    font-size: 18px;
    font-weight: 700;
    line-height: 21px;
    letter-spacing: 0%;
    text-align: center;
  }

  &__text {
    color: rgb(73, 73, 73);
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0%;
  }
}
</style>
