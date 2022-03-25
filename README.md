# rx-immer-react

rx-immer-react包含自定义hooks方便在React项目中更加便捷地使用rx-immer。

- [创建实例并挂载到组件](#创建实例并挂载到组件)
- [创建实例上下文](#创建实例上下文)
- [将状态绑定到组件](#将状态绑定到组件)
  - [双向绑定](#双向绑定)

## 创建实例并挂载到组件

```javascript
const store = useRxImmer({});
```

内部使用了*useRef*来创建并挂载实例，并且在React组件卸载时自动调用实例的`destroy`方法。

在TypeScript中，`useRxImmer<T>`作为泛型函数，能够显式地指定类型，指示状态值的类型信息。
并且，`useRxImmer`接受第一个参数，作为状态的初始值，可选地接受第二个参数*plugins*，作为实例创建的插件列表。

```typescript
import { useRxImmer } from 'rx-immer-react';

interface IState {
  id: number;
  name: string;
  status: boolean;
}

// 在React组件中...

const store = useRxImmer<IState, HistoryPluginExt & HistoryHooksPluginExt /* 插件扩展的interface */ >(
    { id: 0, name: 'abc', status: true }, // 初始状态
    [ historyPlugin(), historyHooksPlugin ], // 插件列表
  );
```

配置项详情参见rx-immer文档。

## 创建实例上下文

```javascript
// 创建上下文

import { createRxImmerContext } from 'rx-immer-react';

export const RxImmerContext = createRxImmerContext({});

// Provider包裹

import { RxImmerContext } from '...'; 

// JSX

<RxImmerContext.Provider>
  {...子组件}
</RxImmerContext.Provider>

// 在组件中使用

import { useContext } from 'react';
import { RxImmerContext } from '...';

// 在React组件中...

const store = useContext(RxImmerContext);
```

*创建上下文的第二个参数接受一个函数，如采用function(){}的方式（而非箭头函数）书写该方法，可在this中取到上下文创建的实例，也可采用箭头函数写法从第一个参数种取到上下文创建的实例，对实例做一些初始化工作。该函数的返回值会存于Context对象中的Handler字段中，可以返回一些操作函数以自定义对实例的操作。*

## 将状态绑定到组件

```javascript
const state = store.useBind();
const c = store.useBind('a[0].b.c');
```

内部使用*useState*将rx-immer实例状态与组件状态相绑定，当实例state发生改变，相关的所有组件将重新渲染（且只有改动影响到的组件会发生重新渲染）。组件卸载后，绑定的监听将会自动解除。

同样，在TypeScript中，`useBind<T>`作为实例的泛型方法，能够显式地指定类型，指示监听目标的类型信息。

```typescript
const c = store.useBind<number>('a[0].b.c');
// TypeScript编译器此时能知道c的类型为number
```

### 双向绑定

使用`useTwoWayBind`将状态与组件双向绑定：

```javascript
const [state, setState] = store.useTwoWayBind('a[0].b.c');

setState(11); // 修改'a[0].b.c'的值
```

*注意：useBind等注入到实例方法中的自定义hooks是rx-immer-react包中预置插件的功能，使用rx-immer-react包中的create创建实例默认加载预置插件*

```javascript
import { create } from 'rx-immer-react';
```
