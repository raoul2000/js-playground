This is a basic Eletron App using vuesjs.

**Eletron 1.0** has been released : check out [web site](http://electron.atom.io/)

# Requirements

- [nodejs](https://nodejs.org/en/)

# Installation
From the `example-electron`folder :

    npm install

To run the router demo :
    npm run router-demo
# Usage

	npm start

Use `npm run tray` to start an alternate electron app with positioning features. For a *real* tray iconized
app, check the [electron 1.0](http://electron.atom.io/) sample app.

# Package
To package the electron app for a specific OS, we need to use the [electron-packager](https://github.com/maxogden/electron-packager)
 *nodejs* module. It is not listed in the *devDependencies* of the *example-electron* app, so we install it manually. We choose to
 install it globally (to make it available for other projects) but it also support local install.

	 npm install electron-packager -g

The **electron-packager** command is now available is the console.

Once installed, use the following command line to build the electron app for a win32_x64 platform :

	 electron-packager . example-electron --platform=win32 --arch=x64 --version=0.36.0

Command line option summary :

- *platform* [ linux | win32 | darwin | all ] : the targeted OS
- *arch* [ ia32 | x64 | all ] : the targeted architecture

When the previous command is terminated, the folder `example-electron-win32-x64` has been created. It contains the EXE file to
start.

For more information, please refer to the official [usage](https://github.com/maxogden/electron-packager#usage) page.
