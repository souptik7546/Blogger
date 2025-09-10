import axios from "axios";
class auth {
  async createAccount(email, password, username, fullname, avatar) {
    const formData = new FormData();

    formData.append("fullname", fullname);
    formData.append("email", email), formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData
      );
      if (response) {
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  async login(email, passsword){
    try {
        const response= await axios.post("http://localhost:8000/api/v1/users/login",{email,passsword})
        console.log(response);
        return response
    } catch (error) {
        throw error
    }
  }
}
