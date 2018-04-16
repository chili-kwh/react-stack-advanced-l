import { injectReducer } from '../../store/reducerUtils';
import { store } from '../Root';
import Home from './index.jsx';
import reducer, { key } from './reducer';

/*
5. 动态注入 REDUCER

在前面，我们生成了一个 store 并赋予其初始化的 state 和 reducer ，
当我们加载到某一块业务组件的时候，则需要动态注入该组件对应的一些 state 和 reducer。

以 Home 组件为示例，当加载到该组件的时候，首先执行 index.js 文件：

首先是在 store 中插入其业务模块对于的 reducer： injectReducer(store, { key, reducer }) ，
之后直接暴露该组件；
因此在该组件初始化之前，在 store 中就注入了其对应的 state 和 reducer；

而在 index.jsx 中对于 Redux 的使用和其标准的用法并无区别

*/

injectReducer(store, { key, reducer });

export default Home;
