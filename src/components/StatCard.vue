<template>
  <section class="stat-card">
    <p class="stat-card__label">{{ label }}</p>
    <p class="stat-card__value">{{ value }}</p>
    <p class="stat-card__hint">{{ hint }}</p>
  </section>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  value: string;
  hint: string;
}

defineProps<Props>();
</script>
