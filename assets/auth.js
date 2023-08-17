const IsLogin = localStorage.getItem("isLogin");

if (IsLogin) {
    window.location.href = "/";
}

const FormElement = document.querySelector("form");
const EmailElement = document.querySelector('input[type="email"]');
const PasswordElement = document.querySelector('input[type="password"]');

FormElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const dataBuilder = {
        identifier: EmailElement.value,
        password: PasswordElement.value,
    };

    const Option = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataBuilder),
    };

    fetch("http://localhost:1337/api/auth/local", Option)
        .then((res) => res.json())
        .then((res) => {
            localStorage.setItem("isLogin", true);
            localStorage.setItem("DataLogin", JSON.stringify(res));
            window.location.href = "/";
        });
});
