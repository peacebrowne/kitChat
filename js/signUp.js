const switch_btn = {
    l:"login",
    r:"register"
}

const login_form = element('#login')
const register_form = element('#register')

// Switching between registration and login button
const switch_form = element('.info')
switch_form.addEventListener('click', ev => {

    const target = ev.target;
    if(target.dataset.value == switch_btn.r){

        // switch form to login form
        target.dataset.value = switch_btn.l 
        target.textContent = switch_btn.l
        add_class(login_form,'hide')
        remove_class(register_form,'hide')

        // reset form
        reset(elementAll('#register input'))
        return

    }else if(target.dataset.value == switch_btn.l){
        
        // switch form to registration form
        target.dataset.value = switch_btn.r 
        target.textContent = switch_btn.r
        remove_class(login_form,'hide')
        add_class(register_form,'hide')

        // reset form
        reset(elementAll('#login input'))
        return
    
    }

})

const forms = element('.form')

const submit_form = ev => {
    ev.preventDefault()
    const target = ev.target;
    if(target.className.includes('submit-btn')){

        const form = target.closest('form')
        const inputs = elementAll(`#${form.id} input`)

        if(form.id == 'login'){

            const result = validation(inputs)
            if(result) login(result)

        }else{

            const result = validation(inputs)
            if(result) register(result)

        }
        
    }
}
forms.addEventListener('click', submit_form)


/**
 * @param inputs - form input elements pass for validation
 */
const validation = inputs => {

    const data = {};

    for(const i of inputs){

        if(!i.value) return false
        else {
            if(i.name == 'email') {
                if(!email(i.value)) return false;
            }
            data[i.name] = i.value;
        }

    }

    return data;
}

// reference from : https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^/_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9]+)*$/;
const email = mail =>{
    if(mail.match(validRegex)) return true
    return false
}

const login = data => {
    post_user(data)
    .then(data => console.log('resolved:',data))
    .catch(err => console.log('rejected:',err.message))
}

const register = data => {
    console.log(data)
}

