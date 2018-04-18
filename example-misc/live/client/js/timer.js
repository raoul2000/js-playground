let liveTimer = {
  nanobar: null,
  refreshRateSeconds: 2,
  timer: null,
  initialize: function(cb) {
    if (liveTimer.timer !== null) {
      console.warn("liveTimer already initialized : ignored");
      return;
    }
    liveTimer.timer = new Timer();
    liveTimer.nanobar = new Nanobar({
      id: 'nano-live-report',
      class: 'nano-style'
    });

    liveTimer.timer.addEventListener('secondTenthsUpdated', function(e) {
      // update nanobar progress
      let currentTenthSec = liveTimer.timer.getTotalTimeValues().secondTenths;
      let totalTenthSec = (liveTimer.refreshRateSeconds * 10);
      let progress = 100 - Math.ceil((100 * currentTenthSec) / totalTenthSec);
      liveTimer.nanobar.go(progress);
    });

    liveTimer.timer.addEventListener('targetAchieved', function(e) {
      console.log("BOUM");
      liveTimer.stop();
      //liveTimer.hideProgress();
      //liveTimer.nanobar.go(0);
      cb();
      /*
      setTimeout(() => {
        liveTimer.timer.reset();
      }, 1000);
      */

      //liveTimer.timer.reset();
      //liveTimer.showProgress();
      liveTimer.start();
    });
    return liveTimer;
  },
  start: function() {
    liveTimer.timer.start({
      precision: 'secondTenths',
      countdown: true,
      startValues: {
        seconds: liveTimer.refreshRateSeconds
      }
    });
    return liveTimer;
  },
  stop: function() {
    liveTimer.timer.stop();
    return liveTimer;
  },
  reset: function() {
    liveTimer.timer.reset();
    return liveTimer;
  },
  hideProgress: function() {
    document.getElementById('nano-live-report').style.display = "none";
    return liveTimer;
  },
  showProgress: function() {
    document.getElementById('nano-live-report').style.display = "inherit";
    return liveTimer;
  }
};
