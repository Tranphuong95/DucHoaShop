import './configProducts.scss'
import React from 'react';
import {Link} from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

export const BreadCrumb = (props) => {
  return (
    <div>
      <Breadcrumb tag="nav" listTag="div">
        <BreadcrumbItem tag={Link} to="/">TRANG CHỦ</BreadcrumbItem>
        {/*<BreadcrumbItem tag={Link} to="/products">ĐỒ GỖ NỘI THẤT</BreadcrumbItem>*/}
        {/*<BreadcrumbItem active tag="span">ĐỒ GỖ NỘI THẤT 1</BreadcrumbItem>*/}
        <BreadcrumbItem active tag={Link} to="/product">ĐỒ GỖ NỘI THẤT 1</BreadcrumbItem> {/*todo test 23/12*/}
      </Breadcrumb>
    </div>
  );
};