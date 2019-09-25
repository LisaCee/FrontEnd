import React from "react";
import { connect } from "react-redux";
import { register } from "../actions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
  // "@global": {
  //   body: {
  //     backgroundColor: theme.palette.common.white
  //   }
  // },
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    marginTop: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

export class SignUp extends React.Component {
  state = {
    credentials: {
      userName: "",
      email: "",
      password: "",
      password1: ""
    },
    error: false,
    errorMsg: "",
    register: false
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state);
  };

  redirect = () => {
    this.props.history.push("/SignIn");
  };

  register = e => {
    e.preventDefault();
    const creds = {
      userName: this.state.credentials.userName,
      email: this.state.credentials.email,
      password: this.state.credentials.password
    };

    if (this.state.credentials.userName.length < 3) {
      this.setState({
        error: true,
        errorMsg: "Username must be more than 3 characters"
      });
    } else if (this.state.credentials.password.length < 5) {
      this.setState({
        error: true,
        errorMsg: "Password must be more than 5 characters"
      });
    } else if (this.state.credentials.password !== this.state.credentials.password1) {
      this.setState({
        error: true,
        errorMsg: "Passwords don't match"
      });
    }
    else {
      this.props.register(creds, this.redirect);
    }
  };

  signup = event => {
    this.setState(prevState => ({
      register: !prevState.register
    }));
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;

    return (
      //copied from login 
      <Grid container component='main' id="newUser" className={classes.root} maxWidth="xs">
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component='h1' variant='h5'>
              Sign Up
          </Typography>
            <form onSubmit={this.signup} className={classes.form} noValidate>

              <TextField
                variant="outlined"
                margin='normal'
                required
                fullWidth
                id="username"
                label="Username"
                name="userName"
                onChange={this.handleChange}
              />

              <TextField
                variant="outlined"
                margin='normal'
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={this.handleChange}
              />

              <TextField
                variant="outlined"
                margin='normal'
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={this.handleChange}
              />

              <TextField
                variant="outlined"
                margin='normal'
                required
                fullWidth
                name="password1"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                onChange={this.handleChange}
              />
            </form>
            <Button
              onClick={this.register}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </div>
          {/* <div>{this.state.error ? <p>{this.state.errorMsg}</p> : null}</div> */}
          <Grid item xs={false} sm={4} md={7} className={classes.image} >
          </Grid >
        </Grid>
      </Grid>
    );
  }
}


const mapStateToProps = state => ({
  error: state.error,
  register: state.register,
  credentials: state.credentials
});

export default connect(
  mapStateToProps,
  { register }
)(withStyles(styles)(SignUp));
