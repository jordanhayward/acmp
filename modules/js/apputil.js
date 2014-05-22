// handle submit from popLongDesc
function updateLongDesc() {
	// TODO update WO
	// TODO update partial display of long description
	popLongdesc.dismiss()
}

// handle submit from popTimePicker
function updateTime() {
	// TODO update WO
	// TODO update display of time
	popTimePicker.dismiss()
}


// for debugging
function objectdump(arr,level) {
    var dumped_text = "";
    if(!level) level = 0;
    var level_padding = "";
    for(var j=0;j<level+1;j++) level_padding += "    ";
    if(typeof(arr) == 'object') {  
        for(var item in arr) {
            var value = arr[item];
            if(typeof(value) == 'object') { 
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += objectdump(value,level+1);
            } else {
                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
            }
        }
    } else { 
        dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
    }
    return dumped_text;
}
 
