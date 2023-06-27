import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import Title from "../components/general/Title";
import { toast } from "react-toastify";
import * as EmailValidator from "email-validator";
import { useNavigate } from "react-router-dom";
import Circle from "../components/general/Circle";
import AuthButton from "../components/general/authButton";
import { login } from "../services/ApiService";
import { setToken, setUser } from "../auth/TokenManager";
import { UserContext } from "../hooks/UserContext";
import { VisibilityOff, Visibility } from "@mui/icons-material";

function LoginPage() {
  // generic
  const { setUserData } = React.useContext(UserContext);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const [loadCircle, setLoadCircle] = React.useState(false);
  const navigate = useNavigate();

  // email useStates

  const [email, setEmail] = React.useState("");
  const [emailLabel, seteMailLabel] = React.useState("Email");
  const [emailErr, setEmailErr] = React.useState("");
  const [fieldEmailErr, setfieldEmailErr] = React.useState(false);

  // password useStates

  const [password, setPassword] = React.useState("");
  const [passwordLabel, setPasswordLabel] = React.useState("Password *");
  const [passwordErr, setPasswordErr] = React.useState("");
  const [fieldPasswordErr, setfieldPasswordErr] = React.useState(false);

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

  const setPasswordCorrect = (bool: boolean) => {
    setPasswordErr(bool ? "" : "Password is not valid");
    setfieldPasswordErr(bool ? false : true);
    setPasswordLabel(bool ? "Password*" : "Error");
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
      .then((json) => {
        if (json && json.status === "fail") {
          setLoadCircle(false);
          setPasswordCorrect(false);
          setEmailCorrect(false);
          toast.error(json.message);
          return;
        }
        if (json.token) {
          setToken(json.token);
          setUser(json);
          setUserData(json);
        }
        setLoadCircle(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
        setLoadCircle(false);
      });
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
          sx={{ m: 1, width: "70ch" }}
          autoFocus={true}
          id="outlined-basic"
          label={emailLabel}
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldEmailErr}
          helperText={emailErr}
        />

        {/* <TextField
          id="outlined-basic"
          label={passwordLabel}
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldPasswordErr}
          helperText={passwordErr}
        /> */}
        <FormControl sx={{ m: 1, width: "70ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">{passwordLabel}</InputLabel>
          <OutlinedInput
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            error={fieldPasswordErr}
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={passwordLabel}
          />
        </FormControl>
        <FormHelperText id="outlined-weight-helper-text">{passwordErr}</FormHelperText>

        <AuthButton handleClick={() => handleClick}>Submit {loadCircle && <Circle _size={30} />}</AuthButton>
      </Box>
    </Container>
  );
}

export default LoginPage;
