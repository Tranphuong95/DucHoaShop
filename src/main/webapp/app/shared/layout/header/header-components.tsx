import React from 'react';
import { Translate } from 'react-jhipster';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';


export const Brand = props => (
  <NavbarBrand tag={Link} to="/" className="brand-logo">
    <span className="brand-title">
      <Translate contentKey="global.title">DucHoaShop</Translate>
    </span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>
        <Translate contentKey="global.menu.home">Home</Translate>
      </span>
    </NavLink>
  </NavItem>
);
//test
export const Introduction=props=>(
  <NavItem>
    <NavLink tag={Link} to={"/"} className="d-flex align-items-center">
      <span>Gioi thieu</span>
    </NavLink>
  </NavItem>
);
export const Product=props=>(
  <NavItem>
    <NavLink tag={Link} to={"/"} className="d-flex align-items-center">
      <span>San pham</span>
    </NavLink>
  </NavItem>
);
export const Contact=props=>(
  <NavItem>
    <NavLink tag={Link} to={"/"} className="d-flex align-items-center">
      <span>Lien he</span>
    </NavLink>
  </NavItem>
)