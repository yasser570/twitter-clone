import React from "react";
import styled from "styled-components";
import { TweetT } from "../types/graphql-utils";
import { Avatar } from "./avatar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CustomIcon } from "../@ui/customIcon";

dayjs.extend(relativeTime);

const dateFromNow = (date: string) => {
  return dayjs(date)
    .locale({
      name: "test",
      formats: {
        L: "L",
        LL: "LL",
        LLL: "LLL",
        LLLL: "LLLL",
        LT: "LT",
        LTS: "LTS",
      },
      relativeTime: {
        future: "in %s",
        past: "%s", //%s ago
        s: "1s",
        m: "1m",
        mm: "%dm",
        h: "1h",
        hh: "%dh",
        d: "1d",
        dd: "%dd",
        M: "1M",
        MM: "%dM",
        y: "1Y",
        yy: "%dY",
      },
    })
    .fromNow();
};

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 12px 16px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${({ theme }) => theme.colors.hrBorder};
  background-color: ${({ theme }) => theme.colors.transparent};
  transition: ${({ theme }) => theme.transition};
  &:hover {
    background-color: ${({ theme }) => theme.colors.tweetHover};
  }
`;

const AvatarContainer = styled.div`
  flex-basis: 49px;
  margin-right: 12px;
  flex-grow: 0;
  flex-shrink: 0;
`;

const ContentContainer = styled.div`
  width: 100%;
  flex-basis: fill;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
`;

// ********************************
//          TWEET HEADER
// ********************************

const TweetHeaderContainer = styled.div`
  width: 100%;
  flex-basis: fill;
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 24px;
  z-index: 1;
`;

const TwitterHeader = styled.div``;

const UsernameSpan = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  color: ${({ theme }) => theme.colors.textSec};
  margin-left: 4px;
`;

const NameSpan = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.textPri};
  &:hover {
    text-decoration: underline;
  }
  ${TwitterHeader}:hover & {
    text-decoration: underline;
  }
`;

const DotSpan = styled.span`
  padding: 0 4px;
`;

const DateSpan = styled.span`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  color: ${({ theme }) => theme.colors.textSec};
  &:hover {
    text-decoration: underline;
  }
`;

// ********************************
//          TWEET BODY
// ********************************

const TweetBodyContainer = styled.div`
  width: 100%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TweetBody = styled.p`
  font-size: ${({ theme }) => theme.font.size.md};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  color: ${({ theme }) => theme.colors.textPri};
  overflow-wrap: break-word;
  word-wrap: break-word;
  -ms-word-break: break-all;
  word-break: break-all;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
  white-space: pre-wrap;
`;

// ********************************
//          TWEET ACTIONS
// ********************************

const TweetActionsContainer = styled.div`
  margin-top: 12px;
  width: 80%;
  display: flex;
  justify-content: space-between;
`;

const actionsList: {
  label: string;
  onClick: () => void;
  icon: JSX.Element;
}[] = [
  {
    label: "Reply",
    onClick: () => console.log("click"),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z"></path>
        </g>
      </svg>
    ),
  },
  {
    label: "Retweet",
    onClick: () => console.log("click"),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z"></path>
        </g>
      </svg>
    ),
  },
  {
    label: "Like",
    onClick: () => console.log("click"),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z"></path>
        </g>
      </svg>
    ),
  },
  {
    label: "Share",
    onClick: () => console.log("click"),
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <g>
          <path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path>
          <path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path>
        </g>
      </svg>
    ),
  },
];

export const Tweet: React.FC<TweetT> = ({
  user: { _id, username, name },
  created,
  body,
}) => {
  const tweetDateFromNow = dateFromNow(created);

  return (
    <Container>
      <AvatarContainer>
        <Avatar />
      </AvatarContainer>
      <ContentContainer>
        <TweetHeaderContainer>
          <TwitterHeader>
            <NameSpan>{name}</NameSpan>
            <UsernameSpan>@{username}</UsernameSpan>
            <DotSpan>·</DotSpan>
            <DateSpan>{tweetDateFromNow}</DateSpan>
          </TwitterHeader>
          <div>
            <CustomIcon
              type="button"
              fill="ter"
              fillOnHover="pri"
              label="More"
              onClick={() => console.log("...")}
              icon={
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <g>
                    <circle cx="5" cy="12" r="2"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                    <circle cx="19" cy="12" r="2"></circle>
                  </g>
                </svg>
              }
            />
          </div>
        </TweetHeaderContainer>
        <TweetBodyContainer>
          <TweetBody>{body}</TweetBody>
        </TweetBodyContainer>
        <TweetActionsContainer>
          {actionsList.map((ai) => (
            <CustomIcon
              key={ai.label}
              type="button"
              fill="ter"
              fillOnHover="pri"
              label={ai.label}
              onClick={ai.onClick}
              icon={ai.icon}
            />
          ))}
        </TweetActionsContainer>
      </ContentContainer>
    </Container>
  );
};
