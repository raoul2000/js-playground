const faker = require('faker');
const fs = require('fs');

function createItems(reportId) {
  let items = [];
  for (var i = 0; i < 4; i++) {
    items.push({
      "id" : i,
      "content" : faker.lorem.sentence()
    });
  }
  return items;
}

module.exports = () => {
  const data = { reports: [] }
  for (let i = 0; i < 10; i++) {
    data.reports.push({
      "id": i,
      "title": `title ${i}`,
      "onair" : false,
      "author" : faker.name.findName(),
      "items" : createItems(i)
    });
  }
  return data
}
