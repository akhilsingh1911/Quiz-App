const questions = [
    {
        question: "Which planet is known as the 'Red Planet'?",
        answer: [
            { text: 'Venus', correct: false },
            { text: 'Jupiter', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Saturn', correct: false },
        ]
    },
    {
        question: "What is the largest ocean in the world? ",
        answer: [
            { text: 'Atlantic Ocean', correct: false },
            { text: 'Indian Ocean', correct: false },
            { text: 'Arctic Ocean', correct: false },
            { text: 'Pacific Ocean', correct: true },
        ]
    },
    {
        question: "Who wrote the famous book 'Harry Potter'? ",
        answer: [
            { text: ' J.R.R. Tolkien', correct: false },
            { text: 'J.K. Rowling', correct: true },
            { text: 'George R.R. Martin', correct: false },
            { text: ' Roald Dahl', correct: false },
        ]
    },
    {
        question: "Which is the smallest state in India by area?",
        answer: [
            { text: 'Sikkim', correct: false },
            { text: 'Goa', correct: true },
            { text: 'Tripura', correct: false },
            { text: 'Manipur', correct: false },
        ]
    },
    {
        question: "What is the hardest natural substance on Earth? ",
        answer: [
            { text: 'Gold', correct: false },
            { text: 'Iron', correct: false },
            { text: 'Diamond', correct: true },
            { text: 'Granite', correct: false },
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButton = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');


let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === 'true';
    if (isCorrect) {
        selectBtn.classList.add('correct');
        score++;
    } else {
        selectBtn.classList.add('incorrect');
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = 'play again';
    nextButton.style.display = 'block'
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})
startQuiz();