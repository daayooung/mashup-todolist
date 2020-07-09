import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
//  react-icons :  Font Awesome, Ionicons, Material Design Icons, 등의 아이콘들을 컴포넌트 형태로 쉽게 사용 할 수 있다.
// Material Design Icons의 MdDone 과 MdDelete 아이콘을 사용.
import { useTodoDispatch } from '../TodoContext';

const Remove = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;

const TodoItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 0;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;
// ${} : Component Selector. TodoItemBlock 위에 커서가 있을 때, Remove 컴포넌트를 보여주라는 의미.

const CheckCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${(props) =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${(props) =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;
// flex: 1; : 영역에 꽉차게

function TodoItem({ id, done, text }) {
  const dispatch = useTodoDispatch();
  const onToggle = () => dispatch({ type: 'TOGGLE', id });
  const onRemove = () => dispatch({ type: 'REMOVE', id });
  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}
// TodoList component에서 props로 준 done, text를 TodoItem component으로 받아왔다.
// CheckCircle component의 done= 에 props done값 할당, tag와 tag 사이에 보여줄 내용에 done이 true일 때 <MdDone /> (체크표시 아이콘)을 보여준다.
// Text component의 done= 에 props done값 할당, tag와 tag 사이에 보여줄 내용에 text값 할당

//다른 항목이 업데이트 될 때, 불필요한 리렌더링을 방지, 성능 최적화
export default React.memo(TodoItem);
