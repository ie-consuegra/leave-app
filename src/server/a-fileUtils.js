/**
 * Create a new folder in Google Drive
 * @param {String} folderName 
 * @returns {String} Id of the folder
 */
function createFolder(folderName) {
  const folder = DriveApp.createFolder(folderName);
  const folderId = folder.getId();
  PropertiesService.getScriptProperties().setProperty(folderName, folderId);
  return folderId;
}

/**
 * Create a new spreadsheet
 * @param {String} spreadsheetName 
 * @returns {String} Spreadsheet id
 */
function createDB(spreadsheetName) {
  const ss = SpreadsheetApp.create(spreadsheetName);
  ss.insertSheet('Data');
  
  const ssId = ss.getId();     
  
  PropertiesService.getScriptProperties().setProperty('DB', ssId);
  return ssId;
}

/**
 * Returns the id of the spreadsheet used as DB,
 * which is stored as a script property key
 * @returns {String} Id of the spreadsheet used as database
 */
function getDBId() {
  const keys = PropertiesService.getScriptProperties().getKeys();
  
  let ssId = '';
  if (keys.indexOf('DB') === -1) {
    ssId = createDB();
  } else {
    ssId = PropertiesService.getScriptProperties().getProperty('DB');
  }
  return ssId;
}

/**
 * Returns the id of the folder used by the app,
 * which is stored as a script property key, if such folder
 * does not exist, create a new one
 * @param {string} folderName Name of the folder and the key where the id is stored
 * @returns {String} Id of the folder
 */
function getFolderId(folderName) {
  const keys = PropertiesService.getScriptProperties().getKeys();
  
  let folderId = '';
  if (keys.indexOf(folderName) === -1) {
    folderId = createFolder(folderName);
  } else {
    folderId = PropertiesService.getScriptProperties().getProperty(folderName);
  }
  return folderId;
}