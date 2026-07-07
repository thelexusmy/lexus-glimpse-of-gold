alert("script.js is loading");

const verifyForm = document.getElementById("verifyForm");

alert(verifyForm);

if(verifyForm)
{
    verifyForm.addEventListener("submit", function(event)
    {
        event.preventDefault();

        alert("Submit clicked!");
    });
}
