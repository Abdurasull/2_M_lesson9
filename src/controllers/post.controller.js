import { globalError } from "../utils/error.js";

export const postController = {
    GET: (req, res) => {
        try{
            
            const posts = req.readFile("posts.json");
            const myPost = posts.find( post => post.userId == req.params.userId);
            if(!myPost.posts.length) return res.status(404).json({message: "Posts not found", status: 404});
            return res.status(200).json({
                message: "Posts found",
                status: 200,
                posts: myPost
            });
        }catch(err){
            globalError(err, res);
        }
    },
    POST: (req, res) => {
        try{
        
            let posts = req.readFile("posts.json");
            console.log(posts);
            let oldPost = posts.find(post => post.userId == req.params.userId);
            console.log(req.params.userId);
            
            let Id = oldPost.posts.length ? oldPost.posts[oldPost.posts.length -1 ].id + 1 : 1;
            let newPost = {
                id: Id,
                body: req.body.body
            };
            oldPost.posts.push(newPost);
            req.writeFile("posts.json", posts);
            return res.status(201).json({message: "Post created", status: 201});
        }catch(err){
            globalError(err, res);}
    },
    PUT: (req, res) => {
        try{

            let posts = req.readFile("posts.json");
            const posts1 = posts.map(post => {
                if(post.userId == req.params.userId){
                    const newList = post.posts.map(post1 => {
                        if(post1.id == req.body.id){
                            post1.body = req.body.body;
                            return post1;
                        } else {
                            return post1;
                        }
                    });
                    return {...post, posts: newList};

                } else{
                    return post;
                }
            });
            req.writeFile("posts.json", posts1);
            return res.status(200).json({message: "Post updated", status: 200});

        }catch(err) {
            globalError(err, res);
        }
    },
    DELETE: (req, res) => {
        console.log(req.params.userId, req.body);
        try{
            let posts = req.readFile("posts.json");
            const posts1 = posts.map(post => {
                if(post.userId == req.params.userId){
                    const newList = post.posts.filter(post2 => post2.id != req.body.id);
                    return {...post, posts: newList};
                } else{
                    return post;
                }
            });
            req.writeFile("posts.json", posts1);
            return res.status(200).json({message: "Post deleted", status: 200});
        }catch(err){
            globalError(err, res);
        }
    }
}