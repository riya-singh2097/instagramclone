document.querySelector(".signup-link").addEventListener("click", () => {
    document.querySelector(".signup").style.display = "block";
    document.querySelector(".login").style.display = "none";
    document.querySelector(".mobile-slideshow").style.display = "none";

});
document.querySelector(".login-link").addEventListener("click", () => {
    document.querySelector(".login").style.display = "block";
    document.querySelector(".signup").style.display = "none";
    document.querySelector(".mobile-slideshow").style.display = "none";

});
//when the password box is valid then show button will appear and it will toggle between show and hide when clicked
// Toggle password visibility for all password fields
document.querySelectorAll(".password-input").forEach((inputBox) => {
const hideShowContainer = inputBox.parentElement.querySelector(".hide-show");
const hideShowText = hideShowContainer.querySelector(".hide-show-text");

inputBox.addEventListener("input", function () {
hideShowContainer.style.display = this.value.length > 0 ? "block" : "none";
});

hideShowText.addEventListener("click", () => {
    inputBox.type = inputBox.type === "password" ? "text" : "password";
    hideShowText.innerText = inputBox.type === "password" ? "SHOW" : "HIDE";
});
});