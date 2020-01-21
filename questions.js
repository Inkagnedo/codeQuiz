var startButton = document.getElementById('start-btn')
var scoreButton = document.getElementById('score-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('question-container')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('answer-buttons')
var timeEl = document.getElementById('timer')
var initialsEL = document.getElementById('initials')
var startTime = 75
var score = 0
var highScore = 0
var actualScoreEl = document.getElementById('actual-score')
var highscoreEl = document.getElementById('high-score')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  scoreButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  actualScoreEl.textContent = score;
  highscoreEl.textContent = highScore;
  questionContainerElement.classList.remove('hide')
  setNextQuestion()

  var timerInterval = setInterval(function() {
    startTime--;
    timeEl.textContent = startTime;

    if(startTime === 0) {
    clearInterval(timerInterval);
    }

  }, 1000);
    console.log(questions[currentQuestionIndex])
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
    


    stopTimer()
      actualScoreEl.textContent = timeEl.innerText
      if (actualScoreEl.textContent > highscoreEl.textContent){
        initialsEL.textContent= prompt("Enter Initials Here!!")
        localStorage.setItem ('high-score', score.textContent)
        highscoreEl.textContent = localStorage.getItem("high-score")
        localStorage.setItem('initials', initialsEL.textContent)
      
        initialsEL.textContent = localStorage.getItem('initials')}
  }
}

function stopTimer() {
  clearTimeout(startTime) 
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

var questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    answers: [
      { text: '<scripting>', correct: false },
      { text: '<script>', correct: true },
      { text: '<js>', correct: false },
      { text: '<javascript>', correct: false }
    ]
  },
  {
    question: 'Where is the correct place to insert a JavaScript?',
    answers: [
      { text: 'In the <head> section', correct: false },
      { text: 'Both the <head> section and <body> section', correct: false },
      { text: 'Towards the beginning <body> section', correct: false },
      { text: 'Towards the ending <body> section', correct: true }
    ]
  },
  {
    question: 'How do you write "Hello World" in an alert box?',
    answers: [
      { text: 'alert("Hello World")', correct: true },
      { text: 'alertBox("Hello World")', correct: false },
      { text: 'msg("Hello World")', correct: false },
      { text: 'msgBox("Hello World")', correct: false }
    ]
  },
  {
    question: 'Which of these is a correct IF statement?',
    answers: [
      { text: 'if i == 5 then', correct: false },
      { text: 'if i = 5', correct: false},
      { text: 'if (i == 5)', correct: true },
      { text: 'if i === 5', correct: false}
    ]
  },
  {
    question: 'How can you add a comment in a JavaScript?',
    answers: [
      { text: '//This is a comment', correct: true },
      { text: '"This is a comment', correct: false },
      { text: '<!--This is a comment-->', correct: false },
      { text: 'This is a comment//', correct: false }
    ]
  }
]