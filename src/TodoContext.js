import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 1,
    text: '프로젝트 생성하기',
    done: true
  },
  {
    id: 2,
    text: '컴포넌트 스타일링하기',
    done: true
  },
  {
    id: 3,
    text: 'Context 만들기',
    done: false
  },
  {
    id: 4,
    text: '기능 구현하기',
    done: false
  }
];

// TodoProvider component: useReducer를 사용하여 상태를 관리.
function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE':
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case 'REMOVE':
      return state.filter((todo) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// 하나의 Context 를 만들어서 state 와 dispatch 를 함께 넣어주는 대신에, 두개의 Context를 만들어서 따로 따로 넣어준다.
// (state와 dispatch를 Context를 통하여 다른 component에서 바로 사용 할 수 있게 한다.)
// 이렇게 하면 dispatch만 필요한 컴포넌트에서 불필요한 렌더링을 방지 할 수 있다. (사용하게 되는 과정에서 더욱 편리하기도 하다.)
const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

// children Props :  APP component에서 component들을 TodoProvider를 통해 감싸주기 때문에 그 안에 있는 컴포넌트들이 적용되기위해서는 children props를 넣어주어야 감싸진 component들이 적용된다.
export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  // Context 에서 사용 할 값을 지정 할 때에는 위와 같이 Provider component를 렌더링 하고 value를 설정해주면 된다.
  // 그리고, props로 받아온 children 값을 내부에 렌더링.
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// Context 사용을 위한 커스텀 Hook
// 우리가 만든 useTodoState, useTodoDispatch, useTodoNextId Hook을 사용하려면, 해당 컴포넌트가 TodoProvider 컴포넌트 내부에 렌더링되어 있어야 한다. (예: App 컴포넌트에서 모든 내용을 TodoProvider 로 감싸기) 만약 TodoProvider로 감싸져있지 않다면 에러를 발생시키도록 커스텀 Hook 을 수정한다.
// -> 꼭 이렇게 해줄 필요는 없지만, 이렇게 에러 처리를 해준다면 나중에 실수를 하게 됐을 때 문제점을 빨리 발견 할 수 있다.
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}
