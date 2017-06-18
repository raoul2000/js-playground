"use strict";

/**
 * Replace XML entities with their values based on the dictionary hash. When an entity is not
 * found in dictionary, the errorHandler function is called with the name of the unresolved entity as
 * argument.
 *
 * Dictionary hash Example :
 * {
 * 		'ENTITY_1' : 'value entity1',
 * 		'ENTITY_2' : 'another value'
 * }
 */
function entityResolver (str, dictionary, errorHandler){
	var reEntity = /&([0-9a-zA-Z_]+);/g;
	var defaultEntity = {
		"quot" : "ENT_QUOT"
	};
	return str
		.split('\n')
		.map(
			function(line) {
				var resultLine  = line,
				    entityValue = '',
				    entityName  = '',
				    match;

				while ( (match = reEntity.exec(line) )) {
					entityName  = match[1];
					if( dictionary.hasOwnProperty(entityName) === false) {
						entityValue = defaultEntity.hasOwnProperty(entityName) ?
								defaultEntity[entityName]
							: errorHandler(entityName);
					} else {
						entityValue = dictionary[entityName];
					}

					resultLine = resultLine.replace(
						new RegExp('&'+entityName+';', 'g'),
						entityValue
					);
				}
				return resultLine;
			}
		)
		.join("\n");
}
exports.entityResolver = entityResolver;
