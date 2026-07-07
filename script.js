function verifyNRIC(){

    const nric =
    document.getElementById("nric").value.trim();


    const error =
    document.getElementById("error");


    if(!/^[0-9]{12}$/.test(nric)){


        error.innerHTML =
        "Please enter a valid 12-digit NRIC number without dashes.";


        return;

    }


    window.location.href="register.html";

}
