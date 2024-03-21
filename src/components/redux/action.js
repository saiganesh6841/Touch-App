import axios from "axios";
import store from "./store";

// export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
// export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
// export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
const dispatch=store.dispatch

export const fetchPosts = () =>{
  const token = localStorage.getItem('token'); 
//   console.log(token)
  if (!token) {
     
    dispatch({ type: 'FETCH_POSTS_FAILURE', payload: 'Token not found' });
    return;
}

return async()=>{
 
console.log(token);
  dispatch({ type: 'FETCH_POSTS_REQUEST' });
  try {
      const response = await axios.post('https://touchapp.in/api/getFeeds',{offset : 0,limit : 0},{
          headers: {
              'Authorization': `Bearer ${token}`, // Include the bearer token in the headers
              'Content-Type': 'application/json'
          }
      }).then(response=>response.data.data);
    //   console.log(response)
      if (!response) {
          throw new Error('Failed to fetch posts');
      }
      // const data = await response.json();
      dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: response });
  } catch (error) {
      dispatch({ type: 'FETCH_POSTS_FAILURE', payload: error.message });
  }
}
};

