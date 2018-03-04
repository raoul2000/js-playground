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
 * Valid avlues for type : "text", ["text"], "html", ["html"], "@attr", ["@attr"]
 * or any model object "{}" or ["{}"]
 *
 * Example :
 *   - type = ["text"]
 *   - result = {
 *      type : "text",
 *      isArray : true,
 *      isObject : false
 *     }
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
    if( valueDef.type === 'text' ){
      if( valueDef.isArray === true) {
        result = [];
        $(selector).each(function(i,elem){
          result.push($(elem).text());
        });
      } else {
        result = $(selector).first().text();
      }
    }
    else if ( valueDef.type === "html") {
      if( valueDef.isArray === true) {
        result = [];
        $(selector).each(function(i,elem){
          result.push($(elem).html());
        });
      } else {
        result = $(selector).first().html();
      }
    }
    else if ( valueDef.type.startsWith('@')) {
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
    if( parsedType.isArray === true ) {
      let objects = [];
      $(model.selector).each(function(i,elem){
        objects.push(
          extractObject(parsedType.type, $(elem).html())
        );
      });
      return objects;
    } else {
      return extractObject(model.type, $(model.selector).first().html());
    }
  }
  else {
    return extractPrimitiveValue(parsedType, model.selector, html);
  }
}

/**
 * Extract all properties defined in the model, from the html
 *
 * @param  {object} model properties definition
 * @param  {text} html  the mine
 * @return {object}       result of the mining
 */
function extractObject(model, html) {
  var result = {};
  for (var i = 0; i < Object.keys(model).length; i++) {
    var propName  = Object.keys(model)[i];
    var propDef   = model[propName];

    result[propName] = extractProperty(propDef, html);
  }
  return result;
}

exports.mine = function(model, html) {
  return extractObject(model, html);
};
