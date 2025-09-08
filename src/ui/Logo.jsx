import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  height: ${({ width }) => width || "13.6rem"};
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  max-height: 100%;
  width: auto;
  object-fit: contain;
`;

function Logo({ width = "12.6rem" }) {
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? "logo-dark.png" : "logo-light.png";

  return (
    <StyledLogo width={width}>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
