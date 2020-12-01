import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './model.reducer';
import { IModel } from 'app/shared/model/model.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IModelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ModelDetail = (props: IModelDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { modelEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="ducHoaShopApp.model.detail.title">Model</Translate> [<b>{modelEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="modal">
              <Translate contentKey="ducHoaShopApp.model.modal">Modal</Translate>
            </span>
          </dt>
          <dd>{modelEntity.modal}</dd>
        </dl>
        <Button tag={Link} to="/model" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/model/${modelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ model }: IRootState) => ({
  modelEntity: model.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ModelDetail);
