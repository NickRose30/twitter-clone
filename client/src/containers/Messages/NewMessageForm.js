import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMessage } from '../../store/actions/messages';
import Navbar from "../Navbar/Navbar";

class NewMessageForm extends Component {
  state = {
    text: ''
  };

  handleChange = e => this.setState({[e.target.name]: e.target.value});

  handleSubmit = e => {
    e.preventDefault();
    this.props.postMessage(this.state.text);
    this.setState({text: ''});
    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <Navbar />
        <form onSubmit={this.handleSubmit}>
          {this.props.errors.messages && (
            <div className='alert alert-danger'>{this.props.errors.messages}</div>
          )}
          <input
            className='form-control'
            type='text'
            name='text'
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button type='submit' className='btn btn-success pull-right'>Add Message</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

const mapDispatchToProps = {
  postMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageForm);
