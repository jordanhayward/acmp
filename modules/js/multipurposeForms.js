/*
 * This module manages forms that are reused in various places, storing and checking their state so they know what to do with their data and where to return to.
 */
 
 
/**
 * create a new work order or edit an existing one
 * @param {} isNew - true for creating a new work order, false for editing an existing one
 * @param {} wo - the work order object
 * @param {} rtnForm - the form to return to after Submit or Cancel
 * @returns {} 
 */
function openCreateWO(isNew, wo, rtnForm) {
	// if we have a null workorder, create an empty one
	if( !wo ) {
		wo = new WorkOrder()
		kony.print('created new WorkOrder\n' + objectdump(wo))
	}
	
	// stuff the state into the info object
	var curState = {isNew:isNew, wo:wo, rtnForm:rtnForm}
	if( frmCreateWO.info )				// if info already exists, only overwrite what we must, in case there is something else in there that matters
		_.extend(frmCreateWO.info, curState)
	else								// if info is unassigned, assign it now
		frmCreateWO.info = curState
	kony.print('frmCreateWO.info\n' + objectdump(frmCreateWO.info))
	
	if( isNew )
		wo.clearForm(frmCreateWO)
	else
		wo.populateForm(frmCreateWO)
	
	frmCreateWO.show()
}

