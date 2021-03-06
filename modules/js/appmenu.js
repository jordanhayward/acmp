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
			kony.print('navList entry: ' + nav.buttonName)
			var cmd = form + '.' + nav.buttonName + '.onClick = nav.action'
			kony.print('onClick command: ' + cmd)
			eval(cmd)
		})
		
		// set a More Info badge
        var devinfo = kony.os.deviceInfo();
        var ostype = devinfo["name"];
        
        if (kony.string.startsWith(ostype, "i", true))
        {
	        var cmd = form + '.navMoreInfo.setBadge("1")';
	        kony.print('badge command: ' + cmd);
	        eval(cmd);
        }
	})
}


