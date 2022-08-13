import React from "react";
import MDEditor from "@uiw/react-md-editor";
import style from './styles.module.css';
import PropTypes from 'prop-types';

export default function Editor(props) {
    const {
        previewOptions,
        ...otherProps
    } = props

    const theme = localStorage.getItem("theme") || "light";
    const themeAdjusts = theme === 'dark' ? style.editorDark : ''

    return (
        <div data-color-mode={theme}>
            <MDEditor
                id="markdown-editor"
                name="markdown"
                className={themeAdjusts}
                height={350}
                previewOptions={{
                    className: themeAdjusts,
                    ...previewOptions
                }}
                {...otherProps}
            />
        </div>
    )
}

Editor.propTypes = {
    theme: PropTypes.string,
    previewOptions: PropTypes.object
}