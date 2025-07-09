
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

type ValidChar = 'yes' | 'no' | null;

export const titleValidationAuth = (minCount: number, onlyEN: ValidChar = null) => {
    const rules = [
        {
            required: true,
            message: 'Поле обязательно'
        },
        { 
            min: minCount,
            max: 60,
            message: `от ${minCount} до 60`
        }
    ];

    if (onlyEN === 'yes') {
        rules.push({
            pattern: /^[a-zA-Z]+$/,
            message: 'Только латинский алфавит'
        });
    } else if (onlyEN === 'no') {
        rules.push({
            pattern: /^[a-zA-Zа-яА-Я]+$/,
            message: 'Только буквы русского и латинского алфавита'
        });
    }

    return rules;
};