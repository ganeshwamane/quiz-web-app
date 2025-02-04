const questions = [
    { 
        question: "What is the capital of France?", 
        options: ["Paris", "London", "Berlin", "Madrid"], 
        answer: "Paris" 
    },
    { 
        question: "Which is the largest planet?", 
        options: ["Mars", "Jupiter", "Earth", "Venus"], 
        answer: "Jupiter" 
    },
    { 
        question: "What is 2 + 2?", 
        options: ["3", "4", "5", "6"], 
        answer: "4" 
    }
];

let currentQuestionIndex = 0;
let selectedAnswers = {}; 

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    let q = questions[currentQuestionIndex];
    questionEl.innerText = q.question;
    optionsEl.innerHTML = "";

    q.options.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(btn, option, q.answer);
        
        
        if (selectedAnswers[currentQuestionIndex] !== undefined) {
            btn.classList.add(selectedAnswers[currentQuestionIndex] === q.answer ? "correct" : "wrong");
            btn.disabled = true;
        }

        optionsEl.appendChild(btn);
    });

    
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.innerText = currentQuestionIndex === questions.length - 1 ? "Finish" : "Next";
}

function checkAnswer(button, selected, correct) {
    selectedAnswers[currentQuestionIndex] = selected;

    
    Array.from(optionsEl.children).forEach(btn => {
        btn.classList.remove("correct", "wrong");
        btn.disabled = true;
    });

    button.classList.add(selected === correct ? "correct" : "wrong");
}

prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    questionEl.innerText = "Quiz Completed!";
    const score = calculateScore();
    const totalQuestions = questions.length;
    const percentage = Math.round((score / totalQuestions) * 100); 

   
    optionsEl.innerHTML = `
        <div class="score">
            Your Score: ${score}/${totalQuestions} (${percentage}%) 
        </div>
        <div class="score-breakdown">
            You attempted ${totalQuestions} questions, and answered ${score} correctly.
        </div>
    `;

   
    const trophy = document.createElement("img");
    trophy.src = "trophy.jpg";  
    trophy.classList.add("trophy");

    optionsEl.appendChild(trophy); 

    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
}
function calculateScore() {
    return Object.values(selectedAnswers).filter((answer, index) => answer === questions[index].answer).length;
}

loadQuestion();
