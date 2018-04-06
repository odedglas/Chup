import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ input, label, type, placeholder, style, meta }) =>
  <div style={{ marginBottom: '1rem' }}>
    {label && <label htmlFor={input.name}>{label}</label>}
    <input
      {...input}
      type={type}
      placeholder={placeholder}
      className="form-control"
      style={style && style}
    />
    {meta.touched && meta.error &&
    <div style={{ fontSize: '85%', color: 'rgb(255,59,48)' }}>{meta.error}</div>
    }
  </div>;

Input.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.string,
  meta: PropTypes.object.isRequired
};

export default Input;