import './visible.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faListAlt} from '@fortawesome/free-solid-svg-icons'
import {VisibleList, VisibleSearch, WarpCart} from "app/shared/layout/visible/visible-component";


const Visible = props => (
  <div className="visible d-flex justify-content-center">
    <div className="visible-container d-flex bg-main-color justify-content-between col-12 col-sm-11 -col-md-10 col-lg-10 col-xl-10">
      <div className="visible-list d-none d-sm-none d-md-none d-lg-none d-xl-block d-xl-flex flex-wrap align-content-center col-3">
        <div className="visible-icon mr-2">
          <FontAwesomeIcon icon={faListAlt}/>
        </div>
        <div>DANH MỤC SẢN PHẨM</div>
      </div>
      <div className="search-target d-flex flex-wrap align-content-center col-auto">
        <VisibleList/>
        <VisibleSearch/>
      </div>
      <div className="search-target d-flex flex-wrap align-content-center col-auto">
        <WarpCart/>
      </div>
    </div>
  </div>
);

export default Visible;
