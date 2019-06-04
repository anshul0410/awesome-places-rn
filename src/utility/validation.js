const validate = (val, rules, connectedValue) => {
    let isValid = true;
    for(var rule in rules){
        switch(rule){
            case 'isEmail':
                isValid = isValid && isEmailValidator(val);
                break;
            case 'minLength':
                isValid = isValid && minLengthValidator(val, rules[rule]);
                break;
            case 'equalTo':
                isValid = isValid && equalToValidator(val, connectedValue[rule]);
                break;
            case 'notEmpty':
                isValid = isValid && notEmptyValidator(val);
                break;
            default:
                isValid = true;
        }
    }
    return isValid;
}

const isEmailValidator = (val) => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(val)
};

const minLengthValidator = (val, minLength) => {
    return val.length >= minLength;
};

const equalToValidator = (val, checkVal) => {
    return val === checkVal;
}

const notEmptyValidator = (val) => {
    return val.trim() !== "";
}

export default validate;

