const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup-info");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section ");
const quizBox = document.querySelector(".quiz-box ");
const resultBox = document.querySelector(".result-box");
// const goBackHomeBtn = document.querySelector(".goHome-btn");

// mobile view 





// // Show SignUp Form
// function showSignUpForm() {
//     document.querySelector('.login-section').style.display = 'none';
//     document.querySelector('.signup-section').style.display = 'block';
// }

// // Show Login Form
// function showLoginForm() {
//     document.querySelector('.signup-section').style.display = 'none';
//     document.querySelector('.login-section').style.display = 'block';
// }

// // Login Function
// document.getElementById('loginForm').addEventListener('submit', function (e) {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     firebase.auth().signInWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             console.log('User signed in:', userCredential.user);
//             alert('Login successful! Redirecting to quiz...');
//             // Redirect to the quiz or show the quiz section
//         })
//         .catch((error) => {
//             console.error('Error during login:', error.message);
//             alert('Login failed: ' + error.message);
//         });
// });

// // Sign Up Function
// document.getElementById('signupForm').addEventListener('submit', function (e) {
//     e.preventDefault();
//     const email = document.getElementById('signupEmail').value;
//     const password = document.getElementById('signupPassword').value;

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//         .then((userCredential) => {
//             console.log('User signed up:', userCredential.user);
//             alert('Sign Up successful! Redirecting to quiz...');
//             // Redirect to the quiz or show the quiz section
//         })
//         .catch((error) => {
//             console.error('Error during sign up:', error.message);
//             alert('Sign Up failed: ' + error.message);
//         });
// });




// firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//         // User is signed in, show the quiz section
//         document.querySelector('.login-section').style.display = 'none';
//         document.querySelector('.signup-section').style.display = 'none';
//         document.querySelector('.quiz-section').style.display = 'block';
//     } else {
//         // No user is signed in, show login form
//         document.querySelector('.quiz-section').style.display = 'none';
//         showLoginForm();
//     }
// });






function toggleMenu() {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("active");
}


startBtn.onclick = () => {
    popupInfo.classList.add("active");
    main.classList.add("active");
}

exitBtn.onclick = () => {
    popupInfo.classList.remove("active");
    main.classList.remove("active");
}

continueBtn.onclick = () => {
    quizSection.classList.add('active')
    popupInfo.classList.remove("active");
    main.classList.remove("active");
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
}




let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector(".next-btn");

nextBtn.onclick = () => {
    if (questionCount < questions.length -1 ){
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);

        nextBtn.classList.remove("active");
    }   
    else{
        // console.log("Question Completed");
        showResultBox();
    }
} 

const optionList = document.querySelector(".option-list")


// getting questions and options from array 

function showQuestions(index){
    const questionText = document.querySelector(".question-text");
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}  `;
    let optionTag = `
    <div class="option"><span>${ questions[index].options[0]}</span></div>
    <div class="option"><span>${ questions[index].options[1]}</span></div>
    <div class="option"><span>${ questions[index].options[2]}</span></div>
    <div class="option"><span>${ questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;   

        
    const option = document.querySelectorAll(".option");
    for(let i = 0; i < option.length; i++){
        option[i].setAttribute("onclick","optionSelected(this)" );
    }
}    

function optionSelected(answer){
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;
    if (userAnswer == correctAnswer){
        answer.classList.add("correct");
        userScore += 1;
        headerScore();
    }
    else{
        answer.classList.add("inCorrect");
        // if user selected in correct answer, auto select correct.

        for (let i = 0; i < allOptions; i++){
            if (optionList.children[i].textContent == correctAnswer){
                optionList.children[i].setAttribute('class', 'option correct')
            }

            
        }
    }

    // if user have selected, disabled all options
    for (let i = 0; i < allOptions; i++){
        optionList.children[i].classList.add('disabled');
        
    }
    nextBtn.classList.add("active");

}

function questionCounter(index){
    const questionTotal = document.querySelector(".question-total");
    questionTotal.textContent = `${index} of ${questions.length} Questions`;

}

function headerScore (){
    const headerScoreText = document.querySelector(".header-score");
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}

function showResultBox(){
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    const scoreText = document.querySelector(".score-text");
    scoreText.textContent = `Your score ${userScore} out of ${questions.length}`;

    const circularProgressBar = document.querySelector('.circular-progrress');
    const progressValue = document.querySelector('.progress-value');
    let ProgressStartValue = -1;  // Initialize at 0
    let progressEndValue = Math.round((userScore / questions.length) * 100);  // Calculate percentage and round it
    let speed = 20;
 
    let progress = setInterval(() => {
        ProgressStartValue++;
        progressValue.textContent = `${ProgressStartValue}%`;
        circularProgressBar.style.background = `conic-gradient(#c40094 ${ProgressStartValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;
        
        if(ProgressStartValue >= progressEndValue){  // Stop when it reaches the end value
            clearInterval(progress);
        } 
    }, speed);
}



// Timer Variables
let timer;
let timeLeft = 600; // 10 minutes in seconds

function startTimer() {
    const timerDisplay = document.querySelector(".time-display");
    timer = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplay.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        
        // Blink the next button when time is almost up (last minute)
        if (timeLeft <= 60) {
            nextBtn.classList.add("blink");
        }

        // End the quiz when time is up
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResultBox();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

// Updated continue button logic to start the timer when the quiz begins
continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove("active");
    main.classList.remove("active");
    quizBox.classList.add('active');

    startTimer(); // Start the timer

    showQuestions(0);
    questionCounter(1);
    headerScore();
}

// Updated showResultBox function to stop the timer and hide the time display
function showResultBox() {
    stopTimer(); // Stop the timer
    document.querySelector(".time-display").style.display = "none"; // Hide the time display
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    const scoreText = document.querySelector(".score-text");
    scoreText.textContent = `Your score ${userScore} out of ${questions.length}`;

    const circularProgressBar = document.querySelector('.circular-progrress');
    const progressValue = document.querySelector('.progress-value');
    let ProgressStartValue = 0;
    let progressEndValue = Math.round((userScore / questions.length) * 100);
    let speed = 20;
 
    let progress = setInterval(() => {
        ProgressStartValue++;
        progressValue.textContent = `${ProgressStartValue}%`;
        circularProgressBar.style.background = `conic-gradient(#c40094 ${ProgressStartValue * 3.6}deg, rgba(255, 255, 255, 0.1) 0deg)`;
        
        if (ProgressStartValue >= progressEndValue) {
            clearInterval(progress);
        } 
    }, speed);
}

// Add functionality to the "Try Again" button
document.querySelector(".tryAgain-btn").onclick = () => {
    location.reload(); // Reload the page to restart the quiz from the beginning
}
