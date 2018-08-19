console.log('loading app.js');

var app = {
    installPromptEvent : null,
    btnInstall : null,
    run : function() {
        console.log('running App');
        this.btnInstall = document.querySelector('#install');
        this.registerServiceWorker();
        this.registerCustomInstaller();
    },
    registerServiceWorker : function() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register('./sw.js')
                .then(function () {
                console.log('Service Worker Registered For Nothing');
            });
        }    
    },
    registerCustomInstaller : function() {
        console.log('installing custom install handler');
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
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                that.installPromptEvent = null;
            });
        });    
    }
}