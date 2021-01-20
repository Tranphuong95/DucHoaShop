import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './productmanager.reducer';
import { IProductmanager } from 'app/shared/model/productmanager.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

import {v4 as uuidv4} from "uuid";

export interface IProductmanagerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductmanagerUpdate = (props: IProductmanagerUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { productmanagerEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/productmanager');
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
  const [inputFields, setInputFields]=useState([{id: uuidv4(),inputTitle:'', inputInformation:''}]);

  const onHandleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })

    setInputFields(newInputFields);
  }

  const onHandleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(),  inputTitle: '', inputInformation: '' }])
  }

  const onHandleRemoveFields = id => {
    const valuesInput  = [...inputFields];
    valuesInput.splice(valuesInput.findIndex(valueInput => valueInput.id === id), 1);
    setInputFields(valuesInput);
  }

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...productmanagerEntity,
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
          <h2 id="ducHoaShopApp.productmanager.home.createOrEditLabel">
            <Translate contentKey="ducHoaShopApp.productmanager.home.createOrEditLabel">Create or edit a Productmanager</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            // <AvForm model={isNew ? {} : productmanagerEntity} onSubmit={saveEntity}>
            //   {!isNew ? (
            //     <AvGroup>
            //       <Label for="productmanager-id">
            //         <Translate contentKey="global.field.id">ID</Translate>
            //       </Label>
            //       <AvInput id="productmanager-id" type="text" className="form-control" name="id" required readOnly />
            //     </AvGroup>
            //   ) : null}
            //   <AvGroup>
            //     <Label id="inputTitleLabel" for="productmanager-inputTitle">
            //       <Translate contentKey="ducHoaShopApp.productmanager.inputTitle">Input Title</Translate>
            //     </Label>
            //     <AvField id="productmanager-inputTitle" type="text" name="inputTitle" />
            //   </AvGroup>
            //   <AvGroup>
            //     <Label id="inputInformationLabel" for="productmanager-inputInformation">
            //       <Translate contentKey="ducHoaShopApp.productmanager.inputInformation">Input Information</Translate>
            //     </Label>
            //     <AvField id="productmanager-inputInformation" type="text" name="inputInformation" />
            //   </AvGroup>
            //   <Button tag={Link} id="cancel-save" to="/productmanager" replace color="info">
            //     <FontAwesomeIcon icon="arrow-left" />
            //     &nbsp;
            //     <span className="d-none d-md-inline">
            //       <Translate contentKey="entity.action.back">Back</Translate>
            //     </span>
            //   </Button>
            //   &nbsp;
            //   <Button color="primary" id="save-entity" type="submit" disabled={updating}>
            //     <FontAwesomeIcon icon="save" />
            //     &nbsp;
            //     <Translate contentKey="entity.action.save">Save</Translate>
            //   </Button>
            // </AvForm>
            <AvForm model={isNew ? {} : productmanagerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="productmanager-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="productmanager-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              { inputFields.map(inputField => (
                <div key={inputField.id} className="d-flex">
                  <AvGroup>
                    <Label id="inputTitleLabel" for="productmanager-inputTitle">
                      <Translate contentKey="ducHoaShopApp.productmanager.inputTitle">Input Title</Translate>
                    </Label>
                    <AvField id="productmanager-inputTitle" type="text" name="inputTitle"  onChange={event=>onHandleChangeInput(inputField.id, event)}/>
                  </AvGroup>
                  <AvGroup>
                    <Label id="inputInformationLabel" for="productmanager-inputInformation">
                      <Translate contentKey="ducHoaShopApp.productmanager.inputInformation">Input Information</Translate>
                    </Label>
                    <AvField id="productmanager-inputInformation" type="text" name="inputInformation" onChange={event=>onHandleChangeInput(inputField.id, event)} />
                  </AvGroup>
                  <Button onClick={onHandleAddFields} color="primary">Thêm</Button>
                  <Button onClick={()=>onHandleRemoveFields(inputField.id)} disabled={inputFields.length === 1} color="danger">Xóa</Button>
                </div>
              ))}
              <Button tag={Link} id="cancel-save" to="/productmanager" replace color="info">
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
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  productmanagerEntity: storeState.productmanager.entity,
  loading: storeState.productmanager.loading,
  updating: storeState.productmanager.updating,
  updateSuccess: storeState.productmanager.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductmanagerUpdate);
