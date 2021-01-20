import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Translate, translate } from 'react-jhipster';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';
import Products1 from "app/modules/do-go-noi-that/do-go-noi-that-1/do-go-noi-that-1";
export const ProductMenu = props => (
  <NavDropdown
    icon="th-list"
    name={'Products'}
    id="product-menu"
    style={{ maxHeight: '80vh', overflow: 'auto' }}
  >
    <MenuItem icon="asterisk" to="/product/product1">
      <span>DO GO NOI THAT 1</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/product/product2">
      <span>DO GO NOI THAT 2</span>
    </MenuItem>
    <MenuItem icon="asterisk" to="/product/product3">
      <span>DO GO NOI THAT 3</span>
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
export default ProductMenu

//test thu hom 26/11