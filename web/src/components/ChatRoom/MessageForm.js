import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  form: {
    padding: '0px 10px 10px 10px',
    background: '#fff',
  },

  input: {
    borderWidth: '2px',
    borderColor: 'rgb(214,214,214)',
  },

  button: {
    color: 'rgb(80,80,80)',
    background: 'rgb(214,214,214)',
    borderWidth: '2px',
    borderColor: 'rgb(214,214,214)',
  },
});

class MessageForm extends Component {

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)} className={css(styles.form)}>
        <div className="input-group">
          <Field
            name="text"
            type="text"
            component="input"
            className={`form-control ${css(styles.input)}`}
          />
          <div className="input-group-btn">
            <button
              disabled={submitting}
              className={`btn ${css(styles.button)}`}
            >
              Send
            </button>
          </div>
        </div>
      </form>
    );
  }
}

MessageForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired
};

const validate = (values) => {
  const errors = {};
  if (!values.text) {
    errors.text = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'newMessage',
  validate,
})(MessageForm);