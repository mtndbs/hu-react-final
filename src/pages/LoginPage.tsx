import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import Title from "../components/general/Title";
import { toast } from "react-toastify";
import * as EmailValidator from "email-validator";
import { useNavigate } from "react-router-dom";
import Circle from "../components/general/Circle";
import AuthButton from "../components/general/authButton";
import { login } from "../services/ApiService";
import { setToken, setUser } from "../auth/TokenManager";

function LoginPage() {
  // generic

  const [loadCircle, setLoadCircle] = React.useState(false);
  const navigate = useNavigate();

  // email useStates

  const [email, setEmail] = React.useState("");
  const [emailLabel, seteMailLabel] = React.useState("Email");
  const [emailErr, setEmailErr] = React.useState("");
  const [fieldEmailErr, setfieldEmailErr] = React.useState(false);

  // password useStates

  const [password, setPassword] = React.useState("");

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

  const validateButtonCheck = () => {
    EmailValidator.validate(email) ? setEmailCorrect(true) : setEmailCorrect(false);
  };

  const validate = (): boolean => {
    if (email.length <= 1) {
      setEmailCorrect(true);
      return false;
    }

    console.log(email);
    if (!EmailValidator.validate(email)) {
      setEmailCorrect(false);
      return false;
    }
    setEmailCorrect(true);

    return true;
  };

  const handleClick = () => {
    if (!validate()) {
      toast.error("Please enter the details correctly ");
      validateButtonCheck();
      return;
    }
    login({ email, password })
      .then((user) => {
        setUser(user);
        if (user.token) {
          setToken(user.token);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setLoadCircle(true);
    setTimeout(() => {
      navigate("/");
      // setLoadCircle(false);
    }, 2000);
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
        <Title mainText={"Login"} subText="please login" />

        <TextField
          fullWidth={true}
          autoFocus={true}
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
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          // error={fieldPasswordErr}
          // helperText={passwordErr}
        />
        <AuthButton handleClick={() => handleClick}>Submit {loadCircle && <Circle _size={30} />}</AuthButton>
      </Box>
    </Container>
  );
}

export default LoginPage;
