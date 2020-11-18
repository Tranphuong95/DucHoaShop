import './home.scss';
import React from 'react';
import { NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
export const HomeHead=(props)=>{
  return (
    <div>
      <div className="banner-img auto">
        <NavLink to="/" tag={Link}>
          <img className="img-fluid" src="content/images/banner.png" alt="banner"/>
        </NavLink>
      </div>
    </div>
  )
}