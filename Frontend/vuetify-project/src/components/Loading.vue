<template>
  <div class="loading-overlay">
    <v-progress-circular
      indeterminate
      color="primary"
      size="70"
      width="6"
    />
    <p class="mt-3 text-white text-h6">Loading...</p>
  </div>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
</style>
