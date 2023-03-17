 import Comment from "../models/Comment.js"


 export const newComment = async(request,response) => {

    try {
       const comment = await new Comment(request.body);
       comment.save();
       return response.status(200).json("comment Saved SuccessFully");
    } catch (error) {
        return response.status(500).json({error :error.message});
    }

 }

 export const getComments = async(request,response) => {

    try {
       const comments = await Comment.find({postId :request.params.id});
    
       return response.status(200).json(comments); 
    } catch (error) {
        return response.status(500).json({error :error.message});
    }

 }

 export const deleteComment = async (request, response) => {
    try {
      const comment = Comment.findById(request.params.id);
      if (!comment) {
        return response.status(404).json("Post not found");
      }
  
      await Comment.findByIdAndDelete(request.params.id);
  
      return response.status(200).json({ msg: "comment Deleted" });
    } catch (error) {
      return response.status(500).json({ msg: error.message });
    }
  };