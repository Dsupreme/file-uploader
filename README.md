# File Uploader 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

* Ensure MySQL is setup

* Update .env file to match credentials

* Create Database on MySQL server 

```mysql
    CREATE DATABASE `ea`;
```


First, run the development server:

```bash
npm install --force #Force added to ignore unresolved typescript version mismatch
npm run db:generate # to generate sql queries to generate db structure based on schema
npm run db:push
npm run dev # for local run of development server
npm run build
npx env-cmd -f .env.example --use-shell "node server.js"
```

Open [http://localhost:3000/upload](http://localhost:3000/upload) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Libraries used

* Shadcn - UI Components
* Zod - Form and Runtime validations
* Drizzle - Mysql ORM

Shadcn for components

* Button
* Card
* Form
* Input
* Label
* Toast


## Features
1. File Upload:
    - feature that allows users to upload files of various types (e.g., images, excel documents).
    - Prevents other types of files to be uploaded (PDF not allowed)
    - File size Limit of 5 MB.

2. Data Storage:

    - Metadata about the uploaded file stored on MySQL. :

        - File name
        - File size
        - Upload date
        - Upload URL
        - File type

    - Use of Connection Pool for MySQL.

3. User Interface:

    - Page URL: [/upload](http://localhost:3000/upload)
    - Displays a list of uploaded files with their filename (overflow handled via CSS property ellipsis).
    - Toast message as a visual indicator for successful uploads and failures.

4. Form Validations :

    - No file added
    - File size exceeding the limit
    - Unsupported file type

5. Bonus Features (Optional):

    - Implemented file preview for uploaded image files and icon for documents.
    - Delete uploaded files from DB and blob storage.


## Assumptions

Following cases have not been handled yet

  - Uploading same file twice
  - Different users uploading file with same name (as no Auth layer is implemented)
  - As we are using local server for storing image files, code will only work in the current working directly