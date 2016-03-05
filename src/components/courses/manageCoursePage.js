"use strict";

var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseActions = require('../../actions/courseActions');
var CourseStore = require('../../stores/courseStore');
var AuthorStore = require('../../stores/authorStore');
var Toastr = require('toastr');

var ManageCoursePage = React.createClass({

  mixins: [
    Router.Navigation
  ],

  statics: {
    willTransitionFrom: function(transition, component) {
      if (component.state.dirty && !confirm('Leave without saving?')) // has data been entered that hasn't been saved yet?
      {
        transition.abort();
      }
    }
  },

  getInitialState: function() {
    return {
      course: { id: '', title: '', author: '', category: '', length: '' },
      errors: { },
      dirty: false
    };
  },

  componentWillMount: function() {
    // set state before rendering occurs, which is why we don't use componentDidMount
    var courseId = this.props.params.id; // from the path '/course:id'
    if(courseId) {
      this.setState({course: CourseStore.getCourseById(courseId), authors: AuthorStore.getAllAuthors() }); // won't fire twice since componentWillMount is called before the method is rendered
    }
    return {

    };
  },

  setCourseState: function(event) {
    this.setState({ dirty: true });
    var field = event.target.name;
    var value = event.target.value;
    this.state.course[field] = value;
    return this.setState({course: this.state.course});
  },

  courseFormIsValid: function() {
    var formIsValid = true;
    this.state.errors = {}; // clear any previous errors

    if (this.state.course.title.length < 3) {
      this.state.errors.title = 'Title must be at least 3 characters.';
      formIsValid = false;
    }

    if (this.state.course.author.length < 1) {
      this.state.errors.author = 'Must enter an author name.';
      formIsValid = false;
    }

    this.setState({errors: this.state.errors });
    return formIsValid;

  },

  saveCourse: function(event) {
    event.preventDefault(); // need to capture and then use JS, not submit on page
    if(!this.courseFormIsValid()) {
      return;
    }


    if(this.state.course.id) {
      // ID exists --> update instead of save
      CourseActions.updateCourse(this.state.course);
    } else {
      CourseActions.createCourse(this.state.course);
    }

    this.setState({dirty: false});
    Toastr.success('Course saved.');
    this.transitionTo('courses');
  },

  render: function() {
    return (
      <CourseForm
        authors={this.state.authors}
        course={this.state.course}
        onChange={this.setCourseState}
        onSave={this.saveCourse}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageCoursePage;
