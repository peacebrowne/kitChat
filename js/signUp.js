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

const forms = element('.forms')

const submit_form = ev => {

    const target = ev.target;
    let result;

    if(target.className.includes('submit-btn')){

        const form = target.closest('form')
        const inputs = elementAll(`#${form.id} input`)

        if(form.id == 'login'){

            result = form_validation(inputs)
            if(result) login(result)

        }else{

            result = form_validation(inputs)
            if(result) register(result)

        }
        
    }
}
forms.addEventListener('click', submit_form)


/**
 * @param form - form input elements pass for validation
 */
const form_validation = form => {

    const data = {};

    for(const input of form){

        if(!input.value) {

            input.classList.add('incomplete')
            setTimeout(()=> remove_class(input,'incomplete'), 1000)
            return false
        }
        else {
            if(input.name == 'email') {
                if(!email(input.value)) return alert('invalid email address')
            }
            if(input.name == 'password'){
                if(!password(input.value)) return alert('invalid password and password should be atleat 8 digits')            
            }
            data[input.name] = input.value;
        }

    }

    return data;
}

const valid_email = /^[a-zA-Z0-9.!#$%&'*+/=?^/_`{|}~-]+@[a-z]+(?:\.[a-zA-Z0-9]+)*$/;
const email = mail => {

    return mail.match(valid_email) ? true : false;

}

const valid_password = /[a-zA-Z]+[.!#$%&'*+/=?^/_`{|}~-]+[0-9]/;
const password = password => {

    return password.length >= 8 && password.match(valid_password) ? true : false;

}


const login = data => {
    post_user(data)
    .then(data => console.log('resolved:',data))
    .catch(err => console.log('rejected:',err.message))
}

const register = data => {
    console.log(data)
}

