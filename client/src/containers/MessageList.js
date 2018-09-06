import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMessages } from "../store/actions/messages";
import MessageItem from '../components/Messages/MessageItem';

class MessageList extends Component {
  componentDidMount() {
    this.props.fetchMessages();
  }

  render() {
    const { messages } = this.props;
    return messages.map(m => (
      <MessageItem
        key={m._id}
        date={m.createdAt}
        text={m.text}
        username={m.user.username}
        profileImageUrl={m.user.profileImageUrl}
      />
    ));
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages
  }
};

export default connect(mapStateToProps, { fetchMessages })(MessageList);