const elForm = document.querySelector(`.js-form`);
const elEmail = elForm.querySelector(`.js-username`);
const elPassword = elForm.querySelector(`.js-password`);
const elError = elForm.querySelector(`.js-error`);


async function getData(){
    try{
        elError.innerHTML = ``;
        const res = await fetch(`http://localhost:4000/api/auth/login`,
            {
                method: `POST`,
                headers:{
                    "Content-type": `application/json`
                },
                body: JSON.stringify(
                    {
                        username: elEmail.value,
                        password: elPassword.value
                    }
                )
            }
        );
        const data = await res.json();
        if(data.status == 201){
            window.localStorage.setItem(`username`, JSON.stringify(data.user));
            window.location.href = `/user`;
        } else
        elError.textContent = data.message;
    }catch(err){
        elError.textContent = err.message;
    }
}
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    getData();
})