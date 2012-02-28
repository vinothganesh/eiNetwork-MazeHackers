function checkoutOverDriveItem(overdriveId, formatId){
	if (loggedIn){
		showProcessingIndicator("Checking out the title for you in OverDrive.  This may take a minute.");
		var url = path + "/EcontentRecord/AJAX?method=CheckoutOverDriveItem&overDriveId=" + overdriveId + "&formatId=" + formatId;
		$.ajax({
			url: url,
			success: function(data){
				alert(data.message);
				if (data.result){
					window.location.href = path + "/MyResearch/OverdriveCheckedOut";
				}else{
					hideLightbox();
				}
			},
			dataType: 'json',
			error: function(){
				alert("An error occurred processing your request in OverDrive.  Please try again in a few minutes.");
				hideLightbox();
			}
		});
	}else{
		ajaxLogin(function(){
			checkoutOverDriveItem(overDriveId, formatId);
		});
	}
}

function placeOverDriveHold(overDriveId, formatId){
	if (loggedIn){
		showProcessingIndicator("Placing a hold on the title for you in OverDrive.  This may take a minute.");
		var url = path + "/EcontentRecord/AJAX?method=PlaceOverDriveHold&overDriveId=" + overDriveId + "&formatId=" + formatId;
		$.ajax({
			url: url,
			success: function(data){
				alert(data.message);
				if (data.result){
					window.location.href = path + "/MyResearch/OverdriveHolds";
				}else{
					hideLightbox();
				}
			},
			dataType: 'json',
			error: function(){
				alert("An error occurred processing your request in OverDrive.  Please try again in a few minutes.");
				hideLightbox();
			}
		});
	}else{
		ajaxLogin(function(){
			placeOverDriveHold(overDriveId, formatId);
		});
	}
}

function addOverDriveRecordToWishList(recordId){
	if (loggedIn){
		showProcessingIndicator("Adding the title to your Wish List in OverDrive.  This may take a minute.");
		var url = path + "/EcontentRecord/AJAX?method=AddOverDriveRecordToWishList&recordId=" + recordId;
		$.ajax({
			url: url,
			success: function(data){
				alert(data.message);
				if (data.result){
					window.location.href = path + "/MyResearch/OverdriveWishList";
				}else{
					hideLightbox();
				}
			},
			dataType: 'json',
			error: function(){
				alert("An error occurred processing your request in OverDrive.  Please try again in a few minutes.");
				hideLightbox();
			}
		});
	}else{
		ajaxLogin(function(){
			addOverDriveRecordToWishList(recordId);
		});
	}
}

function removeOverDriveRecordFromWishList(overDriveId){
	if (loggedIn){
		showProcessingIndicator("Removing the title from your Wish List in OverDrive.  This may take a minute.");
		var url = path + "/EcontentRecord/AJAX?method=RemoveOverDriveRecordFromWishList&overDriveId=" + overDriveId;
		$.ajax({
			url: url,
			success: function(data){
				alert(data.message);
				if (data.result){
					window.location.href = path + "/MyResearch/OverdriveWishList";
				}else{
					hideLightbox();
				}
			},
			dataType: 'json',
			error: function(){
				alert("An error occurred processing your request in OverDrive.  Please try again in a few minutes.");
				hideLightbox();
			}
		});
	}else{
		ajaxLogin(function(){
			removeOverDriveRecordFromWishList(overDriveId);
		});
	}
}

function cancelOverDriveHold(overDriveId, formatId){
	if (loggedIn){
		showProcessingIndicator("Cancelling your hold in OverDrive.  This may take a minute.");
		var url = path + "/EcontentRecord/AJAX?method=CancelOverDriveHold&overDriveId=" + overDriveId + "&formatId=" + formatId;
		$.ajax({
			url: url,
			success: function(data){
				alert(data.message);
				if (data.result){
					window.location.href = path + "/MyResearch/OverdriveHolds";
				}else{
					hideLightbox();
				}
			},
			dataType: 'json',
			error: function(){
				alert("An error occurred processing your request in OverDrive.  Please try again in a few minutes.");
				hideLightbox();
			}
		});
	}else{
		ajaxLogin(function(){
			cancelOverDriveHold(overDriveId, formatId);
		});
	}
}