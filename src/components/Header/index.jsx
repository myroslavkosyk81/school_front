import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Ви дійсно бажаєте вийти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          
          <Link className={styles.logo} sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '2vw', }} to="/">
            <div>Головна</div>
          </Link>
          <Link className={styles.logoAll} sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '2vw' }} to="/all">
            <div>Всі статті</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button className="Button" sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '2vw' }} variant="contained">Написати</Button>
                </Link>
                <Button onClick={onClickLogout} className="Button" sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '2vw' }} variant="contained" color="error">
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Увійти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Створити користувача</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

