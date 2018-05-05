import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { css, StyleSheet } from 'aphrodite';
import Input from '../common/Input';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
  error: {
    color:'red',
    margin:'0',
    padding: '1rem 0 0 0'
  }
});

class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {error: undefined, submitting: false};
  }

  handleSubmit = data => {
    this.setState({error:undefined, submitting:true});
    this.props.onSubmit(data)
    .then(d => this.setState({submitting:false}))
    .catch(e => {
      this.setState({error:e.error, submitting:false});
    })
  };

  render() {
    const { handleSubmit } = this.props;
    const { error, submitting } = this.state;

    return (
      <form
        className={`card ${css(styles.card)}`}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Login to Chup</h3>
        <Field name="email" type="text" component={Input} placeholder="Email" />
        <Field name="password" type="password" component={Input} placeholder="Password" />
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-block btn-primary"
        >
          {submitting ? 'Logging in...' : 'Login'}
        </button>
        {error ? <label className={css(styles.error)} style={{ padding: '1rem 0', marginBottom:'0'}}> {error} </label> : null}
        <hr style={{ margin: '1.5rem 0' }} />
        <Link to="/signup" className="btn btn-block btn-secondary">
          Create a new account
        </Link>
      </form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool
};

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);