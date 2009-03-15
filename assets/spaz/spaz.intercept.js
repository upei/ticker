var Spaz; if (!Spaz) Spaz = {};

/***********
Spaz.Intercept
************/
if (!Spaz.Intercept) Spaz.Intercept = {};

// ***************************************************************
// Event delegation handling
// ***************************************************************
Spaz.Intercept.init = function() {

	$('body').intercept('mouseover', {
			'.user-screen-name[title]':function(e) {
				var tt = new Spaz_Tooltip({
					'e'		:e,
					'el'	:this,
					'str'	:$(this).attr('title'),
					// 'previewurl':href,
				});
				tt.show();

				// Spaz.UI.showTooltip(this, $(this).attr('title'));
			},
			'a.in-reply-to':function(e) {
				var tt = new Spaz_Tooltip({
					'e'		:e,
					'el'	:this,
					'str'	:$(this).attr('title'),
					'reply_status_id':$(this).attr('status-id'),
					'reply_screen_name':$(this).attr('screen-name'),
				});
				tt.show();
				// Spaz.UI.showTooltip(this, $(this).attr('title'));
			},
			'.user-image[title]':function(e) {
				var tt = new Spaz_Tooltip({
					'e'		:e,
					'el'	:this,
					'str'	:$(this).attr('title'),
					// 'previewurl':href,
				});
				tt.show();


				// Spaz.UI.showTooltip(this, $(this).attr('title'));
			},
			'a.inline-link':function(e) {
				var href = $(this).attr('href');
				// Spaz.UI.showTooltip(this, "Open "+href+" in a browser window", href);
				var tt = new Spaz_Tooltip({
					'e'		:e,
					'el'	:this,
					'str'	:"Open "+href+" in a browser window",
					'previewurl':href,
				});
				tt.show();
				
				// Spaz.UI.showTooltip(this, "Open "+href+" in a browser window", href);
			},
			'a .highlight':function(e) {
				if ($(this).parents('a').attr('href')) {
					var href = $(this).parents('a').attr('href');
					var tt = new Spaz_Tooltip({
						'e'		:e,
						'el'	:this,
						'str'	:"Open "+href+" in a browser window",
						'previewurl':href,
					});
					tt.show();
					// Spaz.UI.showTooltip(this, "Open "+href+" in a browser window", href);
				}
			},
			'a[title]':function(e) {
				var tt = new Spaz_Tooltip({
					'e'		:e,
					'el'	:this,
					'str'	:$(this).attr('title'),
					'reply_status_id':$(this).attr('status-id'),
					'reply_screen_name':$(this).attr('screen-name'),
					'previewurl':$(this).attr('href'),
				});
				tt.show();
				
				// Spaz.UI.showTooltip(this, $(this).attr('title'), $(this).attr('href'));

			},
			'a[user-screen_name]':function(e) {
				var tt = new Spaz_Tooltip({
					'e'		:e,
					'el'	:this,
					'str'	:$(this).attr('title'),
					'previewurl':$(this).attr('href'),
				});
				tt.show();
			},
			'input[title]':function(e) {
				var tt = new Spaz_Tooltip({
					'e'		:e,
					'el'	:this,
					'str'	:$(this).attr('title'),
					// 'previewurl':href,
				});
				tt.show();
			},
			'.directory-user-followstatus':function(e) {
				var tt = new Spaz_Tooltip({
					'e'		:e,
					'el'	:this,
					'str'	:$(this).attr('title'),
					// 'previewurl':href,
				});
				tt.show();
			},
		})
	
		.intercept('mouseout', {
			'[title]':function(e) {
				Spaz.UI.hideTooltips();
			},
			'#tooltip':function(e) {
				Spaz.UI.hideTooltips();
			}
		})
	
		.intercept('click', {
			'#filter-friends':function(e) {
				this.select();
			},
			'#filter-user':function(e) {
				this.select();
			},
			'#filter-public':function(e) {
				this.select();
			},
			'#refresh-friends':function(e) {
				Spaz.UI.reloadCurrentTab(true);
				Spaz.restartReloadTimer();
			},
			'#refresh-user':function(e) {
				Spaz.UI.reloadCurrentTab(true);
				Spaz.restartReloadTimer();
			},
			'#refresh-public':function(e) {
				Spaz.UI.reloadCurrentTab(true);
				Spaz.restartReloadTimer();
			},
			'#markread-friends':function(e) {
				Spaz.UI.markCurrentTimelineAsRead();
			},
			'#markread-user':function(e) {
				Spaz.UI.markCurrentTimelineAsRead();
			},
			'#markread-public':function(e) {
				Spaz.UI.markCurrentTimelineAsRead();
			},
			'#toggle-friends':function(e) {
				Spaz.UI.toggleTimelineFilter();
			},
			'#prefs-open-folder':function(e) {
				Spaz.Sys.openAppStorageFolder();
			},
			'#friendslist-showfriends':function(e) {
				$('#timeline-followers').fadeOut();
				$('#timeline-friendslist').fadeIn();
			},
			'#friendslist-showfollowers':function(e) {
				$('#timeline-friendslist').fadeOut();
				$('#timeline-followers').fadeIn();
			},
			'#search-go':function(e) {
				Spaz.Section.search.build();
			},
			'#search-help':function(e) {
				openInBrowser('http://search.twitter.com/operators');
			},
			'#mainMenu-help':function(e) {
				Spaz.UI.showHelp();
			},
			'#mainMenu-prefs':function(e) {
				Spaz.UI.showPrefs();
			},
			'#mainMenu-about':function(e) {
				Spaz.UI.showAbout();
			},
			'#mainMenu-view-toggle':function(e) {
				Spaz.UI.toggleTimelineFilter();
			},
			'#mainMenu-view-reloadCurrentView':function(e) {
				Spaz.UI.reloadCurrentTab(true);
				Spaz.restartReloadTimer();
			},
			'#mainMenu-view-markAsReadCurrentView':function(e) {
				Spaz.UI.markCurrentTimelineAsRead();
			},
			'#mainMenu-view-clearReloadCurrentView':function(e) {
				Spaz.UI.clearCurrentTimeline();
				Spaz.UI.reloadCurrentTab(true);
				Spaz.restartReloadTimer();
			},
			'#mainMenu-sendDM':function(e) {
				Spaz.UI.prepDirectMessage('');
			},
			'#mainmenu-shortenLink':function(e) {
				Spaz.UI.showShortLink();
			},
			'#mainMenu-sendReply':function(e) {
				Spaz.UI.prepReply('');
			},
			'#mainMenu-followSpaz':function(e) {
				Spaz.Data.followUser('spaz');
			},
			
			
			'#irt-dismiss':function(e) {
				Spaz.UI.clearPostIRT();
				$('#entrybox').focus();
			},
			
			
			// prefs buttons handlers
			'#prefs-autosetrefresh-button':function(e) {
				Spaz.Data.getRateLimitInfo( Spaz.Prefs.setRateLimit );
			},
			
			
			// user context menu handlers
			'#userContextMenu-viewProfile':function(e) {
				Spaz.Sys.openInBrowser(Spaz.Prefs.get('twitter-base-url')+$(this).attr('user-screen_name'))
			},
			'#userContextMenu-follow':function(e) {
				Spaz.Data.followUser($(this).attr('user-screen_name'));
			},
			'#userContextMenu-unfollow':function(e) {
				Spaz.Data.stopFollowingUser($(this).attr('user-screen_name'));
			},
			'#userContextMenu-sendReply':function(e) {
				Spaz.UI.prepReply($(this).attr('user-screen_name'));
			},
			'#userContextMenu-sendDM':function(e) {
				Spaz.UI.prepDirectMessage($(this).attr('user-screen_name'));
			},
			'#userContextMenu-searchForUser':function(e) {
				var screen_name = $(this).attr('user-screen_name');
				var search_str = "from:"+screen_name+" OR to:"+screen_name;
				
				$('#search-for').val(search_str);
			    Spaz.Section.search.build();
			    Spaz.UI.showTab(3);
			},
			'#userContextMenu-filterByUser':function(e) {
				var screen_name = $(this).attr('user-screen_name');
				$('#filter-friends').val(screen_name);
				$('#filter-friends').trigger('keyup');
			    Spaz.UI.showTab(0);
			},
			
			'a[href]':function(e) {
				var url = $(this).attr('href');
				openInBrowser(url);
				return false;
			},
			'.user-screen-name':function(e) {
				var url = Spaz.Prefs.get('twitter-base-url')+$(this).attr('user-screen_name');
				openInBrowser(url);
			},
			'.user-image':function(e) {
				var url = Spaz.Prefs.get('twitter-base-url')+$(this).attr('user-screen_name');
				openInBrowser(url);
			},
			'.status-action-fav':function(e) {
				Spaz.Data.makeFavorite($(this).attr('entry-id'));
			},
			'.status-action-retweet':function(e) {
				Spaz.UI.prepRetweet($(this).attr('entry-id'));
			},
			'.status-action-dm':function(e) {
				Spaz.UI.prepDirectMessage($(this).attr('user-screen_name'));
			},
			'.status-action-reply':function(e) {
				Spaz.UI.prepReply($(this).attr('user-screen_name'), $(this).attr('entry-id'));
			},
			'.status-action-del':function(e) {
				Spaz.Data.destroyStatus($(this).attr('entry-id'))
			},
			'.directory-action-follow':function(e) {
				Spaz.Data.followUser($(this).attr('user-screen_name'));
			},
			'.directory-action-unfollow':function(e) {
				Spaz.Data.stopFollowingUser($(this).attr('user-screen_name'));
			},
			'.directory-user-location': function(e) {
				Spaz.UI.showLocationOnMap($(this).text());
			},
			'.timeline-entry':function(e) {
				Spaz.UI.selectEntry(this);
			},
			'.timeline-entry *':function(e) { // this one needs to be last so the more specific ones above take precedence
				// $('div.timeline-entry.ui-selected').removeClass('ui-selected').addClass('read');
				var entry = $(this).parents('.timeline-entry').get(0);
				Spaz.UI.selectEntry(entry);
				// entry.addClass('ui-selected');
			},
			'a .highlight':function(e) {
				if ($(this).parents('a').attr('href')) {
					openInBrowser($(this).parents('a').attr('href'));
				}
				return false;
			},
			'a':function(e) {
				Spaz.dump(this.outerHTML);
				if ($(this).attr('href')) {
          // hashtags
				  if($(this).text().match(/^#/)) {
				    $('#search-for').val($(this).text());
				    Spaz.Section.search.build();
				    Spaz.UI.showTab(3);
				  }
				  else
					  openInBrowser($(this).attr('href'));
				}
				return false;
			},
			
			'document':function(e){
				$('#userContextMenu').hide();
			},
			
			// '#header-label':function(e) {
			//	Spaz.UI.showMainMenu($(this));
			// },
		})
		.intercept('contextmenu', {
			// 'div.timeline-entry .user, div.timeline-entry .user-image, div.timeline-entry .user-screen-name':function(e) {
			'.user,.user-image,.user-screen-name,a[user-screen_name]':function(e) {
				// air.trace(this.outerHTML);
				var screen_name = $(this).attr('user-screen_name');
				Spaz.UI.showUserContextMenu($(this), screen_name);
			},
			'a[href]':function(e) {
				var url = $(this).attr('href');
				Spaz.UI.showLinkContextMenu($(this), url);
			},
		})
		.intercept('keyup', {
			'#filter-friends':function(e) {
				// air.trace('filter:'+this.outerHTML+"\n"+$(this).val());
				
				Spaz.Section.friends.filter( $(this).val() );
			},
			'#filter-user':function(e) {
				Spaz.Section.user.filter( $(this).val() );
			},
			'#filter-public':function(e) {
				Spaz.Section.public.filter( $(this).val() );
			}
		})


		
	// end intercept
	
	
	/*
		Normal bindings where intercept doesn't work
	*/

	
	$('#entrybox').focus(function(e) {
			Spaz.UI.showEntryboxTip();
			$('#entrystats').fadeIn('fast');		
		})
		.blur(function(e) {
			Spaz.UI.resetStatusBar();
			$("body").focus();
			$('#entrystats').fadeOut('fast');		
			return false;
		});
	
	
	/*
		Set-up invoke event for command-line processing
	*/
	air.NativeApplication.nativeApplication.addEventListener(air.InvokeEvent.INVOKE, invokeHandler);

	function invokeHandler (e) {
		air.trace('Invoke args: '+e.arguments);
	}
	
	
	/*
		Set-up drag and drop events
	*/
	var target = document.getElementById('container');
	target.addEventListener("dragenter", dragEnterOverHandler);
	target.addEventListener("dragover", dragEnterOverHandler);
	target.addEventListener("drop", dropHandler);
    
    function dragEnterOverHandler(event){
        event.preventDefault();
    }

    function dropHandler(event){
		event.preventDefault();
		
		if (!Spaz.Prefs.get('services-twitpic-sharepassword') ) {
			if ( confirm('Uploading to Twitpic requires that you share your Twitter username and password with the service. Are you sure you want to do this?') ) {
				uploadDraggedImage(event);
			}
		} else {
			uploadDraggedImage(event);
		}
		
		/*
			Upload the dragged image to Twitpic
		*/
		function uploadDraggedImage(event) {
			var fileUrl = event.dataTransfer.getData("text/uri-list");
			
			air.trace(fileUrl);
			
			if (fileUrl.match(/^(.+)\.(jpg|jpeg|gif|png)$/i)<1) {
				alert("File must be one of the following:\n .jpg, .jpeg, .gif, .png");
				return;
			}
			
			
			// upload the file
			Spaz.Data.uploadFile({
				'extra'  :{
					"username": Spaz.Prefs.getUser(),
					"password": Spaz.Prefs.getPass(),
					"source":Spaz.Prefs.get('twitter-source'),
				},
				'url'    :"http://twitpic.com/api/upload",
				'fileUrl':fileUrl,
				'open'   : function(event) {
					Spaz.UI.showLoading();
					Spaz.UI.statusBar('Uploading image to Twitpic…');
				},
				'complete': function(event) {
					Spaz.UI.hideLoading();

					var loader = event.target;
				    air.trace(loader.data);

					var parser=new DOMParser();
					xmldoc = parser.parseFromString(loader.data,"text/xml");
					var mediaurl = $(xmldoc).find('mediaurl').text();

					air.trace(mediaurl);

					Spaz.UI.prepPhotoPost(mediaurl);
				},
			});
			

		}


    }
	
};