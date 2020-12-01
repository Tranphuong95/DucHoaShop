import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './productdetail.reducer';
import { IProductdetail } from 'app/shared/model/productdetail.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductdetailDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductdetailDetail = (props: IProductdetailDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { productdetailEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ducHoaShopApp.productdetail.detail.title">Productdetail</Translate> [<b>{productdetailEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="productshopcart">
              <Translate contentKey="ducHoaShopApp.productdetail.productshopcart">Productshopcart</Translate>
            </span>
          </dt>
          <dd>{productdetailEntity.productshopcart}</dd>
        </dl>
        <Button tag={Link} to="/productdetail" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/productdetail/${productdetailEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ productdetail }: IRootState) => ({
  productdetailEntity: productdetail.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductdetailDetail);
