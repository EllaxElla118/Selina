window.onload = (event) => {
    document.getElementById("commands").addEventListener("click", () => {
        document.getElementById("bottom").scrollIntoView({
            behavior: "smooth"
        });
    });
};
