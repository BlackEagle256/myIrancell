document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('login-tabs');
    const signupTab = document.getElementById('signup-tabs');

    const loginform = document.getElementById('login-form');
    const signupform = document.getElementById('signup-form');

    loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginform.style.display = 'block';
        signupform.style.display = 'none';
    });

    signupTab.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupform.style.display = 'block';
        loginform.style.display = 'none';
    });

    loginform.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.success) {
                    localStorage.setItem('user-token', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));

                    window.location.href = "index.html";
                } else {
                    alert('ایمیل یا رمز عبور اشتباه است');
                }
            })
            .catch(err => {
                console.log(err);
                alert('خطا در اتصال به سرور');
            });
    });

    signupform.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstname = document.getElementById('signup-firstname').value;
        const lastname = document.getElementById('signup-lastname').value;
        const phone = document.getElementById('signup-phone').value;
        const charge = document.getElementById('signup-charge').value;
        const profile = document.getElementById('signup-profile').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstname, lastname, phone, charge, profile, email, password })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
    });
});