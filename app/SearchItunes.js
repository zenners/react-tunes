var React = require('react');
var $ = require('jquery');

var SearchItunes = React.createClass({
  propTypes: {
    cb:React.PropTypes.func
  },

  formatUrl: function(){
    var search = this.refs.searchInput.getDOMNode().value;
    var select = this.refs.selectInput.getDOMNode().value;
    return 'https://itunes.apple.com/search?term='+search+'&entity='+select;
  },

  handleSubmit: function(e){
      e.preventDefault();
      $.ajax({
        url: this.formatUrl(),
        type: 'POST',
        dataType: 'jsonp',
        success: function(data){
          console.log(data);
          this.props.cb(data.results);
          this.refs.searchInput.getDOMNode().value = '';
        }.bind(this)
      });
    
    
  },

  render: function(){
    return (
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.handleSubmit}>
          <div className="input-group-inline col-sm-4">
            <input type="text" className="form-control" ref="searchInput" />
          </div>
          <div className="input-group-inline col-sm-4">
            <select ref="selectInput" className="form-control">
              <option value="musicTrack"> Music </option>
              <option value="movie"> Movie </option>
            </select>
          </div>
          <div className="input-group-inline col-sm-4">
            <button  className="btn btn-primary"> Go Find It! </button>
          </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = SearchItunes;