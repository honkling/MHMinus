const saveButton = document.getElementById("save");
const status = document.getElementById("status");
const colors = document.getElementById("colors");
const size = document.getElementById("size");
const pain = document.getElementById("pain");

const storage = (navigator.userAgent.includes("Firefox") ? browser : chrome).storage.sync;

storage.get({
    colors: false,
    size: false,
    pain: false
}).then(({ colors: colorsValue, size: sizeValue, pain: painValue }) => {
    colors.checked = colorsValue;
    size.checked = sizeValue;
    pain.checked = painValue;
});

saveButton.addEventListener("click", () => {
    storage.set({
        colors: colors.checked,
        size: size.checked,
        pain: pain.checked
    }, () => {
        status.innerText = "Saved settings.";
        setTimeout(() => status.innerText = "", 2000);
    });
});
