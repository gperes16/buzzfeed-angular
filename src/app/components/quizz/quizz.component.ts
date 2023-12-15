import { Component, OnInit } from '@angular/core';

import quiz_questions from '../../../assets/data/quizz_questions.json';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],
})
export class QuizzComponent implements OnInit {
  title: string = '';
  quizJson: any = quiz_questions;


  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;
  result: string;

  constructor() {}

  ngOnInit(): void {
    if (quiz_questions) {
      this.finished = false;
      this.title = quiz_questions.title;

      this.questions = quiz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string): void {
    this.answers.push(value);
    this.nextStep();
  }

  nextStep() {
    this.questionIndex++;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      this.finished = true;
      this.checkResult()
    }
  }

  checkResult() {
    let A: number = 0;
    let B: number = 0;
    this.answers.forEach((option) => {
      if (option == 'A') A++;
      else B++;
    });

    if (A > B) {
      this.result = quiz_questions.results.A;
    } else this.result = quiz_questions.results.B;
  }
}
