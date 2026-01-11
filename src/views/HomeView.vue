<template>
  <section class="page">
    <div class="page__grid">
      <section class="panel">
        <h2>Monthly spend on subsciptions</h2>
        <p class="panel__subtitle">Enter the money you spend on subsciptions every month</p>

        <form class="form">
          <label class="form__field">
            <span>Amount</span>
            <div class="form__control">
              <input
                v-model.number="store.monthlyPrice"
                type="number"
                min="1"
                step="1"
              />
              <span class="form__suffix">USD</span>
            </div>
          </label>

          <label
            v-for="(amount, index) in store.amounts"
            :key="`amount-${index}`"
            class="form__field"
          >
            <span>Amount {{ index + 1 }}</span>
            <div class="form__control">
              <input v-model.number="store.amounts[index]" type="number" min="0" step="1" />
              <span class="form__suffix">USD</span>
            </div>
          </label>

          <button class="form__button" type="button" @click="store.addAmount">
            Add another amount
          </button>
        </form>
      </section>

      <section class="summary">
        <StatCard
          label="Monthly add-ons"
          :value="formatCurrency(store.monthlyAddOnsTotal)"
          hint="Combined optional charges"
        />
        <StatCard
          label="Annual subtotal"
          :value="formatCurrency(store.annualSubtotal)"
          hint="Annualized subscription value"
        />
        <StatCard
          label="Annual total"
          :value="formatCurrency(store.annualTotal)"
          hint="Projected revenue"
        />
        <article class="summary__note">
          <h3>Built-in goodies</h3>
          <ul>
            <li>Vue Router + Pinia wired and ready.</li>
            <li>ESLint + Prettier preconfigured.</li>
            <li>Vitest + Vue Test Utils for testing.</li>
          </ul>
        </article>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import StatCard from '@/components/StatCard.vue';
import { useSubscriptionStore } from '@/stores/subscription';

const store = useSubscriptionStore();

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
});

const formatCurrency = (value: number) => formatter.format(value);
</script>
