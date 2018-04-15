
let APIClient = {
  getReport : function(id) {
    return new Promise( (resolve, reject) => {
      $.getJSON("/reports/"+id,resolve)
      .fail(reject);
    });

  },
  /**
   * GET the list of all available reports
   * @return {Promise} resolved with an array of reports
   */
  getReports : function() {
    return new Promise( (resolve, reject) => {
      $.getJSON("/reports",resolve)
      .fail(reject);
    });
  }
};
