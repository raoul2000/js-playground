// @ts-nocheck

document.addEventListener("DOMContentLoaded", function () {

    let tagify = null;
    let tagList = [];

    fetch('http://127.0.0.1:5454/api/tags').
        then((RES) => {
            if( RES.ok ) {
                RES.json().then( (tags) => {
                    tagList = tags;
                    tagify = new Tagify(document.querySelector('input[name=tags]'), {
                        "whitelist": [],
                        "dropdown" : {
                            "enabled"   : 1
                        }
                    }); 
                    tagify.on('input', function(e) {
                        console.log(e);
                        tagify.settings.whitelist = tagList.map( (tag) => tag.name)
                            .filter( (tagName) => tagName.toLowerCase().indexOf(e.detail.value.toLowerCase()) >= 0);

                        // eslint-disable-next-line prefer-reflect
                        tagify.dropdown.show.call(tagify);
                        
                    });
                });
            }
        }).
        catch( (err) => {
            console.error(err);
        });
});
