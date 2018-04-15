
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
// TODO : reverse MODIFIES the array !!
  render : function(report) {
    debugger;
    if( viewLive.current === null) {
      report.items.reverse().forEach( viewLive.renderItem);
      viewLive.current = report;
    } else {
      let newItems = [];
      report.items.find( newItem => {
        if( newItem.id !== viewLive.current.items[0].id) {
          debugger;
          newItems.push(newItem);
          //viewLive.renderItem(newItem);
          return false;
        } else {
          return true;
        }
      });
      console.log("new items = ", newItems);
      newItems.reverse().forEach( viewLive.renderItem );
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
