var Spaz;
if (!Spaz) Spaz = {};

/***********
Spaz.Prefs
************/
if (!Spaz.Prefs) Spaz.Prefs = {};



Spaz.Prefs.defaultPreferences = {
    'usemarkdown': true,

    'window-x': 50,
    'window-y': 50,
    'window-width': 275,
    'window-height': 600,
    'window-alpha': 100,
    'window-hideafterdelay': true,
    'window-restoreonupdates': true,
    'window-shownotificationpopups': true,
    'window-minimizetosystray': true,
    'window-minimizeonbackground': false,
    'window-restoreonactivate': true,

    'window-notificationposition': 'topRight',
    'window-notificationhidedelay': 6,
	'window-notificationmethod': 'internal', // 'growl' or 'internal'
	'window-notificationmax': 10, // how many notifications can be raised at once (for messages)

    'window-showcontextmenus': true,
    'window-tooltiphidedelay': 8000,
    'window-tooltipdelay': 500,
	'window-dropshadow': true,

    // 'theme-userstylesheet':null,
    'theme-basetheme': 'spaz',

    'sound-enabled': true,
    'wilhelm-enabled': true,

    'network-refreshinterval': 300000,
    'network-autoadjustrefreshinterval': false,
    'network-airhandlehttpauth': false,

    'debug-enabled': false,

    'sound-update': '/assets/sounds/TokyoTrainStation/CSnd.mp3',
    'sound-startup': '/assets/sounds/TokyoTrainStation/On.mp3',
    'sound-shutdown': '/assets/sounds/TokyoTrainStation/Off.mp3',
    'sound-new': '/assets/sounds/TokyoTrainStation/New.mp3',
    'sound-wilhelm': '/assets/sounds/wilhelm.mp3',

    'timeline-scrollonupdate': false,
    'timeline-maxentries': 325,
    'timeline-maxentries-dm': 25,
    'timeline-maxentries-reply': 50,
    'timeline-loadonstartup': true,
    'timeline-friends-getcount': 40,
    'timeline-replies-getcount': 20,
    'timeline-dm-getcount': 10,
	'timeline-keyboardnavwrap': false,

    'screennames-cache-max': 150,

    'checkupdate': true,
    'checkupdate-testversions': false,

    'url-shortener': 'isgd',

    'file-uploader': 'twitpic',

    'services-twitpic-sharepassword': false,

    'services-pingfm-userappkey': '',
    'services-pingfm-enabled': false,
    'services-pingfm-sendreplies': false,
    'services-pingfm-updatetype': 'default',

    'services-shortie-email': '',
    'services-shortie-secretkey' : '',

    'twitter-api-base-url': 'http://ic.upei.ca/ticker/api/',
    'twitter-base-url': 'http://ic.upei.ca/ticker/',

    'twitter-source': 'ticker',

	'twitter-disable-direct-posting':false,

    'dock-refreshinterval': 500,
    'dock-displayunreadbadge': true,
    'dock-unreadbadgecolor': "red",
    'dock-unreadbadgeshape': "classic",

    'entryboxhint': "What are you doing?",

    'key-toggle': "+F",
    'key-newEntry': "+T",
    'key-reply': "+Shift+@",
    'key-reloadTimeline': "Shift+F5",
    'key-showShortenWindow': "+Shift+A",
    'key-highlight-code': "+R"
}






// this maps methods to pref keys that should be
// called when they are changed
/*
    the methods:
    setUI: sets the exposed prefs UI for this preference
    onChange: things to execute when the value of this pref changes (like, say, changing the opacity of the window)
    check: make sure the current value is a "sane" one, within reasonable limits or a proper boolean, etc
    setFromUI: converts the UI value into the internally stored value, if needed (say, minutes into microseconds)
*/
Spaz.Prefs.changeMethods = {
    'usemarkdown': {
        setUI: function(value) {
            $('#usemarkdown').attr('checked', value);
        },
        onChange: function(value) {
            },
        check: function() {
            Spaz.Prefs.set('usemarkdown', Boolean(Spaz.Prefs.get('usemarkdown')))
        }

    },

    'window-x': {
        setUI: function(value) {},
        onChange: function(value) {},
        check: function() {}
    },
    'window-y': {
        setUI: function(value) {},
        onChange: function(value) {},
        check: function() {}
    },
    'window-width': {
        setUI: function(value) {},
        onChange: function(value) {},
        check: function() {}
    },
    'window-height': {
        setUI: function(value) {},
        onChange: function(value) {},
        check: function() {}
    },
    'window-alpha': {
        setUI: function(value) {
            $('#window-alpha').val(parseInt(value));
        },
        onChange: function(value) {
            //alert(percentage+"%");
            percentage = parseInt(value);
            if (isNaN(percentage)) {
                percentage = 100;
            }
            if (percentage < 25) {
                percentage = 25;
            }
            var val = parseInt(percentage) / 100;
            if (isNaN(val)) {
                val = 1;
            } else if (val >= 1) {
                val = 1;
            } else if (val <= 0) {
                val = 1;
            }

			/*  the bending code */
			BlenderEffect.get('app:/assets/blender/page.pbj', function(shader) {
				var tween = BlenderEffect.createShaderTransition(window.htmlLoader, 
						shader, 
						1200,
						Tween.effects.elasticEase);
				tween.hideOnFinish = false; 
				tween.start(true);
			});

            window.htmlLoader.alpha = val;
        },
        check: function() {
            var val = Spaz.Prefs.get('window-alpha');
            if (val > 100) {
                Spaz.Prefs.set('window-alpha', 100);
            } else if (val < 10) {
                Spaz.Prefs.set('window-alpha', 10);
            }
        },
    },
    'window-hideafterdelay': {
        setUI: function(value) {},
        onChange: function(value) {},
        check: function() {
            Spaz.Prefs.set('window-hideafterdelay', Boolean(Spaz.Prefs.get('window-hideafterdelay')))
        }
    },
    'window-restoreonupdates': {
        setUI: function(value) {},
        onChange: function(value) {},
        check: function() {
            Spaz.Prefs.set('window-restoreonupdates', Boolean(Spaz.Prefs.get('window-restoreonupdates')))
        }
    },
    'window-shownotificationpopups': {
        setUI: function(value) {
            $('#window-shownotificationpopups').attr('checked', value);
        },
        onChange: function(value) {},
        check: function() {
            Spaz.Prefs.set('window-shownotificationpopups', Boolean(Spaz.Prefs.get('window-shownotificationpopups')))
        }
    },
	'window-notificationposition': {
		setUI: function(value) {
			$('#window-notificationposition').val(value);
		},
		onChange: function(value) {}
	},
	'window-notificationmethod': {
		setUI: function(value) {
			$('#window-notificationmethod').val(value);
		},
		onChange: function(value) {},
		check: function() {
			if (Spaz.Prefs.get('window-notificationmethod') !== 'growl') {
				Spaz.Prefs.set('window-notificationmethod', 'internal');
				$('#window-notificationposition').removeAttr("disabled");
			} else { // is growl
				$('#window-notificationposition').attr("disabled","disabled");;
			}
            
        }
	},
    'window-minimizetosystray': {
        setUI: function(value) {
            $('#window-minimizetosystray').attr('checked', value);
        },
        onChange: function(value) {},
        check: function() {
            Spaz.Prefs.set('window-minimizetosystray', Boolean(Spaz.Prefs.get('window-minimizetosystray')))
        }
    },
    'window-minimizeonbackground': {
        setUI: function(value) {
            $('#window-minimizeonbackground').attr('checked', value);
        },
        onChange: function(value) {
            if (value) {
               air.NativeApplication.nativeApplication.addEventListener('deactivate',
                   function() {
                       //window.nativeWindow.minimize();
                       Spaz.Windows.windowMinimize();
                   })
            }
        },
        check: function() {
            Spaz.Prefs.set('window-minimizeonbackground', Boolean(Spaz.Prefs.get('window-minimizeonbackground')))
        }
    },
    'window-restoreonactivate': {
        setUI: function(value) {
            $('#window-restoreonactivate').attr('checked', value);
        },
        onChange: function(value) {
            if (value) {
                air.NativeApplication.nativeApplication.addEventListener('activate',
                function() {
                    //window.nativeWindow.restore();
                    Spaz.Windows.windowRestore();
                })
            }
        },
        check: function() {
            Spaz.Prefs.set('window-restoreonactivate', Boolean(Spaz.Prefs.get('window-restoreonactivate')))
        }
    },
    'window-dropshadow': {
        setUI: function(value) {
            $('#window-dropshadow').attr('checked', value);
        },
        onChange: function(value) {
            if (value) { // && !Spaz.Sys.isLinux()) {
			    window.htmlLoader.filters = window.runtime.Array(
			    	new window.runtime.flash.filters.DropShadowFilter(3, 90, 0, .8, 6, 6)
			    );
            } else {
			    window.htmlLoader.filters = null;	
			}
        },
        check: function() {
            Spaz.Prefs.set('window-dropshadow', Boolean(Spaz.Prefs.get('window-dropshadow')))
        }
    },
	'timeline-keyboardnavwrap': {
        setUI: function(value) {
            $('#timeline-keyboardnavwrap').attr('checked', value);
        },
        onChange: function(value) {},
        check: function() {
            Spaz.Prefs.set('timeline-keyboardnavwrap', Boolean(Spaz.Prefs.get('timeline-keyboardnavwrap')))
        }
	},

    // 'theme-userstylesheet':{
    // 	setUI: function(value){
    // 		$('#theme-userstylesheet').val(Spaz.Prefs.get('theme-userstylesheet'));
    // 	},
    // 	onChange: function(value) {
    // 		if (value) {
    // 			$('#UserCSSOverride').text(Spaz.Themes.loadUserStylesFromURL(value));
    // 		}
    // 	}
    // },
    'theme-basetheme': {
        setUI: function(value) {
            $('#theme-basetheme').val(value);
        },
        onChange: function(value) {
            Spaz.Themes.setCurrentTheme()
        }
    },

    'sound-enabled': {
        setUI: function(value) {
            $('#sound-enabled').attr('checked', value);
        },
        onChange: function(value) {},
        check: function() {
            Spaz.Prefs.set('sound-enabled', Boolean(Spaz.Prefs.get('sound-enabled')))
        }
    },

    'wilhelm-enabled': {
        setUI: function(value) {
            $('#wilhelm-enabled').attr('checked', value);
        },
        onChange: function(value) {},
        check: function() {
            Spaz.Prefs.set('wilhelm-enabled', Boolean(Spaz.Prefs.get('wilhelm-enabled')))
        }
    },

    'twitter-base-urls': {
        setUI: function(value) {
            $('#twitter-base-urls').val(value);
        },
        onChange: function(value) {
            if (value) {

                switch (value) {
                default:
                    var baseurl = 'http://ic.upei.ca/ticker/';
                    var apiurl = 'http://ic.upei.ca/ticker/api/';
                    break;
                }
                Spaz.Prefs.set('twitter-api-base-url', apiurl);
                Spaz.Prefs.changeMethods['twitter-api-base-url'].setUI(apiurl);
                Spaz.Prefs.set('twitter-base-url', baseurl);
                Spaz.Prefs.changeMethods['twitter-base-url'].setUI(baseurl);
            }
        }
    },
	
    'twitter-api-base-url': {
        setUI: function(value) {
            Spaz.dump('value:' + value);
            $('#twitter-api-base-url').val(value);
        },
    },
    'twitter-base-url': {
        setUI: function(value) {
            Spaz.dump('value:' + value);
            $('#twitter-base-url').val(value);
        },

    },

	'twitter-disable-direct-posting': {
        setUI: function(value) {
            $('#twitter-disable-direct-posting').attr('checked', value);
        },
        check: function() {
            Spaz.Prefs.set('twitter-disable-direct-posting', Boolean(Spaz.Prefs.get('twitter-disable-direct-posting')));
        }
    },

    'services-shortie-secretkey': {
        setUI: function(value) {
            if (value || value == '') {
                $('#services-shortie-secretkey').val(value);
                Spaz.dump('Shortie secretkey set...');
            } else {
                $('#services-shortie-secretkey').attr('value', '');
                Spaz.dump('Shortie secret key');
            }
        },

        check: function() {
            var current = Spaz.Prefs.get('services-shortie-secretkey');
            if (current || current == '') {
                Spaz.Prefs.set('services-shortie-secretkey', Spaz.Prefs.get('services-shortie-secretkey'));
                return true;
            } else {
                Spaz.Prefs.set('services-shortie-secretkey', '');
                Spaz.dump('Shortie secretkey bailed out');
                return false;
            }
        }
    },


    'services-shortie-email': {
        setUI: function(value) {
            if (value && value !== '') {
                $('#services-shortie-email').val(value);
                Spaz.dump('Shortie email set...');
            } else {
                $('#services-shortie-email').attr('value', '');
                Spaz.dump('Shortie secret key');
            }
        },

        check: function() {
            var current = Spaz.Prefs.get('services-shortie-email');
            if (current && current !== '') {
                Spaz.Prefs.set('services-shortie-email', Spaz.Prefs.get('services-shortie-email'));
                return true;
            } else {
                Spaz.Prefs.set('services-shortie-email', null);
                Spaz.dump('Shortie email bailed out');
                return false;
            }
        }
    },

    'services-pingfm-userappkey': {
        setUI: function(value) {
            Spaz.dump('value:' + value);

            if (value && value.match(/[a-f0-9]{32}-[0-9]{10}/i)) {
                $('#services-pingfm-userappkey').val(value);
                Spaz.dump('Valid Ping.fm API key');
            } else {
                Spaz.dump('invalid!');
                $('#services-pingfm-userappkey').attr('value', '');
                Spaz.dump('Invalid Ping.fm API key');
                // $('#services-pingfm-userappkey').val();
            }
        },
        check: function() {
            var current = Spaz.Prefs.get('services-pingfm-userappkey');
            if (current && current.match(/[a-f0-9]{32}-[0-9]{10}/i)) {
                Spaz.Prefs.set('services-pingfm-userappkey', Spaz.Prefs.get('services-pingfm-userappkey'));
                return true;
            } else {
                Spaz.dump('invalid!');
                Spaz.Prefs.set('services-pingfm-userappkey', null);
                Spaz.dump('Invalid Ping.fm API key');
                return false;
            }

        }
    },
    'services-pingfm-enabled': {
        setUI: function(value) {
            $('#services-pingfm-enabled').attr('checked', value);
        },
        check: function() {
            Spaz.Prefs.set('services-pingfm-enabled', Boolean(Spaz.Prefs.get('services-pingfm-enabled')));
        }
    },
    'services-pingfm-sendreplies': {
        setUI: function(value) {
            $('#services-pingfm-sendreplies').attr('checked', value);
        },
        check: function() {
            Spaz.Prefs.set('services-pingfm-sendreplies', Boolean(Spaz.Prefs.get('services-pingfm-sendreplies')));
        }
    },


    'services-twitpic-sharepassword': {
        setUI: function(value) {
            $('#services-twitpic-sharepassword').attr('checked', value);
        },
        onChange: function(value) {},
        check: function() {
            Spaz.Prefs.set('services-twitpic-sharepassword', Boolean(Spaz.Prefs.get('services-twitpic-sharepassword')))
        }
    },


    'network-refreshinterval': {
        setUI: function(value) {
            $('#network-refreshinterval').val(parseInt(value) / 60000);

            var minutes = parseInt(value) / 60000;
            var refperhour = 60 / minutes;
            var numreqs = Math.ceil(refperhour * 3);

            $('#refreshRateInfoValue').text(numreqs.toString())
        },
        onChange: function(value) {},
        check: function() {
            var val = parseInt(Spaz.Prefs.get('network-refreshinterval'));
            if (val < 2 * 60000) {
                Spaz.Prefs.set('network-refreshinterval', 2 * 60000);
            }
        },
        setFromUI: function(value) {
            return value * 60000;
        }
    },
    'network-autoadjustrefreshinterval': {
        setUI: function(value) {
            $('#network-autoadjustrefreshinterval').attr('checked', value);
        },
        onChange: function(value) {
            Spaz.dump('Setting Auto Adjust Refresh Interval to ' + value)
            window.htmlLoader.authenticate = value;
        },
        check: function() {
            Spaz.Prefs.set('network-autoadjustrefreshinterval', Boolean(Spaz.Prefs.get('network-autoadjustrefreshinterval')))
        }
    },
    'network-airhandlehttpauth': {
        setUI: function(value) {
            $('#network-airhandlehttpauth').attr('checked', value);
        },
        onChange: function(value) {
            Spaz.dump('Setting HTTPAuth handling to ' + value)
            window.htmlLoader.authenticate = value;
        },
        check: function() {
            Spaz.Prefs.set('network-airhandlehttpauth', Boolean(Spaz.Prefs.get('network-airhandlehttpauth')))
        }
    },


    'timeline-maxentries': {
        setUI: function(value) {
            //$('#checkupdate').attr('checked', value);
            },
        onChange: function(value) {},
        check: function() {
            if (parseInt(Spaz.Prefs.get('timeline-maxentries')) < 300) {
                Spaz.Prefs.set('timeline-maxentries', 300);
            }
            if (parseInt(Spaz.Prefs.get('timeline-maxentries')) > 1000) {
                Spaz.Prefs.set('timeline-maxentries', 1000);
            }
        }
    },
    'timeline-scrollonupdate': {
        setUI: function(value) {
            $('#timeline-scrollonupdate').attr('checked', value);
        },
        onChange: function(value) {},
        check: function() {
            Spaz.Prefs.set('timeline-scrollonupdate', Boolean(Spaz.Prefs.get('timeline-scrollonupdate')))
        }
    },

    'checkupdate': {
        setUI: function(value) {
            $('#checkupdate').attr('checked', value);
        },
        onChange: function(value) {},
        check: function() {
            Spaz.Prefs.set('checkupdate', Boolean(Spaz.Prefs.get('checkupdate')))
        }
    },
    'checkupdate-testversions': {
        setUI: function(value) {
            $('#checkupdate-testversions').attr('checked', value);
        },
        onChange: function(value) {},
        check: function() {
            Spaz.Prefs.set('checkupdate-testversions', Boolean(Spaz.Prefs.get('checkupdate-testversions')))
        }
    },


    // 'url-shortener': {
    // 	setUI: function(value){
    // 		$('#url-shortener').attr('checked', value);
    // 	},
    // 	onChange: function(value) {},
    // 	check: function() {
    // 		Spaz.Prefs.set('url-shortener', Boolean(Spaz.Prefs.get('url-shortener')))
    // 	}
    // },
    'debug-enabled': {
        setUI: function(value) {
            $('#debug-enabled').attr('checked', value);
        },
        onChange: function(value) {},
        check: function() {
            Spaz.Prefs.set('debug-enabled', Boolean(Spaz.Prefs.get('debug-enabled')))
        }
    },

    'screennames-cache-max': {
        check: function() {
            var val = parseInt(Spaz.Prefs.get('screennames-cache-max'));
            if (val > 150) {
                Spaz.Prefs.set('screennames-cache-max', 150);
            }
        }
    },

    'dock-refreshinterval': {
        setUI: function(value) {
            $('#dock-refreshinterval').val(value);
        },
        onChange: function(value) {
            Spaz.Dock.sync();
        },
        check: function() {
            var val = Spaz.Prefs.get('dock-refreshinterval');
            val = parseInt(val);
            if (val < 200) { // minimum will be 200ms
                Spaz.Prefs.set('dock-refreshinterval', 200);
            }
        },
        setFromUI: function(value) {
            return value;
        }
    },
    'dock-displayunreadbadge': {
        setUI: function(value) {
            $('#dock-displayunreadbadge').attr('checked', value);
        },
        onChange: function(value) {
            Spaz.Dock.sync();
        },
        check: function() {
            Spaz.Prefs.set('dock-displayunreadbadge', Boolean(Spaz.Prefs.get('dock-displayunreadbadge')))
        },
        setFromUI: function(value) {
            return value;
        }
    },
   'dock-unreadbadgecolor': {
       setUI: function(value) {
           $('#dock-unreadbadgecolor').val(value);
       },
       onChange: function(value) {
           Spaz.Dock.setColor(value);
       }
   },
   'dock-unreadbadgeshape': {
       setUI: function(value) {
           $('#dock-unreadbadgeshape').val(value);
       },
       onChange: function(value) {
           Spaz.Dock.setShape(value);
       }
   }
}





/**
 * Initializes the preferences: sets prefs from Spaz.Prefs.defaultPreferences, loads prefs file, and sets up the prefs UI
 */
Spaz.Prefs.init = function() {

    /*
        WE NEED TO COPY THIS, NOT ASSIGN!!!!
    */

    Spaz.Prefs.preferences = clone(Spaz.Prefs.defaultPreferences);
    Spaz.dump("defaultPreferences:" + Spaz.Prefs.defaultPreferences);
    Spaz.Prefs.loadPrefs();
	Spaz.Prefs.setSoundFileLocations();
    Spaz.Prefs.initUI();
}



/**
 * Loads the preferences.json file. If this file does not exist, it creates a new file based on Spaz.Prefs.defaultPreferences
 */
Spaz.Prefs.loadPrefs = function() {
    var prefsFile = air.File.applicationStorageDirectory;
    prefsFile = prefsFile.resolvePath("preferences.json");

    var fs = new air.FileStream();

    if (prefsFile.exists) {
        fs.open(prefsFile, air.FileMode.READ);
        var prefsJSON = fs.readUTFBytes(prefsFile.size);
        Spaz.dump(prefsJSON)
        var loadedpreferences = JSON.parse(prefsJSON);

        Spaz.dump(Spaz.Prefs.defaultPreferences);
        Spaz.dump(loadedpreferences);

        for (key in loadedpreferences) {
            Spaz.dump('Copying "' + key + '" from loaded prefs to current prefs');
            Spaz.Prefs.preferences[key] = loadedpreferences[key];
            Spaz.dump('"' + key + '":"' + Spaz.Prefs.preferences[key] + '" (' + typeof(Spaz.Prefs.preferences[key]) + ')');

            if (Spaz.Prefs.changeMethods[key] && Spaz.Prefs.changeMethods[key].check) {
                Spaz.dump("Calling check on " + key);
                Spaz.Prefs.changeMethods[key].check();
            }
        }
    } else {
        fs.open(prefsFile, air.FileMode.WRITE);
        fs.writeUTFBytes(JSON.stringify(Spaz.Prefs.defaultPreferences));
        Spaz.Prefs.preferences = clone(Spaz.Prefs.defaultPreferences);
    }
    fs.close()

//    Spaz.Prefs.loadUsername();
//    Spaz.Prefs.loadPassword();

};





Spaz.Prefs.initUI = function() {
    for (pkey in Spaz.Prefs.preferences) {
        //Spaz.dump(pkey);
        if (Spaz.Prefs.changeMethods[pkey]) {
            if (Spaz.Prefs.changeMethods[pkey].setUI) {
                Spaz.Prefs.changeMethods[pkey].setUI(Spaz.Prefs.get(pkey));
            }
            if (Spaz.Prefs.changeMethods[pkey].onChange) {
                Spaz.Prefs.changeMethods[pkey].onChange(Spaz.Prefs.get(pkey));
            }
        }
        $('#username').val(Spaz.Prefs.getUser());
        //Spaz.dump('set #username val to'+$('#username').val());
        $('#password').val(Spaz.Prefs.getPass());
    }





    $('#window-alpha').bind('change', Spaz.Prefs.setFromUI);
    $('#usemarkdown').bind('change', Spaz.Prefs.setFromUI);
    $('#window-minimizetosystray').bind('change', Spaz.Prefs.setFromUI);
    $('#window-minimizeonbackground').bind('change', Spaz.Prefs.setFromUI);
    $('#window-restoreonactivate').bind('change', Spaz.Prefs.setFromUI);
    $('#window-shownotificationpopups').bind('change', Spaz.Prefs.setFromUI);
	$('#window-notificationposition').bind('change', Spaz.Prefs.setFromUI);
	$('#window-notificationmethod').bind('change', Spaz.Prefs.setFromUI);
	$('#window-dropshadow').bind('change', Spaz.Prefs.setFromUI);
	$('#timeline-keyboardnavwrap').bind('change', Spaz.Prefs.setFromUI);
    $('#theme-basetheme').bind('change', Spaz.Prefs.setFromUI);
    $('#sound-enabled').bind('change', Spaz.Prefs.setFromUI);
    $('#wilhelm-enabled').bind('change', Spaz.Prefs.setFromUI);
    $('#checkupdate').bind('change', Spaz.Prefs.setFromUI);
    $('#checkupdate-testversions').bind('change', Spaz.Prefs.setFromUI);
    $('#network-refreshinterval').bind('change', Spaz.Prefs.setFromUI);
    $('#network-airhandlehttpauth').bind('change', Spaz.Prefs.setFromUI);
    $('#network-autoadjustrefreshinterval').bind('change', Spaz.Prefs.setFromUI);
    $('#debug-enabled').bind('change', Spaz.Prefs.setFromUI);
    $('#usemarkdown').bind('change', Spaz.Prefs.setFromUI);
    $('#timeline-scrollonupdate').bind('change', Spaz.Prefs.setFromUI);
    $('#twitter-base-urls').bind('change', Spaz.Prefs.setFromUI);
    $('#twitter-api-base-url').bind('change', Spaz.Prefs.setFromUI);
    $('#twitter-base-url').bind('change', Spaz.Prefs.setFromUI);
    $('#twitter-disable-direct-posting').bind('change', Spaz.Prefs.setFromUI);
    $('#services-twitpic-sharepassword').bind('change', Spaz.Prefs.setFromUI);
    $('#services-pingfm-userappkey').bind('change', Spaz.Prefs.setFromUI);
    $('#services-pingfm-enabled').bind('change', Spaz.Prefs.setFromUI);
    $('#services-pingfm-sendreplies').bind('change', Spaz.Prefs.setFromUI);
    $('#services-shortie-email').bind('change', Spaz.Prefs.setFromUI);
    $('#services-shortie-secretkey').bind('change', Spaz.Prefs.setFromUI);
    $('#dock-refreshinterval').bind('change', Spaz.Prefs.setFromUI);
    $('#dock-displayunreadbadge').bind('change', Spaz.Prefs.setFromUI);
    $('#dock-unreadbadgecolor').bind('change', Spaz.Prefs.setFromUI);
    $('#dock-unreadbadgeshape').bind('change', Spaz.Prefs.setFromUI);

};


Spaz.Prefs.setFromUI = function(event) {
    // Spaz.dump(JSON.stringify(event));
    // Spaz.dump('event.srcElement.id='+event.srcElement);
    var id = event.srcElement.id

    Spaz.dump("setFromUI - " + id)

    if (event.srcElement.tagName == "INPUT" && event.srcElement.type == "checkbox") {
        if ($('#' + id).attr('checked')) {
            var val = true;
        } else {
            var val = false;
        }
    } else {
        var val = $('#' + id).val();
    }

    // rewrite the incoming value if needed
    if (Spaz.Prefs.changeMethods[id] && Spaz.Prefs.changeMethods[id].setFromUI) {
        val = Spaz.Prefs.changeMethods[id].setFromUI(val);
    }

    // set the preference
    Spaz.Prefs.set(id, val);

    if (Spaz.Prefs.changeMethods[id]) {
        if (Spaz.Prefs.changeMethods[id].check) {
            Spaz.dump("Calling check on " + id + " -- current val is " + Spaz.Prefs.get(id));
            Spaz.Prefs.changeMethods[id].check();
        }
        if (Spaz.Prefs.changeMethods[id].setUI) {
            Spaz.dump("Calling setUI on " + id + " -- current val is " + Spaz.Prefs.get(id));
            Spaz.Prefs.changeMethods[id].setUI(Spaz.Prefs.get(id));
        }
        if (Spaz.Prefs.changeMethods[id].onChange) {
            Spaz.dump("Calling onChange on " + id + " -- current val is " + Spaz.Prefs.get(id));
            Spaz.Prefs.changeMethods[id].onChange(Spaz.Prefs.get(id));
        }
    }
};

/*
 * Allow user-created sounds by checking for their presence in the app storage directory.
 * If found, override the defaults set in Spaz.Prefs.defaultPreferences. 
 */
Spaz.Prefs.setSoundFileLocations = function() {
	Spaz.dump("Setting sound file locations");
	
	var soundFileUpdate = air.File.applicationStorageDirectory;
	soundFileUpdate = soundFileUpdate.resolvePath('usersounds/Csnd.mp3');

	var soundFileStartup = air.File.applicationStorageDirectory;
	soundFileStartup = soundFileStartup.resolvePath('usersounds/On.mp3');

	var soundFileShutdown = air.File.applicationStorageDirectory;
	soundFileShutdown = soundFileShutdown.resolvePath('usersounds/Off.mp3');

	var soundFileNew = air.File.applicationStorageDirectory;
	soundFileNew = soundFileNew.resolvePath('usersounds/New.mp3');

	var soundFileWilhelm = air.File.applicationStorageDirectory;
	soundFileWilhelm = soundFileWilhelm.resolvePath('usersounds/wilhelm.mp3');
	
	if (soundFileUpdate.exists) {
		Spaz.Prefs.preferences['sound-update'] = soundFileUpdate.url;
	}
	Spaz.dump('sound-update is: ' + Spaz.Prefs.preferences['sound-update']);
	
	if (soundFileStartup.exists) {
		Spaz.Prefs.preferences['sound-startup'] = soundFileStartup.url;
	}
	Spaz.dump('sound-startup is: ' + Spaz.Prefs.preferences['sound-startup']);
	
	if (soundFileShutdown.exists) {
		Spaz.Prefs.preferences['sound-shutdown'] = soundFileShutdown.url;
	}
	Spaz.dump('sound-shutdown is: ' + Spaz.Prefs.preferences['sound-shutdown']);
	
	if (soundFileNew.exists) {
		Spaz.Prefs.preferences['sound-new'] = soundFileNew.url;
	}
	Spaz.dump('sound-new is: ' + Spaz.Prefs.preferences['sound-new']);

	if (soundFileWilhelm.exists) {
		Spaz.Prefs.preferences['sound-wilhelm'] = soundFileWilhelm.url;
	}
	Spaz.dump('sound-wilhelm is: ' + Spaz.Prefs.preferences['sound-wilhelm']);
};


Spaz.Prefs.savePrefs = function() {
    var jsonPrefs = JSON.stringify(Spaz.Prefs.preferences, null, 4);
    Spaz.dump(jsonPrefs);

    var prefsFile = air.File.applicationStorageDirectory;
    prefsFile = prefsFile.resolvePath("preferences.json");

    var fs = new air.FileStream();

    fs.open(prefsFile, air.FileMode.WRITE);
    fs.writeUTFBytes(JSON.stringify(Spaz.Prefs.preferences));
    fs.close();

//    Spaz.Prefs.saveUsername();
//    Spaz.Prefs.savePassword();
};


Spaz.Prefs.resetPrefs = function() {
    Spaz.Prefs.preferences = clone(Spaz.Prefs.defaultPreferences);
    Spaz.Prefs.savePrefs();
};


Spaz.Prefs.get = function(key) {
    // Spaz.dump("Getting pref key '"+key+"'");
    // Spaz.dump("Value is "+Spaz.Prefs.preferences[key]);
    if (Spaz.Prefs.preferences[key]) {
        return Spaz.Prefs.preferences[key];
    } else {
        return false;
    }

};


Spaz.Prefs.set = function(key, value) {
    //Spaz.dump("Setting pref key '"+key+"'="+value);
    Spaz.Prefs.preferences[key] = value;
};






Spaz.Prefs.saveUsername = function() {
    if (Spaz.Prefs.user) {
        Spaz.dump('saving username: ' + Spaz.Prefs.user);
        var bytes = new air.ByteArray();
        bytes.writeUTFBytes(Spaz.Prefs.user);
        air.EncryptedLocalStore.setItem('twitter_username_1', bytes);
    }
};

Spaz.Prefs.loadUsername = function() {
    Spaz.dump('loading username');
    var storedValue = air.EncryptedLocalStore.getItem('twitter_username_1');
    if (storedValue) {
        Spaz.Prefs.user = storedValue.readUTFBytes(storedValue.length);
        return Spaz.Prefs.user;
    } else {
        Spaz.dump('Username COULD NOT BE LOADED');
        return false;
    }
};

Spaz.Prefs.savePassword = function() {
    if (Spaz.Prefs.pass) {
        Spaz.dump('saving password: ********');
        var bytes = new air.ByteArray();
        bytes.writeUTFBytes(Spaz.Prefs.pass);
        air.EncryptedLocalStore.setItem('twitter_password_1', bytes);
    }
};

Spaz.Prefs.loadPassword = function() {
    Spaz.dump('loading password');
    var storedValue = air.EncryptedLocalStore.getItem('twitter_password_1');
    if (storedValue) {
        Spaz.Prefs.pass = storedValue.readUTFBytes(storedValue.length);
        return Spaz.Prefs.pass;
    } else {
        Spaz.dump('Password COULD NOT BE LOADED');
        return false;
    }
};

Spaz.Prefs.setPrefs = function() {
    // Spaz.dump('Verifying password');
    Spaz.Data.verifyPassword();
    // Spaz.dump('saving Prefs');
    Spaz.Prefs.savePrefs();
}

Spaz.Prefs.setCurrentUser = function() {
    Spaz.Prefs.user = $('#username').val();
    Spaz.Prefs.pass = $('#password').val();

    Spaz.dump('set new username and pass (' + Spaz.Prefs.user + ')');

//    Spaz.Prefs.saveUsername();
//    Spaz.Prefs.savePassword();

    Spaz.dump('saved data');
}


Spaz.Prefs.setHandleHTTPAuth = function(state) {
    Spaz.dump(state);
    if (state) {
        Spaz.Prefs.handleHTTPAuth = 1
        window.htmlLoader.shouldAuthenticate = true;
    } else {
        Spaz.Prefs.handleHTTPAuth = 0;
        window.htmlLoader.shouldAuthenticate = false;
    }
    Spaz.dump(Spaz.Prefs.handleHTTPAuth);
    Spaz.dump(window.htmlLoader.shouldAuthenticate);
}

Spaz.Prefs.setDebugEnable = function(state) {
    Spaz.Debug.setEnable(state);
}


Spaz.Prefs.checkRefreshPeriod = function(val) {
    val = parseInt(val);
    if (val < 1) {
        val = 1;
    } else if (val > 60) {
        val = 60;
    }

    // convert msecs to minutes
    Spaz.Prefs.set('network-refreshinterval', val * 60000);
    //Spaz.UI.setPrefsFormVal('prefs-refresh-interval', val);
}


Spaz.Prefs.checkWindowOpacity = function(percentage) {
    //alert(percentage+"%");
    percentage = parseInt(percentage);
    if (isNaN(percentage)) {
        percentage = 100;
    }
    if (percentage < 25) {
        percentage = 25;
    }
    var val = parseInt(percentage) / 100;
    if (isNaN(val)) {
        val = 1;
    } else if (val >= 1) {
        val = 1;
    } else if (val <= 0) {
        val = 1;
    }

    window.htmlLoader.alpha = val;

    Spaz.Prefs.set('window-alpha', percentage);
    // Spaz.UI.setPrefsFormVal('prefs-opacity-percentage', Spaz.Prefs.windowOpacity);
}




Spaz.Prefs.setRateLimit = function(rateinfo, data) {
    Spaz.dump(JSON.stringify(rateinfo));

    var limit = rateinfo.hourly_limit;
    var per_min = Math.ceil((60 / (limit / 3)));
    var per_ms = per_min * 60000;

    Spaz.dump("per_min = " + per_min);
    Spaz.dump("per_ms  = " + per_ms);

    Spaz.UI.statusBar('Twitter says limit is ' + limit + '/hour. Will refresh every ' + per_min + ' min');

    Spaz.Prefs.changeMethods['network-refreshinterval'].setUI(per_ms);

    Spaz.Prefs.set('network-refreshinterval', per_ms);
    Spaz.Section.friends.mincachetime = per_ms;

}




Spaz.Prefs.getUser = function() {
    if (Spaz.Prefs.user == 'false') {
        return '';
    }
    return Spaz.Prefs.user;
}

Spaz.Prefs.getPass = function() {
    if (Spaz.Prefs.pass == 'false') {
        return '';
    }
    return Spaz.Prefs.pass;
}

Spaz.Prefs.getRefreshInterval = function() {
    return Spaz.Prefs.get('network-refreshinterval');
    // return 1000*5;
}

Spaz.Prefs.getDockRefreshInterval = function() {
    return Spaz.Prefs.get('dock-refreshinterval');
    // return 1000*5;
}

Spaz.Prefs.getDockDisplayUnreadBadge = function() {
    return Spaz.Prefs.get('dock-displayunreadbadge');
    // return 1000*5;
}

Spaz.Prefs.getHandleHTTPAuth = function() {
    return Spaz.Prefs.get('network-airhandlehttpauth');
}

Spaz.Prefs.getToggleKey = function() {
    return Spaz.Prefs.get('key-toggle');
}
