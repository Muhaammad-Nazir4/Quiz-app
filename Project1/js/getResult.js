    // Retrieve the result values from session storage
    const correctCount = sessionStorage.getItem('correctCount');
    const incorrectCount = sessionStorage.getItem('incorrectCount');
    const skippedCount = sessionStorage.getItem('skippedCount');
    const score = sessionStorage.getItem('score');
  
    // Display the result values in the HTML elements
    document.getElementById('correct-Answer').innerText = `Correct Answers: ${correctCount}`;
    document.getElementById('inCorrect-Answer').innerText = `Incorrect Answers: ${incorrectCount}`;
    document.getElementById('Skipped').innerText = `Skipped Questions: ${skippedCount}`;
    document.getElementById('Final-score').innerText = `Final Score: ${score}`;
  
    // Clear the session storage after retrieving the values
    sessionStorage.clear();