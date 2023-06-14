import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Container } from "@mui/material";
import Title from "../components/general/Title";
import { toast } from "react-toastify";
import * as EmailValidator from "email-validator";
import AuthButton from "../components/general/authButton";
import { useNavigate } from "react-router-dom";
import Circle from "../components/general/Circle";

function SignPage() {
  //name useStates
  const [name, setName] = React.useState("");
  const [nameLabel, setNameLabel] = React.useState("Name");
  const [nameErr, setNameErr] = React.useState("");
  const [fieldNameErr, setfieldNameErr] = React.useState(false);
  const [loadCircle, setLoadCircle] = React.useState(false);
  const navigate = useNavigate();

  // email useStates
  const [email, setEmail] = React.useState("");
  const [emailLabel, seteMailLabel] = React.useState("Email");
  const [emailErr, setEmailErr] = React.useState("");
  const [fieldEmailErr, setfieldEmailErr] = React.useState(false);
  // password useStates
  const [password, setPassword] = React.useState("");
  const [passwordLabel, setPasswordLabel] = React.useState("Password");
  const [passwordErr, setPasswordErr] = React.useState("");
  const [fieldPasswordErr, setfieldPasswordErr] = React.useState(false);
  // confirm password useState
  const [confirmPassword, setconfirmPassword] = React.useState("");
  const [confirmPasswordLabel, setConfirmPasswordLabel] = React.useState("Confirm password");
  const [confirmPasswordErr, setConfirmPasswordErr] = React.useState("");
  const [fieldconfirmPasswordErr, setfieldConfirmPasswordErr] = React.useState(false);

  const setNameCorrect = (bool: boolean) => {
    if (bool) {
      setNameErr("");
      setfieldNameErr(false);
      setNameLabel("Name");
    } else {
      setNameLabel("Error");
      setNameErr("Name must be atleast 2 chars");
      setfieldNameErr(true);
    }
  };

  const setEmailCorrect = (bool: boolean) => {
    if (bool) {
      setEmailErr("");
      setfieldEmailErr(false);
      seteMailLabel("Email");
    } else {
      seteMailLabel("Error");
      setEmailErr("Email is not Valid");
      setfieldEmailErr(true);
    }
  };

  const setPasswordCorrect = (bool: boolean, msg: string = "") => {
    if (bool) {
      setPasswordLabel("Password");
      setPasswordErr("");
      setfieldPasswordErr(false);
    } else {
      setfieldPasswordErr(true);
      setPasswordLabel("Error");
      setPasswordErr(msg);
    }
  };

  const setConfirmPasswordCorrect = (bool: boolean) => {
    if (bool) {
      setConfirmPasswordLabel("Confirm password");
      setConfirmPasswordErr("");
      setfieldConfirmPasswordErr(false);
    } else {
      setfieldConfirmPasswordErr(true);
      setConfirmPasswordLabel("Error");
      setConfirmPasswordErr("The password are not the same!");
    }
  };

  const validateButtonCheck = () => {
    EmailValidator.validate(email) ? setEmailCorrect(true) : setEmailCorrect(false);
    password.length < 6 ? setPasswordCorrect(false, "Password must be atleat 6 chars") : setPasswordCorrect(true);
    name.length < 2 ? setNameCorrect(false) : setNameCorrect(true);
    password !== confirmPassword ? setConfirmPasswordCorrect(false) : setConfirmPasswordCorrect(true);
  };
  const isValidPassword = (password: string) => {
    const passwordRegex = /^(?=.*[!@%$#^&*-_*(])(?=.*[A-Z]).+$/;
    return passwordRegex.test(password);
  };

  const validate = (): boolean => {
    if (email.length <= 1) {
      setEmailCorrect(true);
      return false;
    }

    if (!EmailValidator.validate(email)) {
      setEmailCorrect(false);
      return false;
    }
    setEmailCorrect(true);

    if (password.length <= 1) {
      setPasswordCorrect(true);
      return false;
    }
    if (!isValidPassword(password)) {
      setPasswordCorrect(false, "password must contain !@%$#^&*-_* and one Capital letter");
      return false;
    }

    if (!password || password.length < 6) {
      setPasswordCorrect(false, "Password must be atleat 6 chars");
      return false;
    }
    setPasswordCorrect(true);
    if (password !== confirmPassword) {
      setConfirmPasswordCorrect(false);
      return false;
    }
    setConfirmPasswordCorrect(true);

    return true;
  };

  const handleClick = () => {
    if (!validate()) {
      toast.error("Please enter the details correctly ");
      validateButtonCheck();
      return;
    }
    setLoadCircle(true);
    setTimeout(() => {
      navigate("/home");
    }, 2000);
    console.log("valid");

    console.log("valid");
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onKeyUp={() => validate()}
        autoComplete="off"
        m={1}
        sx={{
          height: "50vh",
          width: "40vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          "@media (max-width: 600px)": {
            width: "90vw",
          },
        }}
      >
        <Title mainText={"Sign up"} subText="Plase sign up" />

        <TextField
          autoFocus={true}
          id="outlined-basic"
          label={nameLabel}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={fieldNameErr}
          helperText={nameErr}
        />

        <TextField
          id="outlined-basic"
          label={emailLabel}
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldEmailErr}
          helperText={emailErr}
        />
        <TextField
          id="outlined-basic"
          label={passwordLabel}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldPasswordErr}
          helperText={passwordErr}
        />

        <TextField
          id="outlined-basic"
          label={confirmPasswordLabel}
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          error={fieldconfirmPasswordErr}
          helperText={confirmPasswordErr}
        />

        <AuthButton handleClick={() => handleClick}>Submit {loadCircle && <Circle _size={30} />} </AuthButton>
      </Box>
    </Container>
  );
}

export default SignPage;
