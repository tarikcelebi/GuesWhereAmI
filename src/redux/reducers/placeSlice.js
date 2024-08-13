import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  updateDoc,
  Timestamp,
  getDocs,
  query,
  orderBy,
  startAt,
  endAt,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { buildCreateApi } from "@reduxjs/toolkit/query";
import * as geofire from "geofire-common";
import { act } from "react";

export const AddPostToPlaceWall = createAsyncThunk(
  "place/AddPostToPlaceWall",
  async ({ placeUID, text, userUID }) => {
    try {
      const placeRef = doc(db, "places", placeUID);
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
      console.log(err.message);
      throw err;
    }
  }
);

export const fetchPosts = createAsyncThunk(
  "place/fetchPosts",
  async (placeUID) => {
    try {
      console.log(placeUID);
      const PostsRef = collection(db, "places", placeUID, "Posts");
      const q = query(PostsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("slice: ", posts);
      return { posts };
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
);

export const fetchPlaces = createAsyncThunk(
  "place/fetchPlaces",
  async (mylocation) => {
    try {
      const center = [mylocation.latitude, mylocation.longitude];
      const radiusInM = 2 * 1000;

      // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
      // a separate query for each pair. There can be up to 9 pairs of bounds
      // depending on overlap, but in most cases there are 4.
      /*         console.log(geofire);
       */
      const bounds = geofire.geohashQueryBounds(center, radiusInM);
      const promises = [];
      for (const b of bounds) {
        const q = query(
          collection(db, "locations"),
          orderBy("geohash"),
          startAt(b[0]),
          endAt(b[1])
        );
        /* console.log(q); */
        promises.push(getDocs(q));
      }

      // Collect all the query results together into a single list
      const snapshots = await Promise.all(promises);
      console.log(snapshots);

      const matchingDocs = [];
      for (const snap of snapshots) {
        for (const doc of snap.docs) {
          const data = doc.data();
          const lat = doc.get("lat");
          const lng = doc.get("lng");

          console.log("document: ", doc);
          // We have to filter out a few false positives due to GeoHash
          // accuracy, but most will match
          const distanceInKm = geofire.distanceBetween([lat, lng], center);
          const distanceInM = distanceInKm * 1000;
          if (distanceInM <= radiusInM) {
            matchingDocs.push({ id: doc.id, ...data });
          }
        }
      }

      return { mylocation, matchingDocs };
    } catch (err) {
      console.log("placeSlice: ", err);
    }
  }
);

export const fetchPopularPlaces = createAsyncThunk(
  "place/fetchPopularPlaces",
  async () => {
    try {
      const locationRef = collection(db, "locations");
      const querySnapshot = await getDocs(locationRef);
      const locations = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const placesWithPostCounts = [];

      for (const location of locations) {
        const postsRef = collection(db, "places", location.id, "Posts");
        const postsSnapshot = await getDocs(postsRef);
        const postCount = postsSnapshot.size;  // Post sayısını buluyoruz

        placesWithPostCounts.push({
          ...location,
          numberOfPosts: postCount,  // Post sayısını mekana ekliyoruz
        });
      }

      placesWithPostCounts.sort((a, b) => b.numberOfPosts - a.numberOfPosts);

      return { placesWithPostCounts };

    } catch (err) {
      console.log(err);
    }
  }
);

const initialState = {
  posts: [
    {
      id: "",
      userId: "",
      postContent: "",
    },
  ],
  places: [
    {
      id: "",
      title: "",
      imageURL: "",
      lat: "",
      lng: "",
      geohash: "",
    },
  ],
  popularPlaces: [
    {
      id: "",
      title: "",
      image: "",
      lat: "",
      lng: "",
      numberOfPeople: 0,
      numberOfPosts: 0,
    },
  ],
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
      })
      .addCase(fetchPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.places = action.payload.matchingDocs;
        state.error = null;
      })
      .addCase(fetchPlaces.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularPlaces.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularPlaces = action.payload.placesWithPostCounts; // PopularPlaces array'ini güncelliyoruz
        state.error = null;
      })
      .addCase(fetchPopularPlaces.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularPlaces.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPosts, setIsLoading } = placeSlice.actions;
export default placeSlice.reducer;
