// Create menu in SpreadSheet to use function
function onOpen() {
    const ui = SpreadsheetApp.getUi();
    ui.createMenu('Actions')
    .addItem("Générer l'architecture", 'generation_')
    .addItem("Mettre à jour l'architecture", 'getRangeData')
    .addToUi();
};