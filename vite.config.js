import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin(),
    viteStaticCopy({
      targets: [
        {
          // Support for non-latin characters in react-pdf
          src: path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps'),
          dest: 'cmaps/'
        },
        {
          // Support for standard fonts in react-pdf
          src: path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'standard_fonts'),
          dest: 'standard_fonts/'
        }
      ]
    })
  ],
});
