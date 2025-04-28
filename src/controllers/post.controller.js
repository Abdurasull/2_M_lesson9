import { globalError } from "../utils/error.js";

export const postController = {
    GET: async (req, res) => {
        try{
            
            const posts = await req.readFile("posts.json");
            const myPost = await posts.find( post => post.userId == req.params.userId);
            if(!myPost.posts.length) return await res.status(404).json({message: "Posts not found", status: 404});
            return await res.status(200).json({
                message: "Posts found",
                status: 200,
                posts: myPost
            });
        }catch(err){
            await globalError(err, res);
        }
    },
    POST: async (req, res) => {
        try{
        
            let posts = await req.readFile("posts.json");
            console.log(posts);
            let oldPost = await posts.find(post => post.userId == req.params.userId);
            console.log(req.params.userId);
            
            let Id = oldPost.posts.length ? oldPost.posts[oldPost.posts.length -1 ].id + 1 : 1;
            let newPost = {
                id: Id,
                body: req.body.body
            };
            await oldPost.posts.push(newPost);
            await req.writeFile("posts.json", posts);
            return await res.status(201).json({message: "Post created", status: 201});
        }catch(err){
            await globalError(err, res);}
    },
    PUT: async (req, res) => {
        try{

            let posts = await req.readFile("posts.json");
            const posts1 = await posts.map(post => {
                if(post.userId == req.params.userId){
                    const newList =  post.posts.map(post1 => {
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
            await req.writeFile("posts.json", posts1);
            return await res.status(200).json({message: "Post updated", status: 200});

        }catch(err) {
            await globalError(err, res);
        }
    },
    DELETE: async (req, res) => {
        try{
            let posts = await req.readFile("posts.json");
            const posts1 = posts.map(post => {
                if(post.userId == req.params.userId){
                    const newList = post.posts.filter(post2 => post2.id != req.body.id);
                    return {...post, posts: newList};
                } else{
                    return post;
                }
            });
            await req.writeFile("posts.json", posts1);
            return await res.status(200).json({message: "Post deleted", status: 200});
        }catch(err){
            await globalError(err, res);
        }
    }
}