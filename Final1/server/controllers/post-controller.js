import Post from "../models/Post.js";

export const createPost = async (request, response) => {
  try {
    const post = await new Post(request.body);
    post.save();

    return response.status(200).json("Post Saved SuccessFully");
  } catch (error) {
    return response.status(500).json(error);
  }
};


export const getAllPosts = async(request,response) => {

        try {

            let posts  = await Post.find({})

            console.log(posts)

            return response.status(200).json(posts);

            
        } catch (error) {
            return response.status(500).json({msg : error.message});
        
        }

} 