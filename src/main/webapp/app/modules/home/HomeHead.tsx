import './home.scss';
import React,{useState} from 'react';
import { NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
export const HomeHead=(props)=>{
  // const [scrollTop, setScrollTop]=useState(0);
  // window.onscroll=()=>{
  //   setScrollTop(document.documentElement.scrollTop || document.body.scrollTop);
  // }
  return (
    // <div className={scrollTop>100?'a':'b'}>
      <div className="banner-img auto">
        <NavLink to="/" tag={Link}>
          <img className="img-fluid" src="content/images/banner.png" alt="banner"/>
        </NavLink>
      </div>
    // </div>
  )
}