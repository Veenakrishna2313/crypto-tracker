import {
  AppBar,
  Container,
  MenuItem,
  createTheme,
  Select,
  Toolbar,
  Typography,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: 24,
  },
}));

const Header = () => {
  const classes = useStyles();
  const {currency, setCurrency } = CryptoState();
  const history = useHistory();

  const handleClick = () => {
    history.push("/");
  };

  const darkTheme = createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={handleClick}
              className={classes.title}
              variant="h6"
            >
              Crypto Tracker
            </Typography>
            <Select variant="outlined" className="select-item" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
