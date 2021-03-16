function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Actions')
    .addItem("Générer l'architecture", 'getData')
    .addToUi();
}

function getData(){
  // Get all data in the active Sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet;
  const rows = ss.getDataRange().getValues();
  const mainFolderName = ss.getRange('E2').getValue();
  const getMainFolder = DriveApp.getFoldersByName(mainFolderName)

  // Clean data
  rows.shift()
  rows.forEach(element => {
    element.pop();
    var name = element[0];
    var checkFile = element[1];
    var checkFolder = element[2];
    var parentFolder = element[3];

    // Creation by condition
    if(parentFolder != null){
      var getParentFolderName = DriveApp.getFoldersByName(name)
      parentFolder = getParentFolderName

    } else {
      parentFolder = getMainFolder
      console.log("Aucun dossier parent n'à été trouvé, le champ :", name , ' à été créer dans le dossier racine')
    }

    if(checkFile == false && checkFolder == true){
      var folder = DriveApp.getRootFolder().createFolder(name)
      folderID = folder.getId()
      DriveApp.getFolderById(folderID).moveTo(parentFolder);
    }

    if(checkFile == true && checkFolder == false){
      var file = DriveApp.getRootFolder().createFile(name)
      fileID = file.getId()
      DriveApp.getFileById(fileID).moveTo(parentFolder);
    }

    if(checkFile == true && checkFolder == true || checkFile == false && checkFolder == false){
      console.error('ERROR : Dans la saisie tu type, merci de renseigner uniqument 1 type pour le champ suivant : ', name)
    }
  })
}