import { defineStore } from 'pinia';

export const useSubscriptionStore = defineStore('subscription', {
  state: () => ({
    nextId: 4,
    baseFields: [
      {
        id: 1,
        name: 'Netflix',
        amount: 499
      },
      {
        id: 2,
        name: 'Jio Hotstar',
        amount: 299
      },
      {
        id: 3,
        name: 'Amazon Prime Video',
        amount: 125
      }
    ]
  }),
  getters: {
    monthlyAddOnsTotal: (state) => state.baseFields.reduce((a, b) => a + b.amount, 0),
    annualSubtotal(): number {
      return this.monthlyAddOnsTotal * 12;
    }
  },
  actions: {
    addAmount() {
      const numberOfFields = this.baseFields.length;
      const nextId = this.nextId;
      this.nextId += 1;
      this.baseFields.push({
        id: nextId,
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
