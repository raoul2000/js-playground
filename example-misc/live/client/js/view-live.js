
let viewLive = {
  current : null,
  renderItem : function(item) {
    console.log(item.id);
    let itemsContainer = document.getElementById('report-items');
    if( itemsContainer.childElementCount === 0) {
      itemsContainer.innerHTML = `<div>${item.content}</div>`;
    } else {
      var newNode = document.createElement("div");
      newNode.innerHTML = item.content;
      itemsContainer.insertAdjacentElement('afterbegin', newNode);
      //itemsContainer.insertBefore(newNode, itemsContainer.firstChild);
    }
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
