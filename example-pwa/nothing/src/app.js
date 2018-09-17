import './style.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

window.app = {
    installPromptEvent: null,
    randomImage: null,
    mainImage: null,
    notifNewVersion: null,
    btnInstall: null,
    btnNewImage: null,
    btnInstallUpdate: null,
    spinner: null,
    swVersion : null,
    logger: null,
    /**
     * Start the app.
     * This is the app entry point in charge of installing handlers
     */
    run: function () {
        console.log('running App');
        this.logger = document.querySelector('#logger');
        this.log("initializing the Nothing App");

        this.notifNewVersion = document.getElementById('notif-new-version');
        this.btnInstallUpdate = document.getElementById('install-update');
        this.randomImage = document.getElementById('random-image');
        this.mainImage = document.getElementById('main-image')
        this.btnInstall = document.querySelector('#install');
        this.btnNewImage = document.querySelector("#random-image > button");
        this.spinner = document.querySelector('#spinner');
        this.swVersion = document.getElementById('sw-version');
        this.registerServiceWorker();
        this.registerCustomInstaller();
        this.installRandomImage();
    },
    /**
     * based on https://developers.google.com/web/fundamentals/app-install-banners/#detect-mode
     */
    isRunningStandalone: function () {
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
    log: function (msg) {
        console.log(msg);
        var newEntry = document.createElement('div');
        newEntry.textContent = '> ' + msg;

        var firstEntry = this.logger.querySelector('.entry');
        if (firstEntry) {
            this.logger.insertBefore(newEntry, firstEntry);
        } else {
            this.logger.appendChild(newEntry);
        }
    },
    /**
     * Install Event handler so to display random image when user click
     * on the refresh button
     */
    installRandomImage: function () {
        var that = this;

        let buttonProgressEnd = function () {
            that.spinner.classList.add('d-none');
            that.btnNewImage.querySelector('span').textContent = "Show me more";
            that.btnNewImage.removeAttribute('disabled');
        };
        let buttonProgressStart = function () {
            that.btnNewImage.setAttribute('disabled', true);
            that.spinner.classList.remove('d-none');
            that.btnNewImage.querySelector('span').textContent = "loading ...";
        };

        this.mainImage.addEventListener('error', function () {
            that.log('failed to load image');
            that.randomImage.classList.add('load-image-fails');
            buttonProgressEnd();
        });
        this.mainImage.addEventListener('load', function () {
            console.log('img loaded ok');
            that.randomImage.classList.remove('load-image-fails');
            buttonProgressEnd();
        });
        // user clicks on the "show another image" button
        this.btnNewImage.addEventListener('click', function (ev) {
            buttonProgressStart();
            that.mainImage.setAttribute('src', "https://picsum.photos/500/500/?random?_=" + Math.random());
        });
        this.btnNewImage.dispatchEvent(new Event('click'));
    },
    /**
     * Register Service Worker.
     * This is required for PWA
     */
    registerServiceWorker: function () {
        var that = this;
        this.log('trying to register ServiceWorker');
        if ('serviceWorker' in navigator) {

            // Handler for messages coming from the service worker
            navigator.serviceWorker.addEventListener('message', that.receiveMessageFromSw.bind(that));

            // when a new service worker is available, user is asked to
            // activate it.
            this.btnInstallUpdate.addEventListener('click', function () {
                that.log("user confirmed sW update (activation)");
                navigator.serviceWorker
                    .getRegistration()
                    .then(registration => {
                        registration.waiting
                            .postMessage("SKIP-WAITING");
                    });
            });

            navigator.serviceWorker.addEventListener("controllerchange", function () {
                that.log('Service Worker controller change : reloading page');
                window.location.reload();
            });

            this.log('ServiceWorker is supported : registering my own');
            navigator.serviceWorker
                .register('./sw.js')
                .then(function (registration) {
                    that.log('Service Worker downloaded !');

                    that.log('sending message to SW');

                    that.sendMessageToSw('READ-SW-VERSION')
                        .then(version => {
                            console.log('swVersion : '+version);
                            that.swVersion.textContent = version;
                        })
                        .catch(console.error);

                    registration.addEventListener('updatefound', function () {
                        const newServiceWorker = registration.installing;
                        newServiceWorker.addEventListener('statechange', function () {
                            that.log("Service Worker State changed to " + newServiceWorker.state);
                            if (newServiceWorker.state === 'installed') {
                                that.log('displaying update notification to user');
                                that.notifNewVersion.classList.remove('d-none');
                            }
                        })
                    })
                })
                .catch(function (error) {
                    that.log("ERROR : Service Worker registration caused an exception");
                    console.error(error);
                })
        }
    },
    receiveMessageFromSw: function(event) {
        let msg = event.data;
        let replyChannel = event.ports;
        this.log("CLI: received message from SW : "+msg);
        switch(msg) {
            case 'HELLO':
            console.log("hello");
            break;
            case 'fetch':
            replyChannel[0].postMessage("good boy");
            break;
            default:
            console.log(msg);
        }
    },
    sendMessageToSw: function (msg) {
        return new Promise(function (resolve, reject) {
            // Create a Message Channel
            var msg_chan = new MessageChannel();

            // Handler for recieving message reply from service worker
            msg_chan.port1.onmessage = function (event) {
                if (event.data.error) {
                    reject(event.data.error);
                } else {
                    resolve(event.data);
                }
            };
            // Send message to service worker along with port for reply
            navigator.serviceWorker.controller.postMessage(msg, [msg_chan.port2]);
        });
    },
    /**
     * Register behavior for the A2HS (Add 2 HomeScreen) feature
     */
    registerCustomInstaller: function () {
        if (this.isRunningStandalone() === true) {
            this.log("running in standalone mode : I'm not going to setup a custom A2HS handler (no way)");
            return;
        }
        this.log('installing custom A2HS handler');
        var that = this;

        window.addEventListener('appinstalled', function () {
            that.log('Great !! Nothing has been successfully added to the home screen');
        });

        window.addEventListener('beforeinstallprompt', function (event) {
            event.preventDefault();
            that.installPromptEvent = event;
            that.btnInstall.removeAttribute('disabled'); // this also displays the "install" button
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