import { validationResult } from "express-validator";
// Middleware to validate request data using express-validator
// It runs the validators and checks for errors, returning a 400 response if any validation fails
// If validation passes, it calls the next middleware in the stack
// This is useful for ensuring that incoming requests meet the expected format and constraints before processing them further

export const useValidator = (validators) => {
  return async (req, res, next) => {
    await Promise.all(validators.map((validator) => validator.run(req)));
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };
};
