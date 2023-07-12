
const myQuestion = document.getElementById('question');
const myOption = document.getElementById('quiz-options');
const myNextQuestion = document.getElementById('correct-score');
const myTotalQuestion = document.getElementById('total-question');
let correctAnswer = '';
let NextQuestion = 1;
let askedCount = 0;
let score = 0;
let skippedCount = 0; // Variable to track skipped questions
const totalQuestion = 10;
let correctCount = 0;
let quizStarted = false;

const categorySelect = document.getElementById('category-select');
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const submitButton = document.getElementById('sub-btn');
submitButton.disabled=true;
nextButton.disabled=true;
// Fetch the categories from the API and populate the dropdown
async function fetchCategories() {
  const apiUrl = 'https://opentdb.com/api_category.php';
  const result = await fetch(apiUrl);
  const data = await result.json();

  // Add each category as an option in the dropdown
  data.trivia_categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

// Event listener for the start button
startButton.addEventListener('click', () => {
  const selectedCategoryId = categorySelect.value;
  loadQuestion(selectedCategoryId);
  startButton.disabled=true;
  categorySelect.disabled=true;
  submitButton.disabled=false;
  nextButton.disabled=false;
  startButton.style.backgroundColor = "rgb(65, 64, 64)";
});

// Event listener for the next button
nextButton.addEventListener('click', showNextQuestion);

// Event listener for the submit button
submitButton.addEventListener('click', calculateResult);

// Call the fetchCategories function to populate the dropdown
fetchCategories();

// Load questions based on the selected category ID
async function loadQuestion(categoryId) {
  const apiUrl = `https://opentdb.com/api.php?amount=${totalQuestion}&category=${categoryId}`;
  const result = await fetch(apiUrl);
  const data = await result.json();
  questionData = data.results;
  showQuestion(questionData[askedCount]);
}

// Show the question and options on the screen
function showQuestion(data) {
  myTotalQuestion.innerText=totalQuestion;
  myNextQuestion.innerText=NextQuestion;
  let correctAns = data.correct_answer;
  correctAnswer = correctAns; // Store the correct answer
  let incorrectAns = data.incorrect_answers;
  let optionList = [...incorrectAns];

  optionList.splice(
    Math.floor(Math.random() * (incorrectAns.length + 1)),
    0,
    correctAns
  );

  myQuestion.innerHTML = `${data.question}`;
  myOption.innerHTML = `${optionList
    .map((option, index) => `<li>${index + 1}. <span>${option}</span></li>`)
    .join('')}`;
  optionSelection();
}

// Enable selection of options
function optionSelection() {
  myOption.querySelectorAll('li').forEach((option) => {
    option.addEventListener('click', () => {
      if (myOption.querySelector('.selected')) {
        const activeOption = myOption.querySelector('.selected');
        activeOption.classList.remove('selected');
      }
      option.classList.add('selected');
      submitButton.disabled = false; // Enable the submit button for unanswered questions
    });
  });
}
submitButton.innerHTML="Submit Question";
// Load the next question
function showNextQuestion() {

  const selectedOption = myOption.querySelector('.selected');
  if (!selectedOption) {
    skippedCount++; // Increment skippedCount for the skipped question
  }

  if (categorySelect.value) {
    if (askedCount < totalQuestion - 1) {
      askedCount++;
      NextQuestion++;
      myNextQuestion.innerText = NextQuestion;
      showQuestion(questionData[askedCount]);
      submitButton.disabled = true; // Disable the submit button for the new question
    } else {
      submitButton.innerHTML="Submit result";
      submitButton.disabled = false;
      nextButton.disabled = true;
      window.alert('No more questions. Please submit your quiz.');
    }
  } else {
    window.alert('Please select a category before proceeding.');
  }
}

// // Calculate the result after submitting the quiz
// function calculateResult() {
//   const selectedOption = myOption.querySelector('.selected');
//   if (selectedOption) {
//     const selectedAnswer = selectedOption.querySelector('span').innerText;
//     const isCorrect = selectedAnswer === correctAnswer;

//     if (isCorrect) {
//       score += 3; // Increment the score by 3 for each correct answer
//       correctCount += 1;
//     }
//   }

//   // // Check if it's the last question
//   // if (askedCount === totalQuestion - 1) {
//   //   let skippedCount1=skippedCount-1;
//   //   let incorrectCount = totalQuestion - (correctCount + skippedCount1);
//   //   // Show final result with negative marking information
//   //   let score1 = score - incorrectCount;
//   //   const resultMessage = `You got ${correctCount} correct answers, ${incorrectCount} incorrect answers and ${skippedCount1} skipped questions. Your final score is ${score1} with negative marking of ${incorrectCount} questions.`;
//   //   window.alert(resultMessage);
//   //   window.location.href="result.html";
//   // } else {
//   //   // Show next question
//   //   showNextQuestion();
//   // }

//   // Check if it's the last question
// if (askedCount === totalQuestion - 1) {
//   let incorrectCount = totalQuestion - (correctCount + skippedCount);
//   // Show final result with negative marking information
//   let score1 = score - incorrectCount;

//   // Store the result values in session storage
//   sessionStorage.setItem('correctCount', correctCount);
//   sessionStorage.setItem('incorrectCount', incorrectCount);
//   sessionStorage.setItem('skippedCount', skippedCount);
//   sessionStorage.setItem('score', score1);

//   window.location.href = "result.html";
// } else {
//   // Show next question
//   showNextQuestion();
// }


//   // Disable the submit button only for the submitted question
//   submitButton.disabled = true;
//   submitButton.style.backgroundColor = 'oranged';
//   submitButton.style.cursor = 'not-allowed';

//   // Disable the options for the submitted question
//   myOption.querySelectorAll('li').forEach((option) => {
//     option.removeEventListener('click', optionSelection);
//   });
// }




function calculateResult() {
  const selectedOption = myOption.querySelector('.selected');
  if (selectedOption) {
    const selectedAnswer = selectedOption.querySelector('span').innerText;
    const isCorrect = selectedAnswer === correctAnswer;

    if (isCorrect) {
      // Increment the score by 3 for each correct answer
      correctCount += 1;
      score += 3; 
    }
  }

  // Check if it's the last question
  if (askedCount === totalQuestion - 1) {
    let incorrectCount = totalQuestion - (correctCount + skippedCount);
    // Show final result with negative marking information
    let score1 = score - incorrectCount;

    // Store the result values in session storage
    sessionStorage.setItem('correctCount', correctCount);
    sessionStorage.setItem('incorrectCount', incorrectCount);
    sessionStorage.setItem('skippedCount', skippedCount);
    sessionStorage.setItem('score', score1);

    window.location.href = "result.html";
  } else {
    // Show next question
    showNextQuestion();
  }

  // Disable the submit button only for the submitted question
  submitButton.disabled = true;
  submitButton.style.backgroundColor = 'oranged';
  submitButton.style.cursor = 'not-allowed';

  // Disable the options for the submitted question
  myOption.querySelectorAll('li').forEach((option) => {
    option.removeEventListener('click', optionSelection);
  });
}

