import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './productdetail.reducer';
import { IProductdetail } from 'app/shared/model/productdetail.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductdetailUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductdetailUpdate = (props: IProductdetailUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { productdetailEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/productdetail');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...productdetailEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ducHoaShopApp.productdetail.home.createOrEditLabel">
            <Translate contentKey="ducHoaShopApp.productdetail.home.createOrEditLabel">Create or edit a Productdetail</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : productdetailEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="productdetail-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="productdetail-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="productshopcartLabel" for="productdetail-productshopcart">
                  <Translate contentKey="ducHoaShopApp.productdetail.productshopcart">Productshopcart</Translate>
                </Label>
                <AvField id="productdetail-productshopcart" type="text" name="productshopcart" />
              </AvGroup>
              {/*<AvGroup className="d-flex">*/}
              {/*  <AvField type="text" className="input-title" name="inputTitle" required/>*/}
              {/*  <AvField type="text" className="input-info" name="inputInformation"/>*/}
              {/*</AvGroup>*/}
              <Button tag={Link} id="cancel-save" to="/productdetail" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  // <div>
  //   <div>
  //     {loading ? (
  //       <p>Loading...</p>
  //     ) : (
  //       <AvForm onSubmit={saveEntity}>
  //         <AvGroup>
  //           <AvField id="product-input-title" type="text" name="inputTitle" />
  //         </AvGroup>
  //         {/*<AvGroup>*/}
  //         {/*  <AvField id="product-input-information" type="text" name="inputInformation" />*/}
  //         {/*</AvGroup>*/}
  //         <Button color="primary" id="save-entity" type="submit" disabled={updating}>
  //           <Translate contentKey="entity.action.save">Save</Translate>
  //         </Button>
  //       </AvForm>
  //     )}
  //   </div>
  // </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  productdetailEntity: storeState.productdetail.entity,
  loading: storeState.productdetail.loading,
  updating: storeState.productdetail.updating,
  updateSuccess: storeState.productdetail.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductdetailUpdate);
