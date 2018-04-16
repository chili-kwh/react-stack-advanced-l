import { combineReducers } from 'redux';


/*
3. 生成 REDUCER

在初始化创建 store 的时候，其中的 reducer 是由 makeAllReducer 函数来生成的，
这里接收一个 asyncReducers 参数，它是一个包含 key 和 reducer 函数的对象；

injectReducer 函数是用来在 store 中动态注入 reducer 的，首先判断当前 store 中的 asyncReducers 是否存在该 reducer ，
如果存在则不需要做处理，而这里的 asyncReducers 则是存储当前已有的 reducers ；
如果需要新增 reducer ，则在 asyncReducers 对象中加入新增的 reducer ，
然后通过 makeAllReducer 函数返回原有的 reducer 和新的 reducer 的合并，并通过 store.replaceReducer 函数替换 store 中的 reducer。

createReducer 函数则是用来生成一个新的 reducer 。
*/

export const makeAllReducer = (asyncReducers) => combineReducers({
  ...asyncReducers
});

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeAllReducer(store.asyncReducers));
}

export const createReducer = (initialState, ACTION_HANDLES) => (
  (state = initialState, action) => {
    const handler = ACTION_HANDLES[action.type];
    return handler ? handler(state, action) : state;
  }
);
