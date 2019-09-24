import React from 'react';
import { connect } from "react-redux";
import { register } from "../actions";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
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
      password: ""
    },

    register: false

  };

  // const classes = useStyles();

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  redirect = () => {
    this.props.history.push("/SignIn");
  };

  register = e => {
    const creds = {
      userName: this.state.credentials.userName,
      email: this.state.credentials.email,
      password: this.state.credentials.password,
    };
    e.preventDefault();
    console.log('CREDS', creds)
    this.props.register(creds, this.redirect);
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

      // <Container component='main' maxWidth='xs' id='newUser'>
      //   <CssBaseline />
      <div>
        <div className={classes.paper}>
          {/* <Avatar className={classes.avatar}> */}
          {/* <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'> */}
          <h1> Sign up</h1>

          {/* </Typography> */}
          <form onSubmit={this.signup} className={classes.form} noValidate>
            <Grid container spacing={2}>
              {/* <Grid item xs={12}> */}
              <input
                variant='outlined'
                required
                fullWidth
                id='username'
                label='Username'
                name='username'
                onChange={this.handleChange}
              />
              {/* </Grid>
            <Grid item xs={12}> */}
              <input
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                onChange={this.handleChange}
              />
              {/* </Grid>
            <Grid item xs={12}> */}
              <input
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                onChange={this.handleChange}
              />
              {/* </Grid>
            <Grid item xs={12}> */}
              <input
                variant='outlined'
                required
                fullWidth
                name='confirmPassword'
                label='Confirm Password'
                type='password'
                id='confirmPassword'
                onChange={this.handleChange}
              />
            </Grid>
          </form>
          <button
            onClick={this.register}
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
          // className={classes.submit}
          >
            Sign Up
          </button>
          {/* <Grid container justify='flex-end'>
            <Grid item> */}
          <Link href='/signIn' variant='body2'>
            Already have an account? Sign in
              </Link>
          {/* </Grid>
          </Grid> */}
        </div>
      </div>
      //   <Box mt={5}>
      //     <Copyright />
      //   </Box>
      //  </div>
      // </Container>

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
)(withStyles(styles)(SignUp))