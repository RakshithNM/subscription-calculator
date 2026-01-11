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
            <span>{{ store.labels[index] ?? `Subscription ${index + 1}` }}</span>
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
            Add another subscription
          </button>
        </form>
      </section>

      <section class="summary">
        <StatCard
          label="Monthly total"
          :value="formatCurrency(store.monthlyAddOnsTotal)"
          hint="Monthly spend"
        />
        <StatCard
          label="Annual total"
          :value="formatCurrency(store.annualSubtotal)"
          hint="Annualized subscription value"
        />
        <article class="summary__note">
          <h3>NIFTY SIP potential</h3>
          <p>
            If you invested this monthly total as a SIP and earned a 12.3% annualized return for
            10 years, it could grow to
            <strong class="summary__highlight">{{ formatCurrency(niftySipValue) }}</strong
            >.
          </p>
        </article>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import StatCard from '@/components/StatCard.vue';
import { useSubscriptionStore } from '@/stores/subscription';

const store = useSubscriptionStore();

const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0
});

const annualReturn = 0.123;
const years = 10;

const formatCurrency = (value: number) => formatter.format(value);

const niftySipValue = computed(() => {
  const monthlyRate = Math.pow((1 + annualReturn), (1/12)) - 1;
  const totalMonths = years * 12;
  return store.monthlyAddOnsTotal * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
});
</script>

<style scoped>
.summary__highlight {
  background: rgba(255, 196, 64, 0.25);
  border-radius: 999px;
  box-shadow: 0 0 0 1px rgba(255, 196, 64, 0.45);
  color: inherit;
  display: inline-block;
  font-size: 1.25rem;
  font-weight: 700;
  padding: 0.15rem 0.6rem;
}
</style>
