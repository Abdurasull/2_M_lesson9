const elName = document.querySelector(".js-name");
const elEmail = document.querySelector(".js-email");

const elPostList = document.querySelector(`.js-post`);
const elPost = document.querySelector(".js-post-add");
const elExit = document.querySelector(".js-btn-exit");
const elTemplate = document.querySelector(`.js-post-temp`).content;
const elEdit = document.querySelector(".js-edit");
const elDelete = document.querySelector(".js-delete");

if(window.localStorage.getItem(`username`)){
    elEmail.innerHTML = "";
    elName.innerHTML = "";
    elName.textContent = JSON.parse(window.localStorage.getItem(`username`)).username;
    elEmail.textContent = JSON.parse(window.localStorage.getItem(`username`)).email;
}else{
    alert("Avval ruyxatdan o`ting!")
    window.location.href = "/";
} ;  

elPost.addEventListener("click", () => {
    window.location.href = "/newPost";
})

// profildan chiqish uchun
elExit.addEventListener("click", () => {
    window.localStorage.removeItem(`username`);
    window.location.href = '/';
});

// postlarni o`qib olish
(async function() {
  
    try{
        const res = await fetch(`http://localhost:4000/api/posts/${JSON.parse(window.localStorage.getItem(`username`)).id}`);
        const data = await res.json();
        if(data.status == 200){
            console.log(data);
            elPostList.innerHTML = "";
            const docFragment = document.createDocumentFragment();
            data.posts.posts.reverse().forEach(post => {
                const clone =  elTemplate.cloneNode(true);
                clone.querySelector(`.post-content`).textContent = post.body;
                clone.querySelector(`.js-edit`).dataset.id = post.id;
                clone.querySelector(`.js-delete`).dataset.deleteId = post.id;
                

                docFragment.append(clone);
    
            });
            elPostList.append(docFragment);
        }else{
            elPostList.innerHTML = "";
            elPostList.textContent = data.message;
        }
    }catch(err) {
        console.log(err);
    }
})();

async function deletePost(id){
    const res = await fetch('http://localhost:4000/api/posts/' + JSON.parse(window.localStorage.getItem(`username`)).id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })        
    });
    const data = await res.json();
    console.log(data);
    if(data.status == 200){
        window.location.href = `/user`;
    };
}
    

elPostList.addEventListener("click",(e) => {
    console.log(e.target.dataset.deleteId);
    if(e.target.dataset.id){
        window.localStorage.setItem("postId", e.target.dataset.id);
        window.location.href = "/editPost";
    }

    if(e.target.dataset.deleteId){
        deletePost(e.target.dataset.deleteId);
    }
    

});



