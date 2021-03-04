// Create menu on Spreadsheet
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('GDrive')
  .addItem('Create new Folders', 'crtGdriveFolder')
  .addToUi();
}


function crtGdriveFolder() {
  // Récupération du spreadsheet actif ainsi que la sheet active
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // Création d'un bouton & d'un champ text dans le menu GDrive 
  var levelInput = Browser.inputBox('input Level', Browser.Buttons.OK_CANCEL);  
  var Level =  levelInput * 2 + 1; 
  // Nombre de ligne à executer
  var numRows = sheet.getLastRow();
  // Range à executer
  var dataRange = sheet.getRange(3, Number(Level)-1, numRows, Number(Level)); //startRow, startCol, endRow, endCol
  // Récupération des valeurs de la range donnée précédement
  var data = dataRange.getValues();
  var parentFolderID = new Array();
  console.log(data)

  for(var i in data)
    {        
    parentFolderID[i] = data [i][0];
    if (data [i][0] == "")
      {
      parentFolderID[i] = parentFolderID[i-1];
      }  
    }
    
    
   for(var i in data){
    if (data [i][1] !== "")
      {
      var theParentFolder = DriveApp.getFolderById(parentFolderID[i]);
      var folderName = data[i][1]; 
      var theChildFolder = theParentFolder.createFolder(folderName);   
      var newFolderID = sheet.getRange(Number(i)+3,Number(Level)+1);
      var folderIdValue = theChildFolder.getId();
      newFolderID.setValue(folderIdValue);
      
      var addLink = sheet.getRange(Number(i)+3,Number(Level));
      var value = addLink.getDisplayValue();
      addLink.setValue('=hyperlink("https://drive.google.com/corp/drive/folders/'+ folderIdValue +'","' + value + '")');      
      }
    }
  }
