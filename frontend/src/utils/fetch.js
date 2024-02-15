import Cookies from "js-cookie";
import axios from "axios";
import Swal from "sweetalert2";

export const login = async (email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/login", {
      email,
      password,
    });
    if (!response.data.token) {
      throw new Error("Login failed");
    }
    const token = response.data.token;
    Cookies.set("token", token);
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Login Successfully!",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: `username and password didnt match`,
    });
  }
};

export const register = async (full_name, username, email, password) => {
  try {
    const response = await axios.post("http://localhost:3000/register", {
      full_name,
      username,
      email,
      password,
    });
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Register Successfully!",
    });
    return response.data;
  } catch (error) {
    // Swal.fire({
    //   icon: "warning",
    //   text: `username or email already taken`,
    // });
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error edit profile: ${error}`,
    });
  }
};

export const editProfil = async (formData) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.put(`http://localhost:3000/user/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Edit Profile Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error edit profile: ${error}`,
    });
  }
};

export const addPost = async (formData) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.post("http://localhost:3000/post", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Add post Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error add post: ${error}`,
    });
  }
};

export const editPost = async (id, caption) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.put(
      `http://localhost:3000/post/${id}`,
      { caption },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Edit Post Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error edit post: ${error}`,
    });
  }
};

export const deletePost = async (id) => {
  const token = Cookies.get("token");
  try {
    const token = Cookies.get("token");
    const response = await axios.delete(`http://localhost:3000/post/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Delete Post Successfully!",
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error delete post: ${error}`,
    });
  }
};
//================================================================
export const getUserByToken = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get("http://localhost:3000/profil/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching user: ${error}`,
    });
  }
};

export const getPostByToken = async () => {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(`http://localhost:3000/profil/post/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching post by token: ${error}`,
    });
  }
};

export const getAllPost = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/post/`);
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching all post: ${error}`,
    });
  }
};

export const getUserByUserId = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3000/user/${id}`);
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching post by id: ${error}`,
    });
  }
};

export const getPostByUserId = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:3000/post/${userId}`);
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching post by id: ${error}`,
    });
  }
};

export const searchByWord = async (word) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/post/search/${word}`
    );
    return response.data;
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: `Error fetching post by category: ${error}`,
    });
  }
};
