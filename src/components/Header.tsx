import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { NavLink } from "react-router-dom";
import { userStore } from "../state/userStore";
import { Models } from "appwrite";
import LogoutButton from "./LogoutButton";
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const user = userStore(
    (state) => state.user
  ) as Models.User<Models.Preferences>;

  return (
    <React.Fragment>
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        className="shadow-lg"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <NavLink to={"/"}>
              <h4 className="text-2xl font-semibold text-primary">MyChats</h4>
            </NavLink>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              My Profile
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">{user.name}</NavbarItem>
          <NavbarItem>
            <LogoutButton />
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NavLink to={"/"}>{item}</NavLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </React.Fragment>
  );
}
