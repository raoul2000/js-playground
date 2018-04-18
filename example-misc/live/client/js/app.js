


// Time and Progress bar ///////////////////////////////////////////////////


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

function initApp() {
  console.log('ready');
  let appElement = document.getElementById('afp-liveReport-app');

  liveTimer.initialize(() => {
    viewLive.refreshReport(APIClient, notifyError);
  });

  appElement.addEventListener('click',(event) => {
    if( event.target.dataset.reportId ) {
      viewLive.loadReport(event.target.dataset.reportId, APIClient, notifyError);
      showLiveReport();
      if (event.target.dataset.onair === "true") {
        liveTimer.start();
      }
    }
  });

  document.getElementById('btn-refresh').addEventListener('click',(event)=> {
    liveTimer.stop();
    viewLive.refreshReport(APIClient, notifyError);
    liveTimer.start();
  });

  document.getElementById('btn-view-report-list').addEventListener('click',(event)=> {
    liveTimer.stop();
    showReports();
  });

  viewReports.loadReportList(APIClient, notifyError);
  showReports();
}

var bootstrap = function(evt){
  if (evt.target.readyState === "complete") {
    initApp();
  }
}
document.addEventListener('readystatechange', bootstrap, false);
