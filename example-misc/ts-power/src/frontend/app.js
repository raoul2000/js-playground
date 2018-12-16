// @ts-nocheck

document.addEventListener("DOMContentLoaded", function () {

    let tagify = null;
    fetch('http://127.0.0.1:5454/api/tags').
        then((RES) => {
            if( RES.ok ) {
                RES.json().then( (whitelist) => {
                    tagify = new Tagify(document.querySelector('input[name=tags]'), {
                        "whitelist": whitelist.map( (tag) => tag.name),
                        "dropdown" : {
                            "enabled"   : 1
                        }
                    });           
                });
            }
        }).
        catch( (err) => {
            console.error(err);
        });
});
