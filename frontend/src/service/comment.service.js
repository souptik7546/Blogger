import axios from "axios";


class comment {

  async create(comment, postId) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/comment/create`,
        {comment,postId},
        { withCredentials: true }
      );

      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async update(newComment,commentId){
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/comment/update/${commentId}`,
        {newComment},
        { withCredentials: true }
      );

      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async delete(commentId){
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/comment/delete/${commentId}`,
        {},
        { withCredentials: true }
      );

      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new comment