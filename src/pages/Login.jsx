import LoginForm from "../features/authentication/LoginForm";
import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import CabinTable from "../features/cabins/CabinTable"

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {
  return <LoginLayout>
    <Logo width="22rem"></Logo>
    <Heading as="h4">Login In to Account</Heading>
    <LoginForm></LoginForm>
  </LoginLayout>;
}

export default Login;
