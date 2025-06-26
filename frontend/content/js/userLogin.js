const $ = document;
const form = $.querySelector('form')

const emailInput = $.querySelector('#email');
const passwordInput = $.querySelector('#password');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    let formData = {
        email: emailInput.value,
        password: passwordInput.value
    }

    fetch('http://localhost:3000/api/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then((res) => res.json())
        .then(result => console.log(result)
        )
})