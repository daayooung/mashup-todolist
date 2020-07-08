import React from 'react';
import styled from 'styled-components';

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto;

  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;
// Tagged Template Literal

function TodoTemplate({ children }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
  // TodoTemplate가 안의 TodoList 요소들을 감싸주기 때문에 component들이
  // 적용되기위해서는 children props를 넣어주어야 한다.

  // <TodoTemplateBlock> : styled-component
}

export default TodoTemplate;
