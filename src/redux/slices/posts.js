import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios";
import { useParams  } from "react-router-dom";

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});
export const fetchPostsF = createAsyncThunk('subj/fetchPostsF', async (subjN) => {
    
    const { data } = await axios.get(`/subj/${subjN}`);
    // console.log(subjN)
    return data;
});
    
export const fetchPostsGr = createAsyncThunk('grade/fetchPostsGr', async ( params, ) => {
    const { data } = await axios.get(`/grade/${params[0]}/${params[1]}`);
    return data;
});

export const fetchSubj = createAsyncThunk('posts/fetchSubj', async () => {
    const { data } = await axios.get('/subj');
    return data;
});
export const fetchSubjGr = createAsyncThunk('grade/fetchSubjGr', async (gradeN) => {
    const { data } = await axios.get(`/grade/${gradeN}`);
    return data;
});

export const fetchGrade = createAsyncThunk('posts/fetchGrade', async () => {
    const { data } = await axios.get('/grade');
    return data;
});


export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => 
    axios.delete(`/posts/${id}`),
    
);

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    subjN: {
        items: [],
        status: 'loading',
    },
    grade: {
        items: [],
        status: 'loading',
    },
    gradeN: {
        items: [],
        status: 'loading',
    },
    subj: {
        items: [],
        status: 'loading',
    },
};

const postSlice = createSlice({ 
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        [fetchSubj.pending]: (state) => {
            state.subj.items = [];
            state.subj.status = 'loading';
        },
        [fetchSubj.fulfilled]: (state, action) => {
            state.subj.items = action.payload;
            state.subj.status = 'loaded';
        },
        [fetchSubj.rejected]: (state) => {
            state.subj.items = [];
            state.subj.status = 'error';
        },
        [fetchGrade.pending]: (state) => {
            state.grade.items = [];
            state.grade.status = 'loading';
        },
        [fetchGrade.fulfilled]: (state, action) => {
            state.grade.items = action.payload;
            state.grade.status = 'loaded';
        },
        [fetchGrade.rejected]: (state) => {
            state.grade.items = [];
            state.grade.status = 'error';
        },

///////////
        [fetchPostsF.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPostsF.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPostsF.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        [fetchPostsGr.pending]: (state) => {
            state.posts.items = [];
            state.posts.status = 'loading';
        },
        [fetchPostsGr.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPostsGr.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
      
        [fetchSubjGr.pending]: (state) => {
            state.subj.items = [];
            state.subj.status = 'loading';
        },
        [fetchSubjGr.fulfilled]: (state, action) => {
            state.subj.items = action.payload;
            state.subj.status = 'loaded';
        },
        [fetchSubjGr.rejected]: (state) => {
            state.subj.items = [];
            state.subj.status = 'error';
        },

        //delete post
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
        },

    },
});

export const postsReducer = postSlice.reducer;