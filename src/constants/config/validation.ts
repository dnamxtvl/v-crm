export const RULES_VALIDATION = {
  EMAIL_FORMAT: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  PHONE_FORMAT: /^[0-9-]{12,13}$|^[0-9-]{12}$/,
  ZIP_CODE: /^[0-9]{3}-?[0-9]{4}$/,
  VALID_TIME: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/g,
  USERNAME_LENGTH: {
    MIN: 6,
    MAX: 50,
  },
  FULLNAME_LENGTH: {
    MIN: 2,
    MAX: 255,
  },
  PASSWORD_LENGTH: {
    MIN: 8,
    MAX: 100,
  },
  EMAIL_LENGTH: {
    MIN: 6,
    MAX: 255,
  },
  CAPCHA: {
    LENGTH: 6,
    CHARACTER_RANDOM: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    ROTATION_VARIATIONS: [5, 10, 20, 25, -5, -10, -20, -25],
    COEFFICIENT_RANDOM_NUMBER: 36,
  },
  DEPARTMENT_NAME_LENGTH: {
    MIN: 6,
    MAX: 255,
  },
  DEPARTMENT_ALIAS_LENGTH: {
    MIN: 6,
    MAX: 255,
  },
  CODE: {
    LENGTH: 6,
  },
  FILE: {
    MAX_SIZE_UPLOAD: 5242880,
    MAX_QUESTION: 100,
  },
  AVATAR: {
    MAX_SIZE_UPLOAD: 2048000,
    FILE_TYPES: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
  },
  CONTRACT_NUMBER: {
    MAX_LENGTH: 13,
  },
  PROJECT_NAME: {
    MAX_LENGTH: 30,
  },
  PRIME_CONTRUCTOR: {
    MAX_LENGTH: 20,
  },
};
