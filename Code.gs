function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Actions')
    .addItem("Générer l'architecture", 'generation')
    .addItem("Mettre à jour l'architecture", 'update')
    .addToUi();
};

function generation(){
  
  const data = getAllData_();
  data.forEach((element) => {
    var name = element[0];
    var isFile = element[1];
    var isFolder = element[2];
    var parentFolderName = element[3];

    var parentFolder = getFolderByName_(parentFolderName);

    // Creation by condition
    if(!parentFolder){
      console.error("Le dossier parent " + parentFolderName + " n'existe pas." );
      return;
    }
    if(!isFile && isFolder){
        DriveApp.createFolder(name).moveTo(parentFolder);
    }
    if(isFile && !isFolder){
        DriveApp.createFile(name, 'content').moveTo(parentFolder);
    }
    if(isFile && isFolder || !isFile && !isFolder){
      console.error('ERROR : Dans la saisie tu type, merci de renseigner uniqument 1 type pour le champ suivant : ', name);
    }
  })
};

function update() {
 
}

function getAllData_(){
// Get all data in the active Sheet
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const rows = ss.getDataRange().getValues();
  rows.shift();
  return rows
}

function getFolderByName_(folderName){
  if(!folderName){
    return DriveApp.getRootFolder()
  }
  var parentFolderIterator = DriveApp.getFoldersByName(folderName);
  while(parentFolderIterator.hasNext()){
    return parentFolderIterator.next();
  }
};