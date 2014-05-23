/*
 * The purpose of this module is implement and manage a hierarchy of locations and assets as come from Maximo.
 * 
 * levels is used to manage a hierarchy that can change.  type indentifies the kind of data held at this level. name is the user-friendly identifier.  The
 * key into the levels is used as the depth of the level in the hierarchy.
 * 
 * NOTE:  Because Maximo uses 1-based counting, the level or depth is number 1, not 0.  Level 0 is used as the root node for the entire hierarchy.  The
 * user should not be able to navigate to the root node.
 * 
 * NOTE:  We have been told that Maximo's hierarchy can change, so I have left hooks in here to allow levels to move up or down.  However, the actual
 * implementation is not fully generic.  The popups were created with names, and there are places where the code has hardcoded assumptions about the 
 * structure of the hierarchy.  This was done for expediency.  It will take some effort to make this a completely flexible subsystem.  It would probably
 * make more sense to do away with pre-built popups and generate them on the fly from the hierarchy data retrieved from Maximo.
 */
 
levels = {
	0:{type:'root',               name:'Root'},
	1:{type:'site',               name:'Site'},
	2:{type:'area',               name:'Area'},
	3:{type:'ggs',                name:'GGS'},
	4:{type:'facility',           name:'Facility'},
	5:{type:'facilitysystem',     name:'Facility System'},
	6:{type:'facilitysubsystem',  name:'Facility Subsystem'},
	7:{type:'equipment',          name:'Equipment'},
	8:{type:'subequipment',       name:'Sub-equipment'},
	9:{type:'instrument',         name:'Instrument'}
}

// UI functions ////////////////////////////////////////////////////////////////
// load the actual segment
function populateSegmentOfType(seg, type) {
	kony.print('populateSegmentOfType(' + type + ')')
	seg.setData(buildSegDataByType(type))
}

function populateSegmentAtDepth(seg, depth) {
	kony.print('populateSegmentAtDepth(' + depth + ')')
	seg.setData(buildSegDataByDepth(depth))
}

// build the data to go into the segment and return it
function buildSegDataByType(type) {
	kony.print('buildSegDataByType(' + type + ')')
}

function buildSegDataByDepth(depth) {
	kony.print('buildSegDataByDepth(' + depth + ')')
	var data = []
	var elements = retrieveChildrenOf()
}

// event handler when the user presses the Select button on the hierarchy navigator
function hierarchySelect(ev) {
	kony.print('hierarchySelect: ' + objectdump(ev))
}

// event handler when the user presses a segment to drill down or a label above to navigate back up
function hierarchyNavigate(ev) {
	kony.print('hierarchyNavigate: ' + objectdump(ev))
}

// search and retrieval functions //////////////////////////////////////////////
function retrieveChildrenOf(parentType, parentId) {
	kony.print('retrieveChildrenOf(' + parentType + ', ' + parentId + ')')
}

// sample hierarchy nodes //////////////////////////////////////////////////////
sites = {
	site1:{name:'Site 1', lat:123.456, lng:76.54, parenttype:null, parentid:null},
	site2:{name:'Site 2', lat:123.456, lng:76.54, parenttype:null, parentid:null},
	site3:{name:'Site 3', lat:123.456, lng:76.54, parenttype:null, parentid:null}
}

areas = {
	area1:{name:'area 1-1', lat:123.456, lng:76.54, parenttype:'site', parentid:site1},
	area2:{name:'area 1-2', lat:123.456, lng:76.54, parenttype:'site', parentid:site1},
	area3:{name:'area 2-1', lat:123.456, lng:76.54, parenttype:'site', parentid:site2},
	area4:{name:'area 3-1', lat:123.456, lng:76.54, parenttype:'site', parentid:site3}
}

ggss = {
	ggs1:{name:'ggs 1-1', lat:123.456, lng:76.54, parenttype:'area', parentid:area1},
	ggs2:{name:'ggs 1-2', lat:123.456, lng:76.54, parenttype:'area', parentid:area1},
	ggs3:{name:'ggs 2-1', lat:123.456, lng:76.54, parenttype:'area', parentid:area2},
	ggs4:{name:'ggs 3-1', lat:123.456, lng:76.54, parenttype:'area', parentid:area3}
}

facilities = {
	facility1:{name:'facility 1-1', lat:123.456, lng:76.54, parenttype:'ggs', parentid:ggs1},
	facility2:{name:'facility 1-2', lat:123.456, lng:76.54, parenttype:'ggs', parentid:ggs1},
	facility3:{name:'facility 2-1', lat:123.456, lng:76.54, parenttype:'ggs', parentid:ggs2},
	facility4:{name:'facility 3-1', lat:123.456, lng:76.54, parenttype:'ggs', parentid:ggs3}
}

facilitysystems = {
	facilitysystem1:{name:'facilitysystem 1-1', lat:123.456, lng:76.54, parenttype:'facility', parentid:facility1},
	facilitysystem2:{name:'facilitysystem 1-2', lat:123.456, lng:76.54, parenttype:'facility', parentid:facility1},
	facilitysystem3:{name:'facilitysystem 2-1', lat:123.456, lng:76.54, parenttype:'facility', parentid:facility2},
	facilitysystem4:{name:'facilitysystem 3-1', lat:123.456, lng:76.54, parenttype:'facility', parentid:facility3}
}

facilitysubsystems = {
	facilitysubsystem1:{name:'facilitysubsystem 1-1', lat:123.456, lng:76.54, parenttype:'facilitysystem', parentid:facilitysystem1},
	facilitysubsystem2:{name:'facilitysubsystem 1-2', lat:123.456, lng:76.54, parenttype:'facilitysystem', parentid:facilitysystem1},
	facilitysubsystem3:{name:'facilitysubsystem 2-1', lat:123.456, lng:76.54, parenttype:'facilitysystem', parentid:facilitysystem2},
	facilitysubsystem4:{name:'facilitysubsystem 3-1', lat:123.456, lng:76.54, parenttype:'facilitysystem', parentid:facilitysystem3}
}

equipments = {
	equipment1:{name:'equipment 1-1', lat:123.456, lng:76.54, parenttype:'facilitysubsystem', parentid:facilitysubsystem1},
	equipment2:{name:'equipment 1-2', lat:123.456, lng:76.54, parenttype:'facilitysubsystem', parentid:facilitysubsystem1},
	equipment3:{name:'equipment 2-1', lat:123.456, lng:76.54, parenttype:'facilitysubsystem', parentid:facilitysubsystem2},
	equipment4:{name:'equipment 3-1', lat:123.456, lng:76.54, parenttype:'facilitysubsystem', parentid:facilitysubsystem3}
}

subequipments = {
	subequipment1:{name:'subequipment 1-1', lat:123.456, lng:76.54, parenttype:'equipment', parentid:equipment1},
	subequipment2:{name:'subequipment 1-2', lat:123.456, lng:76.54, parenttype:'equipment', parentid:equipment1},
	subequipment3:{name:'subequipment 2-1', lat:123.456, lng:76.54, parenttype:'equipment', parentid:equipment2},
	subequipment4:{name:'subequipment 3-1', lat:123.456, lng:76.54, parenttype:'equipment', parentid:equipment3}
}

instruments = {
	instrument1:{name:'instrument 1-1', lat:123.456, lng:76.54, parenttype:'subequipment', parentid:subequipment1},
	instrument2:{name:'instrument 1-2', lat:123.456, lng:76.54, parenttype:'subequipment', parentid:subequipment1},
	instrument3:{name:'instrument 2-1', lat:123.456, lng:76.54, parenttype:'subequipment', parentid:subequipment2},
	instrument4:{name:'instrument 3-1', lat:123.456, lng:76.54, parenttype:'subequipment', parentid:subequipment3}
}

