"use strict";

const cheerio = require('cheerio');
const jsdom   = require("jsdom");

exports.options = {
  "jsdom" : true
};

/**
 * Parse an HTML string and returns the result document.
 * 2 parsers are available and they go along with the Selector engine:
 * - JSDOM + JQUery : the default
 * - cheerio : much faster but without special selectors provided by JQuery
 *
 * @param  {string} html the HTML string to parse
 * @return {object}      DOM document
 */
function parseHTML(html) {
  if( exports.options.jsdom === true ) {
    const dom = new jsdom.JSDOM(html);
    return require('jquery')(dom.window);
  } else {
    return cheerio.load(html);
  }
}


/**
 * Parse the type definition string passed as argumet.
 * Valid values for type are : "text", ["text"], "html", ["html"], "@attr", ["@attr"]
 * or any model object "{}" or ["{}"]
 *
 * Example :
 *   - type = ["text"]
 *   - result = {
 *      type     : "text",
 *      isArray  : true,
 *      isObject : false
 *    }
 *
 * @param  {string} type the type definition
 * @return {object}      the parsed type
 */
function parseType(type){
  let result;
  if(Array.isArray(type) && type.length > 0) {
    result = {
      type     : type[0],
      isArray  : true,
      isObject : typeof type[0] === 'object'
    };
  } else if(typeof type === 'string') {
    if( ! type.startsWith('@') &&
       ["text", "html" ].indexOf(type) === -1 )
    {
      throw new Error("invalid type value : "+type);
    }

    result = {
      type     : type,
      isArray  : false,
      isObject : false
    };
  } else if( typeof type === 'object') {
    result = {
      type     : type,
      isArray  : false,
      isObject : true
    };
  }else {
    throw new Error("invalid type");
  }
  return result;
}

/**
 * [extractPrimitiveValue description]
 * @param  {[type]} valueDef [description]
 * @param  {[type]} selector [description]
 * @param  {[type]} html     [description]
 * @return {[type]}          [description]
 */
function extractPrimitiveValue(valueDef, selector, html) {

  let $ = parseHTML(html);

  let result = null;
  try {
    if( valueDef.type === 'text' ){ ////////////////////////////
      if( valueDef.isArray === true) {
        result = [];
        $(selector).each(function(i,elem){
          result.push($(elem).text());
        });
      } else {
        result = $(selector).first().text();
      }
    }
    else if ( valueDef.type === "html") { /////////////////////
      if( valueDef.isArray === true) {
        result = [];
        $(selector).each(function(i,elem){
          result.push($(elem).html());
        });
      } else {
        result = $(selector).first().html();
      }
    }
    else if ( valueDef.type.startsWith('@')) { ///////////////
      let attrName = valueDef.type.substring(1);
      if( valueDef.isArray === true) {
        result = [];
        $(selector).each(function(i,elem){
          result.push($(elem).attr(attrName));
        });
      } else {
        result = $(selector).first().attr(attrName);
      }
    }
  } catch (e) {
    console.error("failed to extract primitive value");
    console.error(e);
    throw e;
  }
  return result;
}

/**
 * Extracts a single property from the html string.
 * model = {
 *  'selector' : 'div.article', // Mandatory
 *  'type' : 'text' // optional
 * }
 * shortcuts :
 * model = "selector"
 * model = ["selector"]
 *
 * Note that if model.type is an object, the 'extractObject' function
 * is called (recursive)
 *
 * @param  {object|string} model object describing the property to extract or
 * selector when provided as a string
 * @param  {string} html  the HTML string the property is extracted from
 * @return {object | string}       the property
 */
function extractProperty(propertyDefinition, html) {

  // validate model
  if( Array.isArray(propertyDefinition)){
    if( propertyDefinition.length !== 1) {
      throw new Error("array must contain exactly one selector");
    }
  }
  else if( typeof propertyDefinition === 'object') {
    if( ! propertyDefinition.hasOwnProperty('selector') ) {
      throw new Error("missing property 'selector'");
    }
  } else if(typeof propertyDefinition !== 'string') {
    throw new Error("string or object expected");
  }

  // process propertyDefinition

  let model = propertyDefinition;
  if( typeof propertyDefinition === 'string') {
    model = {
      "type"     : "text",
      "selector" : propertyDefinition
    };
  } else if( Array.isArray(propertyDefinition)) {
    model = {
      "type"     : ["text"],
      "selector" : propertyDefinition[0]
    };
  }

  var parsedType = parseType(model.type || "text");

  if( parsedType.isObject === true) {
    const $ = parseHTML(html)

    if( ! parsedType.isArray ) {
      // mine single object
      return extractObject(model.type, $(model.selector).first().html());
    } else {
      // mine an array of objects
      let objects = [];
      $(model.selector).each(function(i,elem){
        objects.push(
          extractObject(parsedType.type, $(elem).html())
        );
      });
      return objects;
    }
  }
  else {
    return extractPrimitiveValue(parsedType, model.selector, html);
  }
}

/**
 * Extract all properties defined in the model, from the html.
 *
 *
 * @param  {object} model properties definition
 * @param  {text} html  the mine
 * @return {object}       result of the mining
 */
function extractObject(model, html) {
  var result = {};
  let modelKeys = Object.keys(model);
  for (var i = 0; i < modelKeys.length; i++) {
    var propertyName         = modelKeys[i];
    var propertyDefinition   = model[propertyName];

    if( typeof propertyDefinition === 'object' && propertyDefinition.jumpTo) {
      let targetUrl = extractProperty(propertyDefinition.jumpTo, html);

      require('./miner').start(targetUrl,propertyDefinition.jumpTo.then)
      .then( extract => {
          result[propertyName] = extract.data;
      });
    } else {
      result[propertyName] = extractProperty(propertyDefinition, html);
    }
  }
  return result;
}

/**
 * Mine the HTML according to the extractionPlan.
 * The extraction plan can be a simple string representing a selector,
 *
 *
 * @param  {mixed} extractionPlan describe how to mine
 * @param  {string} html           the data to explore
 * @return {Promise}
 */
exports.mine = function(extractionPlan, html) {

  return new Promise( (resolve, reject) => {
    if( ! extractionPlan ) {
      reject("invalid extraction plan");
    }
    else if( typeof extractionPlan === "string")
    {
      // the extractionPlan is considered as a selector
      let selector = extractionPlan;
      let parsedType = parseType("text");
      resolve(extractPrimitiveValue(parsedType, selector, html));
    }
    else if( Array.isArray(extractionPlan))
    {
      // the extractionPlan is a actually a list of extraction plans
      resolve(extractionPlan.map( plan => exports.mine(plan, html)));
    }
    else if( typeof extractionPlan === "object")
    {
      // the extraction plan is a complex object
      resolve(extractObject(extractionPlan, html));
    }
    else
    {
      reject("unsupported extraction plan");
    }
  });
};
