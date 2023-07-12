document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    var signUp_emailArray = JSON.parse(localStorage.getItem("EmailArray")) || [];
    var signUp_passwordArray = JSON.parse(localStorage.getItem("PasswordArray")) || [];
  
    var L_email = document.getElementById("L_email").value;
    var L_password = document.getElementById("L_password").value;
  
    var temp = false; 
  
    for (let i = 0; i < signUp_emailArray.length; i++) {
      if (L_email === signUp_emailArray[i] && L_password === signUp_passwordArray[i]) {
        temp = true;
        break; 
      }
    }
  
    if (temp) {
      this.reset();
      window.location.href = "instruction.html";
    } else {
      window.alert("Your Credentials are not Correct");
    }
  });

  //logout

function logout(){
  if (confirm("Are you sure you want to logout?")) {
    window.location.href = "login.html";
}
}

  
  