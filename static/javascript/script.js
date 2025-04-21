function togglePassword() {
    let passField = document.getElementById("password");
    let icon = document.querySelector(".show-pass");
    if (passField.type === "password") {
        passField.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        passField.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}

$(function () {
    $("#password").on("keyup", function () {
        if ($("#password").val() !== "") {
            $(".show-pass").fadeIn(0);
        } else {
            $(".show-pass").fadeOut(0);
        }
    });
});