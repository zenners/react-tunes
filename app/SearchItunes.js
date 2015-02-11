var React = require('react');
var $ = require('jquery');

var SearchItunes = React.createClass({
  getInitialState: function(){
    return {
      search: '',
      entity: 'musicTrack'
    }
  },
  propTypes: {
    cb: React.PropTypes.func.isRequired
  },
  handleChange: function(e){
    this.setState({
      search: e.target.value
    })
  },
  formatURL: function(){
    var url = 'https://itunes.apple.com/search?term=';
    return url + this.state.search + '&entity=' + this.state.entity;
  },
  handleSelectChange: function(e){
    this.setState({
      entity: e.target.value
    });
  },
  handleSubmit: function(){
    var url = this.formatURL();
    $.ajax({
      url: url,
      dataType: 'JSONP',
      error: function(data) {
        console.log('Error on getting iTunes Data: ', data);
      },
      success: function(data) {
        this.props.cb(data.results);
      }.bind(this)
    })
  },
  render: function(){
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="input-group-inline col-sm-4">
            <input type="text" className="form-control" value={this.state.search} onChange={this.handleChange} />
          </div>
          <div className="input-group-inline col-sm-4">
            <select className="form-control" value={this.state.entity} onChange={this.handleSelectChange}>
              <option value="musicTrack">Music</option>
              <option value="movie">Movie</option>
            </select>
          </div>
          <div className="input-group-inline col-sm-4">
            <button className="btn btn-primary" onClick={this.handleSubmit}> Get Info </button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SearchItunes;