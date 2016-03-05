"use strict";

var React = require('React');
var TextInput = require('../common/textInput');
var SelectInput = require('../common/selectInput');

var CourseForm = React.createClass({

  propTypes: {
    course: React.PropTypes.object.isRequired,
    onSave: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    errors: React.PropTypes.object
  },

  render: function() {
    return (
      <form>
        <h1>Manage Course</h1>

        <TextInput name="title" label="Title" onChange={this.props.onChange} value={this.props.course.title} error={this.props.errors.title} />

        <SelectInput name="author" label="Author" onChange={this.props.onChange} error={this.props.errors.author} value={this.props.authors} selected={this.props.course.author} />

        <TextInput name="category" label="Category" onChange={this.props.onChange} value={this.props.course.category} error={this.props.errors.category} />

        <TextInput name="length" label="Length" onChange={this.props.onChange} value={this.props.course.length} error={this.props.errors.length} />

        <input type="submit" value="Save" className="btn btn-default" onClick={this.props.onSave} />
      </form>
    );
  }

});

module.exports = CourseForm;
