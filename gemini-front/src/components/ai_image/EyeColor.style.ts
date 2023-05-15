import styled from "styled-components";

export const EyeColorBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;

  /* justify-content: center; */
`;

export const EyeColorContainer = styled.div`
  position: relative;
  width: 31%;
  height: auto;
  margin: 1%;
  border: 1px solid;

  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const EyeColorImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    filter: brightness(50%);
  }
`;
