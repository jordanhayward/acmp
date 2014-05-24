/*
 * The purpose of this module is implement and manage a hierarchy of locations and assets as come from Maximo.
 * 
 */
 
 
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
	var elements = levels[depth].data
	elements.forEach(function(elem) {							// DRY!
		kony.print('element: ' + objectdump(elem))
		data.push(_.extend(elem, {depth:depth}))
	})
	
	kony.print('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> buildSegDataByDepth segdata: ' + objectdump(data))
	return data
}

// update the text in the nav up labels
function populateNavUpLabels(depth, name) {
	kony.print('populateNavUpLabels(' + depth + ', ' + name + ')')
	var lblName = 'lbl' + depth
	kony.print('lblName: ' + lblName)
	kony.print('depth='+depth + '  length='+_.size(levels))
	for( var i=depth+1; i < _.size(levels); ++i ) {
		kony.print('  i='+i)
		var cmd = levels[i].form + '.' + lblName + '.text="' + name + '"'
		kony.print('  cmd: ' + cmd)
		try { eval(cmd) } catch(e) {}
	}
}

// event handlers //////////////////////////////////////////////////////////////////
// event handler when the user presses the Select button on the hierarchy navigator
function hierarchySelect(ev) {
	kony.print('hierarchySelect: ' + objectdump(ev))
}

// event handler when the user presses a row in a segment to drill down
function hierarchyNavigateDown(ev) {
	kony.print('hierarchyNavigateDown: ' + objectdump(ev))
	var curDepth = ev.focusedItem.depth
	var curId = ev.focusedItem.id
	kony.print('curDepth: ' + curDepth)
	kony.print('curId: ' + curId)
	var data = []
	var elements = retrieveChildrenOf(levels[curDepth].type, curId)
	elements.forEach(function(elem) {							// DRY!
		kony.print('element: ' + objectdump(elem))
		data.push(_.extend(elem, {depth:curDepth+1}))
	})
	kony.print('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> hierarchyNavigateDown segdata: ' + objectdump(data))
	
	// update up nav fields
	populateNavUpLabels(curDepth, ev.focusedItem.name)
	
	// swap forms
	var curForm = eval(levels[curDepth].form)
	var nextForm = eval(levels[curDepth+1].form)
	nextForm.seg.setData(data)
	nextForm.show()
	curForm.dismiss()
}

// event handler when the user presses a label above to navigate back up
function hierarchyNavigateUp(ev) {
	kony.print('hierarchyNavigateUp: ' + objectdump(ev))
	var curDepth = ev.focusedItem.depth
	var curId = ev.focusedItem.id
	kony.print('curDepth: ' + curDepth)
	kony.print('curId: ' + curId)
	var data = []
	// TODO stuff below is wrong, blindly copied from NavDown
	// TODO use a segment for the above levels, to allow for hidden column to store depth of each level?
	var elements = retrieveChildrenOf(levels[curDepth].type, curId)
	elements.forEach(function(elem) {							// DRY!
		kony.print('element: ' + objectdump(elem))
		data.push(_.extend(elem, {depth:curDepth+1}))
	})
	kony.print('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> hierarchyNavigateDown segdata: ' + objectdump(data))
	return data
}

// search and retrieval functions //////////////////////////////////////////////
function retrieveChildrenOf(parentType, parentId) {
	kony.print('retrieveChildrenOf(' + parentType + ', ' + parentId + ')')
//	kony.print('levels: ' + levels)
//	kony.print('levels: ' + objectdump(levels))
	var lvl = _.findWhere(levels, {type:parentType})
	kony.print('lvl: ' + lvl)
	kony.print('lvl: ' + objectdump(lvl))
	var nextLevel = lvl.children
	kony.print('nextLevel: ' + objectdump(nextLevel))
	var kids = _.where(nextLevel, {parentid:parentId})
	kony.print('kids: ' + objectdump(kids))
	return kids
}

// sample hierarchy nodes //////////////////////////////////////////////////////
root = [
	{id:'root', name:'root', parenttype:null, parentid:null}
]

sites = [
	{id:'site1', name:'Site 1', lat:123.456, lng:76.54, parenttype:'root', parentid:'root'},
	{id:'site2', name:'Site 2', lat:123.456, lng:76.54, parenttype:'root', parentid:'root'},
	{id:'site3', name:'Site 3', lat:123.456, lng:76.54, parenttype:'root', parentid:'root'}
]

areas = [
	{id:'area1', name:'area 1-1', lat:123.456, lng:76.54, parenttype:'site', parentid:'site1'},
	{id:'area2', name:'area 1-2', lat:123.456, lng:76.54, parenttype:'site', parentid:'site1'},
	{id:'area3', name:'area 2-1', lat:123.456, lng:76.54, parenttype:'site', parentid:'site2'},
	{id:'area4', name:'area 3-1', lat:123.456, lng:76.54, parenttype:'site', parentid:'site3'}
]

ggss = [
	{id:'ggs1', name:'ggs 1-1', lat:123.456, lng:76.54, parenttype:'area', parentid:'area1'},
	{id:'ggs2', name:'ggs 1-2', lat:123.456, lng:76.54, parenttype:'area', parentid:'area1'},
	{id:'ggs3', name:'ggs 2-1', lat:123.456, lng:76.54, parenttype:'area', parentid:'area2'},
	{id:'ggs4', name:'ggs 3-1', lat:123.456, lng:76.54, parenttype:'area', parentid:'area3'}
]

facilities = [
	{id:'facility1', name:'facility 1-1', lat:123.456, lng:76.54, parenttype:'ggs', parentid:'ggs1'},
	{id:'facility2', name:'facility 1-2', lat:123.456, lng:76.54, parenttype:'ggs', parentid:'ggs1'},
	{id:'facility3', name:'facility 2-1', lat:123.456, lng:76.54, parenttype:'ggs', parentid:'ggs2'},
	{id:'facility4', name:'facility 3-1', lat:123.456, lng:76.54, parenttype:'ggs', parentid:'ggs3'}
]

facilitysystems = [
	{id:'facilitysystem1', name:'facilitysystem 1-1', lat:123.456, lng:76.54, parenttype:'facility', parentid:'facility1'},
	{id:'facilitysystem2', name:'facilitysystem 1-2', lat:123.456, lng:76.54, parenttype:'facility', parentid:'facility1'},
	{id:'facilitysystem3', name:'facilitysystem 2-1', lat:123.456, lng:76.54, parenttype:'facility', parentid:'facility2'},
	{id:'facilitysystem4', name:'facilitysystem 3-1', lat:123.456, lng:76.54, parenttype:'facility', parentid:'facility3'}
]

facilitysubsystems = [
	{id:'facilitysubsystem1', name:'facilitysubsystem 1-1', lat:123.456, lng:76.54, parenttype:'facilitysystem', parentid:'facilitysystem1'},
	{id:'facilitysubsystem2', name:'facilitysubsystem 1-2', lat:123.456, lng:76.54, parenttype:'facilitysystem', parentid:'facilitysystem1'},
	{id:'facilitysubsystem3', name:'facilitysubsystem 2-1', lat:123.456, lng:76.54, parenttype:'facilitysystem', parentid:'facilitysystem2'},
	{id:'facilitysubsystem4', name:'facilitysubsystem 3-1', lat:123.456, lng:76.54, parenttype:'facilitysystem', parentid:'facilitysystem3'}
]

equipments = [
	{id:'equipment1', name:'equipment 1-1', lat:123.456, lng:76.54, parenttype:'facilitysubsystem', parentid:'facilitysubsystem1'},
	{id:'equipment2', name:'equipment 1-2', lat:123.456, lng:76.54, parenttype:'facilitysubsystem', parentid:'facilitysubsystem1'},
	{id:'equipment3', name:'equipment 2-1', lat:123.456, lng:76.54, parenttype:'facilitysubsystem', parentid:'facilitysubsystem2'},
	{id:'equipment4', name:'equipment 3-1', lat:123.456, lng:76.54, parenttype:'facilitysubsystem', parentid:'facilitysubsystem3'}
]

subequipments = [
	{id:'subequipment1', name:'subequipment 1-1', lat:123.456, lng:76.54, parenttype:'equipment', parentid:'equipment1'},
	{id:'subequipment2', name:'subequipment 1-2', lat:123.456, lng:76.54, parenttype:'equipment', parentid:'equipment1'},
	{id:'subequipment3', name:'subequipment 2-1', lat:123.456, lng:76.54, parenttype:'equipment', parentid:'equipment2'},
	{id:'subequipment4', name:'subequipment 3-1', lat:123.456, lng:76.54, parenttype:'equipment', parentid:'equipment3'}
]

instruments = [
	{id:'instrument1', name:'instrument 1-1', lat:123.456, lng:76.54, parenttype:'subequipment', parentid:'subequipment1'},
	{id:'instrument2', name:'instrument 1-2', lat:123.456, lng:76.54, parenttype:'subequipment', parentid:'subequipment1'},
	{id:'instrument3', name:'instrument 2-1', lat:123.456, lng:76.54, parenttype:'subequipment', parentid:'subequipment2'},
	{id:'instrument4', name:'instrument 3-1', lat:123.456, lng:76.54, parenttype:'subequipment', parentid:'subequipment3'}
]

/*
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
	0:{type:'root',               name:'Root',               data:root,                children:sites,              form:null},
	1:{type:'site',               name:'Site',               data:sites,               children:areas,              form:'popupSite'},
	2:{type:'area',               name:'Area',               data:areas,               children:ggss,               form:'popupArea'},
	3:{type:'ggs',                name:'GGS',                data:ggss,                children:facilities,         form:'popupGGS'},
	4:{type:'facility',           name:'Facility',           data:facilities,          children:facilitysystems,    form:'popupFacility'},
	5:{type:'facilitysystem',     name:'Facility System',    data:facilitysystems,     children:facilitysubsystems, form:'popupFacSystem'},
	6:{type:'facilitysubsystem',  name:'Facility Subsystem', data:facilitysubsystems,  children:equipments,         form:'popupFacSubsys'},
	7:{type:'equipment',          name:'Equipment',          data:equipments,          children:subequipments,      form:'popupEquipment'},
	8:{type:'subequipment',       name:'Sub-equipment',      data:subequipments,       children:instruments,        form:'popupSubEquipment'},
	9:{type:'instrument',         name:'Instrument',         data:instruments,         children:null,               form:'popupInstrument'}
}

