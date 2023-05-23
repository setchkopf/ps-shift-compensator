//Script for centering images produced on shift lenses for Photoshop
//CC BY Lyn Seren

//Shift distortion - mm shift = mm on sensor (get resolution from image) 
//Check if landscape/portrait - calculate sensor dimensions accordingly

var activeDoc = app.activeDocument;

var initUnits = app.preferences.rulerUnits;

const PORTRAIT = "portrait";
const LANDSCAPE = "landscape";

const FULL_FRAME = [35.9, 23.9];
const CROP = [23.6, 15.6];
const CROP_CANON = [22.2, 14.8];

const UP = "shiftUp";
const DOWN = "shiftDown";
const LEFT = "shiftLeft";
const RIGHT = "shiftRight";
const UP_LEFT = "shiftUpLeft";
const UP_RIGHT = "shiftUpRight";
const DOWN_LEFT = "shiftDownLeft";
const DOWN_RIGHT = "shiftDownRight";
const UP_LEFT_30 = "shiftUpLeft30";
const UP_RIGHT_30 = "shiftUpRight30";
const DOWN_LEFT_30 = "shiftDownLeft30";
const DOWN_RIGHT_30 = "shiftDownRight30";
const UP_LEFT_60 = "shiftUpLeft60";
const UP_RIGHT_60 = "shiftUpRight60";
const DOWN_LEFT_60 = "shiftDownLeft60";
const DOWN_RIGHT_60 = "shiftDownRight60";

/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":28,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":"shiftCompensatorDlg","windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Shift Compensator","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"sensorSizePnl","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Sensor size","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-2":{"id":2,"type":"RadioButton","parentId":1,"style":{"enabled":true,"varName":"radioFull","text":"Full frame","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-3":{"id":3,"type":"RadioButton","parentId":1,"style":{"enabled":true,"varName":"radioCanon","text":"Crop (Canon)","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-4":{"id":4,"type":"RadioButton","parentId":1,"style":{"enabled":true,"varName":"radioCrop","text":"Crop (not-Canon)","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-5":{"id":5,"type":"RadioButton","parentId":1,"style":{"enabled":true,"varName":"radioCustom","text":"Custom","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}},"item-6":{"id":6,"type":"EditText","parentId":8,"style":{"enabled":true,"varName":"customWidth","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"43.8","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-7":{"id":7,"type":"EditText","parentId":8,"style":{"enabled":true,"varName":"customHeight","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"32.9","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Group","parentId":1,"style":{"enabled":true,"varName":"customGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-9":{"id":9,"type":"StaticText","parentId":8,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"×","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-10":{"id":10,"type":"StaticText","parentId":8,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"mm","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-11":{"id":11,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"shiftDirectionPnl","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Shift direction","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-12":{"id":12,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":"shiftAmountPnl","creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Shift amount","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-13":{"id":13,"type":"EditText","parentId":14,"style":{"enabled":true,"varName":"shiftAmount","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"11","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-14":{"id":14,"type":"Group","parentId":12,"style":{"enabled":true,"varName":"shiftGroup","preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-15":{"id":15,"type":"StaticText","parentId":14,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"mm","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-25":{"id":25,"type":"Panel","parentId":0,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Panel","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-26":{"id":26,"type":"DropDownList","parentId":11,"style":{"enabled":true,"varName":"shiftList","text":"DropDownList","listItems":"up,down,left,right,-,up-left,up-right,down-left,down-right","preferredSize":[0,0],"alignment":null,"selection":0,"helpTip":"Relative to photographer"}},"item-27":{"id":27,"type":"Button","parentId":29,"style":{"enabled":true,"varName":"cancelButton","text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-28":{"id":28,"type":"Button","parentId":29,"style":{"enabled":true,"varName":"okayButton","text":"Okay","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-29":{"id":29,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}}},"order":[0,25,1,2,3,4,5,8,6,9,7,10,12,14,13,15,11,26,29,27,28],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/ 

// SHIFTCOMPENSATORDLG
// ===================
var shiftCompensatorDlg = new Window("dialog"); 
    shiftCompensatorDlg.text = "Shift Compensator"; 
    shiftCompensatorDlg.orientation = "column"; 
    shiftCompensatorDlg.alignChildren = ["center","top"]; 
    shiftCompensatorDlg.spacing = 10; 
    shiftCompensatorDlg.margins = 16; 

// SENSORSIZEPNL
// =============
var sensorSizePnl = shiftCompensatorDlg.add("panel", undefined, undefined, {name: "sensorSizePnl"}); 
    sensorSizePnl.text = "Sensor size"; 
    sensorSizePnl.orientation = "column"; 
    sensorSizePnl.alignChildren = ["left","top"]; 
    sensorSizePnl.spacing = 10; 
    sensorSizePnl.margins = 10; 

var radioFull = sensorSizePnl.add("radiobutton", undefined, undefined, {name: "radioFull"}); 
    radioFull.text = "Full frame";
    radioFull.value = true; 

var radioCanon = sensorSizePnl.add("radiobutton", undefined, undefined, {name: "radioCanon"}); 
    radioCanon.text = "Crop (Canon)"; 

var radioCrop = sensorSizePnl.add("radiobutton", undefined, undefined, {name: "radioCrop"}); 
    radioCrop.text = "Crop (not-Canon)"; 

var radioCustom = sensorSizePnl.add("radiobutton", undefined, undefined, {name: "radioCustom"}); 
    radioCustom.text = "Custom"; 

// CUSTOMGROUP
// ===========
var customGroup = sensorSizePnl.add("group", undefined, {name: "customGroup"}); 
    customGroup.orientation = "row"; 
    customGroup.alignChildren = ["left","center"]; 
    customGroup.spacing = 10; 
    customGroup.margins = 0; 

var customWidth = customGroup.add('edittext {properties: {name: "customWidth"}}'); 
    customWidth.text = "43.8"; 

var statictext1 = customGroup.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = "×"; 

var customHeight = customGroup.add('edittext {properties: {name: "customHeight"}}'); 
    customHeight.text = "32.9"; 

var statictext2 = customGroup.add("statictext", undefined, undefined, {name: "statictext2"}); 
    statictext2.text = "mm"; 

// SHIFTAMOUNTPNL
// ==============
var shiftAmountPnl = shiftCompensatorDlg.add("panel", undefined, undefined, {name: "shiftAmountPnl"}); 
    shiftAmountPnl.text = "Shift amount"; 
    shiftAmountPnl.orientation = "column"; 
    shiftAmountPnl.alignChildren = ["left","top"]; 
    shiftAmountPnl.spacing = 10; 
    shiftAmountPnl.margins = 10; 

// SHIFTGROUP
// ==========
var shiftGroup = shiftAmountPnl.add("group", undefined, {name: "shiftGroup"}); 
    shiftGroup.orientation = "row"; 
    shiftGroup.alignChildren = ["left","center"]; 
    shiftGroup.spacing = 10; 
    shiftGroup.margins = 0; 

var shiftAmount = shiftGroup.add('edittext {properties: {name: "shiftAmount"}}'); 
    shiftAmount.text = "11"; 

var statictext3 = shiftGroup.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "mm"; 

// SHIFTDIRECTIONPNL
// =================
var shiftDirectionPnl = shiftCompensatorDlg.add("panel", undefined, undefined, {name: "shiftDirectionPnl"}); 
    shiftDirectionPnl.text = "Shift direction"; 
    shiftDirectionPnl.orientation = "column"; 
    shiftDirectionPnl.alignChildren = ["left","top"]; 
    shiftDirectionPnl.spacing = 10; 
    shiftDirectionPnl.margins = 10; 

var shiftList_array = ["up","down","left","right","-","up-left (45°)","up-right (45°)","down-left (45°)","down-right (45°)","-","up-left (30°)","up-right (30°)","down-left (30°)","down-right (30°)","-","up-left (60°)","up-right (60°)","down-left (60°)","down-right (60°)"]; 
var shiftList = shiftDirectionPnl.add("dropdownlist", undefined, undefined, {name: "shiftList", items: shiftList_array}); 
    shiftList.helpTip = "Relative to photographer"; 
    shiftList.selection = 0; 

// GROUP1
// ======
var group1 = shiftCompensatorDlg.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

var cancelButton = group1.add("button", undefined, undefined, {name: "cancelButton"}); 
    cancelButton.text = "Cancel"; 

var okayButton = group1.add("button", undefined, undefined, {name: "okayButton"}); 
    okayButton.text = "Okay"; 

//Handle cancellation
cancelButton.onClick = function() {
    app.preferences.rulerUnits = initUnits;

    shiftCompensatorDlg.close();
}

okayButton.onClick = function() {
    //Prevent duplication - this is hacky
    okayButton.onClick = function(){};

    shiftCompensatorDlg.hide();

    app.preferences.rulerUnits = Units.PIXELS;

    //Get image size
    var imgW = activeDoc.width;
    var imgH = activeDoc.height;
    var imgOrientation;
    if (imgW >= imgH) {
        imgOrientation = LANDSCAPE;
    } else {
        imgOrientation = PORTRAIT;
    }

    //Get sensor size
    var sensorSizeArr = getSensorSize(imgOrientation);
    var sensorWidthMM = parseFloat(sensorSizeArr[0]);
    var sensorHeightMM = parseFloat(sensorSizeArr[1]);

    //Get shift
    var shiftMM = parseFloat(shiftAmount.text);

    //Calc. shift in pixels
    var shiftValues = getShift(sensorWidthMM, sensorHeightMM, shiftMM, imgW, imgH);
    var shiftSizeW = shiftValues[0];
    var shiftSizeH = shiftValues[1]
    var anchor = shiftValues[2];

    //Adjust canvas size
    activeDoc.resizeCanvas(imgW+shiftSizeW, imgH+shiftSizeH, anchor);

    //Exit
    app.preferences.rulerUnits = initUnits;
    shiftCompensatorDlg.close();
}

shiftCompensatorDlg.show();

function getSensorSize(imgOrientation) {
    var sensorArr;
    //Test radio buttons, if other values false default to custom size
    switch (true) {
        case radioFull.value:
            sensorArr = FULL_FRAME;
            break;
        case radioCanon.value:
            sensorArr = CROP_CANON
            break;
        case radioCrop.value:
            sensorArr = CROP;
            break;
        default:
            sensorArr = [parseFloat(customWidth.text), parseFloat(customHeight.text)];
            break;
    }
    
    //Adjust if portrait
    if (imgOrientation == PORTRAIT) {
        return [sensorArr[1],sensorArr[0]];
    } else {
        return sensorArr;
    }
}

function getShift(sensorW, sensorH, shift, imgW, imgH) {
    //Determine direction
    var shiftDir;
    var anchorPos;
    switch (shiftList.selection.index) {
        case 0:
            shiftDir = UP;
            anchorPos = AnchorPosition.TOPCENTER;
            break;
        case 1:
            shiftDir = DOWN;
            anchorPos = AnchorPosition.BOTTOMCENTER;
            break;
        case 2:
            shiftDir = LEFT;
            anchorPos = AnchorPosition.MIDDLELEFT;
            break;
        case 3:
            shiftDir = RIGHT;
            anchorPos = AnchorPosition.MIDDLERIGHT;
            break;
        //No case 4 - break (-) in list array
        case 5:
            shiftDir = UP_LEFT;
            anchorPos = AnchorPosition.TOPLEFT;
            break;
        case 6:
            shiftDir = UP_RIGHT;
            anchorPos = AnchorPosition.TOPRIGHT;
            break;
        case 7:
            shiftDir = DOWN_LEFT;
            anchorPos = AnchorPosition.BOTTOMLEFT;
            break;
        case 8:
            shiftDir = DOWN_RIGHT;
            anchorPos = AnchorPosition.BOTTOMRIGHT;
            break;
        //No case 9 - break (-) in list array
        case 10:
            shiftDir = UP_LEFT_30;
            anchorPos = AnchorPosition.TOPLEFT;
            break;
        case 11:
            shiftDir = UP_RIGHT_30;
            anchorPos = AnchorPosition.TOPRIGHT;
            break;
        case 12:
            shiftDir = DOWN_LEFT_30;
            anchorPos = AnchorPosition.BOTTOMLEFT;
            break;
        case 13:
            shiftDir = DOWN_RIGHT_30;
            anchorPos = AnchorPosition.BOTTOMRIGHT;
            break;
        //No case 14 - break (-) in list array
        case 15:
            shiftDir = UP_LEFT_60;
            anchorPos = AnchorPosition.TOPLEFT;
            break;
        case 16:
            shiftDir = UP_RIGHT_60;
            anchorPos = AnchorPosition.TOPRIGHT;
            break;
        case 17:
            shiftDir = DOWN_LEFT_60;
            anchorPos = AnchorPosition.BOTTOMLEFT;
            break;
        case 18:
            shiftDir = DOWN_RIGHT_60;
            anchorPos = AnchorPosition.BOTTOMRIGHT;
            break;
        default:
            shiftDir = UP;
            break;
    }

    var shiftPixelsW;
    var shiftPixelsH;
    var deg45rad = Math.PI/4;
    var deg30rad = Math.PI/6;
    var deg60rad = Math.PI/3;
    switch (shiftDir) {
        case UP:
        case DOWN:
            shiftPixelsH = Math.round(imgH * (shift/sensorH));
            shiftPixelsW = 0;
            break;
        case LEFT:
        case RIGHT:
            shiftPixelsH = 0;
            shiftPixelsW = Math.round(imgW * (shift/sensorW));
            break;
        case UP_LEFT:
        case UP_RIGHT:
        case DOWN_LEFT:
        case DOWN_RIGHT:
            shiftPixelsH = Math.round(imgH * (shift/sensorH) * Math.sin(deg45rad));
            shiftPixelsW = Math.round(imgW * (shift/sensorW) * Math.cos(deg45rad));
            break;
        case UP_LEFT_30:
        case UP_RIGHT_30:
        case DOWN_LEFT_30:
        case DOWN_RIGHT_30:
            shiftPixelsH = Math.round(imgH * (shift/sensorH) * Math.sin(deg30rad));
            shiftPixelsW = Math.round(imgW * (shift/sensorW) * Math.cos(deg30rad));
            break;
        case UP_LEFT_60:
        case UP_RIGHT_60:
        case DOWN_LEFT_60:
        case DOWN_RIGHT_60:
            shiftPixelsH = Math.round(imgH * (shift/sensorH * Math.sin(deg60rad)));
            shiftPixelsW = Math.round(imgW * (shift/sensorW * Math.cos(deg60rad)));
            break;
        default:
            shiftPixelsW = Math.round((imgW * (shift/sensorW)));
            shiftPixelsH = Math.round((imgH * (shift/sensorH)));
            break;
    }

    return [shiftPixelsW, shiftPixelsH, anchorPos];
}
