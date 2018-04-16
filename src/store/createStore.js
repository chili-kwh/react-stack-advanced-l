import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { makeAllReducer } from './reducerUtils';

/*
2. 创建 STORE
首先在暴露出的 createStore 函数中，先是定义了 Redux 中我们需要的一些 middlewares 和 enhancers ：
redux-thunk 是用来在 Redux 中更好的处理异步操作的；
devToolsExtension 是在开发环境下可以在 chrome 的 redux devtool 中观察数据变化；

之后就是生成了 store ，其中传入的 reducer 是由 makeAllReducer 函数生成的；最后返回 store ，

在这之前给 store 增加了一个 asyncReducers 的属性对象，它的作用就是用来缓存旧的 reducers
 然后与新的 reducer 合并，其具体的操作是在 injectReducer 中；
*/

export default (initialState = {}, initialReducer = {}) => {
  const middlewares = [thunk];

  const enhancers = [];

  if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const store = createStore(
    makeAllReducer(initialReducer),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancers
    )
  );

  store.asyncReducers = {
    ...initialReducer
  };

  return store;
}
