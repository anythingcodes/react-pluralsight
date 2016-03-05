"use strict";
var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;
// use strict is not in place here because there are global variables, e.g. the jQuery
//$ = jQuery = require('jquery'); // two different ways to reference jQuery -- define it globally since Bootstrap expects it in global namespace

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header />
                <div className="container-fluid">
                  <RouteHandler />
                </div>
            </div>
        );
    }
});

module.exports = App;
