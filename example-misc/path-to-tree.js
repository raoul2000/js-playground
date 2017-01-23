var fs = require('fs');

/**
 * Turns a list of absolute path into a tree data structure
 */


function createNode(name) {
    return {
        'name'    : name,
        'children': []
    };
}

function findNodeInChildren(parent, name) {
    for (var i = 0; i < parent.children.length; i++) {
        if (parent.children[i].name == name) {
            return parent.children[i];
        }
    }
    return null;
}

function parsePath(baseNode, path) {
    var parent = baseNode; // initial parent is the baseNode
    path.split('/').filter(function(item) {
        return item.trim().length !== 0;
    }).forEach(function(folderName, idx) {
        currentParent = findNodeInChildren(parent, folderName);
        if (currentParent === null) {
            var newNode = createNode(folderName);
            parent.children.push(newNode);
            parent = newNode;
        } else {
            parent = currentParent;
        }
    });
    return baseNode;
}

function parse(pathList) {
    var doc = {
        'root': createNode('/')
    };
    pathList.forEach(function(path) {
        parsePath(doc.root, path);
    });
    return doc;
}

var doc = parse(["/RED", "/RED/GREEN", "/GREEN", "/RED/GREEN/RED",
    "/RED/GREEN/BLUE", "/RED/GREEN/PURPLE/1/2/3"
]);

var strResult = JSON.stringify(doc);
console.log(strResult);
fs.writeFileSync(__dirname + "/index-2.json", strResult, "utf-8");
