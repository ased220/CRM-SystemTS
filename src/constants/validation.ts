
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
]