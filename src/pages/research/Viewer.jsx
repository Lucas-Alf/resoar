import { split } from 'lodash';
import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.vite';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { isAuthenticated, getToken } from '../../services/auth'

function Viewer() {
  const [numPages, setNumPages] = useState(null);

  const options = {
    cMapUrl: 'cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'standard_fonts/',
  };

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  const researchId = split(window.location.pathname, '/')[3]

  return (
    <Document
      file={{
        url: `${import.meta.env.VITE_API_URL}/research/download/${researchId}`,
        httpHeaders: isAuthenticated && {
          'Authorization': `bearer ${getToken()}`
        }
      }}
      onLoadSuccess={onDocumentLoadSuccess}
      options={options}
    >
      {Array.from(new Array(numPages), (el, index) => (
        <Page key={`page_${index + 1}`} pageNumber={index + 1} />
      ))}
    </Document>
  );
}

export default Viewer;