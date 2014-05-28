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

function createWO(ev) {
	kony.print('createWO: ' + objectdump(ev))
	// TODO save WO
	frmActiveWOList.show()
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
