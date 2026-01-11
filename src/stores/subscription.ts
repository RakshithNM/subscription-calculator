import { defineStore } from 'pinia';

export const useSubscriptionStore = defineStore('subscription', {
  state: () => ({
    baseFields: [
      {
        name: 'Netflix',
        amount: 499
      },
      {
        name: 'Jio Hotstar',
        amount: 299
      },
      {
        name: 'Amazon Prime Video',
        amount: 125
      }
    ]
  }),
  getters: {
    monthlyAddOnsTotal: (state) => state.baseFields.reduce((a, b) => a + b.amount, 0),
    annualSubtotal(): number {
      return this.monthlyAddOnsTotal * 12;
    },
    annualTotal(): number {
      return this.annualSubtotal;
    }
  },
  actions: {
    addAmount() {
      const numberOfFields = this.baseFields.length;
      this.baseFields.push({
        name: `Subscription ${numberOfFields + 1}`,
        amount: 0
      });
    },
    removeAmount(index: number) {
      if (this.baseFields.length > 1) {
        this.baseFields.splice(index, 1);
      }
    }
  }
});
