# File Uploader 

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm i
npm run db:generate
npm run db:push
npm run dev # for local run of development server
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Libraries used

** Shadcn - UI Components
** Zod - Form and Runtime validations
** Drizzle - Mysql ORM

Shadcn for components

* Button
* Card
* Form
* Input
* Label
* Toast


Features
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

  - Implement file preview for uploaded image files and icon for documents.
  - delete uploaded files from DB and blob storage.