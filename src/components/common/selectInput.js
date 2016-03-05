"use strict";

var React = require('react');

var SelectInput = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.array.isRequired,
    error: React.PropTypes.string
  },

  select: function(item) {
    this.props.selected = item;
  },

  renderOptions: function() {
    var options = [];
    for(var i = 0; i < this.props.value.length; i++) {
      var rItem = this.props.value[i];
      var rItemName = rItem.firstName + " " + rItem.lastName;

      if(rItemName === this.props.selected.name) {
          options.push(<option key={rItem.id} onClick={this.select.bind(null, rItem)} value={rItemName} selected>{rItem.firstName} {rItem.lastName}</option>);
      }
      else {
          options.push(<option key={rItem.id} onClick={this.select.bind(null, rItem)} value={rItemName}>{rItem.firstName} {rItem.lastName}</option>);
      }
    }

    return options;
  },

  render: function() {
    var wrapperClass = 'form-group';
    if(this.props.error && this.props.error.length > 0) {
      wrapperClass += " " + "has-error";
    }

    return (
      <div className={wrapperClass}>
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <div className="field">

          <select
            name={this.props.name}
            className="form-control"
            ref={this.props.name}
            onChange={this.props.onChange}
            value={this.props.author}>

              {this.renderOptions()}

            </select>

          <div className="input">{this.props.error}</div>
        </div>
      </div>
    );
  }
});

module.exports = SelectInput;
