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

        /*store nric*/

    sessionStorage.setItem("nric", nric);
    window.location.href = "register.html";

});

    const registeredNRIC = document.getElementById("registeredNRIC");

if (registeredNRIC) {

    const savedNRIC = sessionStorage.getItem("nric");

    if (!savedNRIC) {
        window.location.href = "index.html";
    } else {
        registeredNRIC.value = savedNRIC;
    }

    /*phone restriction*/
}

const phone = document.getElementById("phone").value.trim();

if(phone.length < 10 || phone.length > 11){

    document.getElementById("phoneError").textContent =
    "Please enter a valid Malaysian mobile number.";

    return;

    /*email restriction*/
}

const email = document.getElementById("email");

if(!email.checkValidity()){

    document.getElementById("emailError").textContent =
    "Please enter a valid email address.";

    return;

}

    /*interest restriction*/
const interests = document.querySelectorAll('input[name="interest"]');

interests.forEach(item=>{

    item.addEventListener("change",()=>{

        const selected =
        document.querySelectorAll('input[name="interest"]:checked');

        if(selected.length>3){

            item.checked=false;

            document.getElementById("interestError").textContent =
            "You may select up to 3 interests only.";

        }else{

            document.getElementById("interestError").textContent="";

        }

    });

});
