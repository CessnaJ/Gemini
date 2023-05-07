import styled from "styled-components";
export const DialogueWrap = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  padding: 5%;
  align-items: center;
  flex-direction: row;
  color: white;
  font-size: 130%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
`;

export const ChatLine = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 700;
  display: flex;
  font-size: 32px;
  line-height: 39px;

  height: 10%;
  background: transparent;

  color: #ffffff;
  justify-content: center;
  align-items: center;
`;
export const NextBtn = styled.img`
  width: 4%;
  height: auto;
  cursor: pointer;
`;
export const BeforeBtn = styled.img`
  width: 4%;
  height: auto;
  transform: scaleX(-1);
  cursor: pointer;
`;
