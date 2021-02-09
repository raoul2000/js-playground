import React, {
    useState,
    useEffect,
    useRef,
    TextareaHTMLAttributes,
} from "react";

// from https://medium.com/@lucasalgus/creating-a-custom-auto-resize-textarea-component-for-your-react-web-application-6959c0ad68bc
const AutoTextArea = (props: TextareaHTMLAttributes<HTMLTextAreaElement>) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState("");
    const [textAreaHeight, setTextAreaHeight] = useState("auto");
    const [parentHeight, setParentHeight] = useState("auto");

    useEffect(() => {
        if (textAreaRef.current! && textAreaRef.current!.scrollHeight < 100) {
            setParentHeight(`${textAreaRef.current!.scrollHeight}px`);
            setTextAreaHeight(`${textAreaRef.current!.scrollHeight}px`);
        }
    }, [text]);

    const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (textAreaRef.current! && textAreaRef.current!.scrollHeight < 100) {
            setTextAreaHeight("auto");
            setParentHeight(`${textAreaRef.current!.scrollHeight}px`);
        }
        setText(event.target.value);

        if (props.onChange) {
            props.onChange(event);
        }
    };

    return (
        <div
            style={{
                minHeight: parentHeight,
            }}
        >
            <textarea
                {...props}
                ref={textAreaRef}
                rows={1}
                style={{
                    height: textAreaHeight,
                }}
                onChange={onChangeHandler}
            />
        </div>
    );
};

export default AutoTextArea;