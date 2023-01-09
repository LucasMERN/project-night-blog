/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////MARKDOWN DESCRIPTION//////////////////////////////////
//////////////////////this function is used in markdown.ejs//////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

const descriptionTextarea = document.getElementById('descriptionTextarea');

document.addEventListener('input', (e) => {
    if (e.target.id === 'descriptionTextarea') {
      document.getElementById('description').innerHTML = e.target.value;
    }
  });

/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////PASSWORD VALIDATION///////////////////////////////////
/////////////////this function is used in login and sign-up.ejs//////////////////////
/////////////////////////////////////////////////////////////////////////////////////

const togglePassword = document.querySelector('#togglePassword')
const togglePassword2 = document.querySelector('#togglePassword2')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')
const label = document.querySelector('.label')
const email = document.querySelector('#email')

// Make sure password id is not null. If not, toggle visibility of password with 'password' id, toggle eye icon as well
if(togglePassword){
    togglePassword.addEventListener('click', toggleFirstPw)
}
function toggleFirstPw (){
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password'
    password.setAttribute('type', type)
    this.classList.toggle('fa-eye')
}

// Make sure password2 id is not null. If not, toggle visibility of password with 'password2' id, toggle eye icon as well
if(togglePassword2){
    togglePassword2.addEventListener('click', toggleSecondPw)
}

function toggleSecondPw (){
    const type = password2.getAttribute('type') === 'password' ? 'text' : 'password'
    password2.setAttribute('type', type)
    this.classList.toggle('fa-eye')
}

// Make sure username is the correct length
const textInput = document.getElementById('text');

if (textInput) {
  textInput.addEventListener('input', usernameValidation);
}

function usernameValidation() {
  const username = textInput.value;
  const usernameError = document.getElementById('usernameError');

  if (username.length > 0 && username.length < 15) {
    usernameError.innerText = '';
  } else if (username.length > 15) {
    usernameError.innerText = 'Username must be less than 15 characters long.';
  }
}

// Make sure password contains special characters
function pwValidation() {
    removeDisable();
    let str = document.getElementById('password').value;
    let message = document.getElementById('passwordError');
    
    if (!str.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)) {
        message.innerText = 'Passwords must be between 8-30 characters long and contain atleast one: uppercase letter, lowercase letter, special character, & number.';
        document.getElementById('signUp-btn').style.color = "rgba(255, 255, 255, 0.38)"
        document.getElementById('signUp-btn').style.backgroundColor = "rgba(14, 16, 27, 0.38)"
    } else {
        message.innerText = '';
    }
};

// Make sure passwords match
 function pwMatch() {
     removeDisable()
   if(document.getElementById('password').value !== document.getElementById('password2').value){
       document.getElementById('passwordMatch').innerText = 'Passwords must match.';
   } else {
       document.getElementById('passwordMatch').innerText = '';
       document.getElementById('signUp-btn').style.color = "rgb(255, 255, 255)"
       document.getElementById('signUp-btn').style.backgroundColor = "rgb(14, 16, 27)"
   }
 }

// Make sure passwords match, contain special characters, and that the username is filled out, if tests pass we will remove the disable from the submit button
function removeDisable () {
        if((document.getElementById('password').value == document.getElementById('password2').value) && (document.querySelector('#password').value.length > 5) && (document.getElementById('text').value.length > 0) && (document.getElementById('text').value.length < 15) && document.getElementById('password').value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)) {

        document.getElementById('signUp-btn').removeAttribute('disabled')   
        document.getElementById('signUp-btn').style.cursor = 'pointer'
        document.getElementById('signUp-btn').style.color = "rgb(255, 255, 255)"
        document.getElementById('signUp-btn').style.backgroundColor = "rgb(14, 16, 27)"    

        }else{
            document.getElementById('signUp-btn').style.backgroundColor = "rgba(14, 16, 27, 0.38)"  
        }
}


// Toggle disable for login button depending on whether criteria is met
function loginButton() {
    if(document.getElementById('email').value.length > 0 && document.getElementById('password').value.length > 0) {
        document.getElementById('logIn-btn').removeAttribute('disabled')  
        document.getElementById('logIn-btn').style.color = "rgb(255, 255, 255)"
    document.getElementById('logIn-btn').style.backgroundColor = "rgb(14, 16, 27)"
    document.getElementById('logIn-btn').style.cursor = 'pointer';
    }
}



/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////PASSWORD VALIDATION///////////////////////////////////
//////////////////////this function is used in settings.ejs//////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function settingsPWValidation() {
    // Get the password input field
    const passwordField = document.getElementById('settingsPassword');
    const passwordField2 = document.getElementById('settingsPassword2');
    // Get the error message element
    const errorMessage = document.getElementById('settingsPasswordError');
    const errorMessage2 = document.getElementById('settingsPasswordMatch');
    // Get the submit button
    const submitButton = document.getElementById('newPassword-btn');
    // Regular expression to check for at least one uppercase letter, lowercase letter, special character, and number
    const pwRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/;

    // Check if the password is between 8-30 characters long
    if (passwordField.value.length < 8 || passwordField.value.length > 30 || !pwRegex.test(passwordField.value)) {
      errorMessage.innerHTML = 'Passwords must be between 8-30 characters long and contain at least one uppercase letter, lowercase letter, special character, and number';
      submitButton.disabled = true;
    }

    if (passwordField.value.length > 8 && passwordField.value.length < 30 && pwRegex.test(passwordField.value)) {
        errorMessage.innerHTML = '';
      }

    if (passwordField2.value.length > 0 && (passwordField.value !== passwordField2.value)) {
        errorMessage2.innerHTML = 'Passwords must match';
        submitButton.disabled = true;
    }

    if (passwordField2.value.length > 0 && (passwordField.value == passwordField2.value)) {
        errorMessage2.innerHTML = '';
    }

    if (passwordField.value.length > 7 && passwordField.value.length < 31 && pwRegex.test(passwordField.value) && passwordField2.value.length > 0 && (passwordField.value == passwordField2.value)) {
        submitButton.disabled = false;
      }

  }



/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////text input lavbel hover/////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// changes location of label when focus on the input element
function hoverLabel(){
    if(email.value.length > 0){
        label.classList.add('float')
    }if(email.value.length == 0){
        label.classList.remove('float')
    }
}



/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////SETTINGS FORM VALIDATION////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////


function validateForm() {
    // Get the username value
    let username = document.getElementById('settingsUsernameText').value;
  
    // Check if the username is at least 6 characters long
    if ((username.length < 6 || username.length > 15)) {
        document.getElementById("usernameError").innerHTML = "Username must be between 6 and 15 characters long";
        document.getElementById("newUsername-btn").disabled = true;
    } else if ((username.length > 5 && username.length < 16)) {
        document.getElementById("usernameError").innerHTML = "";
        document.getElementById("newUsername-btn").disabled = false;
    }
  }

/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////DARKMODE LOCAL STORAGE////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// const body = document.querySelector('body');
// const toggle = document.getElementById('toggle');

// if(localStorage.getItem('darkMode')===null){
//     localStorage.setItem('darkMode', "false")
// }

// function checkStatus() {
//     if(localStorage.getItem('darkMode') === 'true'){
//         toggle.classList.remove('active');
//         body.classList.remove('active');
//     } else {
//         toggle.setAttribute('class', 'active');
//         body.setAttribute('class', 'active');
//     }
// }

// checkStatus();

// function changeStatus() {
//     if(localStorage.getItem('darkMode')==='true'){
//         localStorage.setItem('darkMode', 'false');
//         toggle.setAttribute('class', 'active');
//         body.setAttribute('class', 'active');
//     } else {
//         localStorage.setItem('darkMode', 'true');
//         toggle.classList.remove('active');
//         body.classList.remove('active');
//     }
// }


/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////idk what this is//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

// function toggleMenu(){
//     let menu = document.getElementById('submenuWrap')
//     if(menu.style.display === "none") {
//         menu.style.display = "block"
//     }else{
//         menu.style.display = "none"
//     }
// }



/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////LIKE POST/////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

async function updateLike(id){
    try {
        const response = await fetch(`/like/${id}`, {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({_id: id})
        })
        const data = await response.json()
        location.reload()
    } catch (error) {
        console.log(error)
    }
}



/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////BOOKMARK POST/////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

async function bookmarkPost(id){
    try {
        const response = await fetch(`/bookmark/${id}`, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({_id: id})
        })
        const data = await response.json()
        location.reload()
    } catch (error) {
        console.log(error)
    }
}



/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////MARKDOWN CLOUDINARY IMAGE/////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

function previewImage() {
    // Get the file input field
    let input = document.getElementById('imageUpload');

    // Make sure a file was selected
    if (input.files && input.files[0]) {
      // Create a new FileReader object
      let reader = new FileReader();

      // Set the onload event handler for the FileReader
      reader.onload = function (e) {
        // Get the image preview div
        let preview = document.getElementById('imagePreview');

        // Set the src of the image element to the data URL of the selected file
        preview.innerHTML = "<img src='" + e.target.result + "'>";
      };

      // Read the selected file as a data URL
      reader.readAsDataURL(input.files[0]);
    }
  }


/////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////FOLLOW USERS//////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

async function follow(id){
    try {
        const response = await fetch(`/profile/${id}/follow`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({_id: id})
        })
        const data = await response.json()
        location.reload()
    } catch (error) {
        console.log(error)
    }
}



/////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////UNFOLLOW USERS//////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////

async function unfollow(id){
    try {
        const response = await fetch(`/profile/${id}/unfollow`, {
            method: 'PUT',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({_id: id})
        })
        const data = await response.json()
        location.reload()
    } catch (error) {
        console.log(error)
    }
}