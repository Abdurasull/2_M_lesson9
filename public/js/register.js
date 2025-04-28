const elForm = document.querySelector(".js-form");
const elUsername = elForm.querySelector(".js-username");
const elEmail = elForm.querySelector(".js-email");
const elPassword = elForm.querySelector(".js-password");
const elError = elForm.querySelector(".js-error");

async function getdata(){
    elError.innerHTML = "";
    try{
        const response = await fetch("http://localhost:4000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                username: elUsername.value,
                email: elEmail.value,
                password: elPassword.value
            })
        });
        const data = await response.json();
        if(data.status == 201){
            console.log(data);
            window.localStorage.setItem("username", JSON.stringify(data.user));
            window.location.href = "/user";
        } else {
            elError.textContent = data.message
        }
    } catch(err){
        elError.textContent = err.message
    }
}

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    getdata();
    

    

})
