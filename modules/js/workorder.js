// work order UI //////////////////////////////////////////////////////////////////////////////

function toggleATF() {
	// TODO show/hide widgets
}

// work order filtering UI //////////////////////////////////////////////////////////////////////////////

function setLocationFilter() {
	// TODO update filter display
	// TODO filter segment
	popLocationFilter.dismiss()
}

function setPriorityFilter() {
	// TODO update filter display
	// TODO filter segment
	popPriorityFilter.dismiss()
}

function setDueDateFilter() {
	// TODO update filter display
	// TODO filter segment
	popDueDateFilter.dismiss()
}

// work order CRUD //////////////////////////////////////////////////////////////////////////////

function createWO() {
	// TODO save WO
	frmActiveWOList.show()
}

function updateWO() {
	// TODO update WO
	frmActiveWOList.show()
}

function sendMoreInfo() {
	// TODO send more info for WO
	// TODO remove more info from list
	// TODO update more info badge to reflect reduction
	frmMoreInfoList.show()
}


// work order status //////////////////////////////////////////////////////////////////////////////

function approveWO() {
	// TODO approve WO
	frmApprovalWOList.show()
}

function rejectWO() {
	// TODO reject WO
	frmApprovalWOList.show()
}

function setWOstatus() {
	// TODO set status
	popChangeWOStatus.dismiss()
}
