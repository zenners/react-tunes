var React = require('react');
var SearchItunes = require('./SearchItunes');
var Griddle = require('griddle-react');


var ImageComponent = React.createClass({
  render: function() {
    return (
      <img src={this.props.data} />
    );
  }
});

var Loading = React.createClass({
  render: function (){
    return(
      <span> Loading... </span>
    )
  }
});

var UrlComponent = React.createClass({
  render: function() {
    return (
      <a href={this.props.data}> {this.props.rowData.trackName} </a>
    );
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {
      data:'' 
    };
  },

  updateState: function(info){
    this.setState({
      data: info
    })
  },

  render: function(){
    var panelStyle={
      marginTop: 50,
      border: 0
    };
    var griddleMeta = [
      {columnName: 'trackName',displayName: 'Name'},
      {columnName: 'artistName',displayName: 'Artist'},
      {columnName: 'primaryGenreName',displayName: 'Genre'},
      {columnName: 'artworkUrl100',displayName: 'Artwork',customComponent: ImageComponent},
      {columnName: 'trackPrice',displayName: 'Price'},{columnName: 'kind',displayName: 'Type'},
      {columnName: 'trackViewUrl',displayName: 'Online Link',customComponent: UrlComponent}
    ];
    return (
      <span>
        <div className="navbar navbar-default navbar-fixed-top" role="navigation">
          <div className="container">
            <div className="row">
              <div className="col-sm-6">
                <SearchItunes cb={this.updateState} />
              </div>
            </div>
          </div>
        </div>
        <div className="panel panel-default" style={panelStyle}>
          <div className="panel-heading">
            {!this.state.data ? <span>Make a Search</span> : <span>Your Search results</span>}
          </div>
          <Griddle results={this.state.data} 
                     tableClassName="table"
                     columns={["trackName", "artistName", "primaryGenreName", "artworkUrl100", "trackPrice", "trackViewUrl" ]} 
                     columnMetadata={griddleMeta}
                     enableInfiniteScroll={true}
                     resultsPerPage={5}
                     loadingComponent={Loading}
                     useFixedHeader={true}
                     bodyHeight={400} />
        </div>
          
      </span>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
);
