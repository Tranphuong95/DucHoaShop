import './header.scss';

import React, { useState } from 'react';
import { Translate, Storage } from 'react-jhipster';
import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse, NavItem, NavLink, UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,NavbarText } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import {Home, Brand, Products, Contact, Introduction} from './header-components';
import { AdminMenu, EntitiesMenu, AccountMenu, LocaleMenu } from '../menus';

export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  currentLocale: string;
  onLocaleChange: Function;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLocaleChange = event => {
    const langKey = event.target.value;
    Storage.session.set('locale', langKey);
    props.onLocaleChange(langKey);
  };

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">
          <Translate contentKey={`global.ribbon.${props.ribbonEnv}`} />
        </a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    // <div id="app-header">
    //   {renderDevRibbon()}
    //   <LoadingBar className="loading-bar" />
    //   <Navbar light expand="sm" fixed="top" className="bg-light">
    //     <NavbarToggler aria-label="Menu" onClick={toggleMenu} />
    //     <Brand />
    //     <Collapse isOpen={menuOpen} navbar>
    //       <Nav id="header-tabs" className="ml-auto" navbar>
    //         <Home />
    //         {props.isAuthenticated && <EntitiesMenu />} {/*entity*/}
    //         {props.isAuthenticated && props.isAdmin && (
    //           <AdminMenu showSwagger={props.isSwaggerEnabled} showDatabase={!props.isInProduction} /> // quan tri
    //         )}
    //         <LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} /> {/*ngon ngu*/}
    //         <AccountMenu isAuthenticated={props.isAuthenticated} /> {/*tai khoan*/}
    //       </Nav>
    //     </Collapse>
    //   </Navbar>
    // </div>
    <div id="app-header" className="bg-main-color d-flex justify-content-center">
     {/*{ renderDevRibbon()}*/}
      <LoadingBar className="loading-bar" />
      <Navbar fixed="top" expand="md" light className="shop-header  col-12 col-sm-11 -col-md-10 col-lg-10 col-xl-10">
        <NavbarBrand>
          <Brand/>
        </NavbarBrand>
        <NavbarToggler aria-label="menu" onClick={toggleMenu} />
        <Collapse id="header-tabs" isOpen={menuOpen} navbar>
          <Nav className="ml-auto " navbar>
            <NavItem><Home/></NavItem>
            <NavItem><Introduction/></NavItem>
            <NavItem><Products/></NavItem>
            <NavItem><Contact/></NavItem>
            <NavItem>{props.isAuthenticated && <EntitiesMenu />}</NavItem> {/*entity*/}
            <NavItem>
              {props.isAuthenticated && props.isAdmin && (
              <AdminMenu showSwagger={props.isSwaggerEnabled} showDatabase={!props.isInProduction} /> // quan tri
              )}
            </NavItem>
            <NavItem><LocaleMenu currentLocale={props.currentLocale} onClick={handleLocaleChange} /></NavItem> {/*ngon ngu*/}
            <NavItem><AccountMenu isAuthenticated={props.isAuthenticated} /></NavItem> {/*tai khoan*/}
          </Nav>
        </Collapse>
      </Navbar>

    </div>
);
};

export default Header;
