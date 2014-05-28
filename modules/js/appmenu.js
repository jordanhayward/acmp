// set up all the nav menu event handlers

formList = ['frmActiveWOList', 'frmApprovalWOList', 'frmCreateWO', 'frmDowntime', 'frmEditActiveWO', 'frmMainMenu', 'frmMoreInfoList', 'frmViewActiveWO', 'frmViewAwaitingWO', 'frmViewMoreInfo']
navList = [
	{buttonName:'navCreateWorkOrder', formName:'frmCreateWO', action:function(){openCreateWO(true, null, 'frmMainMenu')}},
	{buttonName:'navActiveWorkOrders', formName:'frmActiveWOList', action:function(){frmActiveWOList.show()}},
	{buttonName:'navAwaitingApproval',  formName:'frmApprovalWOList', action:function(){frmApprovalWOList.show()}},
	{buttonName:'navMoreInfo', formName:'frmMoreInfoList', action:function(){frmMoreInfoList.show()}},
	{buttonName:'navDowntime', formName:'frmDowntime', action:function(){frmDowntime.show()}}
]


// cycle through all nav buttons on all forms, setting their onClick event
function initNavMenu() {
	formList.forEach(function(form) {
		kony.print('formList entry: ' + form)
		navList.forEach(function(nav) {
			kony.print('navList entry: ' + nav)
			var cmd = form + '.' + nav.buttonName + '.onClick = nav.action'
			kony.print('command: ' + cmd)
			eval(cmd)
		})
	})
}
