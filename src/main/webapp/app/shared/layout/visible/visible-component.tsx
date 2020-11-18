import './visible.scss'
import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Form,FormGroup, Input, Button} from 'reactstrap';

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
export const VisibleSearch=(props)=>{
  return(
    <Form inline >
      <FormGroup>
        <Input type="index" name="search" id="txtSearch" placeholder="Nhập từ khóa tìm kiếm..." />
      </FormGroup>
      <Button className="d-none d-sm-block d-md-block d-lg-block d-xl-block ">Tìm kiếm</Button>
    </Form>
  )
}
export const WarpCart=(props)=>{
  return(
  	<div className="warp-cart d-none d-sm-none d-md-none d-lg-block d-xl-block d-lg-flex d-xl-flex flex-wrap align-content-center">
      <a href="#" title="Giỏ hàng" className="cart">
        <span className="quantity">0</span>
        <span>Giỏ hàng</span>
        <span>có 0 sản phẩm</span>
      </a>
    </div>
  )

}
