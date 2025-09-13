import axios from "axios";
//    http://localhost:8000/api/v1/post
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
        "http://localhost:8000/api/v1/post/create",
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
        `http://localhost:8000/api/v1/post/update/${post}`,
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
        `http://localhost:8000/api/v1/post/delete/${post}`,
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
        `http://localhost:8000/api/v1/post/getpost/${post}`,
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
        `http://localhost:8000/api/v1/post//allposts`,
        {},
        { withCredentials: true }
      );

      console.log(response);
      return response.body;
    } catch (error) {
      throw error;
    }
  }
}

export default post;
