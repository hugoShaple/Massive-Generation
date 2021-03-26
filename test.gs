function test() {
  var nbFolder = 2;
  var nbFile = 2;
  var folderChild = 2;
  var fileChild = 2;

  var folderName = 'Folder : ';
  var fileName = 'File : ';
  var fileContent = 'content';

  var folderArray = [];
  var foChildArray = [];
  var fileArray = [];
  var fiChildArray = [];

  var main = DriveApp.createFolder('Main Folder');
  var mainID = main.getId();
  var getFolByID = DriveApp.getFolderById(mainID);
  
  for(var i = 0; i < nbFolder; i++) {
    var folder = DriveApp.createFolder(folderName +  i);
    var folderID = folder.getId();
    var parentID = DriveApp.getFolderById(folderID);
    parentID.moveTo(getFolByID);
    folderArray.push(folderID)

    for(var j = 0; j < nbFile; j++){
      var file = DriveApp.createFile(fileName + j, fileContent);
      var fileID = file.getId();
      var getFilByID = DriveApp.getFileById(fileID);
      getFilByID.moveTo(parentID);
      fileArray.push(fileID)
    }

    for(var k = 0; k < folderChild; k++){
      var foChild = DriveApp.createFolder(folderName + k);
      var folChildID = foChild.getId();
      var getFoChildID = DriveApp.getFolderById(folChildID);
      getFoChildID.moveTo(parentID);
      foChildArray.push(folChildID)

      for(var l = 0; l < fileChild; l++){
        var fiChild = DriveApp.createFile(fileName + l, fileContent);
        var fiChildID = fiChild.getId();
        var getFiChildID = DriveApp.getFileById(fiChildID);
        getFiChildID.moveTo(getFoChildID);
        fiChildArray.push(fiChildID)
      }
    }
  }
  console.log('Dossier : ', folderArray)
  console.log('Dossier Enfant : ', foChildArray)
  console.log('Fichier : ', fileArray)
  console.log('Fichier Enfant : ', fiChildArray)

  //var rename = DriveApp.getFileById(fileArray[1])
  var rename = DriveApp.getFolderById(foChildArray[2])

  rename.setName('Renommé')
}