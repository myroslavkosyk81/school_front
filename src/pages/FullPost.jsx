import React from "react";
import { useParams  } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import 'katex/dist/katex.min.css';

import axios from '../axios';

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
const [data, setData] = React.useState();
const [isLoading, setLoading] = React.useState(true);
const { id } = useParams();

React.useEffect(() => {
  axios.get(`/posts/${id}`).then(res => {
    setData(res.data);
    setLoading(false);
  }).catch(err => {
    console.warn(err);
    alert('Помилка при завантаженні статті');
  });
}, []);
if (isLoading) {
  return <Post isLoading={isLoading} isFullPost/>;
}

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        // imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        // imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={3}
        subj={data.subj}
        grade={data.grade}
        isFullPost
        isEditable>
        <ReactMarkdown remarkPlugins={[gfm, remarkParse, remarkMath, ]} rehypePlugins={[remarkRehype, rehypeKatex, rehypeStringify ]} children={data.text} />
        
        
      </Post>
      {/* <CommentsBlock
        items={[
          {
            user: {
              fullName: "Us",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "test",
          },
          {
            user: {
              fullName: "Us2",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "test",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock> */}
    </>
  );
};
