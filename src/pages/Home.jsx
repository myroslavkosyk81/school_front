import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import axios from '../axios';

import {Header} from '../components/Header';
import { Post } from '../components/Post';
import { SubjBlock } from '../components/SubjBlock';
import { GradeBlock } from '../components/GradeBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchSubj, fetchGrade } from '../redux/slices/posts';


export const Home = () => {
  const dispatch = useDispatch();
  const { posts, subj, grade} = useSelector(state => state.posts);

  const isPostLoading = posts.status === 'loading';
  const isSubjLoading = subj.status === 'loading';
  const isGradeLoading = grade.status === 'loading';
// console.log(subj)

  React.useEffect(() => {
    // dispatch(fetchPosts());
    // dispatch(fetchSubj());
    dispatch(fetchGrade());
    
  }, [])

  return (
    <>
   
      {/* <Header /> */}
      {/* <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Нові" />
        <Tab label="Популярні" />
      </Tabs> */}
      <Grid container spacing={4}>
        {/* <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) => isPostLoading ? (
            <Post key={index} isLoading={true}/>
          ) : (
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''}
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={3}
              subj={obj.subj}
            
              isEditable
            />
          ),
          )}
        </Grid> */}
        <Grid xs={12} item>
          {/* <SubjBlock items={subj.items} isLoading={isSubjLoading} /> */}
          <GradeBlock items={grade.items} isLoading={isGradeLoading} />
          {/* <CommentsBlock
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
          /> */}
        </Grid>
      </Grid>
    </>
  );
};
