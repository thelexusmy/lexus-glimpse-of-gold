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
        this.value =
        this.value.replace(/\D/g,"");
    });
    phone.addEventListener("blur", function()
    {
        const error = document.getElementById("phoneError");

        if(this.value.length < 10 || this.value.length > 11)
        {
            error.textContent = "Please enter a valid Malaysian mobile number.";
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
            error.textContent = "Please enter a valid email address.";
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
    const interests = document.querySelectorAll('input[name="interest"]');
    interests.forEach(function(item)
    {
        item.addEventListener("change", function()
        {
            const selected = document.querySelectorAll('input[name="interest"]:checked');
            const error = document.getElementById("interestError");

            if(selected.length > 3)
            {
                this.checked = false;
                error.textContent = "You may select up to 3 interests only.";
            }
            else
            {
                error.textContent = "";
            }
        });
    });
}
