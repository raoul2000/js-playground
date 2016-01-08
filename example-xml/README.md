Let's play with XML and XPath to explore features and limitations.

# Requirements

- [nodejs](https://nodejs.org/en/)
- [Mocha](https://github.com/mochajs/mocha)

# Installation
From the `example-xml` folder :

    npm install

For this example, the Mocha testing framework is used (installed globally).

	npm install -g mocha 
	 
# Usage

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

	
