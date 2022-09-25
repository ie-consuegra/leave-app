function getUserEmail() {
  return Session.getActiveUser().getEmail();
}

function setNewPermissionRequest(formData) {
  Logger.log(formData);
}

function uploadFile(fileObj) {
  const blob = Utilities.newBlob(fileObj.bytes, fileObj.mimeType, fileObj.filename);

  const folderId = '1XiCVHzGEU9d1DWF-_Un-zg87dgoIUaFA'; /* Temporarily hardcoded */

  const destinationFolder = DriveApp.getFolderById(folderId);
  const file = DriveApp.createFile(blob);

  destinationFolder.addFile(file);

  file
    .getParents()
    .next()
    .removeFile(file);

  Logger.log('File Uploaded successfully');
}