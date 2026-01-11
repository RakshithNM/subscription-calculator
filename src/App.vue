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
        <RouterLink to="/">Overview</RouterLink>
      </nav>
    </header>
    <main class="app__main">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
</script>
