[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Lucas-Alf_resoar&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Lucas-Alf_resoar)

# RESOAR

RESOAR is a short for Research Open Access Repository.

This project consists of an Institutional Repository to store PDF files of academic publications.

The frontend are mainly developed in JavaScript, using React, Vite and Material UI.

The backend is developed as a Web API in dotnet (C#), using Entity Framework and PostgreSQL.

Backend repo: https://github.com/Lucas-Alf/resoar-api

## Environment Variables
| Name                              | Description                            |Required|
|-----------------------------------|----------------------------------------|--------|
| `VITE_API_URL`                    | API URL (ex: https://localhost:5000)   | Yes    |
| `VITE_CAPTCHA_SITE_KEY`           | hCAPTCHA site key.                     | Yes    |
| `VITE_STORAGE_URL`                | Digital Ocean / AWS S3 Storage URL     | Yes    |
