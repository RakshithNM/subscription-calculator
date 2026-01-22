<template>
  <section class="page">
    <div class="page__grid">
      <section class="panel">
        <h2>Monthly spend on subscriptions</h2>
        <p class="panel__subtitle">Enter the money you spend on subscriptions every month</p>

        <form class="form">
          <div
            v-for="(field, index) in store.baseFields"
            :key="field.id"
            class="form__field"
          >
            <span>{{ field.name }}</span>
            <div :class="['form__control', { 'form__control--invalid': invalidInputs[index] }]">
              <input
                :value="formatAmountInput(field.amount)"
                type="text"
                inputmode="numeric"
                pattern="[0-9]*"
                @input="updateAmount(index, $event)"
              />
              <span class="form__suffix">INR</span>
              <button
                v-if="store.baseFields.length > 1"
                class="form__remove"
                type="button"
                @click="removeAmount(index)"
              >
                Remove
              </button>
            </div>
          </div>

          <button class="form__button" type="button" @click="addAmount">
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
            If you invested this monthly total as a SIP and earned a
            {{ annualReturnPercent }}% annualized return for {{ years }} years, it could grow to
            <strong class="summary__highlight">{{ formatCurrency(niftySipValue) }}</strong>.
          </p>
        </article>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
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

const annualReturn = 0.13;
const years = 10;
const annualReturnPercent = Math.round(annualReturn * 100);

const formatCurrency = (value: number) => formatter.format(value);
const formatAmountInput = (value: number) => inputFormatter.format(Math.max(0, Math.round(value)));

const parseAmountInput = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed || trimmed.startsWith('-')) {
    return 0;
  }

  const digits = trimmed.replace(/[^\d]/g, '');
  return digits ? Number.parseInt(digits, 10) : 0;
};

const invalidInputs = ref<boolean[]>(store.baseFields.map(() => false));

const updateAmount = (index: number, event: Event) => {
  const target = event.currentTarget as HTMLInputElement;
  const rawValue = target?.value ?? '';
  const isNegative = rawValue.trim().startsWith('-');
  invalidInputs.value[index] = isNegative;
  const nextValue = parseAmountInput(rawValue);
  store.baseFields[index].amount = nextValue;
};

const addAmount = () => {
  store.addAmount();
  invalidInputs.value.push(false);
};

const removeAmount = (index: number) => {
  store.removeAmount(index);
  invalidInputs.value.splice(index, 1);
};

const niftySipValue = computed(() => {
  const monthlyRate = Math.pow(1 + annualReturn, 1 / 12) - 1;
  const totalMonths = years * 12;
  if (monthlyRate === 0) {
    return store.monthlyAddOnsTotal * totalMonths;
  }
  return (
    store.monthlyAddOnsTotal *
    ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
    (1 + monthlyRate)
  );
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
