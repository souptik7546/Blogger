import axios from "axios";
class post {
  async createPost(title, description, isActive, featuredImage = "") {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("isActive", isActive);
    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/post/create`,
        formData,
        { withCredentials: true }
      );

      console.log(response);
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(title, description, isActive, post, featuredImage = "") {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("isActive", isActive);
    if (featuredImage) {
      formData.append("featuredImage", featuredImage);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/post/update/${post}`,
        formData,
        { withCredentials: true }
      );

      console.log(response);
      return response.body;
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

      console.log(response);
      return response.body;
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
