# rx-immer-react

rx-immer-react包含自定义hooks方便在React项目中更加便捷地使用rx-immer。

- [创建实例并挂载到组件](#创建实例并挂载到组件)
- [创建实例上下文](#创建实例上下文)
- [将状态绑定到组件](#将状态绑定到组件)
  - [双向绑定](#双向绑定)
- [扩展功能](#扩展功能)
  - [操作记录栈](#操作记录栈)

## 创建实例并挂载到组件

```javascript
const store = useRxImmer({});
```

内部使用了*useRef*来创建并挂载实例，并且在React组件卸载时自动调用实例的`destroy`方法。

在TypeScript中，`useRxImmer<T>`作为泛型函数，能够显式地指定类型，指示状态值的类型信息。
并且，`useRxImmer`接受第一个参数，作为状态的初始值，可选地接受第二个参数*config*，作为实例创建的配置项。

```typescript
import { useRxImmer } from 'rx-immer-react';

interface IState {
  id: number;
  name: string;
  status: boolean;
}

// 在React组件中...

const store = useRxImmer<IState>(
    { id: 0, name: 'abc', status: true }, // 初始状态
    { history: { capacity: 1000 } }, // 配置项
  );
```

配置项详情参见rx-immer文档。

## 创建实例上下文

```javascript
// 创建上下文

import { createRxImmerContext } from 'rx-immer-react';

export const RxImmerContext = createRxImmerContext({}, { /* 配置项 */ });

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

*注意：useBind等注入到实例方法中的自定义hooks会通过Mixin模式依据配置动态注入，注入过程发生在useRxImmer中。因此，只有通过useRxImmer创建的实例会自动含有内联的自定义hooks，如果通过其他方式创建，则需要手动注入hooks：*

```javascript
import { injectHooks } from 'rx-immer-react';

// 不通过useRxImmer创建实例store...

const storeWithHooks = injectHooks(store);
```

## 扩展功能

rx-immer-react为rx-immer的扩展功能编写了一些便捷方法。

### 操作记录栈

在*React*中，可以利用扩展功能附带的自定义hooks将操作记录栈状态信息绑定到组件state中：

```javascript
const [undos, redos] = store.useRoamStatus?.() ?? [0, 0];
```

*同样的，useRoamStatus这个内联到实例内部的自定义hooks是在useRxImmer中动态注入到实例方法中的，只有通过useRxImmer创建的实例会依据配置项中是否开启相关扩展功能可选地包含自定义hooks。*
