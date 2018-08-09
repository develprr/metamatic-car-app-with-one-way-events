import {dispatch, handle, unhandle} from 'metamatic'
import axios from 'axios';
import {CAR_DATA_URL} from '../constants';
import {CarModelService} from '../service/CarModelService';

export const CAR_LIST_CHANGE = 'CAR_LIST_CHANGE';
export const CAR_ENTRY_CHANGE = 'CAR_ENTRY_CHANGE';
export const LOAD_CAR_DATA_ERROR = 'LOAD_CAR_DATA_ERROR';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const LOGIN_STATE_CHANGE = 'LOGIN_STATE_CHANGE';
export const CAR_MODEL_SELECTION_CHANGE = 'CAR_MODEL_SELECTION_CHANGE';

const metaStore = {
  carData: null,
  cars: null,
  loggedIn: false,
  lastCarModel: null,
  activeCarModel: null,
  carModelFilter: ''
};

export const filterCarModels = (filter) => {
  metaStore.carModelFilter = filter;
  const filteredModels = CarModelService.filterByModel(metaStore.cars, filter);
  dispatch(CAR_LIST_CHANGE, filteredModels);
}

export const selectCarModel = (carModelId) => {
  metaStore.activeCarModel = carModelId;
  dispatch(CAR_MODEL_SELECTION_CHANGE, metaStore.activeCarModel);
};

export const navigateBack = () => {
  metaStore.lastCarModel = metaStore.activeCarModel;
  metaStore.activeCarModel = null;
  dispatch(CAR_MODEL_SELECTION_CHANGE, null);
};

export const logout = () => {
  metaStore.loggedIn = false;
  dispatch(LOGIN_STATE_CHANGE, metaStore.loggedIn);
};

export const requestCarList = () => {
  axios.get(`${CAR_DATA_URL}`).then(response => {
    metaStore.cars = response.data;
    dispatch(CAR_LIST_CHANGE, {...metaStore.cars})
  }).catch(error => dispatch(LOAD_CAR_DATA_ERROR, error));
};

export const requestCarEntry = () => {
  if (metaStore.carData) {
    return dispatch(CAR_ENTRY_CHANGE, metaStore.carData)
  }
  axios.get(`${CAR_DATA_URL}/${metaStore.activeCarModel}`)
  .then(response => {
    metaStore.carDetails = response.data;
    dispatch(CAR_ENTRY_CHANGE, {...metaStore.carDetails});
  }).catch(error => dispatch(LOAD_CAR_DATA_ERROR, error));
};

export const submitLogin = (credentials) => {
  metaStore.loggedIn = true;
  dispatch(LOGIN_STATE_CHANGE, metaStore.loggedIn);
};




