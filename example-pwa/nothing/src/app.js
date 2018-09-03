import './style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

window.app = {
    installPromptEvent : null,
    btnInstall : null,
    logger:null,
    /**
     * Start the app.
     * This is the app entry point in charge of installing handlers
     */
    run : function() {
        console.log('running App');
        this.logger = document.querySelector('#logger');
        this.log("initializing the Nothing App");

        this.btnInstall = document.querySelector('#install');
        this.registerServiceWorker();
        this.registerCustomInstaller();
        this.installRandomImage();
    },
    /**
     * based on https://developers.google.com/web/fundamentals/app-install-banners/#detect-mode
     */
    isRunningStandalone : function(){
        if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) {
            return true;
        } else if (window.navigator.standalone === true) {
            // safari
            return true;
        } else {
            return false;
        }
    },
    /**
     * Add a new log message into the page
     */
    log : function(msg) {
        console.log(msg);
        var newEntry = document.createElement('div');
        newEntry.textContent = '> ' + msg;

        var firstEntry = this.logger.querySelector('.entry');
        if(firstEntry) {
            this.logger.insertBefore(newEntry,firstEntry);
        } else {
            this.logger.appendChild(newEntry);
        }
    },
    /**
     * Install Event handler so to display random image when user click
     * on the refresh button
     */
    installRandomImage : function() {
        var img = document.querySelector('#random-image > img');
        var that = this;
        img.addEventListener('error',function() {
            that.log('failed to load image');
            img.setAttribute('src',"/images/404.png");
        });
        document.querySelector("#random-image > button").addEventListener('click', function(ev) {
            img.setAttribute('src',"https://picsum.photos/500/500/?random?_="+Math.random());
        });
    },
    /**
     * Register Service Worker.
     * This is required for PWA
     */
    registerServiceWorker : function() {
        var that = this;
        this.log('trying to register ServiceWorker');
        if ('serviceWorker' in navigator) {
            this.log('ServiceWorker is supported : registering my own');
            navigator.serviceWorker
                .register('./sw.js')
                .then(function () {
                    that.log('Service Worker Registered For Nothing');
            });
        }    
    },
    /**
     * Register behavior for the A2HS (Add 2 HomeScreen) feature
     */
    registerCustomInstaller : function() {
        if( this.isRunningStandalone() === true) {
            this.log("running in standalone mode : I'm not going to setup a custom A2HS handler");
            return;
        }
        this.log('installing custom A2HS handler');
        var that = this;

        window.addEventListener('appinstalled', function()  {
            that.log('Great !! Nothing has been successfully added to the home screen');
          });
          
        window.addEventListener('beforeinstallprompt', function (event) {
            event.preventDefault();
            that.installPromptEvent = event;
            that.btnInstall.removeAttribute('disabled');
        });
    
        this.btnInstall.addEventListener('click', function () {
            that.btnInstall.setAttribute('disabled', '');
            that.installPromptEvent.prompt();
            that.installPromptEvent.userChoice.then((choice) => {
                if (choice.outcome === 'accepted') {
                    that.log('User accepted the A2HS prompt');
                } else {
                    that.log('User dismissed the A2HS prompt');
                }
                that.installPromptEvent = null;
            });
        });    
    }
}