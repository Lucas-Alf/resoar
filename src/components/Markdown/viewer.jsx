import React from "react";
import MDEditor from "@uiw/react-md-editor";
import style from './styles.module.css';
import PropTypes from 'prop-types';

export default function Viewer(props) {
    const theme = localStorage.getItem("theme") || "light";
    return (
        <div data-color-mode={theme}>
            <MDEditor.Markdown
                className={theme === 'dark' ? style.editorDark : ''}
                {...props}
            />
        </div>
    )
}

Viewer.propTypes = {
    theme: PropTypes.string
}