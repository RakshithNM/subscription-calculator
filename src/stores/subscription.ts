import { defineStore } from 'pinia';

export const useSubscriptionStore = defineStore('subscription', {
  state: () => ({
    monthlyPrice: 24,
    amounts: [15]
  }),
  getters: {
    monthlyAddOnsTotal: (state) =>
      state.amounts.reduce((total, amount) => total + amount, 0),
    annualSubtotal(): number {
      return (this.monthlyPrice + this.monthlyAddOnsTotal) * 12;
    },
    annualTotal(): number {
      return this.annualSubtotal;
    }
  },
  actions: {
    updateMonthlyPrice(value: number) {
      this.monthlyPrice = value;
    },
    addAmount() {
      this.amounts.push(0);
    }
  }
});
