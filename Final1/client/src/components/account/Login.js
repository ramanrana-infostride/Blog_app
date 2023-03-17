import React, { useContext } from "react";
import { useState } from "react";
import { Box } from "@mui/system";
import { Button, TextField, styled, Typography } from "@mui/material";
import { API } from "../../service/Api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";


const Container = styled(Box)`
  width: 500px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;

const Image = styled("img")({
  width: 200,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #98d0c0;
  color: #fff;
  font-size: 25px;
  height: 48px;
  border-radius: 2px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: red;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const SignUpButton = styled(Button)`
  background: #fff;
  color: #3c483d;
  font-size: 15 px;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/20%);
`;
const Text = styled(Typography)`
  color: #878787;
  font-size: 16px;
`;

const signupInitialValue = {
  name: "",
  email: "",
  password: "",
};

const loginInitialValue = {
  email: "",
  password: "",
};

const Login = ({IsUserAuth}) => {
  const [account, toggleAccount] = useState("login");
  const [signUp, setSignUp] = useState(signupInitialValue);
  const [error, showError] = useState("");
  const [login, setLogin] = useState(loginInitialValue);

  const { setAccount } = useContext(DataContext);

  const navigate = useNavigate();

  const toggleSignUp = () => {
    account === "login" ? toggleAccount("signup") : toggleAccount("login");
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;

    setSignUp((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const signUpUser = async () => {
    let response = await API.userSignup(signUp);
    if (response.isSuccess) {
      showError("");
      setSignUp(signupInitialValue);
      toggleAccount("login");
    } else {
      showError("Something went wrong! please try again later");
      setSignUp(signupInitialValue);
    }
  };

  const onValueChange = (event) => {
    const { name, value } = event.target;
    setLogin((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      showError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "sessionToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({ email: response.data.email, name: response.data.name });
      IsUserAuth(true);
      navigate('/');  

    } else {
      showError("Something went wrong! please try again later");
      setSignUp(loginInitialValue);
    }
  };

  const imageUrl =
    "https://upload.wikimedia.org/wikipedia/en/0/02/DotBlog_domain_logo.png";

  return (
    <Container>
      <Box>
        <Image src={imageUrl} alt="Login" />

        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              label="Enter Email"
              onChange={onValueChange}
              name="email"
              value={login.email}
              type="email"
            />
            <TextField
              variant="standard"
              label="Enter Password"
              onChange={onValueChange}
              name="password"
              value={login.password}
              type="password"
            />
            {error && <Error>{error}</Error>}
            <LoginButton variant="contained" onClick={loginUser}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignUpButton onClick={toggleSignUp}>
              Create an account
            </SignUpButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={onInputChange}
              name="name"
              label="Enter Name"
              value={signUp.name}
              type="text"
            />
            <TextField
              variant="standard"
              onChange={onInputChange}
              name="email"
              label="Enter Email"
              value={signUp.email}
              type="email"
            />
            <TextField
              variant="standard"
              onChange={onInputChange}
              name="password"
              label="Enter Password"
              value={signUp.password}
              type="password"
            />

            {error && <Error>{error}</Error>}

            <SignUpButton onClick={signUpUser}>SignUp</SignUpButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={toggleSignUp}>
              Already have an account ?
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Container>
  );
};
export default Login;
