import IFormInput from "../types/IFormInputs";

const validateForm = (data: Partial<IFormInput>) => {
  const errors: Partial<IFormInput> = {};

  // Email validation
  const emailString = typeof data.email === "string" ? data.email : "";
  const trimmedEmail = emailString.trim();
  if (trimmedEmail === "") {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(trimmedEmail)) {
    errors.email = "Invalid email address";
  }

  // Password validation
  const passwordString = typeof data.password === "string" ? data.password : "";
  const trimmedPassword = passwordString.trim();
  if (trimmedPassword === "") {
    errors.password = "Password is required";
  }

  // If the form data includes other fields (username, firstName, lastName, confirmPassword)
  if (
    data.username !== undefined ||
    data.firstName !== undefined ||
    data.lastName !== undefined ||
    data.confirmPassword !== undefined
  ) {
    // Username validation
    const trimmedUsername = data.username?.trim();
    if (trimmedUsername === "") {
      errors.username = "Username is required";
    }

    // First name validation
    const trimmedFirstName = data.firstName?.trim();
    if (trimmedFirstName === "") {
      errors.firstName = "First name is required";
    } else if (/[^a-zA-Z\s]/.test(trimmedFirstName || "")) {
      errors.firstName = "First name should not contain any symbols or numbers";
    }

    // Last name validation
    const trimmedLastName = data.lastName?.trim();
    if (trimmedLastName === "") {
      errors.lastName = "Last name is required";
    } else if (/[^a-zA-Z\s]/.test(trimmedLastName || "")) {
      errors.lastName = "Last name should not contain any symbols or numbers";
    }

    // Confirm password validation
    const confirmPasswordString =
      typeof data.confirmPassword === "string" ? data.confirmPassword : "";
    const trimmedConfirmPassword = confirmPasswordString.trim();
    if (trimmedConfirmPassword === "") {
      errors.confirmPassword = "Confirm password is required";
    } else if (trimmedPassword !== trimmedConfirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  return errors;
};

export default validateForm;
