let liveTimer = {

  refreshRateSeconds: 5,
  timer: null,
  initialize: function(cb) {
    if (liveTimer.timer !== null) {
      console.warn("liveTimer already initialized : ignored");
      return;
    }
    liveTimer.timer = new Timer();
    NProgress.configure({
      trickle: false,
      showSpinner: false,
      minimum: 0
    });

    liveTimer.timer.addEventListener('secondTenthsUpdated', function(e) {
      // update nanobar progress
      let currentTenthSec = liveTimer.timer.getTotalTimeValues().secondTenths;
      let totalTenthSec = (liveTimer.refreshRateSeconds * 10);
      let progress = (100 - Math.ceil((100 * currentTenthSec) / totalTenthSec)) / 100;
      NProgress.set(progress);
    });

    liveTimer.timer.addEventListener('targetAchieved', function(e) {
      console.log("BOUM");
      liveTimer.timer.stop();
      NProgress.done();
      NProgress.remove();

      cb();

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
    NProgress.start();
  },
  stop: function() {
    liveTimer.timer.stop();
    NProgress.remove();
  }
};
