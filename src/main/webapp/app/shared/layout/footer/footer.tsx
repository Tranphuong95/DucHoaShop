import './footer.scss';

import React from 'react';
import { NavLink,Table } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';

const Footer = props => (
  <div className="d-flex justify-content-center">
    <div className="footer page-content col-10">
      <div className="row">
        <div className="col-lg-4 ">
          <div className="mb-2">
            <NavLink to="/" tag={Link} className="d-flex justify-content-center">
              <img className="img-footer img-fluid" width="100%" src="content/images/logo-shop.png" alt="Card image cap" />
            </NavLink>
            <div>
              <span>Trống Mạnh Hùng có cơ ở sản xuất tại Làng nghề Đọi Tam - Hà Nam chuyên sản xuất các loại trống tường học,trống đội, trống chùa, thùng rượu gỗ sồi, thùng gỗ trang trí, chậu gỗ ngâm chân, bồn tắm gỗ.. và các sản phẩm liên quan uy tín, chất lượng.</span>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="mt-5 mb-2">
            <div className="title ml-3 mb-2">ĐỨC HÒA SHOP</div>
            <div className="info ml-3">
              <p>
              <span>
                <strong>1.Xưởng sản xuất</strong>
              </span>
              </p>
              <p>
              <span>
                <strong>Địa chỉ:</strong>Thôn Đọi Tam, Đọi Sơn, Duy Tiên, Hà Nam.
              </span>
              </p>
              <p><span>
                <strong>Hoiline:</strong> 123456789
              </span>
              </p>
              <p>
              <span>
                <strong>2.Cơ sở 1</strong>
              </span>
              </p>
              <p>
              <span>
                <strong>Địa chỉ:</strong> Thôn Đọi Tam, Đọi Sơn, Duy Tiên, Hà Nam.
              </span>
              </p>
              <p>
              <span>
                <strong>Hoiline:</strong> 123456789
              </span>
              </p>
              <p>
              <span>
                <strong>3.Cơ sở 2</strong>
              </span>
              </p>
              <p>
              <span>
                <strong>Địa chỉ:</strong> Thôn Đọi Tam, Đọi Sơn, Duy Tiên, Hà Nam.
              </span>
              </p>
              <p>
              <span>
                <strong>Hoiline:</strong> 123456789
              </span>
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">

        </div>
      </div>
    </div>
  </div>
);

export default Footer;
