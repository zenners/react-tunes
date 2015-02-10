var React = require('react');
var $ = require('jquery');

var AddChat = React.createClass({
  getInitialState: function(){
    return {
      chat: ''
    }
  },
  propTypes: {
    url: React.PropTypes.string.isRequired
  },
  getDefaultProps: function() {
    return {
      url: 'https://api.parse.com/1/classes/chat'
    };
  },
  addChat: function(){
    $.ajax({
      url: this.props.url,
      type: 'POST',
      data: JSON.stringify({text: this.state.chat}),
      beforeSend: function(request) {
        request.setRequestHeader("X-Parse-Application-Id", '1tNw34UWSqjkyu4byPGV3q1G6hZcYQmYuvqx0abS');
        request.setRequestHeader("X-Parse-REST-API-Key", 'ALlZ2WvYnreWNPfHQXoRRiDWt0pXkryYINGAzqnc');
        request.setRequestHeader("Content-Type", 'application/json');
      },
      error: function() {
        console.log('error on post');
      },
      success: function() {
        console.log('Successful Post');
      }.bind(this)
    })
  },
  handleSubmit: function(e){
    if(e.keyCode === 13){
      this.addChat(this.state.chat);
      this.setState({
        chat: ''
      })
    }
  },
  handleChange: function(e){
    this.setState({
      chat: e.target.value
    })
  },
  render: function(){
    return (
      <div className="form-group">
        <input type="text" placeholder="Compose Message" className="form-control" value={this.state.chat} onChange={this.handleChange} onKeyDown={this.handleSubmit} />
      </div>
    )
  }
});

module.exports = AddChat;