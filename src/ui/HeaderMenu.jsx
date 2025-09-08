import styled from "styled-components"
import LogOut from "../features/authentication/LogOut"
import ButtonIcon from "./ButtonIcon"
import { HiOutlineUser } from "react-icons/hi2"
import { useNavigate } from "react-router-dom"
import DarkModeToggle from "./DarkModeToggle"

const StyleHeaderMenu=styled.ul`
display: flex;
gap:0.4rem;
`

function HeaderMenu() {
    const navigate=useNavigate();
    return (
            <StyleHeaderMenu>
                <li>
                    <ButtonIcon onClick={()=>navigate("/account")}>
                        <HiOutlineUser></HiOutlineUser>
                    </ButtonIcon>
                </li>
                <li>
                    <DarkModeToggle></DarkModeToggle>
                </li>
                <li>
                    <LogOut></LogOut>
                </li>
            </StyleHeaderMenu>
    )
}

export default HeaderMenu
