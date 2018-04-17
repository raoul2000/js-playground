function notifyError(error) {
  console.error(error);
}


function showReports() {
  document.getElementById("report-list").style.display = "inherit";
  document.getElementById("live-report").style.display = "none";
}

function showLiveReport() {
  document.getElementById("report-list").style.display = "none";
  document.getElementById("live-report").style.display = "inherit";
}




$( document ).ready(function() {
  console.log('ready');
  document.getElementById('reports-onair').addEventListener('click',(event) => {
    console.log("click");
    if( event.target.dataset.reportId && event.target.dataset.onair === "true") {
      showLiveReport();
      viewLive.loadReport(event.target.dataset.reportId, APIClient, notifyError);
    }
  });

  document.getElementById('btn-refresh').addEventListener('click',(event)=> {
    viewLive.refreshReport(APIClient, notifyError);
  })
  showReports();
  viewReport.loadReportList(APIClient, notifyError);
});
