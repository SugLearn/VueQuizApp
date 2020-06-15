import { mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'
import QuestionBox from '@/components/QuestionBox.vue'
describe('Test the Header Component', () => {
   it('check the data is correct', () => {
    const wrapper = mount(Header)
    const vm = wrapper.vm
        expect(wrapper.find('#quiz-title').text()).toBe('Fancy Quiz')
      })

    it('check the Header tag', () => {
      const wrapper = mount(QuestionBox)
      const vm = wrapper.vm
          expect(wrapper.find('#header').text()).toBe('Quiz Questions')
        })

})
