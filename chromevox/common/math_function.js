// Copyright 2013 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Initialize Math Function mappings.
 * @author sorge@google.com (Volker Sorge)
 */

goog.provide('cvox.MathFunction');

goog.require('cvox.MathAtom');

/**
 * Create a function mapping.
 * @param {Array.<Object>} atoms Array of initial mappings for
 * some elementary functions.
 * @constructor
 */
cvox.MathFunction = function(atoms) {
  /**
   * Dictionary of common mathematical function names.
   * @type {Object.<string, cvox.MathAtom>}
   * @private
   */
  this.FUNCTION_MAP_ = {};

  /**
   * List of unique domain names occuring in function mappings.
   * @type {Array.<string>}
   */
  this.domains = [];

  /**
   * List of unique style names occuring in function mappings.
   * @type {Array.<string>}
   */
  this.styles = [];

  /**
   * Initialize the dictionary.
   */
  this.initFunctionMap_(atoms);
};


/**
 * Initializes the mapping for the mathematical functions.
 * @param {Array.<Object>} atoms Array of initial mappings for
 * some elementary functions.
 * @private
 */
cvox.MathFunction.prototype.initFunctionMap_ = function(atoms) {
  var domains = [];
  var styles = [];

  for (var i = 0, func; func = atoms[i]; i++) {
    var funcObject = new cvox.MathAtom(
        func.key, func.category,
        cvox.MathAtom.mappingsFromJSON(func['mappings']));
    this.FUNCTION_MAP_[func.key] = funcObject;
    domains = cvox.MathUtil.union(domains, funcObject.allDomains());
    styles = cvox.MathUtil.union(styles, funcObject.allStyles());
    for (var j = 0, key; key = func['names'][j]; j++) {
      this.FUNCTION_MAP_[key] = funcObject;
    }
  }
  this.domains = domains;
  this.styles = styles;
};


/**
 *  Retrieves the Atom object for a given function name.
 * @param {string} name of the function.
 * @return {?cvox.MathAtom} The Atom if it exists.
 */
cvox.MathFunction.prototype.getFunctionByName = function(name) {
  // Here we assume that the string has been previously parsed
  // into a sensible format.
  return this.FUNCTION_MAP_[name];
};