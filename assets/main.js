const SelectCate = document.querySelector("#CateGories");
const Count = document.querySelector("#count-hastag");
const InputRandomTag = document.querySelector("#random-tag");
const ClickBtnRandom = document.querySelector("#click-random");
const TextAreaRender = document.querySelector("#text-render-wp");
const CopyToClipboard = document.querySelector("#copy-to-bonhodem");

fetch(
    "http://localhost:1337/api/categories?pagination[page]=1&pagination[pageSize]=10000000000000000000000000"
)
    .then((res) => res.json())
    .then((res) => {
        if (res && res?.data?.length > 0) {
            let text = '<option value="null">---- chọn cate ----</option>';
            res.data.map(
                (item) =>
                    (text += `<option value="${item.id}">${item?.attributes?.name}</option>`)
            );

            SelectCate.innerHTML = text;
        }
    })
    .catch((err) => {
        console.log(err);
    });

let HasTags = [];
let Content = null;

SelectCate.addEventListener("change", (e) => {
    console.log(e.target.value);

    if (e.target.value === "null") {
        alert("Bạn vui lòng chọn lựa chọn khác!");
        return;
    }

    fetch(
        `http://localhost:1337/api/hastags?filters[categories]=${e.target.value}`
    )
        .then((res) => res.json())
        .then((res) => {
            if (res && res.data.length > 0) {
                HasTags = [...res.data];
            } else {
                HasTags = [];
                alert("Danh mục này cate không có hastag");
            }
            Count.innerHTML = `Số HasTag: ${HasTags.length}`;
        });

    fetch(`http://localhost:1337/api/random?idCate=${e.target.value}`)
        .then((res) => res.json())
        .then((res) => {
            if (res && res?.data) {
                Content = res.data;
            } else {
                Content = null;
                alert("Danh mục này cate không có bài viết");
            }
        });
});
Count.innerHTML = `Số HasTag: ${HasTags.length}`;

ClickBtnRandom.addEventListener("click", function () {
    if (
        !SelectCate.value ||
        SelectCate.value === "null" ||
        !InputRandomTag.value ||
        Number(InputRandomTag.value) == NaN
    ) {
        alert("Bạn vui lòng chọn và nhập đầy đủ các trường!");
        return;
    }

    if (!HasTags.length || !Content) {
        alert("Content hoặc hasgtag của bạn có thể không tồn tại!");
        return;
    }
    if (Number(InputRandomTag.value) > HasTags.length) {
        alert("Bạn vui lòng nhập số random nhỏ hơn hoặc bằng với số hastag");
        return;
    }

    let hasgtagRandom = [];

    for (let i = 0; i < Number(InputRandomTag.value); i++) {
        hasgtagRandom.push(HasTags[Math.floor(Math.random() * HasTags.length)]);
    }

    let Text = "";

    if (hasgtagRandom && hasgtagRandom.length > 0) {
        let hungTag = hasgtagRandom.map((item) => item?.attributes?.tag);

        Text += hungTag.join(" | ");
    }

    TextAreaRender.innerHTML = `

    hasgtag: ${Text}

    content: ${Content?.body}
    `;
});

CopyToClipboard.addEventListener("click", function () {
    if (!TextAreaRender.value) {
        alert("Rông hãy random rồi copy!");
        return;
    }

    navigator.clipboard.writeText(TextAreaRender.value);
    alert("Đã copy vào clipboard");
});
