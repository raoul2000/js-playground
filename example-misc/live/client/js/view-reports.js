
let viewReport = {
  renderOnAir : function(reports) {
    document.getElementById('reports-onair').innerHTML = `
    <h2>on Air</h2>
    <hr/>
    <ul>`.concat(reports.map(report => {
      return `<li data-report-id="${report.id}" data-onair="true">${report.title}</li>`;
    }).join(' ')).concat('</ul>');
  },

  renderArchived : function(reports) {
    document.getElementById('reports-archived').innerHTML = `
    <h2>Archived</h2>
    <hr/>
    <ul>`.concat(reports.map(report => {
      return `<li data-report-id="${report.id}" data-onair="true">${report.title}</li>`;
    }).join(' ')).concat('</ul>');
  },

  render : function(reports) {
    viewReport.renderOnAir(reports.filter(report => report.onair === true));
    viewReport.renderArchived(reports.filter(report => !report.onair));
  },

  loadReportList : function(APIClient, notifyError) {
    APIClient.getReports()
      .then(viewReport.render)
      .catch(notifyError);
  }
};
