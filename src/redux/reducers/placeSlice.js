import {
  createSlice,
  createAsyncThunk,
  createAction,
} from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  Timestamp,
  storage
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildCreateApi } from "@reduxjs/toolkit/query";
import Datas from "../../../Data";

const placesCollectionRef = collection(db, "Datas");


Datas.forEach( async (data) => {
  const placeDocRef = await addDoc(placesCollectionRef, data);
  const imageRef = ref(storage, `places/${placeDocRef.id}.jpg`);
  await uploadBytes(imageRef, data.image);
  await updateDoc(placeDocRef, { imageUrl: imageRef.fullPath })
   .then((docRef) => {
      console.log(`Document written with ID: ${docRef.id}`);
    })
   .catch((error) => {
      console.error("Error adding document: ", error);
    });
});


export const AddPostToPlaceWall = createAsyncThunk(
  "place/AddPostToPlaceWall",
  async ({ placeUID, text, userUID }) => {
    try {
      const placeRef = doc(db, "places", "placeUID");
      await setDoc(placeRef, {});
      const postsCollectionRef = collection(placeRef, "Posts");
      const newPostRef = await addDoc(postsCollectionRef, {
        userId: userUID,
        postContent: text,
       createdAt: Timestamp.fromDate(new Date()),
      });
      const newPostId = newPostRef.id;
      return {
        text,
        userUID,
       id: newPostId,
      }; // Return the new post data
    } catch (err) {
      console.error(err.message);
      console.log(err.message)
      throw err;
    }
  }
);





export const fetchPosts = createAsyncThunk(
  "place/fetchPosts",
  async (placeUID) => {
    try {
      const PostsRef = collection(db, "places", "placeUID", "Posts");
      const snapshot = await getDocs(PostsRef);
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return { placeUID, posts };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

const initialState = {
  posts: [{
    id:"",
    userId:"",
    postContent:"",
  }],
  isLoading: false,
  error: null,
};

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddPostToPlaceWall.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(AddPostToPlaceWall.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push({
          id: action.payload.id,
          userId: action.payload.userUID,
          postContent: action.payload.text,
        });
        state.error = null;
      })
      .addCase(AddPostToPlaceWall.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.posts;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPosts, setIsLoading } = placeSlice.actions;
export default placeSlice.reducer;
