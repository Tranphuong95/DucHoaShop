import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './productdetail.reducer';
import { IProductdetail } from 'app/shared/model/productdetail.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductdetailProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Productdetail = (props: IProductdetailProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.getEntities();
  }, []);

  const startSearching = () => {
    if (search) {
      props.getSearchEntities(search);
    }
  };

  const clear = () => {
    setSearch('');
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const { productdetailList, match, loading } = props;
  return (
    <div>
      <h2 id="productdetail-heading">
        <Translate contentKey="ducHoaShopApp.productdetail.home.title">Productdetails</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="ducHoaShopApp.productdetail.home.createLabel">Create new Productdetail</Translate>
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder={translate('ducHoaShopApp.productdetail.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        {productdetailList && productdetailList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="ducHoaShopApp.productdetail.productshopcart">Productshopcart</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productdetailList.map((productdetail, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${productdetail.id}`} color="link" size="sm">
                      {productdetail.id}
                    </Button>
                  </td>
                  <td>{productdetail.productshopcart}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${productdetail.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productdetail.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productdetail.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="ducHoaShopApp.productdetail.home.notFound">No Productdetails found</Translate>
            </div>
          )
        )}
      </div>
    </div>
    // <div className="d-flex justify-content-center">
    //   <h2 id="productdetail-heading">
    //     <Translate contentKey="ducHoaShopApp.productdetail.home.title">Productdetails</Translate>
    //     <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
    //       <FontAwesomeIcon icon="plus" />
    //       &nbsp;
    //       <Translate contentKey="ducHoaShopApp.productdetail.home.createLabel">Create new Productdetail</Translate>
    //     </Link>
    //   </h2>
    //   <Row>
    //     <Col sm="12">
    //       <AvForm onSubmit={startSearching}>
    //         <AvGroup>
    //           <InputGroup>
    //             <AvInput
    //               type="text"
    //               name="search"
    //               value={search}
    //               onChange={handleSearch}
    //               placeholder={translate('ducHoaShopApp.model.home.search')}
    //             />
    //             <Button className="input-group-addon">
    //               <FontAwesomeIcon icon="search" />
    //             </Button>
    //             <Button type="reset" className="input-group-addon" onClick={clear}>
    //               <FontAwesomeIcon icon="trash" />
    //             </Button>
    //           </InputGroup>
    //         </AvGroup>
    //       </AvForm>
    //     </Col>
    //   </Row>
    //   <div>
    //     {productdetailList && productdetailList.length > 0 ? (
    //     <table>
    //       <thead>
    //
    //       </thead>
    //       <tbody>
    //       {productdetailList.map((productdetail, i) => (
    //         <tr key={`entity-${i}`}>
    //           <td>{productdetail.id}</td>
    //           <th><strong>{productdetail.productshopcart}</strong></th>
    //           {/*<td>{productdetail.inputInformation}</td>*/}
    //           <td className="text-right">
    //             <div className="btn-group flex-btn-group-container">
    //               <Button tag={Link} to={`${match.url}/${productdetail.id}`} color="info" size="sm">
    //                 <FontAwesomeIcon icon="eye" />{' '}
    //                 <span className="d-none d-md-inline">
    //                   <Translate contentKey="entity.action.view">View</Translate>
    //                 </span>
    //               </Button>
    //               <Button tag={Link} to={`${match.url}/${productdetail.id}/edit`} color="primary" size="sm">
    //                 <FontAwesomeIcon icon="pencil-alt" />{' '}
    //                 <span className="d-none d-md-inline">
    //                   <Translate contentKey="entity.action.edit">Edit</Translate>
    //                 </span>
    //               </Button>
    //               <Button tag={Link} to={`${match.url}/${productdetail.id}/delete`} color="danger" size="sm">
    //                 <FontAwesomeIcon icon="trash" />{' '}
    //                 <span className="d-none d-md-inline">
    //                   <Translate contentKey="entity.action.delete">Delete</Translate>
    //                 </span>
    //               </Button>
    //             </div>
    //           </td>
    //         </tr>
    //         ))};
    //     {/*    <tr>*/}
    //     {/*  <th rowSpan={2}><strong>KÍCH THƯỚC</strong></th>*/}
    //     {/*  <td>+ Mặt thùng: 30 cm</td>*/}
    //     {/*</tr>*/}
    //     {/*    <tr>*/}
    //     {/*  <td>+Thân thùng: 40 cm</td>*/}
    //     {/*</tr>*/}
    //     {/*    <tr>*/}
    //     {/*  <th><strong>PHỤ KIỆN</strong></th>*/}
    //     {/*  <td>01 Chân thùng (chưa có vòi triết rượu)</td>*/}
    //     {/*</tr>*/}
    //     {/*    <tr>*/}
    //     {/*  <th><strong>CHẤT LIỆU</strong></th>*/}
    //     {/*  <td>Gỗ sồi nhập khẩu</td>*/}
    //     {/*</tr>*/}
    //     {/*    <tr>*/}
    //     {/*  <th><strong>BẢO HÀNH</strong></th>*/}
    //     {/*  <td>12 tháng (lỗi nhà sản xuất)</td>*/}
    //     {/*</tr>*/}
    //     {/*    <tr>*/}
    //     {/*  <th><strong>ĐỊA CHỈ</strong></th>*/}
    //     {/*  <td></td>*/}
    //     {/*</tr>*/}
    //     {/*    <tr>*/}
    //     {/*  <th><strong>PHỤ KIỆN</strong></th>*/}
    //     {/*  <td>01 Chân thùng (chưa có vòi triết rượu)</td>*/}
    //     {/*</tr>*/}
    //     {/*    <tr>*/}
    //     {/*  <td>- Hà Nội</td>*/}
    //     {/*  <td>Số 63/96 phố Đại Từ - Hoàng Mai</td>*/}
    //     {/*</tr>*/}
    //     {/*    <tr>*/}
    //     {/*  <td>- TPHCM</td>*/}
    //     {/*  <td>Số 250 Lê Văn Khương - P. Thới An - Q.12</td>*/}
    //     {/*</tr>*/}
    //     {/*    <tr>*/}
    //     {/*  <td> - Xưởng SX</td>*/}
    //     {/*  <td>Làng nghề Đọi Tam, Duy Tiên, Hà Nam</td>*/}
    //     {/*</tr>*/}
    //     {/*    <tr>*/}
    //     {/*  <th><strong>Hotline</strong></th>*/}
    //     {/*  <td>0327.247.999</td>*/}
    //     {/*</tr>*/}
    //       </tbody>
    //   </table>
    //       ): (
    //       !loading && (
    //         <div className="alert alert-warning">
    //           <Translate contentKey="ducHoaShopApp.model.home.notFound">No Models found</Translate>
    //         </div>
    //       )
    //     )}
    //   </div>
    //
    // </div>
  )
};

const mapStateToProps = ({ productdetail }: IRootState) => ({
  productdetailList: productdetail.entities,
  loading: productdetail.loading,
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Productdetail);
