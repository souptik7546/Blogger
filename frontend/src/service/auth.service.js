import axios from "axios";
class auth {
  async createAccount(email, password, username, fullname, avatar) {
    const formData = new FormData();

    formData.append("fullname", fullname);
    formData.append("email", email), formData.append("username", username);
    formData.append("password", password);
    formData.append("avatar", avatar);

    try {
      console.log(formData);
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/users/register`,
        formData,{withCredentials:true}
      );
      if (response) {
        return response;
      }
    } catch (error) {
      throw error;
    }
  }

  async login(data) {
    const {email, password}=data
    try {
      console.log("11111111",{ email, password });
      
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/users/login`,
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
       `${import.meta.env.VITE_BACKEND_URI}/users/currentuser`,
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
        `${import.meta.env.VITE_BACKEND_URI}/users/logout`,
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
        `${import.meta.env.VITE_BACKEND_URI}/users/refresh-accesstoken`,
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
        `${import.meta.env.VITE_BACKEND_URI}/users/verify-email/${verificationCode}`,
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
        `${import.meta.env.VITE_BACKEND_URI}/users/resend-email`,
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
        `${import.meta.env.VITE_BACKEND_URI}/users/change-password`,
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
        `${import.meta.env.VITE_BACKEND_URI}/users/forgot-password`,
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
        `${import.meta.env.VITE_BACKEND_URI}/users/reset-password/${forgotPasswordToken}`,
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
        `${import.meta.env.VITE_BACKEND_URI}/users/getuser/${username}`,
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
