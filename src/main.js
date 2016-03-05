"use strict";
var React = require('react');
var Router = require('react-router');
var routes = require('./routes');
var InitializeActions = require('./actions/initializeActions');

InitializeActions.initApp();

Router.run(routes, function(Handler){
  React.render(<Handler />, document.getElementById('app'));
}); // to remove hashes from URL, pass in Router.HistoryLocation as second param to run
