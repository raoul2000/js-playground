"use strict";

const cheerio = require('cheerio');

function parseString(val) {
  if(val) {
    return val.trim();
  } else {
    return null;
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
  const $ = cheerio.load(html);

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
 * Note that if model.type is an object, the 'extractObject' function
 * is called (recursive)
 *
 * @param  {object} model object describing the property to extract
 * @param  {string} html  the HTML string the property is extracted from
 * @return {object | string}       the property
 */
function extractProperty(model, html) {

  // validate model
  if( typeof model !== 'object' ) {
    throw new Error("object expected");
  }
  else if( ! model.hasOwnProperty('selector')) {
    throw new Error("missing selector");
  }
  // process model
  var parsedType = parseType(model.type || "text");

  if( parsedType.isObject === true) {
    const $ = cheerio.load(html);

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
 * If
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

    result[propertyName] = extractProperty(propertyDefinition, html);
  }
  return result;
}

/**
 * Mine the HTML according to the extractionPlan
 *
 * @param  {mixed} extractionPlan describe how to mine
 * @param  {string} html           the data to explore
 * @return {mixed}                mining result
 */
exports.mine = function(extractionPlan, html) {

  if( typeof extractionPlan === "string")
  {
    // the extractionPlan is considered as a selector
    let selector = extractionPlan;
    let parsedType = parseType("text");
    return extractPrimitiveValue(parsedType, selector, html);
  }
  else if( Array.isArray(extractionPlan))
  {
    // the extractionPlan is a list os selectors
    return extractionPlan.map( selector => exports.mine(selector, html));
  }
  else
  {
    return extractObject(extractionPlan, html);
  }
};
