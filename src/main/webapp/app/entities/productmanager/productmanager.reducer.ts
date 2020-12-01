import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProductmanager, defaultValue } from 'app/shared/model/productmanager.model';

export const ACTION_TYPES = {
  SEARCH_PRODUCTMANAGERS: 'productmanager/SEARCH_PRODUCTMANAGERS',
  FETCH_PRODUCTMANAGER_LIST: 'productmanager/FETCH_PRODUCTMANAGER_LIST',
  FETCH_PRODUCTMANAGER: 'productmanager/FETCH_PRODUCTMANAGER',
  CREATE_PRODUCTMANAGER: 'productmanager/CREATE_PRODUCTMANAGER',
  UPDATE_PRODUCTMANAGER: 'productmanager/UPDATE_PRODUCTMANAGER',
  DELETE_PRODUCTMANAGER: 'productmanager/DELETE_PRODUCTMANAGER',
  RESET: 'productmanager/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProductmanager>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProductmanagerState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductmanagerState = initialState, action): ProductmanagerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_PRODUCTMANAGERS):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTMANAGER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCTMANAGER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCTMANAGER):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCTMANAGER):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCTMANAGER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_PRODUCTMANAGERS):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTMANAGER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCTMANAGER):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCTMANAGER):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCTMANAGER):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCTMANAGER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_PRODUCTMANAGERS):
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTMANAGER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCTMANAGER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCTMANAGER):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCTMANAGER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCTMANAGER):
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

const apiUrl = 'api/productmanagers';
const apiSearchUrl = 'api/_search/productmanagers';

// Actions

export const getSearchEntities: ICrudSearchAction<IProductmanager> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_PRODUCTMANAGERS,
  payload: axios.get<IProductmanager>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IProductmanager> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRODUCTMANAGER_LIST,
  payload: axios.get<IProductmanager>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IProductmanager> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCTMANAGER,
    payload: axios.get<IProductmanager>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IProductmanager> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCTMANAGER,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProductmanager> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCTMANAGER,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProductmanager> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUCTMANAGER,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
