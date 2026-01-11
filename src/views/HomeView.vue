<template>
  <section class="page">
    <div class="page__grid">
      <section class="panel">
        <h2>Plan assumptions</h2>
        <p class="panel__subtitle">
          Adjust the levers below to see how subscription changes impact the annual total.
        </p>

        <form class="form">
          <label class="form__field">
            <span>Monthly price per seat</span>
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

          <label class="form__field">
            <span>Team members</span>
            <div class="form__control">
              <input v-model.number="store.teamMembers" type="number" min="1" step="1" />
              <span class="form__suffix">seats</span>
            </div>
          </label>

          <label class="form__field">
            <span>Annual discount</span>
            <div class="form__control">
              <input
                v-model.number="store.discountPercent"
                type="number"
                min="0"
                max="50"
                step="1"
              />
              <span class="form__suffix">%</span>
            </div>
          </label>
        </form>
      </section>

      <section class="summary">
        <StatCard
          label="Annual subtotal"
          :value="formatCurrency(store.annualSubtotal)"
          hint="Before discounts"
        />
        <StatCard
          label="Discount value"
          :value="formatCurrency(store.annualDiscount)"
          hint="Seasonal or enterprise deal"
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
