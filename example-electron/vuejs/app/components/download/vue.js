"use strict";

var request = require('request');
var progress = require('request-progress');
var fs = require('fs');


Vue.component('download-item', {
  props: ['item'],
  data : function(){
    return {
      inProgress : false,
      progressPercent : 0,
      success : true,
      count : 0
    };
  },
	template: require('./template.html'),
  computed : {
    activeColor : function(){
      return this.success === true ? 'green' : 'red';
    },
    statusMessage : function() {
      return this.success ? 'success' : 'error';
    }
  },
  methods : {
    startDownload : function(item) {
      console.log("downloading ",item.url);
      this.inProgress = true;
      var that = this;
      progress(request(item.url))
      .on('progress',function(state){
        that.progressPercent = Math.floor((state.percent * 100));
        that.inProgress = true;
        console.log(state);
      })
      .on('error', function(error) {
        console.error(error);
        that.success    = false;
        that.inProgress = false;
        that.count++;
      })
      .on('end', function(){
        that.inProgress = false;
        that.success    = true;
        that.count++;
      })
      .pipe(fs.createWriteStream(__dirname + '/out.jpg'));
    }
  }
});
