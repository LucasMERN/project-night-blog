const togglePassword = document.querySelector('#togglePassword')
const togglePassword2 = document.querySelector('#togglePassword2')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')

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

function pwValidation() {

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

  function pwMatch() {
    if(document.getElementById('password').value !== document.getElementById('password2').value){
        document.getElementById('passwordMatch').innerText = 'Passwords must match.';
    } else {
        document.getElementById('passwordMatch').innerText = '';
        document.getElementById('signUp-btn').style.color = "rgb(255, 255, 255)"
        document.getElementById('signUp-btn').style.backgroundColor = "rgb(14, 16, 27)"
    }
  }

// function inputDisable() {
//   if(document.getElementById('text').value.length > 0 && document.getElementById('password').value == document.getElementById('password2').value && document.getElementById('password').value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)) {
//     document.getElementById('signUp-btn').style.color = "rgb(255, 255, 255)"
//     document.getElementById('signUp-btn').style.backgroundColor = "rgb(14, 16, 27)"
//   } else {
//     if(document.getElementById('text').value.length < 1 || document.getElementById('email').value.length < 1) {
//         document.getElementById('signUp-btn').style.color = "rgba(255, 255, 255, 0.38)"
//         document.getElementById('signUp-btn').style.backgroundColor = "rgba(14, 16, 27, 0.38)"
//     }
//   }
// };