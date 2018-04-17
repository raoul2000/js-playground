

let viewLive = {
  current : null,
  itemsContainer : null,

  getItemContainerNode : function() {
    if( ! viewLive.itemsContainer) {
      viewLive.itemsContainer = document.getElementById('report-items');
    }
    return viewLive.itemsContainer;
  },

  createItemHTML : function(item) {
    return  `<div>${item.content}</div>`;
  },

  createItemNode : function(item) {
    var itemNode = document.createElement("div");
    itemNode.innerHTML = viewLive.createItemHTML(item);
    return itemNode;
  },

  renderItem : function(item) {
    viewLive.getItemContainerNode().insertAdjacentElement('afterbegin',  viewLive.createItemNode(item));
  },
  
  render : function(report) {
    if( viewLive.current === null) {
      // reverse loop to first push the oldest item
      for (var i = report.items.length - 1; i >= 0; --i) {
        viewLive.renderItem(report.items[i]);
      }
      viewLive.current = report;
    } else {
      let newItems = [];
      report.items.find( newItem => {
        if( newItem.id !== viewLive.current.items[0].id) {
          newItems.push(newItem);
          return false;
        } else {
          return true;
        }
      });
      console.log("new items = ", newItems);
      for (var i = newItems.length - 1; i >= 0; --i) {
        viewLive.renderItem(newItems[i]);
      }
      viewLive.current.items = report.items;
    }
  },

  loadReport : function(reportId, APIClient, notifyError) {
    viewLive.currentReport = null;
    APIClient.getReport(reportId)
      .then(viewLive.render)
      .catch(notifyError);
  },

  refreshReport : function(APIClient, notifyError) {
    APIClient.getReport(viewLive.current.id)
      .then(viewLive.render)
      .catch(notifyError);
  }

};
