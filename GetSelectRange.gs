/*
function getSelectRange(){
  var html = '<label>Selectionner un champ :</label></br><input type="text" id="selrg"/><br/><input type="button" value="Confirmer" onClick="getSelectedRange();"/></br></br>';
  html += '<label>Modifier la donnée par :</label></br><input  type="text" id="updata"/></br><input type="button" value="Confirmer" onClick="updateData()"/>';
  html += '<script>function getSelectedRange(){google.script.run.withSuccessHandler((e) => {document.getElementById("selrg").value=e;}).getSelRange();}';
  html += 'function updateData(){google.script.run.withSuccessHandler((e) => {document.getElementById("updata").value=e;}).updateData();}</script>';
  var userInterface = HtmlService.createHtmlOutput(html);
  SpreadsheetApp.getUi().showModelessDialog(userInterface, "Modification d'une valeur");
};

function getSelRange(){
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();
  var range = sheet.getActiveRange();
  var result = range.getA1Notation()
  return result;
};

function updateData(){};
*/

function getRangeData()  {
  var selection = SpreadsheetApp.getSelection();
  var a1Selection = selection.getActiveRange().getA1Notation();

  var sheet = SpreadsheetApp.getActiveSheet(),
      range,
      values_array; 

  range = sheet.getRange(a1Selection);
  values_array = range.getValues();

  values_array.forEach((element) => {
    var folder = checkFolder_(element);
    var file = checkFile_(element)
    if(folder == 1){
      console.log('Dossier : ', element)
    } else if (file == 1){
      console.log('Fichier : ', element)
    }
  });
}

function checkFolder_(folderName){
  var folder = DriveApp.getFoldersByName(folderName);
  var isFolder = folder.hasNext();
  if(isFolder == true){
    return 1;
  } else {
    return 0
  }
}

function checkFile_(fileName){
  var file = DriveApp.getFilesByName(fileName);
  var isFile = file.hasNext();
  if(isFile == true){
    return 1;
  } else {
    return 0
  }
}