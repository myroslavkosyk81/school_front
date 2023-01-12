import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "@mui/material/Container";

import { Header } from "./components";
import { Home, FullPost, All, HomeF, Registration, AddPost, Login, Grade8, HomeGrade, HomeGrSb } from "./pages";
import React from "react";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";


function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [])

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>




          <Route path="/" element={<Home />} />
          <Route path="/grade/:gradeN" element={<HomeGrade />} />
          <Route path="/grade/:gradeN/:subjN" element={<HomeGrSb />} />
          
          <Route path="/subj/:subjN" element={<HomeF />} />
          

          <Route path="/grade8/home/" element={<Grade8 />} />



          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/all" element={<All />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          {/* <Home /> */}
        {/*<FullPost />*/}
        {/*<AddPost />*/}
        {/*<Login />*/}
        {/*<Registration />*/}
        </Routes>
        
      </Container>
    </>
  );
}

export default App;
