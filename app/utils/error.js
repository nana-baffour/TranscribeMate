export function formatFirebaseAuthError(error) {
  console.log(error);

  if (error && error.code && error.code.startsWith("auth/")) {
    let message = "";

    console.log(error.code);
    error.code;
    switch (error.code) {
      case "auth/invalid-email":
        message = "The email address is not valid. Please enter a valid email.";
        break;
      case "auth/user-disabled":
        message =
          "This account has been disabled. Please contact support for help.";
        break;
      case "auth/user-not-found":
        message =
          "No account found with this email. Please sign up or try again.";
        break;
      case "auth/wrong-password":
        message = "Incorrect password. Please try again.";
        break;
      case "auth/email-already-in-use":
        message = "This email is already in use by another account.";
        break;
      case "auth/invalid-credential":
        message = " Please enter a valid email or password and try again.";
        break;
      case "auth/weak-password":
        message =
          "Your password is too weak. Please choose a stronger password.";
        break;
      case "auth/too-many-requests":
        message = "Too many failed attempts. Please try again later.";
        break;
      case "auth/network-request-failed":
        message =
          "Network error occurred. Please check your internet connection and try again.";
        break;
      case "auth/requires-recent-login":
        message =
          "This operation requires recent authentication. Please log in again.";
        break;
      case "auth/operation-not-allowed":
        message =
          "This operation is not allowed. Please contact support for help.";
        break;
      default:
        message = "An unknown error occurred. Please try again.";
        break;
    }

    return message;
  }

  return "An unexpected error occurred. Please try again.";
}
