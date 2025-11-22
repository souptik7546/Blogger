class like {

  async create(post) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/like/create/:${post}`,
        {},
        { withCredentials: true }
      );

      console.log(response);
      return response.body;
    } catch (error) {
      throw error;
    }
  }

  async delete(post) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/like/delete/:${post}`,
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

export default new like