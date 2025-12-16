import axios from "axios";


class like {

  async create(post) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/like/create/${post}`,
        {},
        { withCredentials: true }
      );
      return response.body;
    } catch (error) {
      console.log(error);
      throw error;
      
    }
  }

  async delete(post) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/like/delete/${post}`,
        {},
        { withCredentials: true }
      );
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  async isLiked(post){
     try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/like/isliked/${post}`,
        {},
        { withCredentials: true }
      );
      return response?.data;
    } catch (error) {
      console.log(error);
    }
  }

}

export default new like