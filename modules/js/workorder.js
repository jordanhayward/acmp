// work order UI //////////////////////////////////////////////////////////////////////////////

function workTypeChanged(ev) {
	kony.print('workTypeChanged: ' + objectdump(ev))
	
	switch( ev.selectedKey ) {
		case 'AC01':
			// change subwork type combobox options 
			frmCreateWO.cbxWorkSubtype.isVisible = true
			frmCreateWO.cbxWorkSubtype.setEnabled(false)
			frmCreateWO.cbxWorkSubtype.masterData = [['TEST','Inspection & Test'], ['INSP','Inspection'], ['PDM','Predictive Maintenance'], ['PM','Preventative Maintenance'], ['CAL','Calibration'], ['SURVEY','Survey']]
			// change work category combobox options
			frmCreateWO.cbxWorkCategory.setEnabled(true)
			frmCreateWO.cbxWorkCategory.selectedKey = 'OTHER'
			break
		case 'AC02':
			// change subwork type combobox options and default 
			frmCreateWO.cbxWorkSubtype.isVisible = true
			frmCreateWO.cbxWorkSubtype.setEnabled(true)
			frmCreateWO.cbxWorkSubtype.masterData = [['CM','Corrective Maintenance'], ['NEWINST','New Installation'], ['MOD','Modification'], ['REMOVAL','Removal/Decommissioning']]
			frmCreateWO.cbxWorkSubtype.selectedKey = 'CM'
			// change work category combobox options
			frmCreateWO.cbxWorkCategory.setEnabled(false)
			frmCreateWO.cbxWorkCategory.selectedKey = 'OTHER'
			break
		case 'AC03':
			// change subwork type combobox options 
			frmCreateWO.cbxWorkSubtype.isVisible = false
			// change work category combobox options
			frmCreateWO.cbxWorkCategory.setEnabled(false)
			frmCreateWO.cbxWorkCategory.selectedKey = 'OTHER'
			break
	}
}

function workCategoryChanged(ev) {
	kony.print('workCategoryChanged: ' + objectdump(ev))
	// TODO change next combobox
}

function toggleATF(ev) {
	kony.print('toggleATF: ' + objectdump(ev))
	// show/hide widgets
	frmCreateWO.hboxCauseCode.isVisible = frmCreateWO.swiATF.selectedIndex === 0
	frmCreateWO.hboxRemedyCode.isVisible = frmCreateWO.swiATF.selectedIndex === 0
}

// work order filtering UI //////////////////////////////////////////////////////////////////////////////

function setLocationFilter(ev) {
	kony.print('setLocationFilter: ' + objectdump(ev))
	// TODO update filter display
	// TODO filter segment
	popLocationFilter.dismiss()
}

function setPriorityFilter(ev) {
	kony.print('setPriorityFilter: ' + objectdump(ev))
	// TODO update filter display
	// TODO filter segment
	popPriorityFilter.dismiss()
}

function setDueDateFilter(ev) {
	kony.print('setDueDateFilter: ' + objectdump(ev))
	// TODO update filter display
	// TODO filter segment
	popDueDateFilter.dismiss()
}

// work order CRUD //////////////////////////////////////////////////////////////////////////////

// used for both creation and updating of work orders from frmCreateWO
function saveWO(ev) {
	kony.print('saveWO:\n' + objectdump(ev))
	kony.print('info:\n' + objectdump(frmCreateWO.info))
	
	
	// TODO check to see if this is a new WO or an update to an existing one and save new data accordingly

	createdWO = new WorkOrder()
	with(createdWO) {
		title = frmCreateWO.txtTitle.text
		// TODO get description from popup or from info
		isATF = frmCreateWO.swiATF.selectedIndex === 0
	}
	// TODO add new WO to some collection somewhere
	kony.print('newly created WO:\n' + objectdump(createdWO))
	
	kony.print('frmCreateWO.info\n' + objectdump(frmCreateWO.info))
	kony.print('frmCreateWO.info.rtnForm\n' + objectdump(frmCreateWO.info.rtnForm))
	eval(frmCreateWO.info.rtnForm).show()
}

function updateWO(ev) {
	kony.print('updateWO: ' + objectdump(ev))
	// TODO update WO
	frmActiveWOList.show()
}

function sendMoreInfo(ev) {
	kony.print('sendMoreInfo: ' + objectdump(ev))
	// TODO send more info for WO
	// TODO remove more info from list
	// TODO update more info badge to reflect reduction
	frmMoreInfoList.show()
}


// work order status //////////////////////////////////////////////////////////////////////////////

function approveWO(ev) {
	kony.print('approveWO: ' + objectdump(ev))
	// TODO approve WO
	frmApprovalWOList.show()
}

function rejectWO(ev) {
	kony.print('rejectWO: ' + objectdump(ev))
	// TODO reject WO
	frmApprovalWOList.show()
}

function setWOstatus(ev) {
	kony.print('setWOstatus: ' + objectdump(ev))
	// TODO set status
	popChangeWOStatus.dismiss()
}


// work order "class" ////////////////////////////////////////////////////////////////////////////

function WorkOrder() {
	// empty properties
	this.title = null
	this.assetName = null
	this.description = null
	this.isATF = false
	// valve inspection fields
	this.inspectorName = null
	this.valveComment = null
	this.isLocked = false
	this.isLubricated = false

	// function to set all input fields on the CreateWO form
    WorkOrder.prototype.populateForm = function(frm) {
    	// TODO when passed a form, set all the fields to match the contents of the WorkOrder object
		frm.txtTitle.text = title
		frm.txtInspectorName.text = inspectorName
		frm.lblAsset.text = assetName
		frm.lblTruncatedDescription.text = description
		frm.lblTruncatedValveComment.text = valveComment
		frm.swiATF.selectedIndex = isATF ? 0 : 1
		frm.swiLocked.selectedIndex = isLocked ? 0 : 1
		frm.swiLubricated.selectedIndex = isLubricated ? 0 : 1
		// TODO set all comboboxes
    }
    
	// function to clear all input fields on the CreateWO form
    WorkOrder.prototype.clearForm = function(frm) {
		frm.txtTitle.text = ''
		frm.txtInspectorName.text = ''
		frm.lblAsset.text = ''
		frm.lblTruncatedDescription.text = ''
		frm.lblTruncatedValveComment.text = ''
		frm.swiATF.selectedIndex = 1
		frm.swiLocked.selectedIndex = 1
		frm.swiLubricated.selectedIndex = 1
		// TODO reset all comboboxes?
    }
}

// some global work orders for testing ///////////////////////////////////////////////////////

tempWO = new WorkOrder()
kony.print('tempWO:\n' + objectdump(tempWO))

// the currently active  work order
currentWO = {
	id:123,
	title:'Work Order 1',
	description:'This is the hardcoded description stored in globals.js.',
	assetName:'valve 1-1',
	assetId:'instrument1',
	isATF:false,
	
	// valve-specific
	inspectorName:'Charlie Hustle',
	valveComment:"There's something 'bout a valve...",
	isLocked:false,
	isLubricated:true
}
kony.print('currentWO:\n' + objectdump(currentWO))
currentWO.__proto__ = WorkOrder.prototype		// mix-in the functions of the WorkOrder "class" in workorder.js
kony.print('currentWO:\n' + objectdump(currentWO))

