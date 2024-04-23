import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth,signInWithEmailAndPassword } from "firebase/auth";
import { activate } from "firebase/remote-config";


export const login =createAsyncThunk('user/login', async({email,pwd})=>{
    console.log("username: ", email);
    console.log("pwd: ", pwd);
    try {
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth,email,pwd)
        
        const user = userCredential.user;
        const token = user.stsTokenManager.accessToken;

        const userData = {
            token,
            user:user,
        }

        return userData;

    } catch (err) {
        console.log("userSlice 21 line: ",err);
        throw err;
    }
})

const initialState = {
    email: "",
    pwd: "",
    isLoading: false,
    isAuth: false,
    token:"",
    user:"",
    err:""
} 



export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setEmail: (state, action) => {
            const lowercaseEmail= action.payload.toLowerCase()
            state.email = lowercaseEmail
        },
        setPwd: (state, action) => {
            state.pwd = action.payload
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
            state.isAuth = false;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isAuth=true;
            state.user=action.payload.user;
            state.token=action.payload.token;
        })
        .addCase(login.rejected,(state,action)=>{
            state.isLoading=false;
            state.isAuth=false;
            state.err=action.error.message;
        })
    }
})

export const { setEmail, setPwd, setIsLoading}= userSlice.actions
export default userSlice.reducer;