var React = require('react');

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
        </div>
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
);