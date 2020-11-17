import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons'

export type IHomeProp = StateProps;

export const HomContent=(props)=>{
  return (
    <div>

    </div>
  )
}


export const Home = (props: IHomeProp) => {
  const { account } = props;

  return (
    <div className=" home-content d-flex justify-content-center">
      <div className="home-container col-10 mt-5">
        <section className="panel1-products">
          {/*Danh mục sản phẩm*/}
          <header className="panel1-header d-flex align-items-center justify-content-between">
            <h2>ĐỒ GỖ NỘI THẤT 1</h2>
            <Link to="/do-go-noi-that1" className="d-flex align-items-center">
              Xem tất cả
              <FontAwesomeIcon icon={faAngleDoubleRight}/>
            </Link>
          </header>
          <hr/>
        </section>

      </div>
    </div>
  );
};
const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
