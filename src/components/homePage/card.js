import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MapsUgcIcon from '@mui/icons-material/MapsUgc';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Tooltip from '@mui/material/Tooltip';
import axios from 'axios';
import FavoriteIcon from '@mui/icons-material/Favorite';
import swal from 'sweetalert'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { TextField } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from 'react-bootstrap';
import Reel from './reel';

const CardPosts = () => {
  // const classes = useStyles();
  const posts = useSelector(state => state.posts && state.posts.filter(post => 
    post.feed_type !== "Investments" && 
    post.feed_type !== "Discover Reels" &&
    post.feed_type !== "E-Commerce" &&
    !post.discover_reels &&
    !post.add_media &&                  
    post.feed_type !== "Promotion"     
));


  console.log(posts)

  const dispatch = useDispatch();
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openReportIndex, setOpenReportIndex] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [likeStatus, setLikeStatus] = useState({});

  const token = localStorage.getItem('token');
  const headers = {
    'Authorization': `Bearer ${token}` 
  };

  const handleOpenCommentModal = (post) => {
    setSelectedPost(post);
    setOpenCommentModal(true);
  };

  const handleCloseCommentModal = () => {
    setOpenCommentModal(false);
  };
 


//tooltip for report
  const handleReportIconClick = (index) => {
    setOpenReportIndex(prevIndex => (prevIndex === index ? null : index)); // Toggle the report tooltip for the clicked post
  };

  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost.postid || selectedPost.reels_id);
    }
   
  }, [selectedPost]);

  //for get comments
  const fetchComments = (postId) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    console.log(token)

    axios.post('https://touchapp.in/api/getComments', {
      post_id: postId,
      offset: "0",
      limit: "100"
    }, {
      headers: headers
    })
    .then(response => {
      const commentsData = response.data.message[0].comments;
      setComments(commentsData);
    })
    .catch(error => {
      console.error('Error fetching comments:', error);
    });
  };

console.log(comments)

//submit likes
  const handleLike = (postId) => {
    const currentLikeStatus = likeStatus[postId] || 0;

    // Toggle the like status (1 -> 0, 0 -> 1)
    const updatedLikeStatus = currentLikeStatus === 1 ? 0 : 1;

    // Update the like status for the post
    setLikeStatus({
        ...likeStatus,
        [postId]: updatedLikeStatus
    });
 
   
    axios.post('https://touchapp.in/api/postLike', {
      post_id: postId,
      reaction_id: updatedLikeStatus.toString()
    }, {
      headers: headers 
    })
    .then(response => {
      // Handle success
      console.log(response);
    })
    .catch(error => {
      // Handle error
      console.error('Error updating reaction:', error);
    });
  };
  //comments
  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  //submit posts
  const handlePostComment = () => {
    if (commentText.trim() === '') {
      //  empty comment
      return;
    }
  
    // Send a POST request to post the comment
    axios.post('https://touchapp.in/api/postComment', {
      post_id: selectedPost.postid || selectedPost.reels_id,
      text: commentText
    }, {
      headers: headers
    })
    .then(response => {
      // Handle success
      console.log('Comment posted:', response.data);
      // Clear the comment input field after posting
      setCommentText('');
      // Fetch comments again to update the UI with the new comment
      fetchComments(selectedPost.postid || selectedPost.reels_id);
    })
    .catch(error => {
      // Handle error
      console.error('Error posting comment:', error);
    });
  };
//more posts loading
const fetchPosts = () => {
  const updatedOffset = offset + 10; // Calculate the updated offset value
  axios.post(
    `https://touchapp.in/api/getFeeds`,
    {
      offset: updatedOffset,
      limit:  10 // Assuming you want to load 10 posts at a time
    },
    {
      headers: headers
    }
  )
    .then(response => {
      if (response.data.length === 0) {
        setHasMore(false);
        console.log(response);
      } else {
        // Combine the new posts with the existing ones
        const newPosts = response.data.data;
        const combinedPosts = [...posts, ...newPosts];
        console.log(combinedPosts)
        // Update the state with the combined posts
        dispatch({ type: 'FETCH_POSTS_SUCCESS', payload: combinedPosts });
        
        // Update the offset state with the new value
        setOffset(updatedOffset);
        console.log(offset);
      }
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
};


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };



// console.log(imagePaths[0][0].path)
  return (
    <div>
      <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
       loader={<h1>Loading....</h1>}
      >
   {posts && posts.map((post, ind)=>(
    <Card key={ind} style={{ maxWidth: 545, marginBottom: "10px", backgroundColor: '#F7F4E9' }}>

    <CardHeader
      avatar={
        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
          <img src={post.profile_pic} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Avatar>
      }
      action={
        <React.Fragment>
        <IconButton aria-label="settings" onClick={() => handleReportIconClick(ind)}>
          <MoreVertIcon />
        </IconButton>
        <Tooltip
          open={openReportIndex === ind}
          onClose={() => setOpenReportIndex(null)}
          title="Report"
          // classes={{ tooltip: classes.customTooltip }}
        />
      </React.Fragment>
      }
      title={post.username}
      subheader={post.caption}
    />
       <CardContent>
  {post.postid !== undefined ? (
    <>
     {post.post_file && post.post_file !== "undefined" ? (
  JSON.parse(post.post_file).length === 1 ? (
    JSON.parse(post.post_file)[0].type === "image" ? (
      <img
        src={JSON.parse(post.post_file)[0].path}
        alt="image"
        style={{ width: '100%', height: 'auto' }}
      />
    ) : (
      // <video src={JSON.parse(post.post_file)[0].path} width="750" height="500" controls></video>
      <Reel src={JSON.parse(post.post_file)[0].path} width="auto" height="500" />
    )
  ) : (
    <Slider {...settings}>
      {JSON.parse(post.post_file).map((file, fileIndex) => (
        file.type === "image" ? (
          <img
            key={fileIndex}
            src={file.path}
            alt={`image_${fileIndex}`}
            style={{ width: '100%', height: 'auto' }}
          />
        ) : (
          // <video key={fileIndex} src={file.path} width="750" height="500" controls></video>
          <Reel src={fileIndex} width="auto" height="500" />
        )
      ))}
    </Slider>
  )
) : null}


    </>
  ) : (
    <Reel src={post.file_path} width="auto" height="500" />
  )}
</CardContent>

          {/* <video src="https://file.touchapp.in/reels/1699369668708_1699369672116.mp4" width="750" height="500" controls></video> */}
    <CardActions disableSpacing>
      {/* this is like icon */}
  
     
      <IconButton
        aria-label="add to favorites"
         onClick={() => handleLike(post.postid ? post.postid : post.reels_id)}
        >
              <span>{post.like_count}</span>
              <FavoriteIcon style={{  color: likeStatus[post.postid ? post.postid : post.reels_id] === 1 ? 'red' : 'lightgrey' }} />
            </IconButton>
            
      {/* this is comment icon */}
      {/* <IconButton onClick={() => handleComment(post.postid ? { postId: post.postid, username: post.username, profilePic: post.profile_pic } : { postId: post.reels_id, username: post.username, profilePic: post.profile_pic })}> */}
      <IconButton onClick={() => handleOpenCommentModal(post)}>
      <span>{post.comment_count}</span><MapsUgcIcon/>
      </IconButton>
 {/* Comment Modal */}
 <Dialog
        open={openCommentModal}
        onClose={handleCloseCommentModal}
        PaperProps={{
          sx: {
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 600,
          },
        }}
        BackdropProps={{
          sx: {
            // backgroundColor: 'transparent',
            backgroundColor: 'white',
          },
        }}
      >
        
        <DialogContent style={{ display: 'flex',justifyContent:"space-between" }}>
          {/* Display the video on the left side */}
         
          <div>
          {selectedPost && selectedPost.postid !== undefined && selectedPost.post_file && selectedPost.post_file !== "undefined" ? (
    JSON.parse(selectedPost.post_file).map((file, index) => (
      <div key={index}>
        {file.type === "image" ? (
          <img
            src={file.path}
            alt="image"
            style={{ width: '250px', height: '440px' }}
          />
        ) : (
          <video src={file.path} width="260" height="500" controls autoPlay></video>
        )}
      </div>
    ))
  ) : <video src={selectedPost?.file_path} width="260" height="500" controls autoPlay></video>}
          {/* {selectedPost && selectedPost.postid !== undefined && selectedPost.post_file && selectedPost.post_file !== "undefined" && JSON.parse(selectedPost.post_file).length === 1 ? (
      <img
        src={JSON.parse(selectedPost.post_file)[0].path}
        alt="image"
        style={{ width: '250px', height: '440px' }}
      />
    ) : (
      
    )} */}
          </div>
          {/* Display "hello" text on the right side */}
          <div style={{ marginLeft: 20 }}>
            {
              selectedPost &&(
                <>
                 <img src={selectedPost.profile_pic} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
            <span style={{fontWeight:"bold",padding:"10px"}}>{selectedPost.username}</span>
            <hr/>
                </>
              )}
           
           {comments.map((comment, index) => (
  <div key={index}>
    <img src={comment.comment.profile_pic} style={{height:"50px",width:"50px",borderRadius:"50%"}}/>
    <span style={{fontWeight:"bold",padding:"10px"}}>{comment.comment.username}</span>
    <i style={{position:"relative",top:"17px",right:"70px"}}>{comment.comment.comment}</i>
   <h4></h4>
    {/* Render other comment details as needed */}
  </div>
))}
             
           
          </div>
          
        </DialogContent>
        <TextField
          placeholder="Post your comment"
          variant="filled"
          style={{ width: "520px" }}
          value={commentText}
          onChange={handleCommentTextChange} // Handle changes to the input value
        />
        <Button variant="contained" style={{position:"absolute",right:"40px",top:"495px",fontSize:"22px"}} onClick={handlePostComment}>Submit</Button>
        <DialogActions>
          <Button onClick={handleCloseCommentModal}>Close</Button>
        </DialogActions>
      </Dialog>

      <IconButton aria-label="share" style={{margin:"0px auto 0px 370px"}}>
        <ShareIcon />
      </IconButton>
    </CardActions>
  </Card>

   ))}
       </InfiniteScroll>
    </div>
  );
}

export default CardPosts;
