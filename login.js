let kunci_verifikasi = 0;

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    var emailVerified = user.emailVerified;

    if (kunci_verifikasi == 1) {
      document.getElementById("user_div2").style.display = "block";
      document.getElementById("user_div").style.display = "none";
      document.getElementById("login_div").style.display = "none";
    }

    if (kunci_verifikasi == 9) {
      document.getElementById("user_div").style.display = "block";
      document.getElementById("user_div2").style.display = "none";
      document.getElementById("login_div").style.display = "none";
    }

    if (kunci_verifikasi == 0) {
      if ((emailVerified = true)) {
        window.alert("sudah terferivikasi");
        document.getElementById("user_div2").style.display = "none";
        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
      } else {
        document.getElementById("user_div2").style.display = "block";
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "none";
      }
    }

    if (user != null) {
      var email_id = user.email;
      header("location: index2.html");

      document.getElementById("user_para").innerHTML =
        "Welcome User  : " + email_id;
    }
  } else {
    // No user is signed in.

    document.getElementById("user_div2").style.display = "none";
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
  }
});

function login() {
  kunci_verifikasi = 9;
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(userEmail, userPass)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);

      // ...
    });
}

function daftar() {
  kunci_verifikasi = 1;
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase
    .auth()
    .createUserWithEmailAndPassword(userEmail, userPass)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;

      window.alert("Error : " + errorMessage);

      // ...
    });
}

function logout() {
  firebase.auth().signOut();
}

function verifikasi() {
  var user = firebase.auth().currentUser;

  user
    .sendEmailVerification()
    .then(function () {
      window.alert("Email Verifikasi telah terkirim");

      // Email sent.
    })
    .catch(function (error) {
      // An error happened.
      window.alert(
        "Email Verifikasi gagal terkirim, Mohon pastikan Email yang digunakan Valid"
      );
    });

  //url verifikasi : https://test-iot-kos.firebaseapp.com/__/auth/action
}
