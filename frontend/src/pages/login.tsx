import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../@ui/button";
import { LogoIcon } from "../@ui/icons/logoIcon";
import { UserT } from "../types/graphql-utils";

const CURRENT_USER_QUERY = gql`
  query CurrentUserQuery {
    currentUser {
      _id
      name
      username
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $username: String!
    $name: String!
    $password: String!
  ) {
    signup(username: $username, name: $name, password: $password) {
      _id
      name
      username
    }
  }
`;

type SignupMutationArgs = {
  username: string;
  name: string;
  password: string;
};

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    login(username: $username, name: $name, password: $password) {
      _id
      name
      username
    }
  }
`;

type LoginMutationArgs = {
  username: string;
  password: string;
};

type CurrentUserT = {
  currentUser: UserT;
};

const Center = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const Columns = styled.div``;

const H1 = styled.h1`
  font-size: ${({ theme }) => theme.font.size.h1};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.textPri};
  margin-bottom: 48px;
  margin-top: 48px;
`;

const H2 = styled.h2`
  font-size: ${({ theme }) => theme.font.size.h2};
  font-weight: ${({ theme }) => theme.font.weight.bold};
  margin-bottom: 32px;
  color: ${({ theme }) => theme.colors.textPri};
`;

const H3 = styled.h3`
  margin-top: 32px;
  margin-bottom: 16px;
  font-size: ${({ theme }) => theme.font.size.lg};
  font-weight: ${({ theme }) => theme.font.weight.bold};
`;

const Input = styled.input`
  outline: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.bg};
  border: 1px solid ${({ theme }) => theme.colors.inputBorder};
  margin-bottom: 16px;
  padding: 12px;
  &:focus {
    outline: none;

    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

type SubmitFormFu = (event: React.FormEvent<HTMLFormElement>) => void;

const LoginPage = () => {
  const { data, refetch } = useQuery<CurrentUserT>(CURRENT_USER_QUERY);
  const [signupMutation] = useMutation<UserT, SignupMutationArgs>(
    SIGNUP_MUTATION
  );

  const [loginMutation] = useMutation<UserT, LoginMutationArgs>(LOGIN_MUTATION);

  const [action, setAction] = useState<"signup" | "login">("signup");

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.currentUser?._id) {
      navigate("/home", { replace: true });
    }
  }, [data, navigate]);

  const resetForm = () => {
    setName("");
    setUsername("");
    setPassword("");
  };

  const signup: SubmitFormFu = (e) => {
    e.preventDefault();
    signupMutation({
      variables: {
        name,
        username,
        password,
      },
    }).then(() => {
      refetch();
    });
    resetForm();
  };

  const login: SubmitFormFu = (e) => {
    e.preventDefault();
    loginMutation({
      variables: {
        username,
        password,
      },
    }).then(() => {
      refetch();
    });
    resetForm();
  };

  const SignIn = (
    <React.Fragment>
      <H2>Join Twitter today.</H2>

      <Form onSubmit={signup}>
        <Input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="text"
          value={name}
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign Up</Button>
        <H3>Already have an account?</H3>
        <Button
          onClick={() => {
            resetForm();
            setAction("login");
          }}
          inverted
        >
          Sign In
        </Button>
      </Form>
    </React.Fragment>
  );

  const Login = (
    <React.Fragment>
      <H2>Welcome Back.</H2>

      <Form onSubmit={login}>
        <Input
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign In</Button>
        <H3>Don't have an account?</H3>
        <Button
          onClick={() => {
            resetForm();
            setAction("signup");
          }}
          inverted
        >
          Sign Up
        </Button>
      </Form>
    </React.Fragment>
  );

  return (
    <Center>
      <Columns>
        <LogoContainer>
          <LogoIcon size="lg" />
        </LogoContainer>
        <H1>Happening now</H1>
        {action === "login" ? Login : SignIn}
      </Columns>
    </Center>
  );
};

export default LoginPage;
