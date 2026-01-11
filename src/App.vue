<template>
  <div class="app">
    <header class="app__header">
      <div>
        <!-- <p class="app__eyebrow">Subscription Lab</p> -->
        <h1>Subscription Calculator</h1>
        <p class="app__subtitle">
          Calculate the money you spend on subscriptions and go on a guilt trip
        </p>
      </div>
      <nav class="app__nav">
        <button type="button" class="app__nav-button" @click="openOverview">
          Overview
        </button>
      </nav>
    </header>
    <main class="app__main">
      <RouterView />
    </main>
    <div
      v-if="isOverviewOpen"
      class="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="overview-title"
      @click.self="closeOverview"
    >
      <div class="modal__content">
        <div class="modal__header">
          <h2 id="overview-title">Why this calculator exists</h2>
          <button type="button" class="modal__close" @click="closeOverview">
            Close
          </button>
        </div>
        <p>
          This site was built to make the cost of actively running subscriptions feel
          real, and to quantify how much those recurring payments could have grown if
          you had invested the same money in a broad index(NIFTY 50) over the years.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const isOverviewOpen = ref(false);

const openOverview = () => {
  isOverviewOpen.value = true;
};

const closeOverview = () => {
  isOverviewOpen.value = false;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeOverview();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
</script>
