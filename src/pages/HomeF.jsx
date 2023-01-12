import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios from '../axios';
import { useParams  } from "react-router-dom";
import { Post } from '../components/Post';
import { SubjBlock } from '../components/SubjBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPostsF, fetchSubj } from '../redux/slices/posts';

export const HomeF = () => {
  const dispatch = useDispatch();
  const { posts, subj, } = useSelector(state => state.posts);
  const isPostLoading = posts.status === 'loading';
  const isSubjLoading = subj.status === 'loading';
  
  const { subjN } = useParams();
  React.useEffect(() => {
    dispatch(fetchPostsF(subjN));
    dispatch(fetchSubj());
  }, [])



  return (
    <>
      {/* <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Нові" />
        <Tab label="Популярні" />
      </Tabs> */}
      <Grid container spacing={4}>
        <Grid xs={12} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostLoading ? (
            <Post key={index} isLoading={true}/>
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              // imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              subj={obj.subj}
              grade={obj.grade}
            
              isEditable
            />
          ),
          )}
        </Grid>
        {/* <Grid xs={3} item>
          <SubjBlock items={subj.items} isLoading={isSubjLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'User 1',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Test comment 1',
              },
              {
                user: {
                  fullName: 'User 2',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'Test comment 1',
              },
            ]}
            isLoading={false}
          />
        </Grid> */}
      </Grid>
    </>
  );
};
