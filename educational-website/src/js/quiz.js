// Questões do quiz
const questions = [
    {
        id: 1,
        question: 'Qual tag HTML5 é mais apropriada para o menu principal do site?',
        options: [
            { text: '<div>', value: 'div' },
            { text: '<nav>', value: 'nav', correct: true },
            { text: '<header>', value: 'header' },
            { text: '<main>', value: 'main' }
        ]
    },
    {
        id: 2,
        question: 'Qual propriedade CSS é usada para criar um layout em grade?',
        options: [
            { text: 'flex', value: 'flex' },
            { text: 'grid', value: 'grid', correct: true },
            { text: 'float', value: 'float' },
            { text: 'position', value: 'position' }
        ]
    },
    // Adicione mais questões aqui
];

// Elementos do DOM
const startScreen = document.querySelector('.quiz-start');
const questionsScreen = document.querySelector('.quiz-questions');
const resultScreen = document.querySelector('.quiz-result');
const progressBar = document.querySelector('.quiz-progress__bar');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');
const lastScoreEl = document.getElementById('lastScore');
const startButton = document.getElementById('startQuiz');
const prevButton = document.getElementById('prevQuestion');
const nextButton = document.getElementById('nextQuestion');
const navigation = document.querySelector('.quiz-navigation');

// Estado do quiz
let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);
const totalQuestions = questions.length;

// Carregar última pontuação
const lastScore = localStorage.getItem('quizLastScore');
if (lastScore) {
    lastScoreEl.textContent = `${lastScore}%`;
}

// Event listeners
startButton.addEventListener('click', startQuiz);
prevButton.addEventListener('click', showPreviousQuestion);
nextButton.addEventListener('click', showNextQuestion);

function startQuiz() {
    startScreen.classList.remove('active');
    questionsScreen.hidden = false;
    navigation.hidden = false;
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);
    showQuestion(0);
    updateProgress();
}

function showQuestion(index) {
    const question = questions[index];
    questionsScreen.innerHTML = `
        <div class="question" data-id="${question.id}">
            <h3>${question.question}</h3>
            <div class="options">
                ${question.options.map((option, i) => `
                    <label class="option">
                        <input type="radio" 
                               name="q${question.id}" 
                               value="${option.value}"
                               ${userAnswers[index] === option.value ? 'checked' : ''}>
                        <span>${option.text}</span>
                    </label>
                `).join('')}
            </div>
        </div>
    `;

    // Adicionar event listeners para as opções
    questionsScreen.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            userAnswers[currentQuestion] = radio.value;
            updateProgress();
        });
    });

    // Atualizar navegação
    updateNavigation();
}

function showPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
        updateProgress();
    }
}

function showNextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion(currentQuestion);
        updateProgress();
    } else {
        showResults();
    }
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / totalQuestions) * 100;
    progressBar.style.width = `${progress}%`;
    currentQuestionEl.textContent = currentQuestion + 1;
    totalQuestionsEl.textContent = totalQuestions;
}

function updateNavigation() {
    prevButton.disabled = currentQuestion === 0;
    nextButton.textContent = currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima';
}

function showResults() {
    const score = calculateScore();
    questionsScreen.hidden = true;
    navigation.hidden = true;
    resultScreen.hidden = false;

    const scoreNumber = resultScreen.querySelector('.score__number');
    const scoreMessage = resultScreen.querySelector('.score__message');
    
    scoreNumber.textContent = `${score}%`;
    
    if (score >= 90) {
        scoreMessage.textContent = 'Excelente! Você domina desenvolvimento web!';
    } else if (score >= 70) {
        scoreMessage.textContent = 'Bom trabalho! Continue estudando!';
    } else {
        scoreMessage.textContent = 'Continue praticando para melhorar!';
    }

    // Salvar pontuação
    localStorage.setItem('quizLastScore', score);
}

function calculateScore() {
    const correctAnswers = userAnswers.filter((answer, index) => {
        const question = questions[index];
        const correctOption = question.options.find(opt => opt.correct);
        return answer === correctOption.value;
    });

    return Math.round((correctAnswers.length / questions.length) * 100);
}

// Reiniciar quiz
document.getElementById('retryQuiz').addEventListener('click', () => {
    resultScreen.hidden = true;
    startScreen.classList.add('active');
});
