import { defineStore } from 'pinia';

export const useSubscriptionStore = defineStore('subscription', {
  state: () => ({
    monthlyPrice: 24,
    teamMembers: 5,
    discountPercent: 10
  }),
  getters: {
    annualSubtotal: (state) => state.monthlyPrice * 12 * state.teamMembers,
    annualDiscount: (state) =>
      state.monthlyPrice * 12 * state.teamMembers * (state.discountPercent / 100),
    annualTotal(): number {
      return this.annualSubtotal - this.annualDiscount;
    }
  },
  actions: {
    updateMonthlyPrice(value: number) {
      this.monthlyPrice = value;
    },
    updateTeamMembers(value: number) {
      this.teamMembers = value;
    },
    updateDiscountPercent(value: number) {
      this.discountPercent = value;
    }
  }
});
