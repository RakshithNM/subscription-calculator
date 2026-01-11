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
            <span>Subscription {{ index + 1 }}</span>
            <div class="form__control" :class="{ 'form__control--invalid': isLabelEmpty(index) }">
              <input
                :value="labelValue(index)"
                type="text"
                placeholder="Label (e.g. Netflix)"
                @input="updateLabel(index, $event)"
              />
            </div>
            <div class="form__control">
              <input
                :value="formatAmountInput(amount)"
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                @input="updateAmount(index, $event)"
              />
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
const inputFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0
});

const annualReturn = 0.123;
const years = 10;

const formatCurrency = (value: number) => formatter.format(value);
const formatAmountInput = (value: number) => inputFormatter.format(Math.max(0, Math.round(value)));

const labelValue = (index: number) => store.labels[index] ?? '';
const isLabelEmpty = (index: number) => !labelValue(index).trim();

const updateLabel = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  store.labels[index] = target.value;
};

const parseAmountInput = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith('-')) {
    return 0;
  }

  const digits = trimmed.replace(/[^\d]/g, '');
  return digits ? Number.parseInt(digits, 10) : 0;
};

const updateAmount = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement;
  const nextValue = parseAmountInput(target.value);
  store.amounts[index] = nextValue;
};

const niftySipValue = computed(() => {
  const monthlyRate = Math.pow((1 + annualReturn), (1 / 12)) - 1;
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
