

export function nameValidation(name){
    const nameRegex = /^[a-zA-Z]{5,}$/
    return nameRegex.test(name)
}
export function userNameValidation(name){
    const nameRegex = /^[a-zA-Z0-9]{5,}$/
    return nameRegex.test(name)
}

export function emailValidation(email){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email)
}