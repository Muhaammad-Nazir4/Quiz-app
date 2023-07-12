var nameArray=[];
var emailArray=[];
var passwordArray=[];
var password1Array=[];

document.getElementById("signupForm").addEventListener("submit", function(e)
{

  e.preventDefault();
  var name = document.getElementById("Name").value;
  var email = document.getElementById("Email").value;
  var password = document.getElementById("Password").value;
  var password1 = document.getElementById("Password1").value;

  if(password==password1){
    nameArray.push(name);
    emailArray.push(email);
    passwordArray.push(password);
    password1Array.push(password1);
      
  localStorage.setItem("NameArray", JSON.stringify(nameArray));
  localStorage.setItem("EmailArray", JSON.stringify(emailArray));
  localStorage.setItem("PasswordArray", JSON.stringify(passwordArray));
  localStorage.setItem("Password1Array", JSON.stringify(password1Array));
      window.alert("You have successfully Registered");
      window.location.href = "login.html";

  }
  else{
      window.alert("Password in both fields is not same");
  }
});