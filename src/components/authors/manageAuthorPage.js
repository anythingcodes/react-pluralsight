"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var Toastr = require('toastr');

var ManageAuthorPage = React.createClass({

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
      author: { id: '', firstName: '', lastName: '' },
      errors: { },
      dirty: false
    };
  },

  componentWillMount: function() {
    // set state before rendering occurs, which is why we don't use componentDidMount
    var authorId = this.props.params.id; // from the path '/author:id'
    if(authorId) {
      this.setState({author: AuthorStore.getAuthorById(authorId)}); // won't fire twice since componentWillMount is called before the method is rendered
    }
    return {

    };
  },

  setAuthorState: function(event) {
    this.setState({ dirty: true });
    var field = event.target.name;
    var value = event.target.value;
    this.state.author[field] = value;
    return this.setState({author: this.state.author});
  },

  authorFormIsValid: function() {
    var formIsValid = true;
    this.state.errors = {}; // clear any previous errors

    if (this.state.author.firstName.length < 3) {
      this.state.errors.firstName = 'First name must be at least 3 characters.';
      formIsValid = false;
    }

    if (this.state.author.lastName.length < 3) {
      this.state.errors.lastName = 'Last name must be at least 3 characters.';
      formIsValid = false;
    }

    this.setState({errors: this.state.errors });
    return formIsValid;

  },

  saveAuthor: function(event) {
    event.preventDefault(); // need to capture and then use JS, not submit on page
    if(!this.authorFormIsValid()) {
      return;
    }

    if(this.state.author.id) {
      // ID exists --> update instead of save
      AuthorActions.updateAuthor(this.state.author);
    } else {
      AuthorActions.createAuthor(this.state.author);
    }

    this.setState({dirty: false});
    Toastr.success('Author saved.');
    this.transitionTo('authors');
  },

  render: function() {
    return (
      <AuthorForm
        author={this.state.author}
        onChange={this.setAuthorState}
        onSave={this.saveAuthor}
        errors={this.state.errors} />
    );
  }
});

module.exports = ManageAuthorPage;
