const verifyForm = document.getElementById("verifyForm");

verifyForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const nric = document.getElementById("nric").value.trim();

    const error = document.getElementById("error");

    if (!/^\d{12}$/.test(nric)) {

        error.textContent =
            "Please enter a valid 12-digit NRIC number without dashes.";

        return;

    }

    error.textContent = "";

    // Later:
    // Check Google Sheets here

    sessionStorage.setItem("nric", nric);
    window.location.href = "register.html";

});
