function verifyNRIC(){

    let nric = document.getElementById("nric").value;

    let error = document.getElementById("error");


    if(!/^\d{12}$/.test(nric)){

        error.innerHTML =
        "Please enter a valid 12-digit NRIC number.";

        return;

    }


    window.location.href = "register.html";

}
