Let's play with XML and XPath to explore features and limitations.

# Requirements

- [Nodejs](https://nodejs.org/en/)
- [Mocha](https://github.com/mochajs/mocha)
- [Chai](http://chaijs.com/)

# Installation
From the `example-xml` folder :

    npm install

For this example, the Mocha testing framework is used. Install is globally if not already done.

	npm install -g mocha 
	 
# Usage

In this example we are using a testing frameworw and assertion library. To run all tests in a row :

	npm test


## xml2js

Run the tests : 

	mocha test-xml2js.js
	
[xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) is a module to convert an XML string into a JSON object.

**limitations** : 
- external or internal DTD is simply ignored but the document is entirely parsed *if it doesn't contains entities* (which brings us to the second limitation)
- entities in an XML document is not supported (parse error)

## xmldom

Run the tests :

	mocha test-xmldom.js
	
[xmldom](https://github.com/jindw/xmldom) is a  JavaScript implementation of W3C DOM for Node.js.

**limitations**:
- external or internal DTD is ignored
- entities are not resolved and a warning message is logged

Example : 

	entity not found:&ENTITY_1;
	@#[line:3,col:2]

##xpath

Run the tests :
 
	mocha test-xpath.js
		
[xpath](https://github.com/goto100/xpath) is a DOM 3 Xpath implemention and helper for node.js. It requires an xml engine and *xmldom* is used for these tests.

After some tests, basics XPath expressions are correctly evaluated.
