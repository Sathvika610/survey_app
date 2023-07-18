// Survey questions
const questions = [
    "How satisfied are you with our products?",
    "How fair are the prices compared to similar retailers?",
    "How satisfied are you with the value for money of your purchase?",
    "On a scale of 1-10 how would you recommend us to your friends and family?",
    "What could we do to improve our service?"
];

// Current question index
let currentQuestionIndex = 0;

// Start survey button
const startBtn = document.getElementById("start-btn");
// Survey screen
const surveyScreen = document.querySelector(".survey-screen");
// Current question number display
const currentQuestionNumber = document.getElementById("current-question");
// Question text
const questionText = document.getElementById("question-text");
// Radio inputs for ratings
const ratingInputs = document.querySelectorAll('input[name="rating"]');
// Textarea for text answer
const textAnswer = document.getElementById("text-answer");
// Navigation buttons
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const skipBtn = document.getElementById("skip-btn");
// Submit survey button
const submitBtn = document.getElementById("submit-btn");
// Thank you screen
const thankYouScreen = document.querySelector(".thank-you-screen");

// Event listener for Start Survey button
startBtn.addEventListener("click", () => {
    startSurvey();
});

// Event listener for Previous button
prevBtn.addEventListener("click", () => {
    currentQuestionIndex--;
    showQuestion();
});

// Event listener for Next button
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    showQuestion();
});

// Event listener for Skip button
skipBtn.addEventListener("click", () => {
    saveAnswer(null); // Save null as the answer for skipped question
    currentQuestionIndex++;
    showQuestion();
});

// Event listener for Submit Survey button
submitBtn.addEventListener("click", () => {
    saveAnswer(null); // Save null as the answer for skipped last question
    submitSurvey();
});

// Function to start the survey
function startSurvey() {
    surveyScreen.style.display = "block";
    startBtn.style.display = "none";
    showQuestion();
}

// Function to show the current question
function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        currentQuestionNumber.innerText = `${currentQuestionIndex + 1}/${questions.length}`;
        questionText.innerText = questions[currentQuestionIndex];
        textAnswer.value = ""; // Reset text answer
        ratingInputs.forEach(input => (input.checked = false)); // Reset radio inputs

        if (currentQuestionIndex === 0) {
            prevBtn.style.display = "none"; // Hide Previous button on the first question
        } else {
            prevBtn.style.display = "inline-block";
        }

        if (currentQuestionIndex === questions.length - 1) {
            submitBtn.style.display = "inline-block"; // Show Submit Survey button on the last question
            nextBtn.style.display = "none"; // Hide Next button on the last question
        } else {
            submitBtn.style.display = "none";
            nextBtn.style.display = "inline-block";
        }
    } else {
        // End of survey
        surveyScreen.style.display = "none";
        thankYouScreen.style.display = "block";
        setTimeout(() => {
            thankYouScreen.style.display = "none";
            startBtn.style.display = "block";
            currentQuestionIndex = 0;
        }, 5000); // Show the welcome screen after 5 seconds
    }
}

// Function to save the answer
function saveAnswer(answer) {
    const sessionId = generateSessionId();
    const questionId = currentQuestionIndex + 1;

    // Save the answer to local storage (you can change this to use a database)
    const savedAnswers = JSON.parse(localStorage.getItem("survey_answers")) || {};
    if (!savedAnswers[sessionId]) {
        savedAnswers[sessionId] = {};
    }
    savedAnswers[sessionId][questionId] = answer;
    localStorage.setItem("survey_answers", JSON.stringify(savedAnswers));
}

// Function to submit the survey
function submitSurvey() {
    const sessionId = generateSessionId();
    // Save a flag for COMPLETED in local storage (you can change this to use a database)
    const savedAnswers = JSON.parse(localStorage.getItem("survey_answers")) || {};
    if (!savedAnswers[sessionId]) {
        savedAnswers[sessionId] = {};
    }
    savedAnswers[sessionId]["COMPLETED"] = true;
    localStorage.setItem("survey_answers", JSON.stringify(savedAnswers));

    currentQuestionIndex++; // Move to the end of survey
    showQuestion();
}

// Function to generate a session ID (you can implement your own logic for this)
function generateSessionId() {
    return "session_" + new Date().getTime();
}
