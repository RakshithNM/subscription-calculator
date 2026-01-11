import { defineStore } from 'pinia';

export const useSubscriptionStore = defineStore('subscription', {
  state: () => ({
    amounts: [499, 299, 125],
    labels: ['Netflix', 'Jio Hotstar', 'Amazon Prime Video'] as Array<string | null>
  }),
  getters: {
    monthlyAddOnsTotal: (state) =>
      state.amounts.reduce((total, amount) => total + amount, 0),
    annualSubtotal(): number {
      return this.monthlyAddOnsTotal * 12;
    },
    annualTotal(): number {
      return this.annualSubtotal;
    }
  },
  actions: {
    addAmount() {
      this.amounts.push(0);
      this.labels.push(null);
    },
    removeAmount(index: number) {
      if (this.amounts.length > 1) {
        this.amounts.splice(index, 1);
        this.labels.splice(index, 1);
      }
    }
  }
});
