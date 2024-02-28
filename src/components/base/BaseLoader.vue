<template>
  <div class="loader">
    <div class="loader__wrapper">
      <span class="loader__body"></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loader {
  position: relative;
  min-height: 500px;

  &__wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__body {
    width: 48px;
    height: 48px;
    border: 5px solid #67c4a7;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
