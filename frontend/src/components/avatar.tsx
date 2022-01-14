import React from "react";
import styled from "styled-components";
import avatarUrl from "../@imgs/avatar.png";

const Container = styled.div`
  height: 49px;
  width: 49px;
`;

const Image = styled.img`
  width: inherit;
  height: inherit;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

export const Avatar = () => {
  return (
    <Container>
      <Image src={avatarUrl} />
    </Container>
  );
};
