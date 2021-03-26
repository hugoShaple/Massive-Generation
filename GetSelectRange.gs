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
  var rang = sheet.getActiveRange();
  var result = rang.getA1Notation()
  return result;
};

function updateData(){
  var value = getSelRange()
  return value;
};