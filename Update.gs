function getRangeData()  {
  var selection = SpreadsheetApp.getSelection();
  var a1Selection = selection.getActiveRange().getA1Notation();

  var sheet = SpreadsheetApp.getActiveSheet(),
      range,
      value_array; 

  range = sheet.getRange(a1Selection);
  value_array = range.getValues();
  

  value_array.forEach((element) => {
    var folder = checkFolder_(element);
    var file = checkFile_(element);
    var elemStr = element.toString();
    var prompt = getUserValue_(element);

    if(folder == 1){
      var folderName = DriveApp.getFoldersByName(elemStr);
      var folderConverter = folderName.next();
      var folderId = folderConverter.getId();
      var selectedFolder = DriveApp.getFolderById(folderId);
      selectedFolder.setName(prompt)
    } else if (file == 1){
      var fileName = DriveApp.getFilesByName(elemStr);
      var fileConverter = fileName.next();
      var fileId = fileConverter.getId();
      var selectedFile = DriveApp.getFileById(fileId);
      selectedFile.setName(prompt)
    };

    var activeCell = sheet.getActiveCell()
    activeCell.setValue(prompt)
  });
}

function getUserValue_(element){
  var ui = SpreadsheetApp.getUi()
  var response = ui.prompt('Renomage', 'Renomer le dossier "' + element +'"', ui.ButtonSet.OK_CANCEL);

  if (response.getSelectedButton() == ui.Button.OK) {
    var value = response.getResponseText()
    Logger.log("The user's name is : " + value);
  } else if (response.getSelectedButton() == ui.Button.CANCEL) {
    Logger.log('The user didn\'t want to provide a name.');
  };
  return value
}


function checkFolder_(folderName){
  var folder = DriveApp.getFoldersByName(folderName);
  var isFolder = folder.hasNext();
  if(isFolder == true){
    return 1;
  } else {
    return 0;
  };
};

function checkFile_(fileName){
  var file = DriveApp.getFilesByName(fileName);
  var isFile = file.hasNext();
  if(isFile == true){
    return 1;
  } else {
    return 0;
  };
};