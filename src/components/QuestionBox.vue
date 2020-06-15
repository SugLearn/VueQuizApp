<template>
<div class="container">
  <h1 id="header">Quiz Questions</h1>
  <b-jumbotron>

    <template v-slot:lead>
      {{ currentQues.question }}
    </template>

    <hr class="my-4">
    <b-list-group>
      <b-list-group-item  v-for="(answer,index) in shuffledAnswers" :key="index"
      @click="selectAns(index)"
      :class="answerClass(index)">
        {{ answer }}
      </b-list-group-item>
    </b-list-group>
    <b-button variant="primary" @click="submitAnswer" :disabled="selectedIndex === null || answered">
      Submit</b-button>
    <b-button @click="next" variant="success" href="#" >Next</b-button>
  </b-jumbotron>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  props:{
    currentQues : Object,
    next: Function,
    increment: Function
  },
  data(){
    return{
      selectedIndex: null,
      correctIndex: null,
      shuffledAnswers: [],
      answered: false
    }
  },

  computed:{
    answers(){
      let answers = [...this.currentQues.incorrect_answers]
      answers.push(this.currentQues.correct_answer)
      return answers
    }
  },
  watch:{
    currentQues:{
      immediate: true,
      handler(){
      this.selectedIndex = null;
      this.answered = false
      this.shuffleAnswers()
      }
    }
  },
  methods:{
    selectAns(index){
      this.selectedIndex = index
    },
    submitAnswer(){
      let isCorrect = false

      if(this.selectedIndex === this.correctIndex ){
        isCorrect = true
      }
      this.answered = true
      this.increment(isCorrect)
    },
    shuffleAnswers(){
      let answers = [...this.currentQues.incorrect_answers, this.currentQues.correct_answer]
      this.shuffledAnswers = _.shuffle(answers)
      this.correctIndex = this.shuffledAnswers.indexOf(this.currentQues.correct_answer)
    },

    answerClass(index) {
      let answerClass = ''
      if (!this.answered && this.selectedIndex === index) {
        answerClass = 'selected'
      } else if (this.answered && this.correctIndex === index) {
        answerClass = 'correct'
      } else if (this.answered &&
        this.selectedIndex === index &&
        this.correctIndex !== index
      ) {
        answerClass = 'incorrect'
      }
      return answerClass
    }
  }
  // mounted(){
  //   this.shuffleAnswers()
  // }
}
</script>

<style scoped>
.list-group{
  margin-bottom: 15px;
}
.list-group-item:hover {
  background: #EEE;
  cursor: pointer;
}
.btn{
  margin: 0 5px;
}
.selected{
  background-color: lightblue;
}
.correct{
  background-color: lightgreen;
}
.incorrect{
  background-color: red;
}

</style>