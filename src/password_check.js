// Individual validation functions
const minLength = (password, length = 8) => password.length >= length;
const containsUppercase = password => /[A-Z]/.test(password);
const containsLowercase = password => /[a-z]/.test(password);
const containsNumber = password => /[0-9]/.test(password);

// Validation function that aggregates all individual functions
export const validatePassword = (password) => {
  const validators = [
    { check: minLength, message: 'Password should be at least 8 characters long.' },
    { check: containsUppercase, message: 'Password should contain at least one uppercase letter.' },
    { check: containsLowercase, message: 'Password should contain at least one lowercase letter.' },
    { check: containsNumber, message: 'Password should contain at least one number.' }
  ];

  for (const validator of validators) {
    if (!validator.check(password)) {
      return validator.message;
    }
  }

  return 1; // Password is valid
};

// Test the function
