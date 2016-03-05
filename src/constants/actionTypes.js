"use strict";

var keyMirror = require('react/lib/keyMirror');

/* module.exports = {
  CREATE_AUTHOR: CREATE_AUTHOR
  // use keyMirro as shorthand so you can define it as null below, and it gets copied over
};*/

module.exports = keyMirror({
  INITIALIZE: null,
  CREATE_AUTHOR: null,
  UPDATE_AUTHOR: null,
  DELETE_AUTHOR: null,
  CREATE_COURSE: null,
  UPDATE_COURSE: null,
  DELETE_COURSE: null
}); // like enum in C#
