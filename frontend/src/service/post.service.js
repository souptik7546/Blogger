import axios from "axios";
class post {
  async createPost(data) {
    const {title, description, isActive, featuredImage} =data
    console.log({title, description, isActive, featuredImage});
    
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("isActive", isActive);
    if (featuredImage) {
      formData.append("featuredImage", featuredImage[0]);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/post/create`,
        formData,
        { withCredentials: true }
      );

      console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(data,post) {
    const {title, description, isActive, featuredImage}= data
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("isActive", isActive);
    if (featuredImage) {
      formData.append("featuredImage", featuredImage[0]);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/post/update/${post}`,
        formData,
        { withCredentials: true }
      );

      console.log(response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(post) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/post/delete/${post}`,
        {},
        { withCredentials: true }
      );

      console.log(response);
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  async getPost(post) {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/post/getpost/${post}`,
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async getAllPost() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/post/allposts`,
        {},
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default new post;
