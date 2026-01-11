import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import App from '@/App.vue';

describe('App', () => {
  it('renders the main heading', () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain('Subscription Calculator');
  });
});
