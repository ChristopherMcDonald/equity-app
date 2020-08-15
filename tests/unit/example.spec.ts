import { shallowMount } from '@vue/test-utils';
import Main from '@/components/Main.vue';

describe('Main.vue', () => {
  it('renders props.msg when passed', () => {
    shallowMount(Main);
  });
});
