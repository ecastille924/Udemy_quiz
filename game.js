const question = document.getElementById("question")
const choices= Array.from(document.getElementsByClassName("choice-text"))
const progressText = document.getElementById("progressText")
const scoreText = document.getElementById("score")
const progressBarFull = document.getElementById("progressBarFull")

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Who's the cutest cat?",
        choice1: "Buddy",
        choice2: "Jimmothy",
        choice3: "Johnda",
        choice4: "Dave",
        answer: 1
    },
    {
        question: "Who's the best band?",
        choice1: "Brown Thunder",
        choice2: "Yellow Snow",
        choice3: "Pink Lightning",
        choice4: "Blue Bloods",
        answer: 3
    },
    {
        question: "Who's the best NBA rookie?",
        choice1: "Jaylen Green",
        choice2: "Johnathan Kuminga",
        choice3: "Scottie Barnes",
        choice4: "Josh Giddey",
        answer: 4
    },
]

//CONSTANTS 
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ...questions];
    getNewQuestion();
}

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        //go to the end page 
        return window.location.assign("/Users/erick/Development/code/udemy_quiz/end.html")
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`

    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question

    choices.forEach( choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true;

    choices.forEach(choice => {
        choice.addEventListener('click', e => {
            if(!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnswer = selectedChoice.dataset["number"];

            const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

            if (classToApply === "correct"){
                incrememntScore(CORRECT_BONUS)
            }

            selectedChoice.parentElement.classList.add(classToApply)
            
            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply)
                getNewQuestion();
            }, 2000)
            
            
        })
    })
}

incrememntScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame()
