const $ = document;

window.addEventListener('load', () => {
    const userProfile = $.querySelector('.user-profile');
    const userPersonalInfo = $.querySelector('.user-name');
    const userNumber = $.querySelector('.user-number');
    const userCharge = $.querySelector('.overlay');

    const mainUrlApi = 'http://localhost:3000/api';

    let userToken = localStorage.getItem('user-token');

    fetch(`${mainUrlApi}/users`, {
        headers: {
            authorization: userToken
        }
    })
        .then(res => res.json())
        .then(user => {
            // console.log(user)
            userProfile.setAttribute('src', user[0].profile);
            userPersonalInfo.innerHTML = `سلام ${user[0].firstname} ${user[0].lastname}`;
            userNumber.innerHTML = user[0].phone;
            userCharge.innerHTML = `${user[0].charge} تومان`;
        })
})