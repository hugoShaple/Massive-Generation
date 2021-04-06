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
    if(folder == 1){
      console.log('Dossier : ', element);
      var elemStr = element.toString();
      var folderName = DriveApp.getFoldersByName(elemStr);
      var folderConverter = folderName.next();
      var folderId = folderConverter.getId();
      var selectedFolder = DriveApp.getFolderById(folderId);
      findFolder.setName("Renomée")
    } else if (file == 1){
      console.log('Fichier : ', element);
    };
  });
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