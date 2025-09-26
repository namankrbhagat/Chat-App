import {create} from "zustand"
import {axiosInstance} from '../lib/axios'
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn:false,
  isCheckingAuth: true,
  isUpdatingProfile:false,

  isCheckingAuth:true,
  checkAuth: async() => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({authUser:res.data})
    } catch (error) {
      console.log("Error in checkAuth: ",error);
      set({authUser:null})
    }finally{
      set({isCheckingAuth:false});
    }
  },

  signup: async(data) =>{
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup",data);
      set({authUser: res.data})
      toast.success("Account created successfully 🤗")
      return true;
    } catch (error) {
      const message = error?.response?.data?.message || "Signup failed";
      toast.error(message);
      return false;
    } finally {
      set({isSigningUp:false})
    }
  }
}))