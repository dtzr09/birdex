import styled from "styled-components";

export const HeroContainer = styled.div`
  width: 100%;
`;

export const HeroWrapper = styled.div`
  position: relative;
  max-width: 100%;
  max-height: 790px;
  z-index: 1;
  overflow-y: scroll;

  ::-webkit-scrollbar {display:none;}
`;

export const BackgroundOverlay = styled.div`
  width: 100%;
`
