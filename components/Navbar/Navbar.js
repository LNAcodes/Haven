// components/Navbar/Navbar.js

import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faPlus,
  faList,
  faRightFromBracket,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const router = useRouter();
  const { status } = useSession();
  const path = router.pathname;

  const isActive = (href) => {
    if (href === "/") return path === "/";
    if (href === "/incidents") return path === "/incidents";
    return path === href;
  };

  return (
    <NavbarContainer aria-label="Primary navigation">
      <NavList>
        <NavItem>
          <NavLink
            href="/"
            aria-label="Go to home"
            aria-current={isActive("/") ? "page" : undefined}
            $active={isActive("/")}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faHouse} />
            </NavIcon>
            <NavLabel>Home</NavLabel>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            href="/incidents/add-incident"
            aria-label="Add new incident"
            aria-current={
              isActive("/incidents/add-incident") ? "page" : undefined
            }
            $active={isActive("/incidents/add-incident")}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faPlus} />
            </NavIcon>
            <NavLabel>Add</NavLabel>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            href="/incidents"
            aria-label="Incident List"
            aria-current={isActive("/incidents") ? "page" : undefined}
            $active={isActive("/incidents")}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faList} />
            </NavIcon>
            <NavLabel>List</NavLabel>
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink
            href="/info"
            aria-label="Help & Support"
            aria-current={isActive("/info") ? "page" : undefined}
            $active={isActive("/info")}
          >
            <NavIcon>
              <FontAwesomeIcon icon={faHandHoldingHeart} />
            </NavIcon>
            <NavLabel>Info</NavLabel>
          </NavLink>
        </NavItem>

        {status === "authenticated" ? (
          <NavItem>
            <NavButton
              onClick={() => signOut({ callbackUrl: "/login" })}
              aria-label="Logout"
            >
              <FontAwesomeIcon icon={faRightFromBracket} />
            </NavButton>
          </NavItem>
        ) : null}
      </NavList>
    </NavbarContainer>
  );
}

const NavbarContainer = styled.nav`
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--color-background);
  border-top: 1px solid var(--color-primary);
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const NavList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NavItem = styled.li`
  flex: 1;
  display: flex;
  justify-content: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
`;

const NavLink = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-decoration: none;
  border-bottom: ${({ $active }) =>
    $active ? "3px solid var(--color-accent)" : "3px solid transparent"};
  padding-bottom: 4px;
`;

const NavIcon = styled.span`
  font-size: 1.2rem;
`;

const NavLabel = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const NavButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: var(--font-family);
  color: var(--color-accent);
`;
