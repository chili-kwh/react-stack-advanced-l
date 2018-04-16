import { createReducer } from '../store/reducerUtils';

/*
4. 定义 ACTION 与 REDUCER
这一步其实比较简单，主要是结合 redux-thunk 的异步操作做了一个模拟 auth 验证的函数；

首先是定义了这个 reducer 对应的 state 在根节点中的 key ;
然后定义了 actions ；
之后定义了操作函数 auth ，其实就是触发一个 ROOT_AUTH 的 action；
之后定义 actions 对应的处理函数，存储在 ACTION_HANLDERS 对象中；
最后通过 createReducer 函数生成一个 reducer 并暴露出去；

对于在业务组件中需要动态注入的 reducer 的定义也是按照这套模式，具体可以观察每个业务组件中的 reducer.js 文件；
*/

export const key = 'root';

export const ROOT_AUTH = `${key}/ROOT_AUTH`;

export const auth = () => (
  (dispatch, getState) => (
    new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type: ROOT_AUTH,
          payload: true
        });
        resolve();
      }, 300);
    })
  )
);

export const actions = {
  auth
};

const ACTION_HANLDERS = {
  [ROOT_AUTH]: (state, action) => ({
    ...state,
    auth: action.payload
  })
};

const initalState = {
  auth: false
};

export default createReducer(initalState, ACTION_HANLDERS);
