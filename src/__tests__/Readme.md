List of test cases

# Interface
    * Verify Upload image/file button is not clickable if file input is empty.
    * Verify Upload image/file button is  clickable if file is selected.
    * Verify X button is visible on the right side of the Drop box if a file is selected.
    * Verify clicking of X button removes the selected file and shows the placeholder message
    * Verify uploading by drag and drop image/file functionality working or not. 
    * Verify image/file should not be open on the browser on dropping an image/file.
    * Verify user can remove the image/file and upload a new one or not.
    * Verify after uploading an image/file the system refreshes the page with updated list of uploaded files.
    * Verify image/file name is truncated if image/file name is extra long.

# Upload Section
    * Verify upload image/file popup is open or not by clicking on the Select file button.
    * Verify clicking Upload button after a file is selected, shows a loading indicator on the Upload button
    * Verify clicking Upload button after a file is selected, disables the Upload button
    * Verify the image/file name is shown on uploading an image/file or not.


# File Validations
    * Verify that an image/file uploaded contains space or a special character in the image/file name.
    * Verify image/file size error shows below input box if file size > 5 MB
    * Verify An error message should be shown as the user tries to upload an image/file of an invalid extension.
    * Verify file input only allows selecting allowed image/file extensions in popup
    * Verify the behaviour of the system on uploading the same image/file again. (Should break in our case, as no auth based differentiation, and same file name clash are known issues)











