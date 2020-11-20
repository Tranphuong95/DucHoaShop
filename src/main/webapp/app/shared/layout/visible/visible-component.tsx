import './visible.scss'
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Form,FormGroup, Input, Button, NavLink} from 'reactstrap';
import {NavLink as Liknk } from 'react-router-dom';

export const VisibleList = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div className="d-none d-sm-none d-md-block d-lg-block d-xl-block">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} className="my-2 mr-1">
        <DropdownToggle caret className="dropdown-toggle btn-secondary" >
          Chọn danh mục
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem header>Chọn danh mục</DropdownItem>
          <DropdownItem>Đồ gỗ nội thất 1</DropdownItem>
          <DropdownItem>Đồ gỗ nội thất 2</DropdownItem>
          <DropdownItem>Đồ gỗ nội thất 3</DropdownItem>
          <DropdownItem>Đồ gỗ nội thất 4</DropdownItem>
          <DropdownItem>Đồ gỗ nội thất 5</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
export const VisibleListSearch=(props)=>{
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);
  return(
    <Form  className=" form-visible col">
      <div className="col d-flex">
        <FormGroup className="col-auto">
          <div className="d-none d-sm-none d-md-block d-lg-block d-xl-block">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} className="my-2 mr-1">
              <DropdownToggle caret className="dropdown-toggle btn-secondary" >
                Chọn danh mục
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Chọn danh mục</DropdownItem>
                <DropdownItem>Đồ gỗ nội thất 1</DropdownItem>
                <DropdownItem>Đồ gỗ nội thất 2</DropdownItem>
                <DropdownItem>Đồ gỗ nội thất 3</DropdownItem>
                <DropdownItem>Đồ gỗ nội thất 4</DropdownItem>
                <DropdownItem>Đồ gỗ nội thất 5</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </FormGroup>
        <FormGroup className="col align-self-center">
          <Input type="index" name="search" id="txtSearch" placeholder="Nhập từ khóa tìm kiếm..." className="d-none d-sm-none d-md-block d-lg-block d-xl-block "/>
        </FormGroup>
        <Button type="submit" className="btn-search d-none d-sm-none d-md-block d-lg-block d-xl-block col-auto ">Tìm kiếm</Button>
      </div>
      <div className="result-search col"> {/*todo cần sủa lại bằng reactstrap thay cho bootstrap*/}
        <div className="row mt-2">
          <div className="col"><ResultSearch/></div>
          <div className="col"><ResultSearch/></div>
        </div>
        <div className="row mt-2">
          <div className="col"><ResultSearch/></div>
          <div className="col"><ResultSearch/></div>
        </div>
        <div className="row mt-2">
          <div className="col"><ResultSearch/></div>
          <div className="col"><ResultSearch/></div>
        </div>
        <div className="float-right m-2"><NavLink tag={Liknk} to="/products">Xem tất cả</NavLink></div>
      </div>
    </Form>
  )
}
export const WarpCart=(props)=>{
  return(
  	<div className="warp-cart d-none d-sm-none d-md-none d-lg-none d-xl-block d-lg-flex d-xl-flex flex-wrap align-content-center col-3">
      <a href="#" title="Giỏ hàng" className="cart">
        <span className="quantity">0</span>
        <span>Giỏ hàng</span>
        <span>có 0 sản phẩm</span>
      </a>
    </div>
  )

}

import { Media } from 'reactstrap';

export const ResultSearch = () => {
  return (
    // <Media>
    //   <Media left href="#">
    //     <Media object data-src="./../../../../content/images/do_go_san_pham_1.png/64x64" alt="Generic placeholder image" />
    //   </Media>
    //   <Media body>
    //     <Media heading>
    //       THÙNG GỖ SỒI MỘC
    //     </Media>
    //       2000000đ
    //   </Media>
    // </Media>
    <div className="media border p-3">
        <img src="./../../../../content/images/do_go_san_pham_1.png" alt="John Doe" className="mr-3 mt-3" width="80px"/>
        <div className="media-body">
          <h6>THÙNG GỖ SỒI MỘC</h6>
          <p>2000000đ</p>
        </div>
    </div>
  );
};