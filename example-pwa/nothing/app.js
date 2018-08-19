console.log('loading app.js');

var app = {
    installPromptEvent : null,
    btnInstall : null,
    logger:null,
    run : function() {
        console.log('running App');
        this.logger = document.querySelector('#logger');
        this.log("initializing the Nothing App");

        this.btnInstall = document.querySelector('#install');
        this.registerServiceWorker();
        this.registerCustomInstaller();
    },
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
    registerCustomInstaller : function() {
        this.log('installing custom install handler');
        var that = this;
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