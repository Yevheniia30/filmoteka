import firebase from 'firebase/app';
import authFire from './firebase';

const signInForm = document.querySelector('.formIn-group');
const signUpForm = document.querySelector('.formUp-group');
const myLibriaryBtn = document.querySelector('.nav-library');

signInForm.addEventListener('submit', signInWithEmailPassword);
signUpForm.addEventListener('submit', signUpWithEmailPassword);

function signInWithEmailPassword(event) {
  event.preventDefault();
  const email = document.querySelector('.signInemail').value;
  const password = document.querySelector('.signInpassword').value;

  authFire
    .signInWithEmailAndPassword(email, password)
    .then(clearInput)
    .then(loggedUserBtn)
    .catch(error => {
      console.log(error);
    });
}

function signUpWithEmailPassword(event) {
  event.preventDefault();
  const email = document.querySelector('.sign_email').value;
  const password = document.querySelector('.sign_password').value;

  authFire
    .createUserWithEmailAndPassword(email, password)
    .then(
      notie.alert({
        type: 'success',
        text: 'Registration was successful ;)',
        time: 2,
      }),
    )
    .then(myLibriaryBtn.classList.add('hide'))
    .catch(error => {
      notie.alert({
        type: 'error',
        text: 'Filled your email and password please!',
        time: 2,
      });
      console.log(error);
    });
}

let user = authFire.currentUser;
authFire.onAuthStateChanged(_user => {
  if (_user) {
    user = _user;
    console.log(user);
    document.getElementById('btnLogOut').classList.remove('hide');
    document.querySelector('.signUp').classList.add('hide');
    document.querySelector('.signIn').classList.add('hide');
    myLibriaryBtn.classList.remove('hide');
  } else {
    document.getElementById('btnLogOut').classList.add('hide');
    document.querySelector('.signUp').classList.remove('hide');
    document.querySelector('.signIn').classList.remove('hide');
    myLibriaryBtn.classList.add('hide');
  }
});

btnLogOut.addEventListener('click', e => {
  authFire.signOut().then(myLibriaryBtn.classList.add('hide'));
  notie.alert({ type: 'success', text: 'You are Logged Out!', time: 2 });
  console.log('logged out');
});

function loggedUserBtn() {
  myLibriaryBtn.classList.remove('hide');
}

function clearInput() {
  const inputs = document.querySelectorAll('.cleanInput');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = '';
  }
}
