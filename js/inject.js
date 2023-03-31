const storage = (navigator.userAgent.includes("Firefox") ? browser : chrome).storage.sync;

console.log("Injecting...");

storage.get({
    colors: false,
    size: false,
    pain: false
}).then(({ colors, size, pain }) => {
    const changedNodes = [];

    function recurse(node) {
        /*console.log({ className: node.className, a: !node.className,
            b: typeof node.className !== "string",
            c: node.className && !node.className.split(" ").find((c) => ["v-application", "v-application--wrap", "app-base", "v-main", "v-main__wrap", "dash-div"].includes(c)) });*/

        if (!changedNodes.includes(node) &&
            colors &&
            node.style &&
            node !== document.body &&
            !["app"].includes(node.id) &&
            (!node.className ||
            typeof node.className !== "string" ||
            !node.className.split(" ").find((c) => ["v-overlay", "v-dialog__content", "col-12", "file-manager-card", "v-snack", "v-application", "v-application--wrap", "app-base", "v-main__wrap", "dash-div"].includes(c)))
        ) {
            const bgColor = Math.floor(Math.random() * 16777215).toString(16);
            node.style.setProperty("background-color", `#${bgColor}${"0".repeat(6 - bgColor.length)}`, "important");

            const fgColor = Math.floor(Math.random() * 16777215).toString(16);
            node.style.setProperty("color", `#${fgColor}${"0".repeat(6 - fgColor.length)}`, "important");

            changedNodes.push(node);
        }

        node.childNodes.forEach(recurse);
    }

    setInterval(() => {
        if (colors || size)
            recurse(document.body);
    }, 100);

    if (colors || size)
        recurse(document.body);
});
