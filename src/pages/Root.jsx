import React, { Component} from 'react';
import { Provider } from 'react-redux';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import createStore from '../store/createStore';
import reducer, { key } from './rootReducer';

/*
https://github.com/TongchengQiu/react-redux-dynamic-injection
https://qiutc.me/post/react-redux-dynamic-injection.html
1. Root 根组件
首先是创建了一个 Redux 的 store ，这里的 `createStore` 函数并没有用 Redux 中原生提供的，而是重新封装了一层来改造它；

它接收两个参数，第一个是初始化的状态数据，第二个是初始化的 reducer，这里传入的是一个名称为 `key` 的 reducer ，

这里的 `key` 和 `reducer` 是在 `./src/pages/rootReducer.js` 中定义的，它用来存储一些通用和全局的状态数据和处理函数的；

`lazyLoader` 函数是用来异步加载组件的，也就是通过不同的 route 来分割代码做按需加载，具体可参考  (code-splitting) ；

他的用法就是在 `Route` 组件中传入的 `component` 使用 `lazyLoader(() => import('./List'))` 的方式来导入；

接下来就是定义了一个 `Root` 组件并暴露，其中 `Provider` 是用来连接 Redux store 和 React 组件，这里需要传入 `store` 对象。
*/


export const store  = createStore({} , {
  [key]: reducer
});

const lazyLoader = (importComponent) => (
  class AsyncComponent extends Component {
    state = { C: null }

    async componentDidMount () {
      const { default: C } = await importComponent();
      this.setState({ C });
    }

    render () {
      const { C } = this.state;
      return C ? <C {...this.props} /> : null;
    }
  }
);

export default class Root extends Component {
  render () {
    return (
      <div className='root__container'>
        <Provider store={store}>
          <Router>
            <div className='root__content'>
              <Link to='/'>Home</Link>
              <br />
              <Link to='/list'>List</Link>
              <br />
              <Link to='/detail'>Detail</Link>
              <Switch>
                <Route exact path='/'
                  component={lazyLoader(() => import('./Home'))}
                />
                <Route path='/list'
                  component={lazyLoader(() => import('./List'))}
                />
                <Route path='/detail'
                  component={lazyLoader(() => import('./Detail'))}
                />
              </Switch>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}
