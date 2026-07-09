/*==================================================
CONFIG
==================================================*/

const API_URL =
"https://script.google.com/macros/s/AKfycby_VtMrI7uonpzguKk3fPh6ldDU3FciNqaduer1Gbpj3vhYfHCfGXQrNeL94TTJCvSL0A/exec";


/*==================================================
LANDING PAGE - VERIFY NRIC
==================================================*/

const verifyForm = document.getElementById("verifyForm");

if(verifyForm)
{
    verifyForm.addEventListener("submit", function(event)
    {
        event.preventDefault();

        const nric = document.getElementById("nric").value.trim();
        const error = document.getElementById("error");
        const button = verifyForm.querySelector("button");

        if(!/^\d{12}$/.test(nric))
        {
            error.textContent =
            "Please enter a valid 12-digit NRIC number without dashes.";
            return;
        }

        error.textContent = "Checking...";
        button.disabled = true;

        fetch(API_URL + "?nric=" + encodeURIComponent(nric))
        .then(function(response)
        {
            return response.json();
        })
        .then(function(result)
        {
            button.disabled = false;

            if(result.exists)
            {
                error.textContent =
                "This NRIC has already been registered.";
            }
            else
            {
                error.textContent = "";
                sessionStorage.setItem("nric", nric);
                window.location.href = "register.html";
            }
        })
        .catch(function(err)
        {
            button.disabled = false;
            console.error(err);

            error.textContent =
            "Something went wrong. Please try again.";
        });
    });
}


/*==================================================
REGISTER PAGE
==================================================*/

if(window.location.pathname.endsWith("register.html"))
{
    loadRegistrationPage();
}

function loadRegistrationPage()
{
    loadNRIC();
    setupNameValidation();
    setupPhoneValidation();
    setupEmailValidation();
    setupOutletValidation();
    setupModelValidation();
    setupInterestValidation();
    setupConsentValidation();
}


/*LOAD NRIC*/

function loadNRIC()
{
    const registeredNRIC = document.getElementById("registeredNRIC");

    if(!registeredNRIC)
    {
        return;
    }

    const savedNRIC = sessionStorage.getItem("nric");

    if(savedNRIC == null)
    {
        window.location.href = "index.html";
        return;
    }

    registeredNRIC.value = savedNRIC;
}


/*NAME*/

function setupNameValidation()
{
    const name = document.getElementById("fullname");

    if(!name)
    {
        return;
    }

    name.addEventListener("blur", function()
    {
        const error = document.getElementById("nameError");

        if(this.value.trim() == "")
        {
            error.textContent = "Please enter your full name.";
            this.classList.add("invalid");
        }
        else
        {
            error.textContent = "";
            this.classList.remove("invalid");
        }
    });
}


/*PHONE*/

function setupPhoneValidation()
{
    const phone = document.getElementById("phone");

    if(!phone)
    {
        return;
    }

    phone.addEventListener("input", function()
    {
        this.value = this.value.replace(/\D/g, "");
    });

    phone.addEventListener("blur", function()
    {
        const error = document.getElementById("phoneError");

        if(this.value.length < 10 || this.value.length > 11)
        {
            error.textContent =
            "Please enter a valid Malaysian mobile number.";

            this.classList.add("invalid");
        }
        else
        {
            error.textContent = "";
            this.classList.remove("invalid");
        }
    });
}


/*EMAIL*/

function setupEmailValidation()
{
    const email = document.getElementById("email");

    if(!email)
    {
        return;
    }

    email.addEventListener("blur", function()
    {
        const error = document.getElementById("emailError");

        if(!this.checkValidity())
        {
            error.textContent =
            "Please enter a valid email address.";

            this.classList.add("invalid");
        }
        else
        {
            error.textContent = "";
            this.classList.remove("invalid");
        }
    });
}


/*OUTLET*/

function setupOutletValidation()
{
    const outlet = document.getElementById("outlet");

    if(!outlet)
    {
        return;
    }

    outlet.addEventListener("change", function()
    {
        document.getElementById("outletError").textContent = "";
        this.classList.remove("invalid");
    });
}


/*MODEL*/

function setupModelValidation()
{
    const model = document.getElementById("model");

    if(!model)
    {
        return;
    }

    model.addEventListener("change", function()
    {
        document.getElementById("modelError").textContent = "";
        this.classList.remove("invalid");
    });
}


/*INTEREST*/

function setupInterestValidation()
{
    const interests =
    document.querySelectorAll('input[name="interest"]');

    interests.forEach(function(item)
    {
        item.addEventListener("change", function()
        {
            const selected =
            document.querySelectorAll('input[name="interest"]:checked');

            const error =
            document.getElementById("interestError");

            if(selected.length > 3)
            {
                this.checked = false;

                error.textContent =
                "You may select up to 3 interests only.";
            }
            else
            {
                error.textContent = "";
            }
        });
    });
}


/*CONSENT*/

function setupConsentValidation()
{
    const consents =
    document.querySelectorAll(".consent");

    if(consents.length == 0)
    {
        return;
    }

    consents.forEach(function(item)
    {
        item.addEventListener("change", function()
        {
            const checked =
            document.querySelectorAll(".consent:checked");

            const error =
            document.getElementById("consentError");

            if(checked.length == 3)
            {
                error.textContent = "";
            }
        });
    });
}


/*==================================================
REGISTRATION SUBMIT
==================================================*/

const registrationForm =
document.getElementById("registrationForm");

if(registrationForm)
{
    registrationForm.addEventListener("submit", function(event)
    {
        event.preventDefault();

        let valid = true;
        let firstError = null;

        /* FULL NAME */

        const fullname =
        document.getElementById("fullname");

        const nameError =
        document.getElementById("nameError");

        if(fullname.value.trim() == "")
        {
            valid = false;

            nameError.textContent =
            "Please enter your full name.";

            fullname.classList.add("invalid");

            if(firstError == null)
            {
                firstError = fullname;
            }
        }

        /* PHONE */

        const phone =
        document.getElementById("phone");

        const phoneError =
        document.getElementById("phoneError");

        if(phone.value.length < 10 || phone.value.length > 11)
        {
            valid = false;

            phoneError.textContent =
            "Please enter a valid Malaysian mobile number.";

            phone.classList.add("invalid");

            if(firstError == null)
            {
                firstError = phone;
            }
        }

        /* EMAIL */

        const email =
        document.getElementById("email");

        const emailError =
        document.getElementById("emailError");

        if(!email.checkValidity())
        {
            valid = false;

            emailError.textContent =
            "Please enter a valid email address.";

            email.classList.add("invalid");

            if(firstError == null)
            {
                firstError = email;
            }
        }

        /* OUTLET */

        const outlet =
        document.getElementById("outlet");

        const outletError =
        document.getElementById("outletError");

        if(outlet.value == "")
        {
            valid = false;

            outletError.textContent =
            "Please select a Lexus outlet.";

            outlet.classList.add("invalid");

            if(firstError == null)
            {
                firstError = outlet;
            }
        }
        else
        {
            outlet.classList.remove("invalid");
        }

        /* MODEL */

        const model =
        document.getElementById("model");

        const modelError =
        document.getElementById("modelError");

        if(model.value == "")
        {
            valid = false;

            modelError.textContent =
            "Please select a Lexus model.";

            model.classList.add("invalid");

            if(firstError == null)
            {
                firstError = model;
            }
        }
        else
        {
            model.classList.remove("invalid");
        }

        /* INTEREST */

        const selected =
        document.querySelectorAll(
        'input[name="interest"]:checked');

        const interestError =
        document.getElementById("interestError");

        if(selected.length == 0)
        {
            valid = false;

            interestError.textContent =
            "Please select at least one interest.";

            if(firstError == null)
            {
                firstError =
                document.querySelector(".interests");
            }
        }

        /* CONSENT */

        const consent1 =
        document.getElementById("consent1");

        const consent2 =
        document.getElementById("consent2");

        const consent3 =
        document.getElementById("consent3");

        const consentError =
        document.getElementById("consentError");

        if(!consent1.checked ||
           !consent2.checked ||
           !consent3.checked)
        {
            valid = false;

            consentError.textContent =
            "Please agree to all declarations.";

            if(firstError == null)
            {
                firstError = consent1;
            }
        }

        /* STOP HERE */

        if(!valid)
        {
            firstError.scrollIntoView(
            {
                behavior:"smooth",
                block:"center"
            });

            return;
        }

        /* SUBMIT TO GOOGLE SHEETS */

        const interests =
        Array.from(selected)
        .map(function(item)
        {
            return item.value;
        })
        .join(", ");

        const formData = new FormData();

        formData.append("fullname", fullname.value.trim());
        formData.append("nric", document.getElementById("registeredNRIC").value);
        formData.append("phone", phone.value.trim());
        formData.append("email", email.value.trim());
        formData.append("outlet", outlet.value);
        formData.append("model", model.value);
        formData.append("interest", interests);
        formData.append("consent", "Accepted");

        const submitButton = registrationForm.querySelector("button");
        submitButton.disabled = true;
        submitButton.textContent = "Submitting...";

        fetch(API_URL,
        {
            method:"POST",
            body:formData
        })
        .then(function(response)
        {
            return response.json();
        })
        .then(function(result)
        {
            if(result.success)
            {
                sessionStorage.removeItem("nric");
                window.location.href = "success.html";
            }
            else
            {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Registration";
                alert(result.message);
            }
        })
        .catch(function(error)
        {
            console.error(error);

            submitButton.disabled = false;
            submitButton.textContent = "Submit Registration";

            alert("Unable to submit your registration. Please try again.");
        });
    });
}
