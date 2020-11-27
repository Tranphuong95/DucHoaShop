import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import Products1 from "app/modules/do-go-noi-that/do-go-noi-that-1/do-go-noi-that-1";
const Product = props => (
  <NavDropdown
    icon="th-list"
    name={translate('global.menu.product')}
    id="product-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
export default Product

//test thu hom 26/11