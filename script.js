document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const questionBox = document.querySelector('.question');
    const choicesBox = document.querySelector('.choices');
    const nextBtn = document.querySelector('.nextBtn');
    const scoreCard = document.querySelector('.scoreCard');
    const alert = document.querySelector('.alert');
    const startBtn = document.querySelector('.startBtn');
    const quizIntro = document.querySelector('.quiz-intro');
    const quizContainer = document.querySelector('.quiz-container');
    const timer = document.querySelector('.timer');

    const quiz = [
        {
            question: "Tumi ki amake bhalobasho?",
            choices: ["HAE", "Keno noy", "NOOOO", "Shomvob na"],
            answer: "NOOOO"
        },
        {
            question: "Q. Which of the following is not a JavaScript data type?",
            choices: ["string", "boolean", "object", "float"],
            answer: "float"
        },
        {
            question: "Q. Which of the following is a JavaScript operator?",
            choices: ["typeof", "new", "this", "delete"],
            answer: "delete"
        },
        {
            question: "Q. Which of the following is not a JavaScript keyword?",
            choices: ["this", "catch", "function", "object"],
            answer: "object"
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;
    let quizOver = false;
    let timeLeft = 15;
    let timerID = null;

    const showQuestions = () => {
        const questionDetails = quiz[currentQuestionIndex];
        questionBox.textContent = questionDetails.question;
    
        choicesBox.textContent = "";
        document.querySelector('.result-message').textContent = ""; // Clear result message
    
        for (let i = 0; i < questionDetails.choices.length; i++) {
            const currentChoice = questionDetails.choices[i];
            const choiceDiv = document.createElement('div');
            choiceDiv.textContent = currentChoice;
            choiceDiv.classList.add('choice');
            choicesBox.appendChild(choiceDiv);
    
            choiceDiv.addEventListener('click', () => {
                // Deselect all choices
                const allChoices = document.querySelectorAll('.choice');
                allChoices.forEach(choice => choice.classList.remove('selected'));
    
                // Select the clicked choice
                choiceDiv.classList.add('selected');
            });
        }
    
        if (currentQuestionIndex < quiz.length) {
            startTimer();
        }
    }
    
    const checkAnswer = () => {
        const selectedChoice = document.querySelector('.choice.selected');
        const resultMessage = document.querySelector('.result-message'); // Use result-message
    
        if (selectedChoice) {
            if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
                resultMessage.textContent = "Correct Answer!";
                resultMessage.style.color = "#28a745"; // Green color for correct
                score++;
            } else {
                resultMessage.textContent = `Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`;
                resultMessage.style.color = "#dc3545"; // Red color for wrong
            }
    
            timeLeft = 15;
            currentQuestionIndex++;
            setTimeout(() => {
                if (currentQuestionIndex < quiz.length) {
                    showQuestions();
                } else {
                    stopTimer();
                    showScore();
                }
            }, 2000); // Wait for 2 seconds before showing the next question
        } else {
            resultMessage.textContent = "Select your answer";
            resultMessage.style.color = "#ffc107"; // Yellow color for no selection
        }
    }

    const showScore = () => {
        questionBox.textContent = "You have completed this quiz!"; // Set the completion message
        choicesBox.textContent = ""; // Clear the choices
        document.querySelector('.result-message').textContent = ""; // Clear any existing result message
        scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`; // Show the score
    
        nextBtn.textContent = "Play Again"; // Update the button text
        quizOver = true; // Indicate the quiz is over
        timer.style.display = "none"; // Hide the timer
    }
    
    
    const displayAlert = (msg) => {
        alert.style.display = "block";
        alert.textContent = msg;
        setTimeout(() => {
            alert.style.display = "none";
        }, 2000);
    }

    const startTimer = () => {
        clearInterval(timerID);
        timer.textContent = timeLeft;

        const countDown = () => {
            timeLeft--;
            timer.textContent = timeLeft;
            if (timeLeft === 0) {
                const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
                if (confirmUser) {
                    timeLeft = 15;
                    startQuiz();
                } else {
                    startBtn.style.display = "block";
                    container.style.display = "none";
                    return;
                }
            }
        }
        timerID = setInterval(countDown, 1000);
    }

    const stopTimer = () => {
        clearInterval(timerID);
    }

    const shuffleQuestions = () => {
        for (let i = quiz.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
        }
        currentQuestionIndex = 0;
        showQuestions();
    }

    const startQuiz = () => {
        timeLeft = 15;
        timer.style.display = "flex";
        container.style.display = "block";
        quizContainer.style.display = "none"; // Hide the initial message
        shuffleQuestions();
    }

    startBtn.addEventListener('click', () => {
        startBtn.style.display = "none";
        startQuiz();
    });

    nextBtn.addEventListener('click', () => {
        const selectedChoice = document.querySelector('.choice.selected');
        if (!selectedChoice && nextBtn.textContent === "Next") {
            displayAlert("Select your answer");
            return;
        }
        if (quizOver) {
            nextBtn.textContent = "Next";
            scoreCard.textContent = "";
            document.querySelector('.completion-message')?.remove(); // Remove completion message
            currentQuestionIndex = 0;
            quizOver = false;
            score = 0;
            startQuiz();
        } else {
            checkAnswer();
        }
    });
});
