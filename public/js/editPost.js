const elForm = document.querySelector(`.js-form`);
const elTextarea = elForm.querySelector(`.js-textarea`);


(() => {
    if(!window.localStorage.getItem(`username`))
    {
        alert("Avval ruyxatdan o`ting!");
        window.location.href = `/`;
    }
})();

async function EditData(post){
    const res = await fetch(`http://localhost:4000/api/posts/${JSON.parse(window.localStorage.getItem("username")).id}`
            ,{
                method: `PUT`,
                headers: {
                    "Content-type": `application/json`
                },
                body: JSON.stringify(post)
            });
    const data = await res.json();
    console.log(data);
    console.log(data.status);
    if(data.status == 200){
        window.location.href = `/user`;
    }
}

elForm.addEventListener("submit", (e) => {
    e.preventDefault();
    EditData({
        id: window.localStorage.getItem("postId"),
        body: elTextarea.value
    });
})