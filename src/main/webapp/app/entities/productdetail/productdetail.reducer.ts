import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProductdetail, defaultValue } from 'app/shared/model/productdetail.model';

export const ACTION_TYPES = {
  SEARCH_PRODUCTDETAILS: 'productdetail/SEARCH_PRODUCTDETAILS',
  FETCH_PRODUCTDETAIL_LIST: 'productdetail/FETCH_PRODUCTDETAIL_LIST',
  FETCH_PRODUCTDETAIL: 'productdetail/FETCH_PRODUCTDETAIL',
  CREATE_PRODUCTDETAIL: 'productdetail/CREATE_PRODUCTDETAIL',
  UPDATE_PRODUCTDETAIL: 'productdetail/UPDATE_PRODUCTDETAIL',
  DELETE_PRODUCTDETAIL: 'productdetail/DELETE_PRODUCTDETAIL',
  RESET: 'productdetail/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProductdetail>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProductdetailState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductdetailState = initialState, action): ProductdetailState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PRODUCTDETAILS):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTDETAIL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTDETAIL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCTDETAIL):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCTDETAIL):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCTDETAIL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_PRODUCTDETAILS):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTDETAIL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTDETAIL):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCTDETAIL):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCTDETAIL):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCTDETAIL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PRODUCTDETAILS):
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTDETAIL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTDETAIL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCTDETAIL):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCTDETAIL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCTDETAIL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/productdetails';
const apiSearchUrl = 'api/_search/productdetails';

// Actions

export const getSearchEntities: ICrudSearchAction<IProductdetail> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PRODUCTDETAILS,
  payload: axios.get<IProductdetail>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IProductdetail> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRODUCTDETAIL_LIST,
  payload: axios.get<IProductdetail>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IProductdetail> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCTDETAIL,
    payload: axios.get<IProductdetail>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProductdetail> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCTDETAIL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProductdetail> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCTDETAIL,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProductdetail> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUCTDETAIL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
