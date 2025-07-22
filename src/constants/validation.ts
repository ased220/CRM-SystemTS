import type { Rule } from "antd/es/form";


export const titleValidationRules  = 
[
    { 
        required: true, 
        message: "от 2 до 64 символов" 
    },
    {
        min: 2,
        message: 'не короче 2 символов!',
    },
    {
        max: 64,
        message: 'не длиннее 64 символов!',
    },
];

export const REQUIRED_FIELD: Rule = {
  required: true,
  message: 'Поле обязательно'
};

export const LENGTH_2_TO_60: Rule = {
  min: 2,
  max: 60,
  message: 'От 2 до 60 символов'
};

export const LENGTH_6_TO_60: Rule = {
  min: 6,
  max: 60,
  message: 'От 6 до 60 символов'
};

export const USERNAME_RULES: Rule[] = [
  REQUIRED_FIELD,
  LENGTH_2_TO_60,
  {
    pattern: /^[a-zA-Zа-яА-Я]+$/,
    message: 'Только буквы русского и латинского алфавита'
  }
];

export const LOGIN_RULES: Rule[] = [
  REQUIRED_FIELD,
  LENGTH_2_TO_60,
  {
    pattern: /^[a-zA-Z]+$/,
    message: 'Только латинские буквы'
  }
];

export const PASSWORD_RULES: Rule[] = [
  REQUIRED_FIELD,
  LENGTH_6_TO_60
];

export const REPEAT_PASSWORD_RULES: Rule[] = [
  REQUIRED_FIELD,
  LENGTH_6_TO_60,
];

export const EMAIL_RULES: Rule[] = [
  REQUIRED_FIELD,
  {
    type: 'email',
    message: 'Введите корректный email (например, user@example.com)'
  }
];

export const PHONE_RULES: Rule[] = [
  {
    pattern: /^\+7\d{10}$/,
    message: 'Введите номер в формате +7XXXXXXXXXX'
  }
];