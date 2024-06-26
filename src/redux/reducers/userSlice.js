import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { activate } from "firebase/remote-config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc,setDoc,collection, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";


export const login = createAsyncThunk("user/login", async ({ email, pwd }) => {
  console.log("username: ", email);
  console.log("pwd: ", pwd);
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, pwd);

    const user = userCredential.user;
    const token = user.stsTokenManager.accessToken;

    console.log(user);

    const userData = {
      token,
      user: user,
    };

    await AsyncStorage.setItem("UserData", token);

    return userData;
  } catch (err) {
    console.log("userSlice 21 line: ", err);
    throw err;
  }
});

const getUserIdFromToken = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    return decodedToken; 
  } catch (error) {
    console.error("Error decoding token:", error);
    throw new Error("Invalid token");
  }
};

export const autoLogin = createAsyncThunk("user/autoLogin", async () => {
  try {
    const token = await AsyncStorage.getItem("UserData");


    if (token) {

      const user = getUserIdFromToken(token);
/*       console.log(user); */
      await setDoc(doc(db,"Users","currentUser"),{
        id:user.user_id,
        name:user.email
      })
      return user;
    } else {
      throw new Error("user couldnt find");
    }
  } catch (err) {
    throw err;
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const auth = getAuth();
    await signOut(auth);
    await AsyncStorage.removeItem("UserData");
    return null;
  } catch (err) {
    throw err;
  }
});

export const register = createAsyncThunk(
  "user/register",
  async ({ email, pwd }) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pwd
      );
      const user = userCredential.user;
      const token = userCredential.stsTokenManager.accessToken;
      await sendEmailVerification(user);
      await AsyncStorage.getItem(token);

      return token;

    } catch (err) {
      throw err;
    }
  }
);

export const userEnteredPlaceInfo = createAction(
  "user/userEnteredPlaceInfo", (placeInfo)=>{
    return {
      payload:placeInfo
    };
  }
)

const initialState = {
  email: "",
  pwd: "",
  isLoading: false,
  isAuth: false,
  token: "",
  user: "",
  err: "",
  placeId:"",
  placeName:"",
  latitude:"",
  longitude:"",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      const lowercaseEmail = action.payload.toLowerCase();
      state.email = lowercaseEmail;
    },
    setPwd: (state, action) => {
      state.pwd = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.err = action.error.message;
      })
      .addCase(autoLogin.pending, (state, action) => {
        state.isLoading = true;
        state.isAuth = false;
      })
      .addCase(autoLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.user = action.payload;
      })
      .addCase(autoLogin.rejected, (state, action) => {
        state.isAuth = false;
        state.isLoading = false;
        state.token = null;
        state.err = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuth = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false
        state.err = action.payload
      })
      .addCase(register.pending,(state)=>{
        state.isLoading = true
        state.isAuth = false
      })
      .addCase(register.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isAuth = true
        state.token = action.payload
      })
      .addCase(register.rejected,(state,action)=>{
        state.isLoading=false
        state.isAuth = false
        state.err = action.payload
      })
      .addCase(userEnteredPlaceInfo,(state,action)=>{
        const { placeName, latitude, longitude,placeId } = action.payload;
        state.placeName = placeName;
        state.latitude = latitude;
        state.longitude=longitude;
        state.placeId=placeId;

      })
  },
});

export const { setEmail, setPwd, setIsLoading } = userSlice.actions;
export default userSlice.reducer;
