import React, { useRef } from 'react';
import { useNavigate, Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';

import { selectIsAuth } from '../../redux/slices/auth';
import styles from './AddPost.module.scss';
import axios from '../../axios';

export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setLoading] = React.useState(false);
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [subj, setSubj] = React.useState('');
  const [grade, setGrade] = React.useState('');
  const [imageUrl, setImageUrl] = React.useState('');
  const inputFileRef = React.useRef(null);
  const isEditing = Boolean(id);




  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (err) {
      console.warn(err);
      alert('Помилка завантаження фото');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title,
        imageUrl,
        subj,
        grade,
        text,
      };

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields)
      
      const _id = isEditing ? id : data._id;
      
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert('Помилка при створенні статті');
    }
  };

  React.useEffect(() => {
    if (id) {
      axios
      .get(`/posts/${id}`)
      .then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setGrade(data.grade);
        setImageUrl(data.imageUrl);
        setSubj(data.subj.join(','));
      }).catch(err => {
        console.warn(err);
        alert('Помилка при отримання статті');
      });
    }
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '250px',
      autofocus: true,
      placeholder: 'Напишіть текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />;
  }

  

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
        Завантажити фото
      </Button>
      <input 
        ref={inputFileRef} 
        type="file" 
        onChange={handleChangeFile} 
        hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Видалити
          </Button>
          {/* <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" /> */}
          <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
        </>
        
      )}
    
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статті..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField 
        value={subj}
        onChange={(e) => setSubj(e.target.value)}
        classes={{ root: styles.subj }} 
        variant="standard" 
        placeholder="Предмет" 
        fullWidth />
      <TextField 
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Клас"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        fullWidth
        />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />

      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? 'Зберегти' : 'Опублікувати'}
        </Button>
        <a href="/">
          <Button size="large" variant="contained">Відміна</Button>
        </a>
      </div>
    </Paper>
  );
};
