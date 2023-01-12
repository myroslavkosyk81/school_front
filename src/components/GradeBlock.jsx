import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import TagIcon from "@mui/icons-material/Tag";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import styles from './GradeBl.module.scss';
import { Link } from 'react-router-dom';
// import { Link } from '@mui/material';
import { SideBlock } from "./SideBlock";
import { alignProperty } from "@mui/material/styles/cssUtils";

export const GradeBlock = ({ items, isLoading = true }) => {
  return (
    <SideBlock title="КЛАСИ">
        {/* <div>
          <Link to={"/grade8/home/"}>8 клас</Link>
        </div> */}

        
    {/* // <SideBlock>
    //   <div className={styles.title}>
    //     <div>ПРЕДМЕТИ</div>
        
    //   </div> */}
      <List>
        {(isLoading ? [...Array()] : items).map((name, i) => (
          <a
            style={{ textDecoration: "none", color: "black" }}
            href={`/grade/${name}`}
          >
            {/* <ListItem sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '2vw' }} key={i} disablePadding>
              
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ListItemText sx={{lineHeight: 0.9, fontSize: '8px', fontSize: '2vw' }} primary={name} className={ styles.grade }/>
                )}
              
            </ListItem> */}
            <li >
                {isLoading ? (
                  <Skeleton width={100} />
                ) : (
                  <ul className={ styles.grade }>{name}</ul>
                )}
            </li>
           
          </a>
        ))}
      </List>
    </SideBlock>
  );
};
