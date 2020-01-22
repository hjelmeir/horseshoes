import test from 'ava';
import { createAlert } from '../controllers/alertController';
import { ALERT, Alert, AlertAction, defaultAlert } from '../models/alert';
import { Resources } from '../models/resource';
import {
  createResource,
  defaultResources,
  initResources,
  upsertResource
} from './resourceHelper';

const alert1: Alert = {
  key: 'alert1',
  status: 'error',
  message: 'alert 1 message'
};
const alert2: Alert = {
  ...defaultAlert,
  key: 'alert2',
  status: 'error',
  message: 'alert 2 message'
};
const alert1Action: AlertAction = { type: ALERT.CREATE, payload: alert1 };
const alert2Action: AlertAction = { type: ALERT.CREATE, payload: alert2 };

const state0: Resources<Alert> = initResources<Alert>();
const state1: Resources<Alert> = {
  ...state0,
  keys: ['alert1'],
  data: { alert1 }
};
const state2: Resources<Alert> = {
  ...state0,
  keys: ['alert1', 'alert2'],
  data: { alert1, alert2 }
};
const state3: Resources<Alert> = {
  ...state0,
  keys: ['alert1', 'alert2'],
  data: {
    alert1,
    alert2: {
      ...alert2,
      status: 'success'
    }
  }
};

test('initResources sets default state', t => {
  t.deepEqual(state0, defaultResources);
});

test('createAlert returns expected action', t => {
  t.deepEqual(createAlert(alert1), alert1Action);
  t.deepEqual(createAlert(alert2), alert2Action);
});

test('createResource updates state', t => {
  t.deepEqual(state1, createResource(state0, alert1));
  t.deepEqual(state2, createResource(state1, alert2));
  t.deepEqual(
    state2,
    createResource(
      state1,
      { key: 'alert2', status: 'error', message: 'alert 2 message' },
      defaultAlert
    )
  );
});

test('createResource errs if key exists', t => {
  const nextState = {
    ...state1,
    error: true,
    errorTrace: {
      createResourceExists: 'Key already exists in state, key: alert1'
    }
  };

  t.deepEqual(nextState, createResource(state1, alert1, defaultAlert));
});

test('updateResource', t => {
  t.deepEqual(state3, upsertResource(state2, { ...alert2, status: 'success' }));

  t.deepEqual(
    state3,
    upsertResource(state2, { ...alert2, status: 'success' }, defaultAlert)
  );
});
