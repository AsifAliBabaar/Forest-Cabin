import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components"
import { useEffect } from "react";
const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`;

function ProcetedRoute({ children }) {
    const navigate = useNavigate();
    //1.Load the Authenticated User;
    const { isLoading, isAuthenticated } = useUser();
    //2.If There Is No Authenticated User rediracte to Login Page;
    useEffect(function () {
        if (!isAuthenticated && !isLoading) {
            navigate("/login")
        }
    }, [navigate,isAuthenticated,isLoading,])
    //3.while Loading  show a Spinner,
    if (isLoading) return <FullPage>
        <Spinner></Spinner>
    </FullPage>;
    //4.if there  is a user  render the app;
    if(isAuthenticated) return children
}

export default ProcetedRoute;
