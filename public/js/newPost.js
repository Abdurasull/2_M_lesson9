const elForm = document.querySelector(`.js-form`);
const elTextarea = elForm.querySelector(`.js-textarea`);


(() => {
    if(!window.localStorage.getItem(`username`))
    {
        alert("Avval ruyxatdan o`ting!");
        window.location.href = `/`;

    }  
})();
console.log()

async function PostData(post){
   const res = await fetch(`http://localhost:4000/api/posts/${JSON.parse(window.localStorage.getItem(`username`)).id}`
            ,{
                method: `POST`,
                headers: {
                    "Content-type": `application/json`
                },
                body: JSON.stringify(post)
            });
    const data = await res.json();
    console.log(data);
    if(data.status == 201){
        window.location.href = `/user`;
    }
}

elForm.addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    PostData({
        body: elTextarea.value
    })

})