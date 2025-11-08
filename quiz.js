const questions = [
    {
        question: "Which franchise has won more championships?",
        answers: [
            { text: "Boston Celtics", correct: false },
            { text: "The Yankees", correct: false },
            { text: "Montreal Canadiens", correct: true },
            { text: "New England Patriots", correct: false },
        ]
    },
    {
        question: "What is considered the most popular sport in the world?",
        answers: [
            { text: "Soccer", correct: true },
            { text: "Basketball", correct: false },
            { text: "Hockey", correct: false },
            { text: "Cricket", correct: false },
        ]
    },
    {
        question: "Which boxer is currently undefeated and STILL boxing?",
        answers: [
            { text: "Ryan Garcia", correct: false },
            { text: "Tank Davis", correct: true },
            { text: "Floyd Mayweather", correct: false },
            { text: "Canelo", correct: false },
        ]
    },
    {
        question: "Who broke the record for most 3's in the NBA?",
        answers: [
            { text: "Steph Curry", correct: false },
            { text: "Michael Jordan", correct: false },
            { text: "Klay Thompson", correct: true },
            { text: "Ray Allen", correct: false },
        ]
    },
    {
        question: "How many games total are played in the NFL?",
        answers: [
            { text: "600", correct: false },
            { text: "272", correct: true },
            { text: "300", correct: false },
            { text: "475", correct: false },
        ]
    },
    {
        question: "In motor racing, what color is the flag for winner?",
        answers: [
            { text: "Black", correct: false },
            { text: "White", correct: false },
            { text: "Rainbow", correct: false },
            { text: "Checkered", correct: true },
        ]
    },
    {
        question: "Who is considered 'The Answer' in the NBA?",
        answers: [
            { text: "Michael Jordan", correct: false },
            { text: "Tim Duncan", correct: false },
            { text: "Allen Iverson", correct: true },
            { text: "Wilt Chamberlain", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerText = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
    questionElement.classList.add("fade");

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn", "fade");
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") button.classList.add("correct");
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerText = `Your result: ${score}/${questions.length}`;
    nextButton.innerText = "Play Again?";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
