const IsLogin = localStorage.getItem("isLogin");

if (!IsLogin) {
    window.location.href = "/login.html";
}

const SelectElement = document.querySelector("select");
const InputElement = document.querySelector("input");
const FormElement = document.querySelector("form");

fetch(
    "http://localhost:1337/api/categories?pagination[page]=1&pagination[pageSize]=10000000000000000000000000"
)
    .then((res) => res.json())
    .then((res) => {
        if (res && res?.data?.length > 0) {
            let text = "";
            res.data.map(
                (item) =>
                    (text += `<option value="${item.id}">${item?.attributes?.name}</option>`)
            );

            SelectElement.innerHTML = text;
        }
    })
    .catch((err) => {
        console.log(err);
    });

//http://localhost:1337/api/add-hastag

function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}

FormElement.addEventListener("submit", (e) => {
    e.preventDefault();

    const cate = getSelectValues(SelectElement);
    const hastag = InputElement.value;

    console.log(cate.join(" "));

    const Option = {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            cate: cate.join(" "),
            hastag,
        }),
    };

    fetch("http://localhost:1337/api/add-hastag", Option)
        .then((res) => res.json())
        .then((res) => {
            window.location.reload();
        });
});
