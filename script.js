/*LANDING PAGE*/
const verifyForm = document.getElementById("verifyForm");

if(verifyForm)
{
    verifyForm.addEventListener("submit", function(event)
    {
        event.preventDefault();
        const nric = document.getElementById("nric").value.trim();
        const error = document.getElementById("error");

        if(!/^\d{12}$/.test(nric))
        {
            error.textContent =
            "Please enter a valid 12-digit NRIC number without dashes.";
            return;
        }

        error.textContent = "";
        sessionStorage.setItem("nric", nric);
        window.location.href = "register.html";
    });
}


/*REGISTER PAGE*/

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
    console.log("Input:", registeredNRIC);
    console.log("Value:", registeredNRIC.value);
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

            if(firstError == null)
            {
                firstError = outlet;
            }
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

            if(firstError == null)
            {
                firstError = model;
            }
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

        /* SUCCESS */

const selectedInterests =
Array.from(
document.querySelectorAll('input[name="interest"]:checked')
)
.map(function(item)
{
    return item.value;
})
.join(", ");

const formData =
{
    fullname:
    document.getElementById("fullname").value.trim(),

    nric:
    document.getElementById("registeredNRIC").value,

    phone:
    document.getElementById("phone").value.trim(),

    email:
    document.getElementById("email").value.trim(),

    outlet:
    document.getElementById("outlet").value,

    model:
    document.getElementById("model").value,

    interest:
    selectedInterests,

    consent:"Accepted"
};

fetch(
"https://script.google.com/macros/s/AKfycby_VtMrI7uonpzguKk3fPh6ldDU3FciNqaduer1Gbpj3vhYfHCfGXQrNeL94TTJCvSL0A/exec",
{
    method:"POST",

    headers:
    {
        "Content-Type":"application/json"
    },

    body:JSON.stringify(formData)
})
.then(function(response)
{
    return response.json();
})
.then(function(result)
{
    if(result.success)
    {
        window.location.href = "success.html";
    }
    else
    {
        alert(result.message);
    }
})
.catch(function(error)
{
    console.error(error);

    alert("Unable to submit your registration. Please try again.");
});

    });
}
