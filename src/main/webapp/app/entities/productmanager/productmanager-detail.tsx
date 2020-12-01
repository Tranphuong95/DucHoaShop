import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './productmanager.reducer';
import { IProductmanager } from 'app/shared/model/productmanager.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductmanagerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductmanagerDetail = (props: IProductmanagerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { productmanagerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ducHoaShopApp.productmanager.detail.title">Productmanager</Translate> [<b>{productmanagerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="inputTitle">
              <Translate contentKey="ducHoaShopApp.productmanager.inputTitle">Input Title</Translate>
            </span>
          </dt>
          <dd>{productmanagerEntity.inputTitle}</dd>
          <dt>
            <span id="inputInformation">
              <Translate contentKey="ducHoaShopApp.productmanager.inputInformation">Input Information</Translate>
            </span>
          </dt>
          <dd>{productmanagerEntity.inputInformation}</dd>
        </dl>
        <Button tag={Link} to="/productmanager" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/productmanager/${productmanagerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ productmanager }: IRootState) => ({
  productmanagerEntity: productmanager.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductmanagerDetail);
