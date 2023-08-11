window.tagsInputAutoComplete = (function () {
    console.log("loading tagsInputAutoComplete plugin ...");

    // Helpers /////////////////////////////////////////////////////////////////////

    const removeAllChildren = (element) => {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    };
    const normalizeSeed = (seed) => (typeof seed === "string" ? seed.trim() : "");
    const removePreviousSiblings = (currentElement) => {
        while (currentElement.previousElementSibling) {
            currentElement.previousElementSibling.remove();
        }
    };
    // Domain /////////////////////////////////////////////////////////////////////

    const resizeTextInput = (textInputElement, ghostElement) => {
        ghostElement.textContent = textInputElement.value;
        textInputElement.style.width = ghostElement.offsetWidth + "px";
    };

    const alignElements = (sourceElement, targetElement) => {
        const cs = getComputedStyle(sourceElement);

        targetElement.style.width = "";
        targetElement.style.borderBottomWidth = cs.getPropertyValue("border-bottom-width");
        targetElement.style.borderTopWidth = cs.getPropertyValue("border-top-width");
        targetElement.style.borderLeftWidth = cs.getPropertyValue("border-left-width");
        targetElement.style.borderRightWidth = cs.getPropertyValue("border-right-width");
        targetElement.style.paddingBottom = cs.getPropertyValue("padding-bottom");
        targetElement.style.paddingTop = cs.getPropertyValue("padding-top");
        targetElement.style.paddingLeft = cs.getPropertyValue("padding-left");
        targetElement.style.paddingRight = cs.getPropertyValue("padding-right");
        targetElement.style.left = `-${cs.getPropertyValue("border-left-width")}`;
        targetElement.style.right = `-${cs.getPropertyValue("border-right-width")}`;
        targetElement.style.top = `${sourceElement.clientHeight}px`;
    };

    const removeAllOptions = removeAllChildren;
    const hideOptionList = (optionListElement) => (optionListElement.style.display = "none");
    const showOptionList = (optionListElement) => (optionListElement.style.display = "block");
    const isOptionListVisible = (optionListElement) => optionListElement.style.display == "block";
    const countOptions = (optionListElement) => optionListElement.children.length;
    const optionListNotEmpty = (optionListElement) => countOptions(optionListElement) > 0;
    const readValue = (element) => JSON.parse(element.dataset.value);
    const writeValue = (element, value) => (element.dataset.value = JSON.stringify(value));
    const resetOptionList = (optionListElement) => {
        hideOptionList(optionListElement);
        removeAllOptions(optionListElement);
    };

    const newOptionElementCreator = (readOptionLabel) => (optionValue) => {
        const elOption = document.createElement("div");
        elOption.textContent = readOptionLabel(optionValue);
        writeValue(elOption, optionValue);
        return elOption;
    };

    const createTagElement = (textContent, value) => {
        const tag = document.createElement("div");
        tag.classList.add("tag");
        tag.textContent = textContent;
        if (value) {
            writeValue(tag, value);
        }
        return tag;
    };

    const createTagElementFromOptionElement = (optionElement) =>
        createTagElement(optionElement.textContent, readValue(optionElement));

    const getSelectedTagElements = (elTagsInput) => Array.from(elTagsInput.querySelectorAll(".tag"));

    const getTags = (elTagsInput) =>
        getSelectedTagElements(elTagsInput).map((tagElement) => readValue(tagElement));

    const addTags = (optionValues, elTagsInput, elTextInput, readOptionLabel) =>
        optionValues
            .map((optionValue) => createTagElement(readOptionLabel(optionValue), optionValue))
            .forEach((tagElement) => elTagsInput.insertBefore(tagElement, elTextInput));

    const clearTags = (elTagsInput, elTextInput) => removePreviousSiblings(elTextInput);
    //[...elTextInput.previousElementSibling].forEach((tagElement) => elTagsInput.removeChild(tagElement));
    const getActiveOptionElement = (optionListElement) =>
        optionListElement.getElementsByClassName("active")[0];

    const renderOptionList = (elList, options, elTagsInput, createOptionElement, maxOptionsCount) => {
        resetOptionList(elList);
        if (options.length !== 0) {
            let optionsToDisplay = options;
            if (maxOptionsCount) {
                optionsToDisplay = options.slice(0, maxOptionsCount);
            }
            optionsToDisplay.map(createOptionElement).forEach((elOption) => {
                elList.appendChild(elOption);
            });
            alignElements(elTagsInput, elList);
            elList.style.top = `${elTagsInput.clientHeight}px`;
            showOptionList(elList);
        }
    };

    const Key = {
        code: {
            ARROW_DOWN: 40,
            ARROW_UP: 38,
            ENTER: 13,
            BACKSPACE: 8,
            ESCAPE: 27,
        },
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
            scrollToSelection(elOptions);
        },
        selectionUp: (elOptions) => {
            const activeOption = getActiveOptionElement(elOptions);
            if (activeOption?.previousElementSibling) {
                activeOption.previousElementSibling.classList.add("active");
                activeOption.classList.remove("active");
            }
            scrollToSelection(elOptions);
        },
        escape: hideOptionList,
        enter: (elOptions, elTextInput, elTagsInput, optionComparator, onDuplicateTag) => {
            const activeOption = getActiveOptionElement(elOptions);
            if (activeOption) {
                if (optionComparator) {
                    // duplicate not allowed

                    const currentTagElements = getSelectedTagElements(elTagsInput);

                    if (currentTagElements.length !== 0) {
                        const candidateOptionValue = readValue(activeOption);

                        const duplicateTags = currentTagElements.filter(
                            (tagElement) =>
                                optionComparator(candidateOptionValue, readValue(tagElement)) === 0
                        );

                        if (duplicateTags.length !== 0) {
                            if (onDuplicateTag) {
                                onDuplicateTag(duplicateTags[0]);
                            }
                            resetOptionList(elOptions);
                            return;
                        }
                    }
                }
                elTagsInput.insertBefore(createTagElementFromOptionElement(activeOption), elTextInput);
                elTextInput.value = "";
                resetOptionList(elOptions);
                return readValue(activeOption);
            }
        },
        backspace: (elTextInput, elTagsInput) => {
            const tagToRemoveElement = elTextInput.previousElementSibling;
            if (elTextInput.value.length === 0 && tagToRemoveElement) {
                elTagsInput.removeChild(tagToRemoveElement);
                return readValue(tagToRemoveElement);
            }
        },
    };

    const scrollToSelection = (elOptions) => {
        const activeOptionElement = getActiveOptionElement(elOptions);
        if (activeOptionElement) {
            elOptions.scrollTop =
                activeOptionElement.offsetTop - elOptions.clientHeight + activeOptionElement.clientHeight;
        }
    };

    // Event Handlers ////////////////////////////////////////////////////////////////////

    const registerEventHandlers = ({ tagsInput, textInput, textInputGhost, optionList }, ctx) => {
        /* input text ---------------------------- */
        textInput.addEventListener("input", (ev) => {
            resizeTextInput(textInput, textInputGhost);
            renderOptionList(
                optionList,
                ctx.optionFilter(normalizeSeed(ev.target.value)),
                tagsInput,
                ctx.createOptionElement,
                ctx.maxOptionsCount
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
                    case Key.code.ARROW_DOWN:
                        if (isOptionListVisible(optionList)) {
                            Key.selectionDown(optionList);
                        } else {
                            renderOptionList(
                                optionList,
                                ctx.allOptions,
                                tagsInput,
                                ctx.createOptionElement,
                                ctx.maxOptionsCount
                            );
                        }
                        break;
                    case Key.code.ARROW_UP:
                        if (isOptionListVisible(optionList)) {
                            Key.selectionUp(optionList);
                        }
                        break;
                    case Key.code.ENTER:
                        const valueAdded = Key.enter(
                            optionList,
                            textInput,
                            tagsInput,
                            ctx.optionComparator,
                            ctx.onDuplicateTag
                        );
                        if (valueAdded && ctx.onTaglistChange) {
                            ctx.onTaglistChange(valueAdded, true);
                        }
                        break;
                    case Key.code.BACKSPACE:
                        const valueRemoved = Key.backspace(textInput, tagsInput);
                        if (valueRemoved && ctx.onTaglistChange) {
                            ctx.onTaglistChange(valueRemoved, false);
                        }
                        break;
                    case Key.code.ESCAPE:
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
            optionListHideTimer = setTimeout(() => hideOptionList(optionList), 200);
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
                const valueAdded = Key.enter(
                    optionList,
                    textInput,
                    tagsInput,
                    ctx.optionComparator,
                    ctx.onDuplicateTag
                );
                if (valueAdded && ctx.onTaglistChange) {
                    ctx.onTaglistChange(valueAdded, true);
                }
            },
            false
        );

        /* tags input  ---------------------------- */

        // Set focus to text input when user clicks in the control
        // but not on a tag.
        tagsInput.addEventListener("click", (ev) => {
            const tag = ev.target.closest(".tag");
            if (!tag) {
                textInput.focus();
            } else {
                // remove clicked tag from input list
                // save
                const valueRemoved = readValue(tag);
                tagsInput.removeChild(tag);

                if (ctx.onTaglistChange) {
                    ctx.onTaglistChange(valueRemoved, false);
                }
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

        // testInput ghost element is crucial to correctly handle text input auto-grow

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
        textInputGhost.style.fontSize = textInputCS.getPropertyValue("font-size");
        textInputGhost.style.fontFamily = textInputCS.getPropertyValue("font-family");

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
    const defaultOnDuplicateTag = (tagElement) => {
        tagElement.classList.add("blink");
        tagElement.addEventListener("animationend", (ev) => tagElement.classList.remove("blink"), {
            once: true,
        });
    };
    const defaultOptionComparator = (a, b) => {
        if (a === b) return 0;
        if (a < b) return -1;
        return 1;
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
     * - `allowDuplicate` : (boolean - default = "*true*")
     * - `optionComparator`: (optional) - custom option comparator function (see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
     * - `onDuplicateTag`: (optional) - function invoked when a tag is duplicated. Receive the DOM elemeent reprseenting the tag
     * - `onTaglistChange`: (optional) - function invoked when the list of selected tags changes. It accept 2 arguments *value* the tag value added or removed
     * and *isAdded* a boolean value set to TRUE when a tag has been selected or FALSE when a tag has been deselected (removed)
     *
     * @param {object | string } config when string Id of the DOM element that will hold the tas input control. When Object, the DOM element itself
     * @param {object} config configuration object
     * @returns object
     */
    const init = (
        container,
        {
            options,
            maxOptionsCount,
            initialOptions,
            optionLabel,
            optionFilter,
            allowDuplicate,
            optionComparator,
            onDuplicateTag,
            onTaglistChange,
        }
    ) => {
        // Process configuration

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
        let optComparator;
        if (allowDuplicate === false) {
            optComparator = validateFunctionOrDefault(
                optionComparator,
                defaultOptionComparator,
                "optionComparator must be a function"
            );
        }

        // create the Context

        const ctx = {
            optionLabel: optLabel,
            allOptions: options,
            maxOptionsCount,
            optionFilter: (txt) => options.filter((option) => optFilter(txt, option)),
            optionComparator: optComparator,
            onDuplicateTag: validateFunctionOrDefault(
                onDuplicateTag,
                defaultOnDuplicateTag,
                "onDuplicateTag must be a function"
            ),
            onTaglistChange: validateFunctionOrDefault(
                onTaglistChange,
                () => {},
                "onTaglistChange must be a function"
            ),
        };

        ctx.createOptionElement = newOptionElementCreator(ctx.optionLabel);

        // update the DOM : inject control elements

        const UI = createControl(rootElement);
        registerEventHandlers(UI, ctx);

        // update control with provided initial options
        if (Array.isArray(initialOptions)) {
            addTags(initialOptions, UI.tagsInput, UI.textInput, ctx.optionLabel);
        }

        // refresh text input size
        resizeTextInput(UI.textInput, UI.textInputGhost);

        // returns the public API
        return Object.freeze({
            getTags: () => getTags(UI.tagsInput),
            addTags: (options) => addTags(options, UI.tagsInput, UI.textInput, ctx.optionLabel),
            clearTags: () => clearTags(UI.tagsInput, UI.textInput),
        });
    };

    return { init };
})();
