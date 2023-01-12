import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import logoFile from './LGheader_Grey2.png'
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
    
    <div >
      {/* <div className={styles.logofile}> */}
      <div className={styles.logofilediv}>
        <Link to="/"  >
          <img src={logoFile} alt="Головна" className={styles.logofile} />
        </Link>
      </div>
      
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <div className={styles.buttons}>
            {/* <Link className={styles.logo} sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '2vw', }} to="/"> */}
          <Link to="/">
            {/* <Button sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '2vw' }} variant="contained">Головна</Button> */}
            <Button sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '3vw' }}>Головна</Button>
            {/* <div>Головна</div> */}
          </Link>
          {/* <Link className={styles.logoAll} sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '2vw' }} to="/all"> */}
          <Link  to="/all">
            <Button sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '3vw' }} >Всі статті</Button>
            {/* <div>Всі статті</div> */}
          </Link>
          </div>
          
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '3vw' }} >Написати</Button>
                </Link>
                <Button onClick={onClickLogout} sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '3vw' }}  color="error">
                  Вийти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '2vw' }} variant="contained">Увійти</Button>
                </Link>
                {/* <Link to="/register">
                  <Button sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '2vw' }} variant="contained">Створити користувача</Button>
                </Link> */}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

