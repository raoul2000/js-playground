
require('./components/download/vue');

var app = new Vue({
  el: '#app',
  data: {
		toDownload: [
      { name :'image0', url : 'https://dummyimage.com/600x400/000/fff'},
      { name :'image1', url : 'http://lorempixel.com/400/200/'},
      { name :'image2', url : 'http://lorempixel.com/400/200/'},
      { name : "big1.pdf", url :'http://scholar.princeton.edu/sites/default/files/oversize_pdf_test_0.pdf'},
      { name : "big2.pdf", url :'http://scholar.princeton.edu/sites/default/files/oversize_pdf_test_0.pdf'},
      { name : "error.pdf", url :'http://dummy.url'}
    ]
  }
});
