<template>
  <section class="page">
    <div class="page__grid">
      <section class="panel">
        <h2>Monthly spend on subsciptions</h2>
        <p class="panel__subtitle">Enter the money you spend on subsciptions every month</p>

        <form class="form">
          <label
            v-for="(amount, index) in store.amounts"
            :key="`amount-${index}`"
            class="form__field"
          >
            <span>{{ subscriptionLabels[index] ?? `Subscription ${index + 1}` }}</span>
            <div class="form__control">
              <input v-model.number="store.amounts[index]" type="number" min="0" step="1" />
              <span class="form__suffix">INR</span>
              <button
                v-if="store.amounts.length > 1"
                class="form__remove"
                type="button"
                @click="store.removeAmount(index)"
              >
                Remove
              </button>
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

const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

const subscriptionLabels = ['Netflix', 'Jio Hotstar', 'Amazon Prime Video'];

const formatCurrency = (value: number) => formatter.format(value);
</script>
