import styled from "@emotion/styled";

export const ButtonWrapper = styled.div`
  display: flex;
  padding: 0.5em 0;
  justify-content: ${(props) => props.dir || "flex-start"};
`;

export const Button = styled.button`
  padding: 0.5em 0.875em;
  border-color: ${(props) => props.border || "#333"};
  margin-left: ${(props) => props.ml || 0};
  margin-right: ${(props) => props.mr || 0};
  margin-top: ${(props) => props.mt || 0};
  margin-bottom: ${(props) => props.mb || 0};
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
`;
