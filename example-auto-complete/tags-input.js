window.tagsInputAutoComplete = (function () {
    // Helpers /////////////////////////////////////////////////////////////////////

    const removeAllChildren = (element) => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };
    const normalizeSeed = (seed) =>
        typeof seed === "string" ? seed.trim() : "";

    // Domain /////////////////////////////////////////////////////////////////////

    const resizeTextInput = (textInputElement, ghostElement) => {
        ghostElement.textContent = textInputElement.value;
        textInputElement.style.width = ghostElement.offsetWidth + "px";
    };

    const updateOptionListSpec = (sourceElement, targetElement) => {
        const cs = getComputedStyle(sourceElement);

        targetElement.style.width = "";
        targetElement.style.borderBottomWidth = cs.getPropertyValue(
            "border-bottom-width"
        );
        targetElement.style.borderTopWidth =
            cs.getPropertyValue("border-top-width");
        targetElement.style.borderLeftWidth =
            cs.getPropertyValue("border-left-width");
        targetElement.style.borderRightWidth =
            cs.getPropertyValue("border-right-width");
        targetElement.style.paddingBottom =
            cs.getPropertyValue("padding-bottom");
        targetElement.style.paddingTop = cs.getPropertyValue("padding-top");
        targetElement.style.paddingLeft = cs.getPropertyValue("padding-left");
        targetElement.style.paddingRight = cs.getPropertyValue("padding-right");
        targetElement.style.left = `-${cs.getPropertyValue(
            "border-left-width"
        )}`;
        targetElement.style.right = `-${cs.getPropertyValue(
            "border-right-width"
        )}`;
        targetElement.style.top = `${sourceElement.clientHeight}px`;
    };

    const removeAllOptions = (optionListElement) =>
        removeAllChildren(optionListElement);
    const hideOptionList = (optionListElement) =>
        (optionListElement.style.display = "none");
    const showOptionList = (optionListElement) =>
        (optionListElement.style.display = "block");
    const countOptions = (optionListElement) =>
        optionListElement.children.length;
    const optionListNotEmpty = (optionListElement) =>
        countOptions(optionListElement) > 0;

    const resetOptionList = (optionListElement) => {
        hideOptionList(optionListElement);
        removeAllOptions(optionListElement);
    };

    const newOptionElementCreator = (readOptionLabel) => (option) => {
        const elOption = document.createElement("div");
        elOption.textContent = readOptionLabel(option);
        elOption.dataset.value = JSON.stringify(option);
        return elOption;
    };

    const createTagElement = (textContent, dataSetValue) => {
        const tag = document.createElement("div");
        tag.classList.add("tag");
        tag.textContent = textContent;
        if (dataSetValue) {
            tag.dataset.value = dataSetValue;
        }
        return tag;
    };

    const createTagElementFromOptionElement = (optionElement) =>
        createTagElement(
            optionElement.textContent,
            optionElement.dataset.value
        );

    const getSelectedTagValues = (elTagsInput) =>
        Array.from(elTagsInput.querySelectorAll(".tag")).map((tag) =>
            JSON.parse(tag.dataset.value)
        );

    const setSelectedTags = (
        options,
        elTagsInput,
        elTextInput,
        readOptionLabel
    ) => {
        options
            .map((option) =>
                createTagElement(
                    readOptionLabel(option),
                    JSON.stringify(option)
                )
            )
            .forEach((tagElement) =>
                elTagsInput.insertBefore(tagElement, elTextInput)
            );
    };

    const getActiveOptionElement = (optionListElement) =>
        optionListElement.getElementsByClassName("active")[0];

    const renderOptionList = (
        elList,
        options,
        elTagsInput,
        createOptionElement
    ) => {
        hideOptionList(elList);
        removeAllOptions(elList);
        if (options.length !== 0) {
            options.map(createOptionElement).forEach((elOption) => {
                elList.appendChild(elOption);
            });
            updateOptionListSpec(elTagsInput, elList);
            elList.style.top = `${elTagsInput.clientHeight}px`;
            showOptionList(elList);
        }
    };

    const Key = {
        selectionDown: (elOptions) => {
            const activeOption = getActiveOptionElement(elOptions);
            if (!activeOption) {
                if (elOptions.firstChild) {
                    elOptions.firstChild.classList.add("active");
                }
            } else if (activeOption.nextElementSibling) {
                activeOption.nextElementSibling.classList.add("active");
                activeOption.classList.remove("active");
            }
        },
        selectionUp: (elOptions) => {
            const activeOption = getActiveOptionElement(elOptions);
            if (activeOption?.previousElementSibling) {
                activeOption.previousElementSibling.classList.add("active");
                activeOption.classList.remove("active");
            }
        },
        escape: hideOptionList,
        enter: (elOptions, elUserInput, elTagsInput) => {
            const activeOption = getActiveOptionElement(elOptions);
            if (activeOption) {
                const tag = createTagElementFromOptionElement(activeOption);
                elTagsInput.insertBefore(tag, elUserInput);
                elUserInput.value = "";
                resetOptionList(elOptions);
            }
        },
    };

    const scrollToSelection = (elOptions) => {
        const activeOptionElement = getActiveOptionElement(elOptions);
        if (activeOptionElement) {
            elOptions.scrollTop =
                activeOptionElement.offsetTop -
                elOptions.clientHeight +
                activeOptionElement.clientHeight;
        }
    };

    // Event Handlers ////////////////////////////////////////////////////////////////////

    const registerEventHandlers = (
        { tagsInput, textInput, textInputGhost, optionList },
        ctx
    ) => {
        /* input text ---------------------------- */
        textInput.addEventListener("input", (ev) => {
            resizeTextInput(textInput, textInputGhost);
            renderOptionList(
                optionList,
                ctx.optionFilter(normalizeSeed(ev.target.value)),
                tagsInput,
                ctx.createOptionElement
            );
        });

        textInput.addEventListener("focusin", (ev) => {
            console.log("focus - in");
            if (optionListNotEmpty(optionList)) {
                showOptionList(optionList);
            }
        });

        textInput.addEventListener(
            "keydown",
            (ev) => {
                const key = ev.keyCode || ev.charCode;

                switch (key) {
                    case 40: // Arrow DOWN
                        Key.selectionDown(optionList);
                        scrollToSelection(optionList);
                        break;

                    case 38: // Arrow UP
                        Key.selectionUp(optionList);
                        scrollToSelection(optionList);
                        break;
                    case 13: // Enter
                        Key.enter(optionList, textInput, tagsInput);
                        break;
                    case 8: // Backspace
                        const tagToRemove = textInput.previousElementSibling;
                        const inputValue2 = textInput.value;
                        if (inputValue2.length === 0 && tagToRemove) {
                            tagsInput.removeChild(tagToRemove);
                        }
                        break;
                    case 27: // ESC
                        hideOptionList(optionList);
                        break;
                }
            },
            false
        );
        /**
         * Note: when user click outside the control, hide the list of options. To detect this event
         * we use 'focusout' on the text input element. This causes an issue when the user click on
         * an option from the option list. In this case, the text input element does loose the focus
         * but the option list should NOT be hidden before the clicked option could actually be added
         * to the control.
         * To fix this, the option list is hidden only after a hard coded delay, if the timer created has
         * not been canceled by the 'click' event handler triggered when user clicks on an option.
         */
        let optionListHideTimer;

        textInput.addEventListener("focusout", (ev) => {
            optionListHideTimer = setTimeout(
                () => hideOptionList(optionList),
                200
            );
        });

        /* option list  ---------------------------- */

        optionList.addEventListener(
            "click",
            (ev) => {
                // see optionListHideTimer declaration
                if (optionListHideTimer) {
                    clearTimeout(optionListHideTimer);
                    optionListHideTimer = null;
                }
                ev.target.classList.add("active");
                Key.enter(optionList, textInput, tagsInput);
            },
            false
        );

        /* tags input  ---------------------------- */

        // Set focus to text input when user click in the control
        // but not on a tag.
        tagsInput.addEventListener("click", (ev) => {
            const tag = ev.target.closest(".tag");
            if (!tag) {
                textInput.focus();
            } else {
                // remove clicked tag from input list
                tagsInput.removeChild(tag);
            }
        });
    };

    // Plugin  ////////////////////////////////////////////////////////////////////////

    /**
     * Create the DOM elements required to handle the control.
     *
     * Returns an object containg references to all main DOM elements used by this control
     *
     * @param {Element} rootEl the element where the tags input will be created
     * @returns object
     */
    const createControl = (rootEl) => {
        const tagsInput = document.createElement("div");
        tagsInput.classList.add("tags-input-autocomplete");
        rootEl.replaceWith(tagsInput);

        const textInput = document.createElement("input");
        textInput.setAttribute("type", "text");

        const textInputGhost = document.createElement("span");
        textInputGhost.style.margin = "0px";
        textInputGhost.style.padding = "0px";
        textInputGhost.style.height = "0px";
        textInputGhost.style.position = "absolute";
        textInputGhost.style.whiteSpace = "pre";
        textInputGhost.style.overflow = "hidden";

        const optionList = document.createElement("div");
        optionList.classList.add("option-list");

        tagsInput.appendChild(textInput);
        tagsInput.appendChild(textInputGhost);
        tagsInput.appendChild(optionList);

        // after tagsInput has been inserted into the DOM, align styles from textInput into textInputGhost
        // This is touchy, because ghost element width is used to update text input size (auto grow), so they
        // should have same rendering in terms of width.

        const textInputCS = getComputedStyle(textInput);
        textInputGhost.style.padding = textInputCS.getPropertyValue("padding");
        textInputGhost.style.fontSize =
            textInputCS.getPropertyValue("font-size");
        textInputGhost.style.fontFamily =
            textInputCS.getPropertyValue("font-family");

        return {
            tagsInput,
            textInput,
            textInputGhost,
            optionList,
        };
    };
    const identity = (v) => v;
    const defaultOptionFilter = (txt, option) => option.startsWith(txt);
    const defaultOptionLabel = identity;
    const validateFunctionOrDefault = (f, def, errorMsg) => {
        if (f) {
            if (typeof f === "function") {
                return f;
            } else {
                throw new Error(errorMsg || "invalid function type");
            }
        } else {
            return def;
        }
    };
    /**
     * Initialize the control.
     *
     * Object *config* has following properties:
     *
     * - `options` : (Array<string | object>) - list of available options
     * - `initialOptions` : (Array<string | object>) - list of  options initially selected
     * - `optionLabel` : (optional) - function that returns the string label given an option
     * - `optionFilter` : (optional) - options filter function used to display options given a string entered by the user
     * in the input text element. Signature is (string, stinrg | object) => boolean
     *
     * @param {object | string } config when string Id of the DOM element that will hold the tas input control. When Object, the DOM element itself
     * @param {object} config configuration object
     * @returns object
     */
    const init = (
        container,
        { options, initialOptions, optionLabel, optionFilter }
    ) => {
        let rootElement;
        if (typeof container === "string") {
            rootElement = document.getElementById(container);
        } else if (typeof container === "object") {
            rootElement = container;
        }
        if (!rootElement) {
            throw new Error("failed to find root element");
        }
        
        const optFilter = validateFunctionOrDefault(
            optionFilter,
            defaultOptionFilter,
            "optionFilter must be a function"
        );
        const optLabel = validateFunctionOrDefault(
            optionLabel,
            defaultOptionLabel,
            "optionLabel must be a function"
        );

        // create the Context
        const ctx = {
            optionLabel: optLabel,
            optionFilter: (txt) =>
                options.filter((option) => optFilter(txt, option)),
        };
        ctx.createOptionElement = newOptionElementCreator(ctx.optionLabel);

        const UI = createControl(rootElement);
        registerEventHandlers(UI, ctx);

        // update control with provided initial options
        if (Array.isArray(initialOptions)) {
            setSelectedTags(
                initialOptions,
                UI.tagsInput,
                UI.textInput,
                ctx.optionLabel
            );
        }
        // refresh text input size
        resizeTextInput(UI.textInput, UI.textInputGhost);

        // returns the public API
        return Object.freeze({
            getValues: () => getSelectedTagValues(UI.tagsInput),
        });
    };

    return { init };
})();
