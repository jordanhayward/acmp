
// multi-purpose comment popup
function displayLongDescriptionPopup(ev) {
	// TODO set info to know where we came from and where the truncated string goes
	// TODO set title of popup
	kony.print('displayLongDescriptionPopup: ' + objectdump(ev))
}


// handle submit from popLongDesc
function updateLongDesc(ev) {
	kony.print('updateLongDesc: ' + objectdump(ev))
	// TODO examine info to determine what comment was just entered
	// TODO store user's entry internally in the appropriate data structure
	// TODO update truncated display of long description
	popLongdesc.dismiss()
}


