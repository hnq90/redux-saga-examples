import { call, fork, take } from 'redux-saga/effects';

function* takexSaga(pattern) {
  let action;
  while (true) {
    action = yield take('*');
    console.log('takex', action.type);
    if (pattern.test(action.type)) {
      console.log('takex:match', action.type);
      break;
    }
    console.log('takex:ignore', action.type);
  }
  return action;
}

function takex(pattern) {
  return call(takexSaga, pattern);
}

function* handleActions() {
  while (true) {
    const action = yield takex(/^FETCH_/);
    console.log('handle', action.type);
  }
}

export default function* rootSaga() {
  yield fork(handleActions);
}
