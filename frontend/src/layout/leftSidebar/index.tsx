import React from "react";
import styled from "styled-components";
import { breakpoints } from "../../theme/media";
import { Logo } from "./logo";
import {
  ExploreIcon,
  HomeIcon,
  MessagesIcon,
  MoreIcon,
  NotificationsIcon,
  ProfileIcon,
} from "./navIcons";
import NavLink from "./navLink";
import TweetLink from "./TweetLink";

const Container = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding-right: 12px;
  ${breakpoints.down("lg")} {
    width: auto;
  }
  ${breakpoints.down("sm")} {
    padding-right: 6px;
  }
`;

const navItems = [
  { label: "Home", link: "/home", Icon: HomeIcon },
  { label: "Explore", link: "/expore", Icon: ExploreIcon },
  { label: "Notifications", link: "/notifications", Icon: NotificationsIcon },
  { label: "Messages", link: "/messages", Icon: MessagesIcon },
  { label: "Profile", link: "/profile", Icon: ProfileIcon },
  { label: "More", link: "/", Icon: MoreIcon },
];

const LeftSidebar = () => {
  return (
    <Container>
      <Logo />
      {navItems.map((ni) => (
        <NavLink key={ni.label} to={ni.link} icon={<ni.Icon />}>
          {ni.label}
        </NavLink>
      ))}
      <TweetLink />
    </Container>
  );
};

export default LeftSidebar;
