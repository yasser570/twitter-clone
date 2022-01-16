import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button } from "../@ui/button";
import { LogoIcon } from "../@ui/icons/logoIcon";
import { UserT } from "../types/graphql-utils";
import { useForm, SubmitHandler } from "react-hook-form";

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
    login(username: $username, password: $password) {
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

const Input = styled.input<{ $error?: boolean }>`
  outline: none;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.bg};
  border: 1px solid
    ${({ theme, $error }) =>
      $error ? theme.colors.error : theme.colors.inputBorder};
  margin-bottom: 16px;
  padding: 12px;
  &:focus {
    outline: none;

    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const ErrorMessageSpan = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  color: ${({ theme }) => theme.colors.error};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.colors.primary};
`;

const Login: React.FC<{
  goToSignup: () => void;
  onSuccess: () => void;
}> = ({ onSuccess, goToSignup }) => {
  const [loginMutation] = useMutation<UserT, LoginMutationArgs>(LOGIN_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginMutationArgs>();

  useEffect(() => {
    if (errors) console.log(errors);
  }, [errors]);

  const login: SubmitHandler<LoginMutationArgs> = ({ username, password }) => {
    loginMutation({
      variables: {
        username,
        password,
      },
    })
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        if (
          err instanceof ApolloError &&
          err.graphQLErrors.length !== 0 &&
          err.graphQLErrors[0].extensions &&
          err.graphQLErrors[0].extensions.code === "BAD_USER_INPUT"
        ) {
          setError(
            err.graphQLErrors[0].extensions.inputName as any,
            err.graphQLErrors[0]
          );
        } else {
          console.log("something went wrong", err);
        }
      });
  };

  return (
    <React.Fragment>
      <H2>Welcome Back.</H2>

      <Form onSubmit={handleSubmit(login)}>
        {errors["username"] && (
          <ErrorMessageSpan>{errors.username.message}</ErrorMessageSpan>
        )}
        <Input
          type="text"
          placeholder="username"
          $error={Boolean(errors["username"])}
          {...register("username", { required: true })}
        />

        {errors["password"] && (
          <ErrorMessageSpan>{errors.password.message}</ErrorMessageSpan>
        )}
        <Input
          type="password"
          placeholder="password"
          $error={Boolean(errors["password"])}
          {...register("password", { required: true })}
        />

        <Button type="submit">Sign In</Button>
        <H3>Don't have an account?</H3>
        <Button inverted onClick={goToSignup}>
          Sign Up
        </Button>
      </Form>
    </React.Fragment>
  );
};

const SignUp: React.FC<{
  goToLogin: () => void;
  onSuccess: () => void;
}> = ({ onSuccess, goToLogin }) => {
  const [signupMutation] = useMutation<UserT, SignupMutationArgs>(
    SIGNUP_MUTATION
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupMutationArgs>();

  const signup: SubmitHandler<SignupMutationArgs> = ({
    name,
    password,
    username,
  }) => {
    signupMutation({
      variables: {
        name,
        username,
        password,
      },
    })
      .then(() => {
        onSuccess();
      })
      .catch((err) => {
        if (
          err instanceof ApolloError &&
          err.graphQLErrors.length !== 0 &&
          err.graphQLErrors[0].extensions &&
          err.graphQLErrors[0].extensions.code === "BAD_USER_INPUT"
        ) {
          setError(
            err.graphQLErrors[0].extensions.inputName as any,
            err.graphQLErrors[0]
          );
        } else {
          console.log("something went wrong");
        }
      });
  };

  return (
    <React.Fragment>
      <H2>Join Twitter today.</H2>

      <Form onSubmit={handleSubmit(signup)}>
        {errors["username"] && (
          <ErrorMessageSpan>{errors.username.message}</ErrorMessageSpan>
        )}
        <Input
          type="text"
          placeholder="username"
          $error={Boolean(errors["username"])}
          {...register("username", { required: true })}
        />
        {errors["name"] && (
          <ErrorMessageSpan>{errors.name.message}</ErrorMessageSpan>
        )}
        <Input
          type="text"
          placeholder="name"
          $error={Boolean(errors["name"])}
          {...register("name", { required: true })}
        />

        {errors["password"] && (
          <ErrorMessageSpan>{errors.password.message}</ErrorMessageSpan>
        )}
        <Input
          type="password"
          placeholder="password"
          $error={Boolean(errors["password"])}
          {...register("password", { required: true })}
        />

        <Button type="submit">Sign Up</Button>
        <H3>Already have an account?</H3>
        <Button onClick={goToLogin} inverted>
          Sign In
        </Button>
      </Form>
    </React.Fragment>
  );
};

const LoginPage = () => {
  const { data, refetch } = useQuery<CurrentUserT>(CURRENT_USER_QUERY);

  const [action, setAction] = useState<"signup" | "login">("signup");

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.currentUser?._id) {
      navigate("/home", { replace: true });
    }
  }, [data, navigate]);

  return (
    <Center>
      <Columns>
        <LogoContainer>
          <LogoIcon size="lg" />
        </LogoContainer>
        <H1>Happening now</H1>
        {action === "login" ? (
          <Login onSuccess={refetch} goToSignup={() => setAction("signup")} />
        ) : (
          <SignUp onSuccess={refetch} goToLogin={() => setAction("login")} />
        )}
      </Columns>
    </Center>
  );
};

export default LoginPage;
