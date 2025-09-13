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
        formData,{withCredentials:true}
      );
      if (response) {
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  async login(email, password) {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        { email, password },
        { withCredentials: true }
      );

      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/users/currentuser",
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/logout",
        {},
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async refreshAccessToken() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/refresh-accesstoken",
        {},
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async verifyEmail(verificationCode) {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/users/verify-email/${verificationCode}`,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resendVerificationEmail(){
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/resend-email",
        {},
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async changePassword(oldPassword, newPassword){
     try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/change-password",
        {oldPassword, newPassword},
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async forgotPassword(email){
    
      try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/forgot-password",
        {email},
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(forgotPasswordToken,newPassword){
    
     try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/reset-password/${forgotPasswordToken}`,
        {newPassword},
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserProfile(username){
     try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/users/getuser/${username}`,
        {},
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new auth();
