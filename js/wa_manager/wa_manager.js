(function(window){
	var document = window.document, base_path = "js/wa_manager/";

	var wa_manager = window.wa_manager = {
		state: false,
		data: {
			form: {
				main: null,
				console: null,
				active: null
			},
			control: {
				tooltip: null,
				loader: null,
				breadcrumb: null
			},
			user: {
				token: null,
				nick: null,
				vip: false
			}
		}
	};

	//CONSTANTS
	wa_manager.constants = {
		cookie: {
			token: 'token',
			language: 'lang',
			expiriesday: 30
		},
		language: {
			ru: 'ru_ru',
			en: 'en_en',
			ua: 'ua_ua'
		},
		form: {
			messagebox: {
				type: {
					info: 'info',
					error: 'error',
					confirm: 'confirm',
					maskEdit: 'maskEdit',
                    maskAdd: 'maskAdd',
					folderRename: 'folderRename',
					folderAdd: 'folderAdd',
					setGeotargeting: 'setGeotargeting',
					setViewtargeting: 'setViewtargeting',
					setClicktargeting: 'setClicktargeting',
                    setTimetargeting: 'setTimetargeting',
					domainAdd: 'domainAdd',
					setDomain: 'setDomain',
                    console: 'console',
                    addTask: 'addTask',
                    editTask: 'editTask'
				},
				'class': {
					info: null,
					error: 'error',
					confirm: 'confirm'
				}
			},
			auth: {},
			reg: {},
			account: {},
			masks: {},
			folders: {},
			domains: {},
            tasks: {}
		},
		control: {
			textline: {
				type: {
					text: 'text',
					password: 'password',
					numericUpDown: 'numericUpDown'
				}
			},
			textinfo: {},
			texterror: {},
			buttonBox : {
				button: {
					type: {
						auth: 'blue',
						reg: 'blue',
						appy: "blue",
						msgbox_ok: null,
						msgbox_cancel: 'gray',
						leftGray: 'left gray'
					},
					name: {
						ok: 'ok',
						appy: 'appy',
						cancel: 'cancel'
					}
				}
			},
			tooltip: {},
			checkbox: {
				state: {
					check: 'check',
					uncheck: 'uncheck',
					tick: 'tick'
				}
			},
			areaset: {},
			loader: {},
			generalMenu: {},
			breadcrumb: {},
			iconBox: {
				items: {
					type: {
						edit: 'edit',
						purse: 'purse',
						pause: 'pause',
						rename: 'rename',
						'delete': 'delete',
						copy: 'copy',
						vip: 'vip',
						restore: 'restore',
						reset: 'reset',
						upload: 'upload',
						download: 'download',
						recreate: 'recreate',
                        geo: 'geo',
						view: 'view',
						click: 'click',
						data: 'data',
                        graphic: 'graphic'
					}
				}
			},
			numericUpDown: {},
			graphic: {
				type: {
					geoTargeting: 'geoTargeting',
					viewTargeting: 'viewTargeting',
					clickTargeting: 'clickTargeting',
                    timeTargeting: 'timeTargeting'
				}
			},
			maskList: {},
			dataResult: {},
            tabContainer: {}
		},
		attributes: {
			tooltip: 'tooltip',
			tooltip_state: 'tooltip_state'
		},
		url: {
			form: {
				reg: "Reg",
				auth: "Auth"
			}
		}
	};

	//OPTIONS
	wa_manager.options = {
		service: {
			name: "WaspAce Service",
			manager: "WaspAce Manager",
			url: "http://waspace.net",
			rules: "/rules.html",
			wmr: null
		},
		cookie: {
			expiriesday: 365,
			token_expiriesday: 1
		},
		language: {
			'default': wa_manager.constants.language.ru
		},
		console: false,
		browser: {
			firefox: {
				name: 'mozilla',
				version: 12
			},
			opera: {
				name: 'opera',
				version: 11
			},
			chrome: {
				name: 'webkit',
				version: 535
			},
			safari: {
				name: 'webkit',
				version: 534
			}
		},
		badBrowser: {
			ie: {
				name: 'msie'
			}
		}
	};

	//общий объект для создания элементов на странице
	wa_manager.proto = function(){
		this.Constructor = function(){};
		this.Destructor = function(opt){
			SelfObj.Actions.destroy(opt);
		};
		this.Show = function(opt){
			opt = $.extend(true, {
				force: false,
				effect: false,
				callback: function(){}
			}, opt);

			//если принудительное выполнение апперации не включено и эллемент отображается, то прерываем выполнение
			if(!opt.force && SelfObj.State.Visible) return;

			//отображаем эллемнт с аннимацией или без нее
			if(opt.effect) SelfObj.Actions.show({effect: true, callback: opt.callback});
			else SelfObj.Actions.show({effect: false, callback: opt.callback});
		};
		this.Hide = function(opt){
			opt = $.extend(true, {
				force: false,
				effect: false,
				callback: function(){}
			}, opt);

			//если принудительное выполнение апперации не включено и эллемент отображается, то прерываем выполнение
			if(!opt.force && !SelfObj.State.Visible) return;

			//скрываем эллемнт с аннимацией или без нее
			if(opt.effect) SelfObj.Actions.hide({effect: true, callback: opt.callback});
			else SelfObj.Actions.hide({effect: false, callback: opt.callback});
		};
		this.Toogle = function(opt){
			opt = $.extend(true, {
				force: false,
				effect: false,
				callback: function(){}
			}, opt);

			if(SelfObj.State.Visible) SelfObj.Actions.hide(opt);
			else SelfObj.Actions.show(opt);
		};
		this.HtmlNodes = {
			'Main': []
		};
		this.State = {
			'Visible': false
		};
		this.Opts = {
			'AnimateTime': 500
		};
		this.Data = {};

		var SelfObj = this;

		this.Init = function(opt, param){
			//задаем настройки
			SelfObj.Opts = $.extend(true, SelfObj.Opts, opt);

			//запускаем конструктор
			SelfObj.Constructor();

			//задаем начальное состояние эллемента
			param = $.extend(true, {
				visible: false
			}, param);

			if(param.visible) SelfObj.Actions.show({effect: false, force: true});
			else SelfObj.Actions.hide({effect: false, force: true});
		};
		this.Destroy = function(opt){
			SelfObj.Destructor(opt);
		};

		this.Actions = {
			destroy: function(opt){
				opt = $.extend(true, {
					effect: false,
					callback: function(){}
				}, opt);

				//если эффекты включены, то скрываем эллемент
				if(opt.effect) SelfObj.Actions.hide({
					force: true,
					effect: true,
					callback: function(){
						SelfObj.Actions.destroy({
							effect: false,
							callback: opt.callback
						});
					}
				});
				else {
					//удаляем эллемент
					for(var i=0;i<SelfObj.HtmlNodes.Main.length;i++)
						$(SelfObj.HtmlNodes.Main[i]).remove();

					//запускаем callback
					opt.callback();
				};
			},
			hide: function(opt){
				opt = $.extend(true, {
					effect: false,
					callback: function(){}
				}, opt);

				if(opt.effect){
					var l = SelfObj.HtmlNodes.Main.length;
					for(var i=0;i<l;i++){
						var main = SelfObj.HtmlNodes.Main[i];

						$(main).animate({opacity: 0}, SelfObj.Opts.AnimateTime);
						setTimeout(function(){
							$(main).hide().css({visibility: "hidden"});
						},SelfObj.Opts.AnimateTime);
					};
					setTimeout(function(){
						opt.callback();
					},SelfObj.Opts.AnimateTime * l)
				}else{
					var l = SelfObj.HtmlNodes.Main.length;
					for(var i=0;i<l;i++){
						var main = SelfObj.HtmlNodes.Main[i];

						$(main).css({opacity: 0});
						$(main).hide().css({visibility: "hidden"});
					};
					opt.callback();
				};

				SelfObj.State.Visible = false;
			},
			show: function(opt){
				opt = $.extend(true, {
					effect: false,
					callback: function(){}
				}, opt);

				if(opt.effect){
					var l = SelfObj.HtmlNodes.Main.length;
					for(var i=0;i<l;i++){
						var main = SelfObj.HtmlNodes.Main[i];

						$(main).css({visibility: "visible"}).show().animate({opacity: 1}, SelfObj.Opts.AnimateTime);
					};
					setTimeout(function(){
						opt.callback();
					},SelfObj.Opts.AnimateTime * l)
				}else{
					var l = SelfObj.HtmlNodes.Main.length;
					for(var i=0;i<l;i++){
						var main = SelfObj.HtmlNodes.Main[i];

						$(main).css({visibility: "visible"}).show().css({opacity: 1});
					};
					opt.callback();
				};

				SelfObj.State.Visible = true;
			}
		};
	};

	//UTILITES
	wa_manager.utils = {
		language: {
			get: function(){
				var lang = wa_manager.utils.storage.Get(wa_manager.constants.cookie.language);

				$.each(wa_manager.constants.language, function(i, value){
					if(value == lang) return lang;
				});

				return wa_manager.options.language['default']
			},
			set: function(lng){
				wa_manager.utils.storage.Set(wa_manager.constants.cookie.language, lng);
				window.location.href = "";
			}
		},
		isCompatibleBrowser: function(){
			var browsers = wa_manager.options.browser,
				output = false;
			$.each(browsers, function(key, value){
				if($.browser[value.name] && parseInt($.browser.version.toString()) >= value.version) output = true;
			});

			return output;
		},
		isCompatibleBrowser_2: function(){
			var browsers = wa_manager.options.badBrowser,
				output = true;
			$.each(browsers, function(key, value){
				if($.browser[value.name]) output = false;
			});

			return output;
		},
		isInt: function(string){
			if(string == parseInt(string).toString()) return true;
			else return false;
		},
		getSelectedFormFromUrl: function(url){
			var GET = {};

			if(!url) url = document.location.search;
			if(url.indexOf('?') != -1) url = url.substr(url.indexOf('?') + 1);

			var arr = url.split('&');

			$.each(arr, function(key, value){
				var temp = value.split('=');

				GET[temp[0]] = temp[1];
			});

			var cur_form = wa_manager.form[wa_manager.constants.url.form[GET['form']]],
				token = wa_manager.utils.storage.Get(wa_manager.constants.cookie.token);

			if(!cur_form){
				if (!token) cur_form = wa_manager.form.Auth;
				else{
					wa_manager.data.user.token = token;
					cur_form = wa_manager.form.Account;
				};
			}else if(cur_form == wa_manager.form.Auth && token){
				wa_manager.data.user.token = token;
				cur_form = wa_manager.form.Account;
			};

			var formObj = {
				form: function(){
					return new cur_form({holder: wa_manager.data.form.main.GetContentHolder()},{visible: false})
				}
			};

			wa_manager.data.form.main.SetActiveForm(formObj);
		},
		getMsgBoxes: function(){
			var output = [],
				msgboxes = $("div[id='popup']");

			$.each(msgboxes, function(key, value){
				if(
					value.nodeName.toLowerCase() == 'div' &&
					value.parentNode.nodeName.toLowerCase() == 'div' && $(value.parentNode).attr('id') == 'popup_box' &&
					value.parentNode.parentNode.nodeName.toLowerCase() == 'div' && $(value.parentNode.parentNode).attr('id') == 'popup_all' &&
					value.parentNode.parentNode.parentNode.nodeName.toLowerCase() == 'div' && $(value.parentNode.parentNode.parentNode).attr('id') == 'popup_wrap' &&
					$(value.parentNode.parentNode.parentNode).css('display') != 'none'
					) output.push(value);
			});

			return output;
		},
		notMsgBoxes: function(msgboxes){
			if(msgboxes.length > 0) return false;
			else return true;
		},
		interval: function(action, time){
			var stop = false;

			function interval(){
				action();
				if(!stop) setTimeout(arguments.callee, time);
			};

			this.start = function(){
				stop = false;
				interval();
			};
			this.stop = function(){
				stop = true;
			};
		},
		setTitle: function(elements){
			if(!elements) return;

			elements.reverse();

			var title = "";

			$.each(elements, function(key, value){
				if(value) title += value + " | ";
			});

			document.title = title.substr(0, title.length - 3);
		},
		stringToArray: function(str){
			var arr = [];

			for(var i=0;i<str.length;i++) arr.push(str[i]);

			return arr;
		},
		arrayToString: function(arr){
			return arr.join('');
		},
		formatDate: function(formatDate, formatString){
			var yyyy = formatDate.getFullYear();
			var yy = yyyy.toString().substring(2);
			var m = formatDate.getMonth() + 1;
			var mm = m < 10 ? "0" + m : m;
			var d = formatDate.getDate();
			var dd = d < 10 ? "0" + d : d;

			var h = formatDate.getHours();
			var hh = h < 10 ? "0" + h : h;
			var n = formatDate.getMinutes();
			var nn = n < 10 ? "0" + n : n;
			var s = formatDate.getSeconds();
			var ss = s < 10 ? "0" + s : s;

			formatString = formatString.replace(/yyyy/i, yyyy);
			formatString = formatString.replace(/yy/i, yy);
			formatString = formatString.replace(/mm/i, mm);
			formatString = formatString.replace(/m/i, m);
			formatString = formatString.replace(/dd/i, dd);
			formatString = formatString.replace(/d/i, d);
			formatString = formatString.replace(/hh/i, hh);
			formatString = formatString.replace(/h/i, h);
			formatString = formatString.replace(/nn/i, nn);
			formatString = formatString.replace(/n/i, n);
			formatString = formatString.replace(/ss/i, ss);
			formatString = formatString.replace(/s/i, s);

			return formatString;
		},
		dataFormat: {
			Icq: function(icq){
				icq = icq.toString();
				if(!wa_manager.utils.isInt(icq)) return icq;

				icq = icq.replace(/(?=(\d\d\d)+$)/g, '-');

				if(icq[0] == '-') icq = icq.substr(1);

				return icq;
			},
			Balance: function(balance){
				balance = balance.toString();
				if(!wa_manager.utils.isInt(balance)) return balance;

				return balance.replace(/(?=(\d\d\d)+$)/g, ' ');
			},
			Int: function(int){
				int = int.toString();

				if(!wa_manager.utils.isInt(int)) return int;

				return int.replace(/(?=(\d\d\d)+$)/g, ' ');
			},
			Date: function(seconds){
				if(!wa_manager.utils.isInt(seconds)) return seconds;

				return wa_manager.utils.formatDate(new Date(seconds * 1000), 'dd/mm/yyyy');
			}
		},
		storage: {
			Get: function(name){
				if(window.localStorage){
					return window.localStorage[name];
				}else{
					return wa_api.utils.cookie.Get(name);
				};
			},
			Set: function(name, value){
				if(window.localStorage){
					window.localStorage[name] = value;
				}else{
					wa_api.utils.cookie.Set(name, value, wa_api.utils.cookie.GetExpiresDataByDay(wa_manager.constants.cookie.expiriesday));
				};
			},
			Del: function(name){
				if(window.localStorage){
					delete window.localStorage[name];
				}else{
					wa_api.utils.cookie.Del(name);
				};
			}
		},
		objJoin: function(obj, delimiter){
			var str = "";

			$.each(obj, function(key, value){
				str += value + delimiter;
			});

			str = str.substr(0, str.length-delimiter.length);

			return str;
		}
	};

	//CONTROLS
	wa_manager.control = {
		textarea: function(opt, param){
			var proto = new wa_manager.proto();
			var cwe = wa_api.utils.cwe;
			var opts = proto.Opts;
			var SelfObj = this;
			var tooltip_attr = wa_manager.constants.attributes.tooltip;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				lineNumbers: true,
				resize: true,
				autoscroll: true,
				readonly: false,
				line: {
					height: 17,
					delimiter: '\n',
					minLength: 0,
					maxLength: 0,
					regexp: /^.{0,}$/
				},
				onResize: function(e){},
				holder: document.body,
				tooltip: null,
                focus: false
			});

			proto.Constructor = function(){
				if($.browser.opera){
					opts.lineNumbers = false,
					opts.line.delimiter= '\r\n'
				};

				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','id,wa_editor_wrap',opts.holder);
					var editor = cwe('div','id,wa_editor',parent);

				SelfObj.SetToolTip(opts.tooltip);

				if(opts.lineNumbers){
					var lines = proto.Data.lines = cwe('div','class,lines',editor);
						var codelines = proto.Data.codelines = cwe('div','class,codelines',lines);
				};

				var linedtextarea = proto.Data.linedtextarea = cwe('div','class,linedtextarea',editor);
					var textarea = proto.Data.textarea = cwe('textarea','class,lined;wrap,off',linedtextarea);

				if(opts.readonly) $(textarea).attr('readonly', 'on');

				if(opts.resize){
					var resize = proto.Data.resize = cwe('div','id,resize',editor);
				}else{
					$(textarea).css({resize: 'none'});
				};

                if(opts.focus) $(textarea).focus();

				//EVENTS
				if(opts.lineNumbers){
					$(textarea).bind('keyup click scroll', numberLineTrigger);
					proto.Data.oldText =  null;
					var interval = new wa_manager.utils.interval(function(){
						if(proto.Data.oldText != SelfObj.GetValue(true))numberLineTrigger();
					},500);
					interval.start();
				};
				if(opts.resize){
					proto.Data.goResize = false;
					$(resize).mousedown(function(e){
						//get textarea selection
						proto.Data.textareaSelection = {
							start: proto.Data.textarea.selectionStart,
							end: proto.Data.textarea.selectionEnd
						};

						//get mouse position
						proto.Data.mouse = {
							top: e.pageY,
							left: e.pageX
						};

						$(document).disableSelection();
						$(window).mousemove(resizerTrigger);

						proto.Data.goResize = true;
					});
					$(window).mouseup(function(e){
						if(proto.Data.goResize){
							proto.Data.goResize = false;

							$(window).unbind('mousemove',resizerTrigger);
							$(document).enableSelection();

							//set textarea selection
							proto.Data.textarea.selectionStart = proto.Data.textareaSelection.start;
							proto.Data.textarea.selectionEnd = proto.Data.textareaSelection.end;

							//redraw number lines
							if(opts.lineNumbers) numberLineTrigger();
						};
					});
				};
				//EVENTS
			};

			function numberLine(opt, param){
				var proto = new wa_manager.proto();
				var cwe = wa_api.utils.cwe;
				var opts = proto.Opts;
				var SelfObj = this;

				//options
				proto.Opts = $.extend(true, proto.Opts, {
					number: 1,
					active: false,
					error: false,
					holder: document.body,
					'class': {
						active: 'active',
						error: 'error'
					}
				});

				proto.Constructor = function(){
					var parent = proto.Data.main = proto.HtmlNodes.Main[0] = cwe('div','class,row', opts.holder);
					$(parent).html(opts.number);
					SelfObj.Number = opts.number;
				};

				this.Active = opts.active;
				this.Error = opts.error;
				this.Number = opts.number;

				this.SetActive = function(state){
					if(state){
						$(proto.Data.main).addClass(opts['class'].active);
						SelfObj.Active = true;
					}else{
						$(proto.Data.main).removeClass(opts['class'].active);
						SelfObj.Active = false;
					};
				};
				this.SetError = function(state){
					if(state){
						$(proto.Data.main).addClass(opts['class'].error);
						SelfObj.Error = true;
					}else{
						$(proto.Data.main).removeClass(opts['class'].error);
						SelfObj.Error = false;
					};
				};
				this.SetNumber = function(number){
					$(proto.Data.main).html(number);
					SelfObj.Number = number;
				};
				this.Destroy = function(opt){
					proto.Destroy(opt);
				};

				proto.Init(opt, param);
			};
			var CollectionNumberLine = {
				Numbers: {},
				NumbersError: {},
				ActiveNumber: 0,
				Add: function(number){
					if(CollectionNumberLine.Numbers[number] == null){
						CollectionNumberLine.Numbers[number] = new numberLine({number: number, holder: proto.Data.codelines},{visible: true});

						if(CollectionNumberLine.NumbersError[number] != null) CollectionNumberLine.SetError([number], true);
					};
				},
				ChangeNumber: function(number, newnumber){
					if(CollectionNumberLine.Numbers[number] != null){
						CollectionNumberLine.Numbers[number].SetNumber(newnumber);
						if(newnumber != number){
							CollectionNumberLine.Numbers[newnumber] = CollectionNumberLine.Numbers[number];
							CollectionNumberLine.Remove(number);
						};

						if(CollectionNumberLine.NumbersError[newnumber] != null) CollectionNumberLine.SetError([newnumber], true);
					};
				},
				Remove: function(number){
					if(CollectionNumberLine.Numbers[number] != null){
						CollectionNumberLine.Numbers[number].Destroy();
						delete CollectionNumberLine.Numbers[number];
					};
				},
				SetActive: function(number){
					if(CollectionNumberLine.ActiveNumber == number) return;

					$.each(CollectionNumberLine.Numbers, function(key, value){
						if(value != null){
							if(key == number){
								value.SetActive(true);
								CollectionNumberLine.ActiveNumber = value.number;
							}else value.SetActive(false);
						};
					});
				},
				SetError: function(numbers, state){
					$.each(numbers, function(key, number){
						if(CollectionNumberLine.Numbers[number] != null){
							CollectionNumberLine.Numbers[number].SetError(state);
						};

						if(state) CollectionNumberLine.NumbersError[number] = number;
						else delete CollectionNumberLine.NumbersError[number];
					});
				},
				Count: function(){
					var count = 0;
					$.each(CollectionNumberLine.Numbers, function(key, value){
						if(value != null) count++;
					});

					return count;
				},
				ExistsNumber: function(number){
					if(CollectionNumberLine.Numbers[number] == null) return false;
					else return true;
				},
				SetRange: function(first, length){
					var count = 0, temp_obj = {};
					$.each(CollectionNumberLine.Numbers, function(key, value){
						if(count <= length-1){
							var number = temp_obj[first+count] = value;
							number.SetNumber(first+count);
							number.SetError(false);
							count++;
						}else{
							CollectionNumberLine.Remove(key);
						};
					});

					while(count <= length-1){
						temp_obj[first+count] = new numberLine({number: first+count, holder: proto.Data.codelines},{visible: true});
						count++;
					};

					CollectionNumberLine.Numbers = temp_obj;

					CollectionNumberLine.SetError(CollectionNumberLine.NumbersError, true);
					CollectionNumberLine.SetActive(CollectionNumberLine.ActiveNumber);
				}
			};

			function numberLineTrigger(){
				proto.Data.oldText = SelfObj.GetValue(true);

				var firstNumber = SelfObj.GetFirstDisplayLine(), count = SelfObj.GetCountDisplayLine();

				$(proto.Data.codelines).css('top', -$(proto.Data.textarea).scrollTop()%opts.line.height);

				CollectionNumberLine.SetRange(firstNumber, count);
				CollectionNumberLine.SetActive(SelfObj.GetActiveLine());
			};
			function resizerTrigger(e){
				var size = SelfObj.GetSize();
				SelfObj.SetSize({
					width: size.width + Math.ceil(e.pageX - proto.Data.mouse.left),
					height: size.height + Math.ceil(e.pageY - proto.Data.mouse.top)
				});

				//set mouse position
				proto.Data.mouse = {
					top: e.pageY,
					left: e.pageX
				};

				//redraw number lines
				if(opts.lineNumbers) numberLineTrigger();

				//onResize event
				opts.onResize(e);
			};
			function autoScrollTrigger(countLine){
				var first = SelfObj.GetFirstDisplayLine(),
					countDisplay = SelfObj.GetCountDisplayLine();

				if(first + countDisplay - 1 >= countLine){
					SelfObj.SetActiveLine(countLine);
				};
			};

			//PROPERTYS
			this.htmlElement = null;

			this.GetValue = function(return_string){
				if(return_string){
					return $(proto.Data.textarea).val().replace('\r\n', '\n');
				}else{
					var out = SelfObj.GetValue(true).split('\n');
					if(out.length == 1 && out[0].length == 0) return [];
					else return out;
				};
			};
			this.GetCountLine = function(){
				var len = SelfObj.GetValue().length;

				if(len == 0) return 1;
				else return len;
			};
			this.GetCountDisplayLine = function(){
				var count = SelfObj.GetCountLine() - SelfObj.GetFirstDisplayLine() + 1,
					maxCount = SelfObj.GetMaxCountDisplayLine();

				if(count > maxCount) return maxCount;
				else return count;
			};
			this.GetMaxCountDisplayLine = function(){
				var countLines = $(proto.Data.textarea).innerHeight()/opts.line.height;

				if(proto.Data.textarea.clientHeight < $(proto.Data.textarea).innerHeight()) countLines--;

				var scroll = $(proto.Data.textarea).scrollTop()/opts.line.height;
				var float_scroll = scroll - parseInt(scroll);
				if(float_scroll > 0.30) countLines++;

				var float = countLines-parseInt(countLines);

				if(float > 0.30) return Math.ceil(countLines);
				else return Math.floor(countLines);
			};
			this.GetActiveLine = function(){
				var selStart = proto.Data.textarea.selectionStart,
					curLength = 0,
					val_arr = SelfObj.GetValue();
				for(var i=0;i<val_arr.length;i++){
					curLength += val_arr[i].length + opts.line.delimiter.length;
					if(selStart < curLength) return i+1;
				};

				return 1;
			};
			this.GetFirstDisplayLine = function(){
				var first = ($(proto.Data.textarea).scrollTop()/opts.line.height)+1;

				var float = first-parseInt(first);

				if(float > 0.90) return Math.ceil(first);
				else return Math.floor(first);
			};
			this.GetLines = function(numbers){
				var lines_out = [], lines = SelfObj.GetValue();

				$.each(numbers, function(key, value){
					lines_out.push({number: value, value: lines[value-1]});
				});

				return lines_out;
			};
			this.GetNotCompatibleLines = function(){
				var lines_arr = SelfObj.GetValue(), lines_out = [];

				$.each(lines_arr, function(key, value){
					if(
						(value.length < opts.line.minLength && opts.line.minLength != 0) ||
						(value.length > opts.line.maxLength && opts.line.maxLength != 0) ||
						(value.search(opts.line.regexp) == -1)
						)
						lines_out.push({number: key+1, value: value});
				});

				return lines_out;
			};
			this.GetSize = function(){
				return {
					width: parseInt($(proto.Data.linedtextarea).css('width')) + ((proto.Data.lines) ? parseInt($(proto.Data.lines).css('width')) : 0),
					height: parseInt($(proto.Data.linedtextarea).css('height'))
				};
			};

			this.SetValue = function(value, is_string){
				//get old value
				var old_value = SelfObj.GetValue();

				//get textarea selection
				var textareaSelection = {
					start: proto.Data.textarea.selectionStart,
					end: proto.Data.textarea.selectionEnd
				};

				if(is_string) value = value.replace('\r\n','\n').split('\n');

				//set value
				$(proto.Data.textarea).val(value.join(opts.line.delimiter));

				//set textarea selection
				proto.Data.textarea.selectionStart = textareaSelection.start;
				proto.Data.textarea.selectionEnd = textareaSelection.end;

				//run autoscroll
				if(opts.autoscroll) autoScrollTrigger(old_value.length);
			};
			this.SetCountLine = function(count){
				SelfObj.SetValue(SelfObj.GetValue().slice(0, count));
			};
			this.SetActiveLine = function(number){
				var cur_length = 0;
				$.each(SelfObj.GetValue().slice(0, number-1), function(key, value){
					cur_length += value.length + opts.line.delimiter.length
				});

				SelfObj.SetFirstDisplayLine(number);
				proto.Data.textarea.selectionStart = cur_length + 1;
				proto.Data.textarea.selectionEnd = cur_length + 1;
			};
			this.SetFirstDisplayLine = function(number){
				$(proto.Data.textarea).scrollTop(opts.line.height * (number-1));
			};
			this.SetSize = function(obj){
				$(proto.Data.linedtextarea).css({
					width: obj.width - ((proto.Data.lines) ? parseInt($(proto.Data.lines).outerWidth()) : 0),
					height: obj.height
				});

				$(proto.Data.lines).css({
					height: obj.height
				});
			};
			this.SetToolTip = function(text){
				opts.tooltip = text;
				$(proto.HtmlNodes.Main[0]).attr(tooltip_attr, opts.tooltip);
			};

			this.SetErrorLines = function(numbers, state, focus){
				CollectionNumberLine.SetError(numbers, state);

				if(focus) SelfObj.SetActiveLine(numbers[0]);
			};
			this.DisableErrorAllLines = function(){
				var lines_arr = [];
				for(var i=0;i<SelfObj.GetValue().length;i++) lines_arr.push(i+1);

				SelfObj.SetErrorLines(lines_arr, false, false);
			};

			this.AddLine = function(lines, is_string){
				if(is_string) lines = lines.replace('\r\n', '\n').split('\n');

				SelfObj.SetValue($.merge(SelfObj.GetValue(), lines));
			};

			this.RemoveLines = function(numbers){
				numbers.sort(function(a,b){return a-b;});
				var arr_lines = SelfObj.GetValue(), count = 0;

				$.each(numbers, function(key, value){
					arr_lines.splice(value-1-count, 1);
					count++;
				});
				CollectionNumberLine.SetError(numbers, false);

				SelfObj.SetValue(arr_lines);
			};
			this.RemoveNotCompatibleLines = function(){
				var arr_lines = SelfObj.GetNotCompatibleLines(), lines_out = [];

				$.each(arr_lines, function(key, value){
					lines_out.push(value.number);
				});

				SelfObj.RemoveLines(lines_out);
			};
			this.RemoveAllLines = function(){
				var arr_out = [];
				for(var i = 1;i<=SelfObj.GetCountLine();i++) arr_out.push(i);
				SelfObj.RemoveLines(arr_out);
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		textline: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.textline,
				tooltip_attr = wa_manager.constants.attributes.tooltip;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body,
				focus: false,
				value: null,
				type: constant.type.text,
				minLength: 0,
				maxLength: 0,
				regexp: /^.{0,}$/,
				'class': {
					error: 'error',
					float: 'float'
				},
				checkData: false,
				onError: function(){},
				tooltip: null,
				userCheckDataError: function(SelfObj, opts){return {state: false, callback: function(){}};},
				blackList: [],
				tags: {}
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('span','id,textline',opts.holder);
					var type = 'text';
					switch(opts.type){
						case constant.type.text:
							type = 'text';
							break;
						case constant.type.password:
							type = 'password';
							break;
						case constant.type.numericUpDown:
							type = 'text';
							$(parent).addClass(opts['class'].float);
							break;
					};
					var input = proto.Data.input = cwe('input','type,'+type,parent);

				//apply setting
				$.each(opts.tags, function(key, value){
					if(value) $(input).attr(key,value);
				});
				SelfObj.SetToolTip(opts.tooltip);
				if(opts.maxLength != 0) $(input).attr('maxlength', opts.maxLength);
				SelfObj.SetValue(opts.value);
				if(opts.focus) SelfObj.SetFocus(true);
				if(opts.checkData){
					var oldText = $(input).val();

					$(input).bind('keyup change', function(e){
						if(oldText != $(input).val()){
							oldText = $(input).val();
							SelfObj.CheckText();
						};
					});

					var interval = new wa_manager.utils.interval(function(){
						if(oldText != $(input).val()){
							oldText = $(input).val();
							SelfObj.CheckText();
						};
					},300);
					interval.start();
				};

				//check data
				SelfObj.SetError(checkData(proto.Data.input), true);
			};

			function checkData(input){
				var value = $(input).val();
				if(
					(value.length < opts.minLength && opts.minLength != 0) ||
					(value.length > opts.maxLength && opts.maxLength != 0) ||
					(value.search(opts.regexp) == -1) ||
					($.inArray(value, opts.blackList) != -1)
				) return true;
				else return false;
			};

			//PROPERTYS
			this.state = {
				error: false
			};
			this.htmlElement = null;

			//METHODS
			this.CheckText = function(){
				//if(!wa_manager.utils.notMsgBoxes(wa_manager.utils.getMsgBoxes())) return;

				var default_check = checkData(proto.Data.input),
					user_check = opts.userCheckDataError(SelfObj, opts);

				if(default_check){
					SelfObj.SetError(true);
					user_check.callback();
				}else if(user_check.state){
					SelfObj.SetError(true);
					user_check.callback();
				}else if(!user_check.state){
					SelfObj.SetError(false);
					user_check.callback();
				};

				if(SelfObj.state.error){
					opts.onError();
					return false;
				}else return true;
			};
			this.GetValue = function(){
				return $(proto.Data.input).val();
			};
			this.GetBlackList = function(){
				return opts.blackList;
			};
			this.SetValue = function(value){
				$(proto.Data.input).val(value);
			};
			this.SetError = function(state, not_toogle_class){
				if(state){
					if(!not_toogle_class) $(proto.HtmlNodes.Main[0]).addClass(opts['class'].error);
					SelfObj.state.error = true;
				}else{
					if(!not_toogle_class) $(proto.HtmlNodes.Main[0]).removeClass(opts['class'].error);
					SelfObj.state.error = false;
				};
			};
			this.SetFocus = function(state){
				if(state){
					$(proto.Data.input).focus();
				}else{
					$(proto.Data.input).blur();
				};
			};
			this.SetVisualError = function(state){
				if(state){
					$(proto.HtmlNodes.Main[0]).addClass(opts['class'].error);
				}else{
					$(proto.HtmlNodes.Main[0]).removeClass(opts['class'].error);
				};
			};
			this.SetToolTip = function(text){
				opts.tooltip = text;
				$(proto.HtmlNodes.Main[0]).attr(tooltip_attr, opts.tooltip);
			};
			this.SetUserCheckDataError = function(action){
				if(action) opts.userCheckDataError = action;
			};
			this.Clear = function(){
				$(proto.Data.input).val("");
			};
			this.AddBlackList = function(value){
				if(value) opts.blackList.push(value);
			};
			this.RemoveBlackList = function(value){
				var id = $.inArray(value, opts.blackList);

				while(id != -1){
					opts.blackList.splice(id, 1);
					id = $.inArray(value, opts.blackList);
				};
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		textinfo: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.textinfo,
				attributes = wa_manager.constants.attributes;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body,
				text: null,
				tooltip: null
			});

			proto.Constructor = function(){
				proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','id,text',opts.holder);

				SelfObj.SetText(opts.text);
				SelfObj.SetToolTip(opts.tooltip);
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;

			//METHODS
			this.SetToolTip = function(text){
				opts.tooltip = text;
				$(proto.HtmlNodes.Main[0]).attr(attributes.tooltip, opts.tooltip);
			};
			this.SetText = function(text){
				opts.text = text;
				$(proto.HtmlNodes.Main[0]).html(opts.text);
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		texterror: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.texterror,
				attributes = wa_manager.constants.attributes;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body,
				text: null,
				tooltip: null
			});

			proto.Constructor = function(){
				proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','id,error_text',opts.holder);

				SelfObj.SetText(opts.text);
				SelfObj.SetToolTip(opts.tooltip);
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;

			//METHODS
			this.SetToolTip = function(text){
				opts.tooltip = text;
				$(proto.HtmlNodes.Main[0]).attr(attributes.tooltip, opts.tooltip);
			};
			this.SetText = function(text){
				opts.text = text;
				$(proto.HtmlNodes.Main[0]).html(opts.text);
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		buttonBox: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.buttonBox,
				lang = wa_manager.language.control.buttonBox;

			//options
			var options_standart = {
				holder: document.body,
				buttons: {}
			};
			options_standart.buttons[constant.button.name.ok] = {
				text: lang.save,
				click: function(){},
				type: constant.button.type.msgbox_ok,
				accessKey: {
					first: ["13"],
					second: ["ctrlKey", "13"],
					used: "first"
				},
				show: false,
				order: 1
			};
			options_standart.buttons[constant.button.name.appy] = {
				text: lang.appy,
				click: function(){},
				type: constant.button.type.appy,
				show: false,
				order: 2
			};
			options_standart.buttons[constant.button.name.cancel] = {
				text: lang.cancel,
				click: function(){},
				type: constant.button.type.msgbox_cancel,
				accessKey: {
					first: ["27"],
					used: "first"
				},
				show: false,
				order: 3
			};
			proto.Opts = $.extend(true, opts, options_standart);

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = cwe('div','id,m_buttons',opts.holder);
				SelfObj.SetButtons();
			};

			function button(opt, param){
				var proto = new wa_manager.proto(),
					cwe = wa_api.utils.cwe,
					opts = proto.Opts,
					SelfObj = this,
					constant = wa_manager.constants.control.buttonBox,
					tooltip_attr = wa_manager.constants.attributes.tooltip;;

				//options
				proto.Opts = $.extend(true, proto.Opts, {
					text: null,
					click: function(e){},
					type: null,
					accessKey: {
						first: [],
						second: [],
						used: "first"
					},
					show: false,
					order: 1,
					tooltip: null
				});

				proto.Constructor = function(){
					var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('span','class,bt');

					//apply setting
					SelfObj.SetToolTip(opts.tooltip);
					$(parent).html(opts.text);
					$(parent).click(opts.click);
					$(parent).addClass(opts.type);
					$(window).keydown(function(e){
						var accessKey = opts.accessKey[opts.accessKey.used],
							isInt = function(string){
								if(string == parseInt(string).toString()) return true;
								else return false;
							};

						if(SelfObj.state.active){
							var condition = "",
								symbol_event = "e";
							$.each(accessKey, function(key, value){
								if(isInt(value)){
									condition += symbol_event + ".keyCode == " + value + " && ";
								}else{
									condition += symbol_event + "." + value + " && ";
								};
							});
							condition = condition.substr(0, condition.length - 4);

							if(condition.length < 1) return;

							if(eval(condition + " && !SelfObj.state.keydown")){
								SelfObj.state.keydown = true;
								$(parent).click();
								SelfObj.state.keydown = false;
							};
						};
					});
				};

				//PROPERTYS
				this.state = {
					active: true,
					keydown: false
				};
				this.htmlElement = null;

				//METHODS
				this.SetText = function(text){
					$(proto.HtmlNodes.Main[0]).html(text);
				};
				this.SetClick = function(action){
					$(proto.HtmlNodes.Main[0]).unbind('click');
					$(proto.HtmlNodes.Main[0]).click(action);
				};
				this.SetToolTip = function(text){
					opts.tooltip = text;
					$(proto.HtmlNodes.Main[0]).attr(tooltip_attr, opts.tooltip);
				};
				this.AddClick = function(action){
					$(proto.HtmlNodes.Main[0]).click(action);
				};

				this.Destroy = proto.Destroy;
				this.Show = proto.Show;
				this.Hide = proto.Hide;
				this.Toogle = proto.Toogle;

				proto.Init(opt, param);
			};
			function prepare_button(buttons){
				var output = {}, arr = [];

				$.each(buttons, function(key, value){
					if(value.show) arr.push({
						name: key,
						button: value
					});
				});

				arr.sort(function(a,b){return a.button.order-b.button.order;});

				$.each(arr, function(key, value){
					output[value.name] = value.button;
				});

				return output;
			};
			function set_button(buttons){
				$.each(SelfObj.buttons, function(key, value){
					value.Destroy();
					delete SelfObj.buttons[key];
				});

				$.each(buttons, function(key, value){
					var btn = new button(value, {visible: true});
					$(proto.HtmlNodes.Main[0]).append(btn.htmlElement);
					SelfObj.buttons[key] = btn;
				});
			};

			//PROPERTYS
			this.state = {
				active: true
			};
			this.buttons = {};

			//METHODS
			this.SetButtons = function(buttons){
				proto.Opts = $.extend(true, opts.buttons, buttons);
				set_button(prepare_button(opts.buttons));
			};
			this.SetActive = function(state){
				if(state){
					SelfObj.state.active = true;
				}else{
					SelfObj.state.active = false;
				};

				$.each(SelfObj.buttons, function(key, value){
					value.state.active = SelfObj.state.active;
				});
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		tooltip: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.tooltip,
				attributes = wa_manager.constants.attributes,
				elements = [];

			//options
			proto.Opts = $.extend(true, opts, {
				holder: document.body,
				timeDelay: 350,
				AnimateTime: 55,
				timer: 2500,
				margin: {
					x: 15,
					y: 15
				}
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = cwe('div','id,hintbox',opts.holder);
					var content = proto.Data.content = cwe('div','id,hintbox_content',parent);

				var interval = new wa_manager.utils.interval(SelfObj.ReloadToolTips, opt.timer);
				interval.start();

				$(parent).hover(function(e){SelfObj.Hide({effect: true});},function(e){SelfObj.Hide({effect: true});});
			};

			function tooltip_show(e){
				var element = this;
				if($(element).attr(attributes.tooltip).length < 1) return;
				$(element).attr(attributes.tooltip_state, true);

				setTimeout(function(){
					if($(element).attr(attributes.tooltip_state) == 'true'){
						$(proto.Data.content).html($(element).attr(attributes.tooltip));
						SelfObj.Show({effect: true});
						set_position(proto.HtmlNodes.Main[0], e, opts.margin);
					};
				}, opts.timeDelay);
			};
			function tooltip_hide(e){
				var element = this;
				$(element).attr(attributes.tooltip_state, false);
				SelfObj.Hide({effect: true});
			};
			function set_position(element, e, margin){
				var window_temp = {
						width: $(window).width(),
						height: $(window).height()
					},
					el = {
						width: $(element).width(),
						height: $(element).height()
					},
					cursor = {
						x: e.pageX,
						y: e.pageY
					},
					top = 0,
					left = 0;

				if(cursor.x + el.width + margin.x > window_temp.width){
					left = window_temp.width - el.width;
				}else{
					left = cursor.x  + margin.x;
				};

				if(cursor.y - el.height - margin.x < 0){
					top = cursor.y + el.height + margin.x;
				}else{
					top = cursor.y - el.height - margin.x;
				};

				$(element).css({
					top: top,
					left: left
				});
			};
			function get_elements(){
				return $("["+attributes.tooltip+"]");
			};
			function set_elements(elements_old, elements_new){
				var output = [];

				function set_pos_temp(e){
					set_position(proto.HtmlNodes.Main[0], e, opts.margin);
				};

				$.each(elements_new, function(key, value){
					if($.inArray(value, elements_old) == -1){
						elements_old.push(value);
						$(value).hover(tooltip_show, tooltip_hide);
						$(value).mousemove(set_pos_temp);
					};
				});

				$.each(elements_old, function(key, value){
					if($.inArray(value, elements_new) == -1){
						$(value).unbind('hover', tooltip_show);
						$(value).unbind('hover', tooltip_hide);
						$(value).unbind('mousemove', set_pos_temp);
					}else{
						output.push(value);
					};
				});

				return output;
			};

			//PROPERTYS
			this.state = {};

			//METHODS
			this.ReloadToolTips = function(){
				elements = set_elements(elements, get_elements());
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		checkbox: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.checkbox,
				attributes = wa_manager.constants.attributes;

			//options
			proto.Opts = $.extend(true, opts, {
				holder: document.body,
				state: constant.state.uncheck,
				tooltip: null,
				onCheck: function(checkBox, state){},
				onUnCheck: function(checkBox, state){},
				onClick: function(checkBox, state){}
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('span','id,checkbox',opts.holder);
					var box = proto.Data.box = cwe('b','',parent);

				SelfObj.SetState(opts.state, false);
				SelfObj.SetToolTip(opts.tooltip);

				//EVENTS
				$(box).mousedown(function(e){
					$(window).disableSelection();
				});
				$(window).mouseup(function(e){
					$(window).enableSelection();
				});
				$(box).click(SelfObj.StateToogle);
				$(box).click(function(e){
					var cur_state = null;

					$.each(SelfObj.state, function(key, value){
						if(value) cur_state = key;
					});

					opts.onClick(SelfObj, cur_state);

					e.stopPropagation()
				});
				//EVENTS
			};

			//PROPERTYS
			this.state = {
				check: false,
				uncheck: false,
				tick: false
			};
			this.htmlElement = null;

			//METHODS
			this.SetState = function(state, run_action){
				if(!state) return false;

				var classes = constant.state;
				$.each(classes, function(key, value){
					$(proto.Data.box).removeClass(value);
				});

				$(proto.Data.box).addClass(state);

				$.each(SelfObj.state, function(key, value){
					SelfObj.state[key] = false;
				});

				SelfObj.state[state] = true;

				if(run_action){
					switch(state){
						case constant.state.check:
							opts.onCheck(SelfObj, state);
							break;
						case constant.state.uncheck:
							opts.onUnCheck(SelfObj, state);
							break;
					};
					opts.onClick(SelfObj, state);
				};
			};
			this.SetOnCheck = function(action){
				opts.onCheck = action;
			};
			this.SetOnUnCheck = function(action){
				opts.onUnCheck = action;
			};
			this.SetOnClick = function(action){
				opts.onClick = action;
			};
			this.SetToolTip = function(text){
				opts.tooltip = text;
				$(proto.HtmlNodes.Main[0]).attr(attributes.tooltip, opts.tooltip);
			};
			this.StateToogle = function(){
				var cur_state = null;

				$.each(SelfObj.state, function(key, value){
					if(value) cur_state = key;
				});

				switch(cur_state){
					case constant.state.check:
						SelfObj.SetState(constant.state.uncheck, true);
						break;
					case constant.state.uncheck:
						SelfObj.SetState(constant.state.check, true);
						break;
					case constant.state.tick:
						SelfObj.SetState(constant.state.check, true);
						break;
				};
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		boxClose: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				attributes = wa_manager.constants.attributes;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body,
				tooltip: null,
				onClick: function(e){}
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('b','id,box_close',opts.holder);

				SelfObj.SetToolTip(opts.tooltip);

				$(parent).click(function(e){
					opts.onClick(e);
				});

				var keyDownTrigger = proto.Data.keyDownTrigger = function(e){
					if(!SelfObj.state.active) return;
					if(e.keyCode == 27){
						$(parent).click();
					};
				};

				$(window).keydown(keyDownTrigger);
			};

			//PROPERTYS
			this.state = {
				active: true
			};
			this.htmlElement = null;

			//METHODS
			this.SetToolTip = function(text){
				opts.tooltip = text;
				$(proto.HtmlNodes.Main[0]).attr(attributes.tooltip, opts.tooltip);
			};
			this.SetOnClick = function(action){
				opts.onClick = action;
			};
			this.SetActive = function(state){
				SelfObj.state.active = state;
			};

			this.Destroy = function(obj){
				$(window).unbind('keydown',proto.Data.keyDownTrigger);
				proto.Destroy(obj);
			};
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		areaset: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.areaset,
				attributes = wa_manager.constants.attributes;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body,
				tooltip: null
			});

			proto.Constructor = function(){
				proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('ul','id,areaset',opts.holder);

				SelfObj.SetToolTip(opts.tooltip);
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;
			this.controls = {};

			//METHODS
			this.SetToolTip = function(text){
				opts.tooltip = text;
				$(proto.HtmlNodes.Main[0]).attr(attributes.tooltip, opts.tooltip);
			};
			this.SetTextToControl = function(name, text){
				if(name == null || text == null) return;

				if(SelfObj.controls[name] != null){
					$(SelfObj.controls[name].text).html(text);
				};
			};
			this.AddControl = function(control){
				if($.isArray(control) && control.length > 0){
					var holder = proto.HtmlNodes.Main[0],
						holder_name = cwe('li','class,set', holder),
						holder_control = cwe('li','',holder),
						added = false;

					$.each(control, function(key, value){
						value = $.extend(true, {
							name: null,
							text: null,
							control: function(holder){}
						}, value);

						if(value.name == null) return;
						if(SelfObj.controls[value.name] != null) return;

						if(!added) holder_name = $(holder_name).html(value.text)

						SelfObj.controls[value.name] = {
							text: holder_name,
							control: value.control(holder_control)
						};

						added = true;
					});
				}else{
					control = $.extend(true, {
						name: null,
						text: null,
						control: function(holder){}
					}, control);

					if(control.name == null) return;
					if(SelfObj.controls[control.name] != null) return;

					var holder = proto.HtmlNodes.Main[0];

					SelfObj.controls[control.name] = {
						text: (control.text) ? $(cwe('li','class,set', holder)).text(control.text) : $(cwe('li','class,set', holder)).hide(),
						control: control.control(cwe('li','',holder))
					};
				};
			};
			this.RemoveControl = function(name){
				if(SelfObj.controls[name] != null){
					$(SelfObj.controls[name].text).remove();
					SelfObj.controls[name].control.Destroy();
					delete SelfObj.controls[name];
				};
			};
			this.GetControl = function(name){
				if(SelfObj.controls[name] != null){
					return SelfObj.controls[name].control;
				}else return false;
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		loader: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.loader,
				attributes = wa_manager.constants.attributes;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body,
				tooltip: null,
				AnimateTime: 300
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','id,popup_wrap',opts.holder);
					var loader = proto.Data.loader = cwe('div','id,loader',parent);

				$(parent).css("z-Index", 1000);

				SelfObj.SetToolTip(opts.tooltip);
			};

			//PROPERTYS
			this.state = {
				work: false
			};
			this.htmlElement = null;

			//METHODS
			this.SetToolTip = function(text){
				opts.tooltip = text;
				$(proto.Data.loader).attr(attributes.tooltip, opts.tooltip);
			};

			this.Destroy = proto.Destroy;
			this.Show = function(param){
				SelfObj.state.work = true;
				proto.Show(param);
			};
			this.Hide = function(param){
				SelfObj.state.work = false;
				proto.Hide(param);
			};
			this.Toogle = function(param){
				if(SelfObj.state.work){
					SelfObj.Hide(param);
				}else{
					SelfObj.Show(param);
				};
			};;

			proto.Init(opt, param);
		},
		generalMenu: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.generalMenu,
				attributes = wa_manager.constants.attributes;

			//options
			var default_opts = {
				holder: document.body,
				'class': {
					active: 'active',
					exit: 'exit'
				},
				items: {}
			};
			default_opts.items = {
				account: {
					text: wa_manager.language.control.generalMenu.items.account.text,
					tooltip: wa_manager.language.control.generalMenu.items.account.tooltip,
					'class': null,
					onClick: function(){},
					order: 1,
					show: true
				},
				category: {
					text: wa_manager.language.control.generalMenu.items.category.text,
					tooltip: wa_manager.language.control.generalMenu.items.category.tooltip,
					'class': null,
					onClick: function(){},
					order: 2,
					show: true
				},
				masks: {
					text: wa_manager.language.control.generalMenu.items.masks.text,
					tooltip: wa_manager.language.control.generalMenu.items.masks.tooltip,
					'class': null,
					onClick: function(){},
					order: 3,
					show: false
				},
				referals: {
					text: wa_manager.language.control.generalMenu.items.referals.text,
					tooltip: wa_manager.language.control.generalMenu.items.referals.tooltip,
					'class': null,
					onClick: function(){},
					order: 4,
					show: true
				},
				logout: {
					text: wa_manager.language.control.generalMenu.items.logout.text,
					tooltip: wa_manager.language.control.generalMenu.items.logout.tooltip,
					'class': default_opts['class'].exit,
					onClick: function(){},
					order: 5,
					show: true
				}
			};
			proto.Opts = $.extend(true, proto.Opts, default_opts);

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','id,menu',opts.holder);
					var menu = proto.Data.menu = cwe('ul','id,h_menu',parent);

				SelfObj.SetItems(opts.items);

				$(parent).mousedown(function(e){
					$(window).disableSelection();
				});
				$(window).mouseup(function(e){
					$(window).enableSelection();
				});
			};

			function Item(opt, param){
				var proto = new wa_manager.proto(),
					cwe = wa_api.utils.cwe,
					opts = proto.Opts,
					SelfObj = this,
					attributes = wa_manager.constants.attributes;

				//options
				proto.Opts = $.extend(true, proto.Opts, {
					holder: document.body,
					name: null,
					text: null,
					menu: null,
					'class': null,
					onClick: function(){},
					order: 1,
					tooltip: null
				});

				proto.Constructor = function(){
					var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('li','',opts.holder);
						var content = proto.Data.content = cwe('span','',parent);

					$(content).addClass(opts['class']);
					SelfObj.SetText(opts.text);
					SelfObj.SetToolTip(opts.tooltip);
					$(parent).click(function(e){
						opts.menu.SetActiveItem(opts.name);
						opts.onClick(e);
					});
				};

				//PROPERTYS
				this.state = {
					active: false
				};
				this.htmlElement = null;

				//METHODS
				this.SetToolTip = function(text){
					opts.tooltip = text;
					$(SelfObj.htmlElement).attr(attributes.tooltip, opts.tooltip);
				};
				this.SetText = function(text){
					opts.text = text;
					$(proto.Data.content).html(opts.text);
				};
				this.SetOnClick = function(action){
					opts.onClick = action;
				};
				this.SetActive = function(state, className){
					if(state){
						$(proto.Data.content).addClass(className);
						SelfObj.state.active = true;
					}else{
						$(proto.Data.content).removeClass(className);
						SelfObj.state.active = false;
					};
				};

				this.Destroy = proto.Destroy;
				this.Show = proto.Show;
				this.Hide = proto.Hide;
				this.Toogle = proto.Toogle;

				proto.Init(opt, param);
			};
			function generateItems(items, holder, menuObj){
				var output = {}, arr = [];

				//select enabled items
				$.each(items, function(key, value){
					if(value.show) arr.push({
						name: key,
						item: value
					});
				});

				//sort order by 'order'
				arr.sort(function(a,b){return a.item.order-b.item.order;});

				//generate htmlNodes and add to output object
				$.each(arr, function(key, value){
					value.item.holder = holder;
					value.item.name = value.name;
					value.item.menu = menuObj;

					output[value.name] = new Item(value.item,{visible: true});
				});

				return output;
			};

			//PROPERTYS
			this.state = {};
			this.items = {};
			this.htmlElement = null;

			//METHODS
			this.SetItems = function(items){
				opts.items = $.extend(true, opts.items, items);

				$.each(SelfObj.items, function(key, value){
					if(value) value.Destroy();
					delete SelfObj.items[key];
				});

				SelfObj.items = generateItems(opts.items, proto.Data.menu, SelfObj);
			};
			this.SetActiveItem = function(itemName){
				$.each(SelfObj.items, function(key, value){
					if(key == itemName) value.SetActive(true, opts['class'].active);
					else value.SetActive(false, opts['class'].active);
				});
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		breadcrumb: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.breadcrumb,
				attributes = wa_manager.constants.attributes;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe("div","id,breadcrumb",opts.holder);
			};

			function Item(opt, param){
				var proto = new wa_manager.proto(),
					cwe = wa_api.utils.cwe,
					opts = proto.Opts,
					SelfObj = this,
					constant = wa_manager.constants.control.breadcrumb,
					attributes = wa_manager.constants.attributes;

				//options
				proto.Opts = $.extend(true, proto.Opts, {
					holder: document.body,
					text: null,
					onClick: function(){},
					active: false
				});

				proto.Constructor = function(){
					var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe("span","class,item",opts.holder);

					SelfObj.SetText(opts.text);
					SelfObj.SetActive(opts.active);

					$(parent).click(function(e){
						if(!SelfObj.state.active) opts.onClick();
					});
				};

				//PROPERTYS
				this.state = {
					active: false
				};
				this.htmlElement = null;

				//METHODS
				this.SetText = function(text){
					opts.text = text;

					$(proto.HtmlNodes.Main[0]).text(opts.text);
				};
				this.SetOnClick = function(func){
					opts.onClick = func;
				};
				this.SetActive = function(state){
					if(state){
						SelfObj.state.active = true;
						$(proto.HtmlNodes.Main[0]).addClass("active");
					}else{
						SelfObj.state.active = false;
						$(proto.HtmlNodes.Main[0]).removeClass("active");
					};
				};

				this.Destroy = proto.Destroy;
				this.Show = proto.Show;
				this.Hide = proto.Hide;
				this.Toogle = proto.Toogle;

				proto.Init(opt, param);
			};

			//PROPERTYS
			this.state = {};
			this.items = [];
			this.htmlElement = null;

			//METHODS
			this.AddItem = function(item_cfg){
				//set active = false and remove old items
				$.each(SelfObj.items, function(key, item){
					if(key < item_cfg.level){
						item.SetActive(false);
					}else{
						item.Destroy();
					};
				});
				SelfObj.items.splice(item_cfg.level, SelfObj.items.length - item_cfg.level);
				//add new item
				var item = new Item({
					holder: proto.HtmlNodes.Main[0],
					text: item_cfg.text,
					onClick: item_cfg.onClick,
					active: true
				},{visible: false});
				item.Show({effect: true});
				SelfObj.items.push(item);
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		iconBox: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.iconBox,
				language = wa_manager.language.control.iconBox,
				attributes = wa_manager.constants.attributes;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body,
				items: {
					edit: {
						type: constant.items.type.edit,
						tooltip: language.items.edit.tooltip,
						onClick: function(){},
						order: 1,
						show: false
					},
					purse: {
						type: constant.items.type.purse,
						tooltip: language.items.purse.tooltip,
						onClick: function(){},
						order: 2,
						show: false
					},
					pause: {
						type: constant.items.type.pause,
						tooltip: language.items.pause.tooltip,
						onClick: function(){},
						order: 3,
						show: false
					},
					rename: {
						type: constant.items.type.rename,
						tooltip: language.items.rename.tooltip,
						onClick: function(){},
						order: 4,
						show: false
					},
					'delete': {
						type: constant.items.type['delete'],
						tooltip: language.items['delete'].tooltip,
						onClick: function(){},
						order: 5,
						show: false
					},
					copy: {
						type: constant.items.type.copy,
						tooltip: language.items.copy.tooltip,
						onClick: function(){},
						order: 6,
						show: false
					},
					vip: {
						type: constant.items.type.vip,
						tooltip: language.items.vip.tooltip,
						onClick: function(){},
						order: 7,
						show: false
					},
					restore: {
						type: constant.items.type.restore,
						tooltip: language.items.restore.tooltip,
						onClick: function(){},
						order: 8,
						show: false
					},
					reset: {
						type: constant.items.type.reset,
						tooltip: language.items.reset.tooltip,
						onClick: function(){},
						order: 9,
						show: false
					},
					upload: {
						type: constant.items.type.upload,
						tooltip: language.items.upload.tooltip,
						onClick: function(){},
						order: 10,
						show: false
					},
					download: {
						type: constant.items.type.download,
						tooltip: language.items.download.tooltip,
						onClick: function(){},
						order: 11,
						show: false
					},
					recreate: {
						type: constant.items.type.recreate,
						tooltip: language.items.recreate.tooltip,
						onClick: function(){},
						order: 12,
						show: false
					},
                    geo: {
                        type: constant.items.type.geo,
                        tooltip: language.items.geo.tooltip,
                        onClick: function(){},
                        order: 13,
                        show: false
                    },
					view: {
						type: constant.items.type.view,
						tooltip: language.items.view.tooltip,
						onClick: function(){},
						order: 14,
						show: false
					},
					click: {
						type: constant.items.type.click,
						tooltip: language.items.click.tooltip,
						onClick: function(){},
						order: 15,
						show: false
					},
					data: {
						type: constant.items.type.data,
						tooltip: language.items.data.tooltip,
						onClick: function(){},
						order: 16,
						show: false
					},
                    graphic: {
                        type: constant.items.type.graphic,
                        tooltip: language.items.graphic.tooltip,
                        onClick: function(){},
                        order: 17,
                        show: false
                    }
				}
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('span','id,iconbox',opts.holder);

				$(parent).mousedown(function(e){
					$(window).disableSelection();
				});
				$(window).mouseup(function(e){
					$(window).enableSelection();
				});
				$(parent).click(function(e){
					e.stopPropagation()
				});

				SelfObj.SetItems(opts.items, parent);
			};

			function Item(opt, param){
				var proto = new wa_manager.proto(),
					cwe = wa_api.utils.cwe,
					opts = proto.Opts,
					SelfObj = this,
					attributes = wa_manager.constants.attributes;

				//options
				proto.Opts = $.extend(true, proto.Opts, {
					holder: document.body,
					name: null,
					type: null,
					clipboard: false,
					onClick: function(){},
					show: false,
					order: 1,
					tooltip: null,
					success: null
				});

				proto.Constructor = function(){
					var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('b','class,item',opts.holder);

					$(parent).addClass(opts.type);
					SelfObj.SetToolTip(opts.tooltip);
					$(parent).click(function(e){
						opts.onClick(SelfObj);
					});

					if(opts.type == wa_manager.constants.control.iconBox.items.type.copy && opts.clipboard){
						var id = "icon_" + Math.random();
						$(parent).attr('id', id);

						var clip = SelfObj.clipboard = new ZeroClipboard.Client();
						clip.glue(id);
						proto.Data.clipNode = $("#"+$(clip.getHTML()).attr('id'))[0].parentNode;
						clip.addEventListener('onMouseUp', function(client){
							opts.onClick(SelfObj);
						});
						clip.addEventListener('onComplete', function(client){
							var language = wa_manager.language,
								constant = wa_manager.constants;

							var msgbox = new wa_manager.form.MessageBox({
								title: language.form.messagebox.title.notification,
								text: opts.success,
								type: constant.form.messagebox.type.info
							},{});
							msgbox.Show({effect: true});
						});
						clip.addEventListener('onLoad', function(client){
							SelfObj.SetToolTip(opts.tooltip);
						});

						$(window).resize(function(e){clip.reposition();});
						/*$(window).bind("DOMNodeInserted DOMNodeRemoved DOMAttrModified",function(e){clip.reposition();});*/
						var interval = new wa_manager.utils.interval(function(){clip.reposition();}, 1000);
						interval.start();
					};
				};

				//PROPERTYS
				this.state = {};
				this.htmlElement = null;
				this.clipboard = null;

				//METHODS
				this.SetToolTip = function(text){
					opts.tooltip = text;
					$(SelfObj.htmlElement).attr(attributes.tooltip, opts.tooltip);
					if(proto.Data.clipNode) $(proto.Data.clipNode).attr(attributes.tooltip, opts.tooltip);
				};
				this.SetOnClick = function(action){
					opts.onClick = action;
				};

				this.Destroy = function(param){
					//destroy clipboard
					if(SelfObj.clipboard) SelfObj.clipboard.destroy();

					proto.Destroy(param);
				};
				this.Show = function(param){
					function clip_show(){
						if(SelfObj.clipboard){
							SelfObj.clipboard.show();
						};
					};
					if(!param) param = {};
					if(param.callback){
						param.callback = function(){
							clip_show();
							param.callback();
						};
					}else{
						param.callback = clip_show;
					};

					proto.Show(param);
				};
				this.Hide = function(param){
					function clip_hide(){
						if(SelfObj.clipboard){
							SelfObj.clipboard.hide();
						};
					};
					if(!param) param = {};
					if(param.callback){
						param.callback = function(){
							clip_hide();
							param.callback();
						};
					}else{
						param.callback = clip_hide;
					};

					proto.Hide(param);
				};
				this.Toogle = proto.Toogle;

				proto.Init(opt, param);
			};
			function generateItems(items, holder){
				var output = {}, arr = [];

				//select enabled items
				$.each(items, function(key, value){
					if(value.show) arr.push({
						name: key,
						item: value
					});
				});

				//sort order by 'order'
				arr.sort(function(a,b){return a.item.order-b.item.order;});

				//generate htmlNodes and add to output object
				$.each(arr, function(key, value){
					value.item.holder = holder;
					value.item.name = value.name;

					output[value.name] = new Item(value.item,{visible: true});
				});

				return output;
			};

			//PROPERTYS
			this.state = {};
			this.items = {};
			this.htmlElement = null;

			//METHODS
			this.SetItems = function(items){
				opts.items = $.extend(true, opts.items, items);

				$.each(SelfObj.items, function(key, value){
					if(value) value.Destroy();
					delete SelfObj.items[key];
				});

				SelfObj.items = generateItems(opts.items, SelfObj.htmlElement);
			};

			this.Destroy = function(param){
				//destroy items
				$.each(SelfObj.items, function(key, value){
					value.Destroy();
				});

				proto.Destroy(param);
			};
			this.Show = function(param){
				function callback(){
					//items show
					$.each(SelfObj.items, function(key, value){
						value.Show();
					});
				};
				if(!param) param = {};
				if(param.callback){
					param.callback = function(){
						callback();
						param.callback();
					};
				}else{
					param.callback = callback;
				};

				proto.Show(param);
			};
			this.Hide = function(param){
				//items hide
				$.each(SelfObj.items, function(key, value){
					value.Hide();
				});

				proto.Hide(param);
			};
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		numericUpDown: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.numericUpDown,
				language = wa_manager.language.control.numericUpDown,
				attributes = wa_manager.constants.attributes;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body,
				min: 0,
				max: 100,
				value: 0,
                step: 1,
				minLength: 0,
				maxLength: 0,
				focus: false,
				tooltip: null
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','class,inblock',opts.holder);

				//set textline
				var textline = proto.Data.textline = new wa_manager.control.textline({
					holder: parent,
					type: wa_manager.constants.control.textline.type.numericUpDown,
					value: proto.Opts.value,
					focus: proto.Opts.focus,
					minLength: proto.Opts.minLength,
					maxLength: proto.Opts.maxLength,
					regexp: /^\d*$/,
					checkData: true,
					userCheckDataError: function(textline, opts){
						var value = ((parseInt(textline.GetValue())) ? parseInt(textline.GetValue()) : 0);

						if(value < proto.Opts.min || value > proto.Opts.max) return {state: true, callback: function(){}};
						else return {state: false, callback: function(){}};
					},
					tooltip: proto.Opts.tooltip
				},{visible: true});
				SelfObj.CheckText = proto.Data.textline.CheckText;
                SelfObj.SetFocus = proto.Data.textline.SetFocus;
                SelfObj.SetVisualError = proto.Data.textline.SetVisualError;
				SelfObj.state = textline.state;

				//create rangeBox
				var rangeBox = cwe('span','id,rangebox',parent);
					var range_up = cwe('b','class,range top',rangeBox);
					var range_down = cwe('b','class,range bottom',rangeBox);

				//set action rangeBox
				var downing_up = false,
					downing_down = false,
					timeDelay = 1000,
					periodChange = 75,
					interval_up = new wa_manager.utils.interval(function(){
						if(downing_up) SelfObj.Plus();
						else interval_up.stop();
					},periodChange),
					interval_down = new wa_manager.utils.interval(function(){
						if(downing_down) SelfObj.Minus();
						else interval_down.stop();
					},periodChange);
				$(range_up).mousedown(function(){
					$(window).disableSelection();
					downing_up = true;

					setTimeout(function(){
						if(downing_up) interval_up.start();
					},timeDelay);
				});
				$(range_down).mousedown(function(){
					$(window).disableSelection();
					downing_down = true;

					setTimeout(function(){
						if(downing_down) interval_down.start();
					},timeDelay);
				});
				$(window).mouseup(function(){
					$(document).enableSelection();
					downing_up = false;
					downing_down = false;
					if(interval_up) interval_up.stop();
					if(interval_down) interval_down.stop();
				});
				$(range_up).click(SelfObj.Plus);
				$(range_down).click(SelfObj.Minus);
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;

			//METHODS
			this.Plus = function(){
				var value = ((parseInt(proto.Data.textline.GetValue())) ? parseInt(proto.Data.textline.GetValue()) : opts.min),
					new_value = ((value+opts.step > opts.max) ? opts.max : value+opts.step);

				proto.Data.textline.SetValue(
					(new_value < opts.min ? opts.min : new_value)
				);
			};
			this.Minus = function(){
				var value = ((parseInt(proto.Data.textline.GetValue())) ? parseInt(proto.Data.textline.GetValue()) : opts.min+opts.step),
					new_value = ((value-opts.step < opts.min) ? opts.min : value-opts.step);

				proto.Data.textline.SetValue(
					(new_value > opts.max ? opts.max : new_value)
				);
			};
			this.SetValue = function(value){
				proto.Data.textline.SetValue(value);
			};
			this.SetToolTip = function(text){
				opts.tooltip = text;
				proto.Data.textline.SetToolTip(opts.tooltip);
			};
			this.GetValue = function(){
				return proto.Data.textline.GetValue();
			};
			this.CheckText = null;
            this.SetFocus = null;
            this.SetVisualError = null;

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		graphic: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.graphic,
				language = wa_manager.language.control.graphic,
				attributes = wa_manager.constants.attributes;

			//options
			opt = $.extend(true, {
				holder: document.body,
				type: null,
				data: {
					min: {
						value: [],//[[x, y]]
						data: {}//{2: {tooltip: "", xTick: "", yTick: ""}}
					},
					max: {
						value: [],//[[x, y]]
						data: {}//{2: {tooltip: "", xTick: "", yTick: ""}}
					},
					give: {
						value: [],//[[x, y]]
						data: {}//{2: {tooltip: "", xTick: "", yTick: ""}}
					}
				},
				onChange: function(data){}
			}, opt);

			opt = $.extend(true, {
				graphOption: {
					geoTargeting: {
						data: [
							{
								name: "give",
								data: opt.data.give.value,
								color : "rgba(11,151,2,0.7)",//цвет линии графика
								shadowSize : 1,//размер тени
								lines : {
									show : true,//вкл/выкл линию графика
									fill : true,//вкл/выкл заливку области графика
									fillColor : 'rgba(0,0,0,0.07)',//цвет заливки области графика
									lineWidth : 1.5//толщина линий
								},
								points: {
									show : true,//вкл/выкл точки на линиях графиков
									fill : true,//вкл/выкл заливку
									fillColor : 'rgba(255,255,255,1)',//цвет заливки точки
									lineWidth : 1,//толщина линии точки
									radius : 3,//радиус точки
									color: 'rgba(255,255,255,1)',//цвет точки
									values: {
										show: false,//вкл/выкл отображение значений в точках
										font : "normal 11px arial",//шрифт текста значений
										color: 'rgba(11,151,2,1)',//цвет текста значений
										margin: 5//расстояние от точки до значения
									}
								}
							},
							{
								name: "min",
								data: opt.data.min.value,
								color : "rgba(0,79,163,0.7)",//цвет линии графика
								shadowSize : 0,//размер тени
								lines : {
									show : true,//вкл/выкл линию графика
									fill : true,//вкл/выкл заливку области графика
									fillColor : 'rgba(0,79,163,0.07)',//цвет заливки области графика
									lineWidth : 1//толщина линий
								},
								points: {
									show : true,//вкл/выкл точки на линиях графиков
									fill : true,//вкл/выкл заливку
									fillColor : 'rgba(255,255,255,1)',//цвет заливки точки
									lineWidth : 1,//толщина линии точки
									radius : 2,//радиус точки
									color: 'rgba(255,255,255,1)',//цвет точки
									values: {
										show: false,//вкл/выкл отображение значений в точках
										font : "normal 11px arial",//шрифт текста значений
										color: 'rgba(71,1,2,1)',//цвет текста значений
										margin: 5//расстояние от точки до значения
									}
								}
							}
						],
						options: {
							xaxis : {
								showValue : true, //показывать или нет значения
								min : 1,
								max : opt.data.min.value.length,
								tickSize : 1,//шаг
								tickFormatter: function (v) { return opts.data.min.data[v].xTick; }
							},
							yaxis : {
								showValue : true, //показывать или нет значения
								min : 0,
								max : 100,
								tickSize : 10,//шаг
                                tickFormatter: function (v) { return v+"%"; }
							},
							grid : {
								hoverable : true,
								clickable : true,
								color : '#000',//цвет меток(числа 1 2 3 4 5 6 и т.д.)
								backgroundColor : {
									colors : ["rgba(255,255,255,1)", "rgba(233,233,233,1)"]
								},//цвет заливки сетки
								tickColor : 'rgba(0,0,0,.1)',//цвет самой сетки
								labelMargin : 5,//растояние от метки до сетки
								borderWidth : 4,//ширина рамки по краю сетки
								mouseActiveRadius : 8//радиус активной точки
							}
						},
						events: [
							function(){
								$(proto.HtmlNodes.Main[0]).mousedown(function(e){
									return false;
								});
							},
							//show tooltip
							function(){
								$(proto.HtmlNodes.Main[0]).bind("plothover", function(event, pos, item) {
									if(item){
										var x = item.datapoint[0].toFixed(0),
											y = item.datapoint[1].toFixed(0);

										SelfObj.tooltip.SetType(item.series.name);
										SelfObj.tooltip.SetText(((item.series.name == "min") ? language.tooltip.orderTraffic : language.tooltip.getTraffic) + ":<br />" + opts.data.min.data[x].tooltip+": "+y+"%");
										SelfObj.tooltip.SetPosition(item.pageY - 15, item.pageX + 15);
										SelfObj.tooltip.Show({effect: true});
									}else{
										SelfObj.tooltip.Hide();
									};
								});
							},
							//redraw graph
							function(){
								var reDraw = false;
								$(proto.HtmlNodes.Main[0]).mousedown(function(e) {
									reDraw = true;
								});
								$(window).mouseup(function(e) {
									reDraw = false;
								});
								$(proto.HtmlNodes.Main[0]).bind("plothover", function(event, pos, item) {
									if(reDraw){
										var x = Math.round(pos.x),
											y = Math.floor(pos.y),
											data = SelfObj.graph.getData(),
											xMax = data[1].xaxis.max,
                                            xMin = data[1].xaxis.min,
											yMax = data[1].yaxis.max,
                                            yMin = data[1].yaxis.min;

										if(x < xMin) x = xMin;
										else if(x > xMax) x = xMax;
										if(y < yMin) y = yMin;
										else if(y > yMax) y = yMax;

										data[1].data[x-1] = [x, y];
                                        /*
										//получаем сумму значений
										var summ = 0, over = 0;
										$.each(data[0].data, function(key, value){
											summ += value[1];
										});
										//получаем избыток
										over = summ - 100;

										//убераем избыточные значения
										var indexCur = x-1, indexMin = 0, indexMax = xMax-1, index = ((x > indexMax) ? indexMin : x);
										while(over > 0){
											if(index != indexCur){
												if(data[0].data[index][1] > 0){
													data[0].data[index][1]--;
													over--;
												};
											};
                                            if(index == indexMax) index = indexMin;
                                            else index++;
										};*/

										SelfObj.graph.setData(data);
										SelfObj.graph.draw();
										opts.onChange(SelfObj.GetData());
									};
								});
							}
						]
					},
					viewTargeting: {
						data: [
							{
								name: "give",
								data: opt.data.give.value,
								color : "rgba(11,151,2,0.7)",//цвет линии графика
								shadowSize : 1,//размер тени
								lines : {
									show : true,//вкл/выкл линию графика
									fill : true,//вкл/выкл заливку области графика
									fillColor : 'rgba(0,0,0,0.07)',//цвет заливки области графика
									lineWidth : 1.5//толщина линий
								},
								points: {
									show : true,//вкл/выкл точки на линиях графиков
									fill : true,//вкл/выкл заливку
									fillColor : 'rgba(255,255,255,1)',//цвет заливки точки
									lineWidth : 1,//толщина линии точки
									radius : 3,//радиус точки
									color: 'rgba(255,255,255,1)',//цвет точки
									values: {
										show: false,//вкл/выкл отображение значений в точках
										font : "normal 11px arial",//шрифт текста значений
										color: 'rgba(11,151,2,1)',//цвет текста значений
										margin: 5//расстояние от точки до значения
									}
								}
							},
							{
								name: "min",
								data: opt.data.min.value,
								color : "rgba(0,79,163,0.7)",//цвет линии графика
								shadowSize : 0,//размер тени
								lines : {
									show : true,//вкл/выкл линию графика
									fill : false,//вкл/выкл заливку области графика
									fillColor : 'rgba(0,79,163,0.07)',//цвет заливки области графика
									lineWidth : 1//толщина линий
								},
								points: {
									show : true,//вкл/выкл точки на линиях графиков
									fill : true,//вкл/выкл заливку
									fillColor : 'rgba(255,255,255,1)',//цвет заливки точки
									lineWidth : 1,//толщина линии точки
									radius : 2,//радиус точки
									color: 'rgba(255,255,255,1)',//цвет точки
									values: {
										show: false,//вкл/выкл отображение значений в точках
										font : "normal 11px arial",//шрифт текста значений
										color: 'rgba(71,1,2,1)',//цвет текста значений
										margin: 5//расстояние от точки до значения
									}
								}
							},
							{
								name: "max",
								data : opt.data.max.value,
								color : "rgba(240,73,35,0.7)",//цвет линии графика
								shadowSize : 0,//размер тени
								lines : {
									show : true,//вкл/выкл линию графика
									fill : false,//вкл/выкл заливку области графика
									fillColor : 'rgba(240,73,35,.07)',//цвет заливки области графика
									lineWidth : 1//толщина линий
								},
								points: {
									show : true,//вкл/выкл точки на линиях графиков
									fill : true,//вкл/выкл заливку
									fillColor : 'rgba(255,255,255,1)',//цвет заливки точки
									lineWidth : 1,//толщина линии точки
									radius : 2,//радиус точки
									color: 'rgba(255,255,255,1)',//цвет точки
									values: {
										show: false,//вкл/выкл отображение значений в точках
										font : "normal 11px arial",//шрифт текста значений
										color: 'rgba(0,102,153,1)',//цвет текста значений
										margin: 5//расстояние от точки до значения
									}
								}
							}
						],
						options: {
							xaxis : {
								showValue : true, //показывать или нет значения
								min : 0,
								max : 23,
								tickSize : 1,//шаг
								tickFormatter: function (v) { return v; }
							},
							yaxis : {
								showValue : true, //показывать или нет значения
								min : 0,
								max : getMaxY(opt.data),
								tickSize : 10//шаг
							},
							grid : {
								hoverable : true,
								clickable : true,
								color : '#000',//цвет меток(числа 1 2 3 4 5 6 и т.д.)
								backgroundColor : {
									colors : ["rgba(255,255,255,1)", "rgba(233,233,233,1)"]
								},//цвет заливки сетки
								tickColor : 'rgba(0,0,0,.1)',//цвет самой сетки
								labelMargin : 5,//растояние от метки до сетки
								borderWidth : 4,//ширина рамки по краю сетки
								mouseActiveRadius : 8//радиус активной точки
							}
						},
						events: [
							function(){
								$(proto.HtmlNodes.Main[0]).mousedown(function(e){
									return false;
								});
							},
							//show tooltip
							function(){
								$(proto.HtmlNodes.Main[0]).bind("plothover", function(event, pos, item) {
									if(item){
										var x = item.datapoint[0].toFixed(0),
											y = item.datapoint[1].toFixed(0);

										SelfObj.tooltip.SetType(item.series.name);
										SelfObj.tooltip.SetText(x + ":00 - " + ((x == 23) ? "0" : (parseInt(x)+1)) + ":00" + "<br />" + language.tooltip[item.series.name] + ": " + y);
										SelfObj.tooltip.SetPosition(item.pageY - 15, item.pageX + 15);
										SelfObj.tooltip.Show({effect: true});
									}else{
										SelfObj.tooltip.Hide();
									};
								});
							},
							//redraw graph
							function(){
								var reDraw = false, graphMax = false, graphMin = false;
								$(proto.HtmlNodes.Main[0]).mousedown(function(e) {
									reDraw = true;
									if(e.shiftKey) graphMax = true;
									else if(e.ctrlKey) graphMin = true;
								});
								$(window).mouseup(function(e) {
									reDraw = false;
									graphMax = false;
									graphMin = false;
								});
								$(proto.HtmlNodes.Main[0]).bind("plothover", function(event, pos, item) {
									if(reDraw){
										var x = Math.round(pos.x),
											y = Math.floor(pos.y),
											data = SelfObj.graph.getData(),
											xMax = data[0].xaxis.max,
											yMax = data[0].yaxis.max,
											idMin = getIdGraph(data, "min"),
											idMax = getIdGraph(data, "max");

										if(x < 0) x = 0;
										else if(x > xMax) x = xMax;
										if(y < 0) y = 0;
										else if(y > yMax){
											if(graphMax){
												SelfObj.SetMaxYaxis(y+10);
											};
										}else if(y < yMax){
											if(graphMax){
												var maxY = getMaxY(data);
												if(maxY > 50) SelfObj.SetMaxYaxis(maxY);
												else SelfObj.SetMaxYaxis(50);
											};
										};

										if(graphMax){
											data[idMax].data[x] = [x, y];
											if(data[idMin].data[x][1] > data[idMax].data[x][1])data[idMin].data[x][1] = data[idMax].data[x][1];
										}else if(graphMin){
											data[idMin].data[x] = [x, y];
											if(data[idMax].data[x][1] < data[idMin].data[x][1])data[idMin].data[x][1] = data[idMax].data[x][1];
										};

										SelfObj.graph.setData(data);
										SelfObj.graph.draw();
										opts.onChange(SelfObj.GetData());
									};
								});

								function getIdGraph(data, graphName){
									for(var i=0;i<data.length;i++){
										if(graphName == data[i].name) return i;
									};

									return false;
								};
								function getMaxY(data){
									var arr = data[getIdGraph(data, "max")].data.slice();
									arr.sort(function(a,b){return a[1]-b[1];});
									return arr[arr.length-1][1];
								};
							}
						]
					},
					clickTargeting: {
						data: [
							{
								name: "give",
								data: opt.data.give.value,
								color : "rgba(11,151,2,0.7)",//цвет линии графика
								shadowSize : 1,//размер тени
								lines : {
									show : true,//вкл/выкл линию графика
									fill : true,//вкл/выкл заливку области графика
									fillColor : 'rgba(0,0,0,0.07)',//цвет заливки области графика
									lineWidth : 1.5//толщина линий
								},
								points: {
									show : true,//вкл/выкл точки на линиях графиков
									fill : true,//вкл/выкл заливку
									fillColor : 'rgba(255,255,255,1)',//цвет заливки точки
									lineWidth : 1,//толщина линии точки
									radius : 3,//радиус точки
									color: 'rgba(255,255,255,1)',//цвет точки
									values: {
										show: false,//вкл/выкл отображение значений в точках
										font : "normal 11px arial",//шрифт текста значений
										color: 'rgba(11,151,2,1)',//цвет текста значений
										margin: 5//расстояние от точки до значения
									}
								}
							},
							{
								name: "min",
								data: opt.data.min.value,
								color : "rgba(0,79,163,0.7)",//цвет линии графика
								shadowSize : 0,//размер тени
								lines : {
									show : true,//вкл/выкл линию графика
									fill : false,//вкл/выкл заливку области графика
									fillColor : 'rgba(0,79,163,0.07)',//цвет заливки области графика
									lineWidth : 1//толщина линий
								},
								points: {
									show : true,//вкл/выкл точки на линиях графиков
									fill : true,//вкл/выкл заливку
									fillColor : 'rgba(255,255,255,1)',//цвет заливки точки
									lineWidth : 1,//толщина линии точки
									radius : 2,//радиус точки
									color: 'rgba(255,255,255,1)',//цвет точки
									values: {
										show: false,//вкл/выкл отображение значений в точках
										font : "normal 11px arial",//шрифт текста значений
										color: 'rgba(71,1,2,1)',//цвет текста значений
										margin: 5//расстояние от точки до значения
									}
								}
							},
							{
								name: "max",
								data : opt.data.max.value,
								color : "rgba(240,73,35,0.7)",//цвет линии графика
								shadowSize : 0,//размер тени
								lines : {
									show : true,//вкл/выкл линию графика
									fill : false,//вкл/выкл заливку области графика
									fillColor : 'rgba(240,73,35,.07)',//цвет заливки области графика
									lineWidth : 1//толщина линий
								},
								points: {
									show : true,//вкл/выкл точки на линиях графиков
									fill : true,//вкл/выкл заливку
									fillColor : 'rgba(255,255,255,1)',//цвет заливки точки
									lineWidth : 1,//толщина линии точки
									radius : 2,//радиус точки
									color: 'rgba(255,255,255,1)',//цвет точки
									values: {
										show: false,//вкл/выкл отображение значений в точках
										font : "normal 11px arial",//шрифт текста значений
										color: 'rgba(0,102,153,1)',//цвет текста значений
										margin: 5//расстояние от точки до значения
									}
								}
							}
						],
						options: {
							xaxis : {
								showValue : true, //показывать или нет значения
								min : 0,
								max : 23,
								tickSize : 1,//шаг
								tickFormatter: function (v) { return v; }
							},
							yaxis : {
								showValue : true, //показывать или нет значения
								min : 0,
								max : getMaxY(opt.data),
								tickSize : 10//шаг
							},
							grid : {
								hoverable : true,
								clickable : true,
								color : '#000',//цвет меток(числа 1 2 3 4 5 6 и т.д.)
								backgroundColor : {
									colors : ["rgba(255,255,255,1)", "rgba(233,233,233,1)"]
								},//цвет заливки сетки
								tickColor : 'rgba(0,0,0,.1)',//цвет самой сетки
								labelMargin : 5,//растояние от метки до сетки
								borderWidth : 4,//ширина рамки по краю сетки
								mouseActiveRadius : 8//радиус активной точки
							}
						},
						events: [
							function(){
								$(proto.HtmlNodes.Main[0]).mousedown(function(e){
									return false;
								});
							},
							//show tooltip
							function(){
								$(proto.HtmlNodes.Main[0]).bind("plothover", function(event, pos, item) {
									if(item){
										var x = item.datapoint[0].toFixed(0),
											y = item.datapoint[1].toFixed(0);

										SelfObj.tooltip.SetType(item.series.name);
										SelfObj.tooltip.SetText(x + ":00 - " + ((x == 23) ? "0" : (parseInt(x)+1)) + ":00" + "<br />" + language.tooltip[item.series.name] + ": " + y);
										SelfObj.tooltip.SetPosition(item.pageY - 15, item.pageX + 15);
										SelfObj.tooltip.Show({effect: true});
									}else{
										SelfObj.tooltip.Hide();
									};
								});
							},
							//redraw graph
							function(){
								var reDraw = false, graphMax = false, graphMin = false;
								$(proto.HtmlNodes.Main[0]).mousedown(function(e) {
									reDraw = true;
									if(e.shiftKey) graphMax = true;
									else if(e.ctrlKey) graphMin = true;
								});
								$(window).mouseup(function(e) {
									reDraw = false;
									graphMax = false;
									graphMin = false;
								});
								$(proto.HtmlNodes.Main[0]).bind("plothover", function(event, pos, item) {
									if(reDraw){
										var x = Math.round(pos.x),
											y = Math.floor(pos.y),
											data = SelfObj.graph.getData(),
											xMax = data[0].xaxis.max,
											yMax = data[0].yaxis.max,
											idMin = getIdGraph(data, "min"),
											idMax = getIdGraph(data, "max");

										if(x < 0) x = 0;
										else if(x > xMax) x = xMax;
										if(y < 0) y = 0;
										else if(y > yMax){
											if(graphMax){
												SelfObj.SetMaxYaxis(y+10);
											};
										}else if(y < yMax){
											if(graphMax){
												var maxY = getMaxY(data);
												if(maxY > 50) SelfObj.SetMaxYaxis(maxY);
												else SelfObj.SetMaxYaxis(50);
											};
										};

										if(graphMax){
											data[idMax].data[x] = [x, y];
											if(data[idMin].data[x][1] > data[idMax].data[x][1])data[idMin].data[x][1] = data[idMax].data[x][1];
										}else if(graphMin){
											data[idMin].data[x] = [x, y];
											if(data[idMax].data[x][1] < data[idMin].data[x][1])data[idMin].data[x][1] = data[idMax].data[x][1];
										};

										SelfObj.graph.setData(data);
										SelfObj.graph.draw();
										opts.onChange(SelfObj.GetData());
									};
								});

								function getIdGraph(data, graphName){
									for(var i=0;i<data.length;i++){
										if(graphName == data[i].name) return i;
									};

									return false;
								};
								function getMaxY(data){
									var arr = data[getIdGraph(data, "max")].data.slice();
									arr.sort(function(a,b){return a[1]-b[1];});
									return arr[arr.length-1][1];
								};
							}
						]
					},
                    timeTargeting: {
                        data: [
                            {
                                name: "give",
                                data: opt.data.give.value,
                                color : "rgba(11,151,2,0.7)",//цвет линии графика
                                shadowSize : 1,//размер тени
                                lines : {
                                    show : true,//вкл/выкл линию графика
                                    fill : true,//вкл/выкл заливку области графика
                                    fillColor : 'rgba(0,0,0,0.07)',//цвет заливки области графика
                                    lineWidth : 1.5//толщина линий
                                },
                                points: {
                                    show : true,//вкл/выкл точки на линиях графиков
                                    fill : true,//вкл/выкл заливку
                                    fillColor : 'rgba(255,255,255,1)',//цвет заливки точки
                                    lineWidth : 1,//толщина линии точки
                                    radius : 3,//радиус точки
                                    color: 'rgba(255,255,255,1)',//цвет точки
                                    values: {
                                        show: false,//вкл/выкл отображение значений в точках
                                        font : "normal 11px arial",//шрифт текста значений
                                        color: 'rgba(11,151,2,1)',//цвет текста значений
                                        margin: 5//расстояние от точки до значения
                                    }
                                }
                            },
                            {
                                name: "min",
                                data: opt.data.min.value,
                                color : "rgba(0,79,163,0.7)",//цвет линии графика
                                shadowSize : 0,//размер тени
                                lines : {
                                    show : true,//вкл/выкл линию графика
                                    fill : false,//вкл/выкл заливку области графика
                                    fillColor : 'rgba(0,79,163,0.07)',//цвет заливки области графика
                                    lineWidth : 1//толщина линий
                                },
                                points: {
                                    show : true,//вкл/выкл точки на линиях графиков
                                    fill : true,//вкл/выкл заливку
                                    fillColor : 'rgba(255,255,255,1)',//цвет заливки точки
                                    lineWidth : 1,//толщина линии точки
                                    radius : 2,//радиус точки
                                    color: 'rgba(255,255,255,1)',//цвет точки
                                    values: {
                                        show: false,//вкл/выкл отображение значений в точках
                                        font : "normal 11px arial",//шрифт текста значений
                                        color: 'rgba(71,1,2,1)',//цвет текста значений
                                        margin: 5//расстояние от точки до значения
                                    }
                                }
                            },
                            {
                                name: "max",
                                data : opt.data.max.value,
                                color : "rgba(240,73,35,0.7)",//цвет линии графика
                                shadowSize : 0,//размер тени
                                lines : {
                                    show : true,//вкл/выкл линию графика
                                    fill : false,//вкл/выкл заливку области графика
                                    fillColor : 'rgba(240,73,35,.07)',//цвет заливки области графика
                                    lineWidth : 1//толщина линий
                                },
                                points: {
                                    show : true,//вкл/выкл точки на линиях графиков
                                    fill : true,//вкл/выкл заливку
                                    fillColor : 'rgba(255,255,255,1)',//цвет заливки точки
                                    lineWidth : 1,//толщина линии точки
                                    radius : 2,//радиус точки
                                    color: 'rgba(255,255,255,1)',//цвет точки
                                    values: {
                                        show: false,//вкл/выкл отображение значений в точках
                                        font : "normal 11px arial",//шрифт текста значений
                                        color: 'rgba(0,102,153,1)',//цвет текста значений
                                        margin: 5//расстояние от точки до значения
                                    }
                                }
                            }
                        ],
                        options: {
                            xaxis : {
                                showValue : true, //показывать или нет значения
                                min : 0,
                                max : 23,
                                tickSize : 1,//шаг
                                tickFormatter: function (v) { return v; }
                            },
                            yaxis : {
                                showValue : true, //показывать или нет значения
                                min : 0,
                                max : getMaxY(opt.data),
                                tickSize : 10//шаг
                            },
                            grid : {
                                hoverable : true,
                                clickable : true,
                                color : '#000',//цвет меток(числа 1 2 3 4 5 6 и т.д.)
                                backgroundColor : {
                                    colors : ["rgba(255,255,255,1)", "rgba(233,233,233,1)"]
                                },//цвет заливки сетки
                                tickColor : 'rgba(0,0,0,.1)',//цвет самой сетки
                                labelMargin : 5,//растояние от метки до сетки
                                borderWidth : 4,//ширина рамки по краю сетки
                                mouseActiveRadius : 8//радиус активной точки
                            }
                        },
                        events: [
                            function(){
                                $(proto.HtmlNodes.Main[0]).mousedown(function(e){
                                    return false;
                                });
                            },
                            //show tooltip
                            function(){
                                $(proto.HtmlNodes.Main[0]).bind("plothover", function(event, pos, item) {
                                    if(item){
                                        var x = item.datapoint[0].toFixed(0),
                                            y = item.datapoint[1].toFixed(0);

                                        SelfObj.tooltip.SetType(item.series.name);
                                        SelfObj.tooltip.SetText(x + ":00 - " + ((x == 23) ? "0" : (parseInt(x)+1)) + ":00" + "<br />" + language.tooltip[item.series.name] + ": " + y);
                                        SelfObj.tooltip.SetPosition(item.pageY - 15, item.pageX + 15);
                                        SelfObj.tooltip.Show({effect: true});
                                    }else{
                                        SelfObj.tooltip.Hide();
                                    };
                                });
                            },
                            //redraw graph
                            function(){
                                var reDraw = false, graphMax = false, graphMin = false;
                                $(proto.HtmlNodes.Main[0]).mousedown(function(e) {
                                    reDraw = true;
                                    if(e.shiftKey) graphMax = true;
                                    else if(e.ctrlKey) graphMin = true;
                                });
                                $(window).mouseup(function(e) {
                                    reDraw = false;
                                    graphMax = false;
                                    graphMin = false;
                                });
                                $(proto.HtmlNodes.Main[0]).bind("plothover", function(event, pos, item) {
                                    if(reDraw){
                                        var x = Math.round(pos.x),
                                            y = Math.floor(pos.y),
                                            data = SelfObj.graph.getData(),
                                            xMax = data[0].xaxis.max,
                                            yMax = data[0].yaxis.max,
                                            idMin = getIdGraph(data, "min"),
                                            idMax = getIdGraph(data, "max");

                                        if(x < 0) x = 0;
                                        else if(x > xMax) x = xMax;
                                        if(y < 0) y = 0;
                                        else if(y > yMax){
                                            if(graphMax){
                                                SelfObj.SetMaxYaxis(y+10);
                                            };
                                        }else if(y < yMax){
                                            if(graphMax){
                                                var maxY = getMaxY(data);
                                                if(maxY > 50) SelfObj.SetMaxYaxis(maxY);
                                                else SelfObj.SetMaxYaxis(50);
                                            };
                                        };

                                        if(graphMax){
                                            data[idMax].data[x] = [x, y];
                                            if(data[idMin].data[x][1] > data[idMax].data[x][1])data[idMin].data[x][1] = data[idMax].data[x][1];
                                        }else if(graphMin){
                                            data[idMin].data[x] = [x, y];
                                            if(data[idMax].data[x][1] < data[idMin].data[x][1])data[idMin].data[x][1] = data[idMax].data[x][1];
                                        };

                                        SelfObj.graph.setData(data);
                                        SelfObj.graph.draw();
                                        opts.onChange(SelfObj.GetData());
                                    };
                                });

                                function getIdGraph(data, graphName){
                                    for(var i=0;i<data.length;i++){
                                        if(graphName == data[i].name) return i;
                                    };

                                    return false;
                                };
                                function getMaxY(data){
                                    var arr = data[getIdGraph(data, "max")].data.slice();
                                    arr.sort(function(a,b){return a[1]-b[1];});
                                    return arr[arr.length-1][1];
                                };
                            }
                        ]
                    }
				}
			}, opt);

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe("div","id,grapharea",opts.holder);
				SelfObj.InitGraph(true);

				SelfObj.tooltip = new tooltip({},{visible: false});
			};
			function tooltip(opt, param){
				var proto = new wa_manager.proto(),
					cwe = wa_api.utils.cwe,
					opts = proto.Opts,
					SelfObj = this;

				//options
				opt = $.extend(true, {
					holder: document.body,
					'class': {
						max: "max",
						min: "min",
						give: "give"
					},
					type: null,
					text: null
				}, opt);

				proto.Constructor = function(){
					var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe("div","class,gr_hint", opts.holder);
						var content = proto.Data.content = cwe("div","class,gr_hint_content",parent);

					//APPLY SETTING
					SelfObj.SetType(opts.type);

					//SET EVENTS
					$(parent).hover(function(e){SelfObj.Hide({effect: true});},function(e){SelfObj.Hide({effect: true});});
				};

				//PROPERTYS
				this.htmlElement = null;

				//METHODS
				this.SetType = function(type){
					$(proto.HtmlNodes.Main[0]).removeClass(wa_manager.utils.objJoin(opts['class'], " ")).addClass(opts['class'][type]);
				};
				this.SetText = function(text){
					opts.text = text;
					$(proto.Data.content).html(opts.text);
				};
				this.SetPosition = function(top, left){
					$(proto.HtmlNodes.Main[0]).css({
						top: top,
						left: left
					});
				};

				this.Destroy = proto.Destroy;
				this.Show = proto.Show;
				this.Hide = proto.Hide;
				this.Toogle = proto.Toogle;

				proto.Init(opt, param);
			};
			function getMaxY(data){
				var arr = [];
				$.each(data.min.value, function(key, value){
					arr.push(value[1]);
					if(data.max.value[key]) arr.push(data.max.value[key][1]);
					if(data.give.value[key]) arr.push(data.give.value[key][1]);
				});
				arr.sort(function(a,b){return a-b;});

				return (arr[arr.length-1] > 50) ? arr[arr.length-1] : 50;
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;
			this.graph = null;
			this.tooltip = null;

			//METHODS
			this.GetData = function(){
				var data = SelfObj.graph.getData(), output = {};

				$.each(data, function(key, value){
					output[value.name] = value.data;
				});

				return output;
			};
			this.SetData = function(data){
				var curData = SelfObj.graph.getData();
				curData[getIdGraph(curData, "min")].data = data.min;
				curData[getIdGraph(curData, "max")].data = data.max;
				curData[getIdGraph(curData, "give")].data = data.give;

				SelfObj.graph.setData(curData);
				SelfObj.graph.draw();
				SelfObj.SetMaxYaxis(getMaxY(data));

				function getIdGraph(data, graphName){
					for(var i=0;i<data.length;i++){
						if(graphName == data[i].name) return i;
					};

					return false;
				};
				function getMaxY(data){
					var arr = [];
					$.each(data.min, function(key, value){
						arr.push(value[1]);
						if(data.max[key]) arr.push(data.max[key][1]);
						if(data.give[key]) arr.push(data.give[key][1]);
					});
					arr.sort(function(a,b){return a-b;});

					return (arr[arr.length-1] > 50) ? arr[arr.length-1] : 50;
				};
			};
			this.InitGraph = function(bindEvents){
				SelfObj.graph = $.plot(proto.HtmlNodes.Main[0], opts.graphOption[opts.type].data, opts.graphOption[opts.type].options);
				if(bindEvents){
					$.each(opts.graphOption[opts.type].events, function(key, value){
						value();
					});
				};
			};
			this.SetMaxYaxis = function(yMax){
				var curData = SelfObj.GetData();
				opts.graphOption[opts.type].data[0].data = curData.give;
				opts.graphOption[opts.type].data[1].data = curData.min;
				opts.graphOption[opts.type].data[2].data = curData.max;
				opts.graphOption[opts.type].options.yaxis.max = yMax;
				SelfObj.graph.shutdown();
				SelfObj.InitGraph();
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		maskList: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.maskList,
				language = wa_manager.language.control.maskList,
				attributes = wa_manager.constants.attributes,
				jsonItem = wa_api.Constants.OperationItem;

			//options
			opt = $.extend(true, {
				holder: document.body,
				'class': {
					maskName: "name",
					mask: "mask"
				},
				maskDelimiter: '->',
				maskDelimiterDisplay: ' ⇒ ',
				masks: {},
				onSelect: function(maskOpt){}
			}, opt);

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe("div","id,listbox",opts.holder);
					var maskTable = cwe("table","class,masktable", cwe("div","class,listflow",parent));
						var tableHead = cwe("tr","",cwe("thead","",maskTable));
							$(cwe("td","class,"+opts['class'].maskName,tableHead)).text(language.maskName);
							$(cwe("td","class,"+opts['class'].mask,tableHead)).text(language.mask);
						var maskHolder = proto.Data.maskHolder = cwe("tbody","",maskTable);

				SelfObj.masks = opts.masks;

				//GET MASKS FROM SERVER
				wa_api.methods.GetMasks({
					token: wa_manager.methods.GetToken(),
					callback: function(data){
						if(!data[jsonItem.Masks]) return;
						data[jsonItem.Masks].sort(function(a,b){
							return a[jsonItem.IdMask]-b[jsonItem.IdMask];
						});
						$.each(data[jsonItem.Masks], function(key, value){
							SelfObj.AddMask({
								allowProxy: value[jsonItem.AllowProxy],
								ignoreGu: value[jsonItem.IgnoreGU],
								maskId: value[jsonItem.IdMask],
								rangeSize: value[jsonItem.RangeSize],
								mask: value[jsonItem.Mask],
								uniquePeriod: value[jsonItem.UniqPeriod],
								name: value[jsonItem.Name]
							});
						});
						SelfObj.state.loaded = true;
					}
				});
			};
			function Mask(opt, param){
				var proto = new wa_manager.proto(),
					cwe = wa_api.utils.cwe,
					opts = proto.Opts,
					SelfObj = this,
					constant = wa_manager.constants.control.maskList,
					language = wa_manager.language.control.maskList,
					attributes = wa_manager.constants.attributes;

				//options
				opt = $.extend(true, {
					holder: document.body,
					'class': {
						maskName: "name",
						mask: "mask",
						active: "active"
					},
					maskOpt: {
						allowProxy: false,
						ignoreGu: false,
						maskId: 0,
						rangeSize: 0,
						mask: null,
						uniquePeriod: 0,
						name: null
					},
					maskDelimiter: '->',
					maskDelimiterDisplay: '⇒',
					onSelect: function(maskOpt){},
					disableAllActive: function(){}
				}, opt);

				proto.Constructor = function(){
					var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe("tr","",opts.holder);
						var name = cwe("td","class,"+opt['class'].maskName,parent);
						var mask = cwe("td","class,"+opt['class'].mask,parent);

					//print name mask
					$(name).text(opts.maskOpt.name);
					//print mask
					$(mask).text(opts.maskOpt.mask.split(opts.maskDelimiter).join(opts.maskDelimiterDisplay));

					//SET EVENTS
					$(parent).click(function(e){
						opts.disableAllActive();
						SelfObj.SetActive(true);
						opts.onSelect(opts.maskOpt);
					});
				};

				//PROPERTYS
				this.state = {
					active: false
				};
				this.htmlElement = null;

				//METHODS
				this.SetActive = function(state){
					if(state){
						$(proto.HtmlNodes.Main[0]).addClass(opts['class'].active);
						SelfObj.state.active = true;
					}else{
						$(proto.HtmlNodes.Main[0]).removeClass(opts['class'].active);
						SelfObj.state.active = false;
					};
				};
				this.Select = function(){
					$(proto.HtmlNodes.Main[0]).click();
				};

				this.Destroy = proto.Destroy;
				this.Show = proto.Show;
				this.Hide = proto.Hide;
				this.Toogle = proto.Toogle;

				proto.Init(opt, param);
			};

			//PROPERTYS
			this.masks = null;
			this.state = {
				loaded: false
			};
			this.htmlElement = null;

			//METHODS
			this.AddMask = function(maskOpt){
				if(opts.masks[maskOpt.maskId]) return;

				var mask = new Mask({
					holder: proto.Data.maskHolder,
					maskOpt: maskOpt,
					maskDelimiter: opts.maskDelimiter,
					maskDelimiterDisplay: opts.maskDelimiterDisplay,
					onSelect: opts.onSelect,
					disableAllActive: function(){
						$.each(opts.masks, function(key, mask){
							mask.SetActive(false);
						});
					}
				},{visible: true});

				opts.masks[maskOpt.maskId] = mask;
			};
			this.SelectMask = function(number){
				var timer = new wa_manager.utils.interval(function(){
					if(SelfObj.state.loaded){
						timer.stop();

						switch(number){
							case "first":
								var complete = false;
								$.each(SelfObj.masks, function(key, mask){
									if(!complete){
										mask.Select();
										complete = true;
									};
								});
								break;
						};
					};
				}, 300);
				timer.start();
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		dataResult: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.control.dataResult,
				language = wa_manager.language.control.dataResult,
				attributes = wa_manager.constants.attributes;

			//options
			opt = $.extend(true, {
				holder: document.body,
				items: []
			}, opt);

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe("table","id,dataresult",opts.holder);
					var items_holder = proto.Data.items_holder = cwe("tr","",parent);

				opts.items.sort(function(a,b){return a.order- b.order});

				$.each(opts.items, function(key,value){
					if(!value.name || SelfObj.items[value.name]) return;

					value = $.extend(true,{
						holder: items_holder
					},value);

					var item = new Item(value,{visible: true});

					SelfObj.items[value.name] = item;
				});
			};
			function Item(opt, param){
				var proto = new wa_manager.proto(),
					cwe = wa_api.utils.cwe,
					opts = proto.Opts,
					SelfObj = this,
					constant = wa_manager.constants.control.dataResult,
					language = wa_manager.language.control.dataResult,
					attributes = wa_manager.constants.attributes;

				//options
				opt = $.extend(true, {
					holder: document.body,
					'class': null,
					text: null,
					value: 0
				}, opt);

				proto.Constructor = function(){
					var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe("td","class,result",opts.holder);
						var contentHolder = cwe("tr","",cwe("table","class,spacing",parent));

					proto.Data.name = $(cwe("td","class,resultname",contentHolder)).text(opts.text);
					proto.Data.value = $(cwe("td","class,resultvalue",contentHolder)).text(opts.value);

					$(proto.Data.value).addClass(opts['class']);
				};

				//PROPERTYS
				this.state = {};
				this.htmlElement = null;

				//METHODS
				this.SetValue = function(value){
					$(proto.Data.value).text(value);
				};

				this.Destroy = proto.Destroy;
				this.Show = proto.Show;
				this.Hide = proto.Hide;
				this.Toogle = proto.Toogle;

				proto.Init(opt, param);
			};

			//PROPERTYS
			this.items = {};
			this.state = {};
			this.htmlElement = null;

			//METHODS
			this.SetValues = function(obj){
				$.each(obj, function(key,value){
					if(SelfObj.items[key]) SelfObj.items[key].SetValue(value);
				});
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
        tabContainer: function(opt, param){
            var proto = new wa_manager.proto(),
                cwe = wa_api.utils.cwe,
                opts = proto.Opts,
                SelfObj = this,
                constant = wa_manager.constants.control.tabContainer,
                language = wa_manager.language.control.tabContainer,
                attributes = wa_manager.constants.attributes;

            //options
            $.extend(true, opts, {
                holder: document.body,
                items: []
            });

            proto.Constructor = function(){
                var parent = SelfObj.htmlElement = proto.HtmlNodes.Main[0] = cwe("div","class,tab-container",opts.holder);
                    var menu = proto.Data.menu = cwe("div","class,tab-menu",parent);
                    var content = proto.Data.content = cwe("div","class,tab-content",parent);

                var items = [];
                $.each(opts.items, function(key, value){
                    if(value.show) items.push(value);
                });
                items.sort(function(a,b){
                    return a.order- b.order;
                });

                $.each(items, function(key, value){
                    SelfObj.AddTab(value);
                });
            };

            function Item(opt, param){
                var proto = new wa_manager.proto(),
                    cwe = wa_api.utils.cwe,
                    opts = proto.Opts,
                    SelfObj = this,
                    constant = wa_manager.constants.control.tabContainer,
                    language = wa_manager.language.control.tabContainer,
                    attributes = wa_manager.constants.attributes;

                //options
                $.extend(true, opts, {
                    holder_menu: document.body,
                    holder_content: document.body,
                    name: "",
                    text: "",
                    order: 0,
                    show: false,
                    active: false,
                    controls: [],
                    "class": {
                        active: "active"
                    }
                });

                proto.Constructor = function(){
                    var menu = proto.Data.menuItem = $(cwe("span","class,tablist",opts.holder_menu)).text(opts.text);
                    var content = proto.Data.content = cwe("div","class,tab-box",opts.holder_content);

                    $.each(opts.controls, function(key, value){
                        SelfObj.controls[value.name] = new value.control(content);
                    });

                    $(menu).click(function(e){
                        opts.activateTab(opts.name);
                    });

                    SelfObj.SetActive(opts.active);
                };

                //PROPERTYS
                this.controls = {};
                this.state = {
                    active: false
                };

                //METHODS
                this.SetActive = function(state){
                    if(state){
                        $(proto.Data.menuItem).addClass(opts["class"].active);
                        $(proto.Data.content).show();
                        SelfObj.state.active = true;
                    }else{
                        $(proto.Data.menuItem).removeClass(opts["class"].active);
                        $(proto.Data.content).hide();
                        SelfObj.state.active = false;
                    };
                };
                this.GetControl = function(name){
                    return SelfObj.controls[name];
                };

                this.Destroy = proto.Destroy;
                this.Show = proto.Show;
                this.Hide = proto.Hide;
                this.Toogle = proto.Toogle;

                proto.Init(opt, param);
            };

            //PROPERTYS
            this.items = {};
            this.state = {};
            this.htmlElement = null;

            //METHODS
            this.AddTab = function(tab_cfg){
                $.extend(true, tab_cfg, {
                    holder_menu: proto.Data.menu,
                    holder_content: proto.Data.content,
                    activateTab: SelfObj.ActivateTab
                });

                SelfObj.items[tab_cfg.name] = new Item(tab_cfg, {visible: true});

                if(tab_cfg.active) SelfObj.ActivateTab(tab_cfg.name);
            };
            this.ActivateTab = function(tab_name){
                $.each(SelfObj.items, function(key, tab){
                    if(key != tab_name) tab.SetActive(false);
                    else tab.SetActive(true);
                });
            };
            this.GetTab = function(tab_name){
                return SelfObj.items[tab_name];
            };

            this.Destroy = proto.Destroy;
            this.Show = proto.Show;
            this.Hide = proto.Hide;
            this.Toogle = proto.Toogle;

            proto.Init(opt, param);
        }
	};

	//FORMS
	wa_manager.form = {
		Main: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this;

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = cwe('div', 'id,container', document.body);
					var header = proto.Data.header = cwe('div','id,header',parent);
						var logo = cwe('div','id,logo',header);
							var logo_h1 = cwe('h1','',logo);
								var a = cwe('a','href,'+wa_manager.options.service.url,logo_h1);
								$(a).html("Wasp<b>Ace</b> Service<span>"+wa_manager.language.service.description+"</span>");

					var main = cwe('div','id,main',parent);
						var content = proto.Data.content = cwe('div','id,all',main);

					var footer = proto.Data.footer = cwe('div','id,footer',parent);
						var f_menu = cwe('ul','id,f_menu',footer);
							var item_ru = cwe('a','href,#',cwe('li','',f_menu));
							$(item_ru).html(wa_manager.language.languages.ru);
							var item_en = cwe('a','href,#',cwe('li','',f_menu));
							$(item_en).html(wa_manager.language.languages.en);
							var item_ua = cwe('a','href,#',cwe('li','',f_menu));
							$(item_ua).html(wa_manager.language.languages.ua);

						var copy = cwe('div','class,copy',footer);
							$(copy).html(wa_manager.language.other.allRightsReserved+' &copy; '+(new Date().getFullYear())+' <a href="'+wa_manager.options.service.url+'">'+wa_manager.options.service.url.replace('http://', '')+'</a>');

				//EVENTS
				$(item_ru).click(function(e){
					wa_manager.utils.language.set(wa_manager.constants.language.ru);
					return false;
				});
				$(item_en).click(function(e){
					alert("Функционал на данный момент не реализован");
					return false;
				});
				$(item_ua).click(function(e){
					alert("Функционал на данный момент не реализован");
					return false;
				});
				//EVENTS
			};

			//PROPERTYS
			this.activeForm = null;
			this.generalMenu = null;
			var setActiveFormIsBusy = false;

			//METHODS
			this.GetContentHolder = function(){
				return proto.Data.content;
			};
			this.SetActiveForm = function(obj){
				function activateActions(){
					SelfObj.activeForm = obj.form();
					if(SelfObj.activeForm.formInfo.displayImmediately) SelfObj.activeForm.Show({effect: true});
					if(SelfObj.activeForm.formInfo.breadcrumb){
						wa_manager.data.control.breadcrumb.Show();

						wa_manager.data.control.breadcrumb.AddItem({
							level: SelfObj.activeForm.formInfo.breadcrumbLevel,
							text: SelfObj.activeForm.formInfo.name,
							onClick: function(){
								SelfObj.SetActiveForm(obj);
							}
						});
					}else{
						wa_manager.data.control.breadcrumb.Hide();
					};

					//set title window
					wa_manager.utils.setTitle([wa_manager.options.service.manager, SelfObj.activeForm.formInfo.name]);

					//set general menu
					if(SelfObj.activeForm.formInfo.generalMenu){
						if(!SelfObj.generalMenu){
							SelfObj.generalMenu = new wa_manager.control.generalMenu({
								holder: proto.Data.header,
								items: {
									account: {
										onClick: function(){
											SelfObj.SetActiveForm({
												form: function(){
													return new wa_manager.form.Account({holder: SelfObj.GetContentHolder()},{visible: false});
												}
											});
										}
									},
									category: {
										onClick: function(){
											SelfObj.SetActiveForm({
												form: function(){
													return new wa_manager.form.Folders({holder: SelfObj.GetContentHolder()},{visible: false});
												}
											});
										}
									},
									masks: {
										onClick: function(){
											SelfObj.SetActiveForm({
												form: function(){
													return new wa_manager.form.Masks({holder: SelfObj.GetContentHolder()},{visible: false});
												}
											});
										}
									},
									referals: {
										onClick: function(){
											alert("Функционал на данный момент не реализован");
										}
									},
									logout: {
										onClick: function(){
											SelfObj.LogOut(true)
										}
									}
								}
							},{visible: false});
							SelfObj.generalMenu.Show({effect: true});
						};
						if(SelfObj.activeForm.formInfo.generalMenuItem) SelfObj.generalMenu.SetActiveItem(SelfObj.activeForm.formInfo.type);
					}else{
						if(SelfObj.generalMenu){
							SelfObj.generalMenu.Destroy({effect: true});
							SelfObj.generalMenu = null;
						};
					};

					//set busy is false
					setActiveFormIsBusy = false;
				};

				//check on busy
				if(setActiveFormIsBusy) return;
				//set active form
				setActiveFormIsBusy = true;
				if(SelfObj.activeForm) SelfObj.activeForm.Destroy({
					effect: true,
					callback: activateActions
				});
				else activateActions();
			};
			this.LogOut = function(logOutOnServer){
				function showAuthForm(){
					wa_manager.utils.storage.Del(wa_manager.constants.cookie.token);
					wa_manager.data.user.token = null;
					SelfObj.SetActiveForm({
						form: function(){
							return new wa_manager.form.Auth({holder: SelfObj.GetContentHolder()},{visible: false});
						}
					});
				};

				if(logOutOnServer){
					wa_api.methods.LogOut({
						token: wa_manager.methods.GetToken(),
						callback: showAuthForm
					});
				}else{
					showAuthForm();
				};
			};

			this.Hide = proto.Hide;
			this.Show = proto.Show;
			this.Toogle = proto.Toogle;
			this.Destroy = proto.Destroy;

			proto.Init(opt, param);
		},
		Console: function(opt, param){
			var proto = new wa_manager.proto();
			var cwe = wa_api.utils.cwe;
			var opts = proto.Opts;
			var SelfObj = this;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body,
				button: {
					toogle: {
						'class':{
							show: 'max',
							hide: 'min'
						}
					}
				}
			});

			proto.Constructor = function(){
				var parent = proto.Data.parent = proto.HtmlNodes.Main[0] = cwe('div','id,console',opts.holder);
					var left = proto.Data.left = cwe('div','class,left',parent);

				//add textarea
				var textarea = proto.Data.textarea = new wa_manager.control.textarea({
					lineNumbers: false,
					readonly: true,
					line: {
						height: 14
					},
					holder: left,
					onResize: setToCenter
				},{visible: true});

				var right = cwe('div','class,right',parent);
					var title = proto.Data.title = cwe('div','class,title',right);
						var btn_toogle = proto.Data.btn_toogle = cwe('span','class,'+opts.button.toogle['class'].show,title);

				//set position
				setToCenter();
				SelfObj.ToogleConsole();

				//EVENTS
				$(window).resize(setToCenter);
				$(btn_toogle).click(function(e){
					SelfObj.ToogleConsole(true);
					e.stopPropagation();
				});
				$(title).click(function(e){
					SelfObj.ToogleConsole(true);
				});
				//EVENTS
			};

			function setToCenter(){
				$(proto.Data.parent).css({
					top: $(window).height()/2 - $(proto.Data.parent).outerHeight()/2
				});
			};

			this.ToogleConsole = function(effect){
				if(parseInt($(proto.Data.parent).css('left')) >= 0){
					proto.Data.btn_toogle.className = opts.button.toogle['class'].show;
					if(effect) $(proto.Data.parent).animate({left: -$(proto.Data.left).outerWidth()});
					else $(proto.Data.parent).css({left: -$(proto.Data.left).outerWidth()});
				}else{
					proto.Data.btn_toogle.className = opts.button.toogle['class'].hide;
					if(effect) $(proto.Data.parent).animate({left: 0});
					else $(proto.Data.parent).css({left: 0});
				};
			};
			this.AppendText = function(text){
				proto.Data.textarea.AddLine(text, true);
			};

			this.Hide = proto.Hide;
			this.Show = proto.Show;
			this.Toogle = proto.Toogle;
			this.Destroy = proto.Destroy;

			proto.Init(opt, param);
		},
		BadBrowser: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				language = wa_manager.language.form.badBrowser;

			//options
			proto.Opts = $.extend(true, opts, {
				holder: document.body,
				browsers: {
					chrome: {
						'class': 'chrome',
						url: 'https://www.google.com/chrome/',
						name: language.browsers.chrome
					},
					firefox: {
						'class': 'firefox',
						url: 'http://www.mozilla.org/ru/firefox/',
						name: language.browsers.firefox
					},
					opera: {
						'class': 'opera',
						url: 'http://opera.com',
						name: language.browsers.opera
					},
					safari: {
						'class': 'safari',
						url: 'http://www.apple.com/safari/download/',
						name: language.browsers.safari
					}
				}
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','id,browsers_box',opts.holder);
					var info = cwe('div','',parent);
						$(cwe('h3','',info)).html(language.title);//title
						$(cwe('div','',info)).html(language.text);//text
					var data = cwe('div','id,browsers_item',parent);

				//set items
				$.each(opts.browsers, function(key, value){
					new Item($.extend(true, value, {holder: data}), {visible: true});
				});
			};

			function Item(opt, param){
				var proto = new wa_manager.proto(),
					cwe = wa_api.utils.cwe,
					opts = proto.Opts,
					SelfObj = this;

				//options
				proto.Opts = $.extend(true, opts, {
					holder: document.body,
					'class': null,
					url: null,
					name: null
				});

				proto.Constructor = function(){
					var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','class,item',opts.holder);
						var img = cwe('div','class,browsers',parent);
						$(img).addClass(opts['class']);
						var url = cwe('a','target,_blank',parent);
						$(url).attr('href', opts.url);
						$(url).html(opts.name);
				};

				//PROPERTYS
				this.state = {};
				this.htmlElement = null;

				//METHODS
				this.Destroy = proto.Destroy;
				this.Show = proto.Show;
				this.Hide = proto.Hide;
				this.Toogle = proto.Toogle;

				proto.Init(opt, param);
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;
			this.formInfo = {
				name: language.name,
				type: 'badbrowser',
				generalMenu: false,
				displayImmediately: true,
				breadcrumb: false
			};

			//METHODS
			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		MessageBox: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.form.messagebox,
				button_constant = wa_manager.constants.control.buttonBox,
				button_lang = wa_manager.language.control.buttonBox,
				control = wa_manager.control,
				language = wa_manager.language.form.messagebox,
				regexp = wa_api.utils.verify.regexp,
				limits = wa_api.Constants.Limit,
				jsonItem = wa_api.Constants.OperationItem;

			var inputs = {
				nameOfMask: 'nameOfMask',
				mask: ['mask1','mask2'],
				rangeSize: 'rangeSize',
				uniqTime: 'uniqTime',
				allowProxy: 'allowProxy',
				ignoreGU: 'ignoreGu',
				nameOfFolder: 'nameOfFolder',
				graphGeo: 'graphGeo',
				graphView: 'grapthView',
				graphClick: 'graphClick',
                graphTime: 'graphTime',
				domain: 'domain',
				extSource: 'extSource',
				listMask: 'listMask',
				dataResult: 'dataResult',
                console: 'console',
                tabContainer: 'tabContainer',
                tab_1: 'tab_1',
                tab_2: 'tab_2',
                tab_3: 'tab_3',
                tab_4: 'tab_4',
                areaset: 'areaset',
                nameTask: 'nameTask',
                beforeClick: 'beforeClick',
                afterClick: 'afterClick'
			};
			//options
			var default_options = {
				holder: document.body,
				title: null,
				text: null,
				type: constant.type.info,
				setControl: {
					confirm: {
						buttons: {
							ok: {
								text: button_lang.yes,
								click: function(){
									SelfObj.Hide({
										effect: true,
										callback: function(){
											if(opts.onClickButton.ok) opts.onClickButton.ok(SelfObj);
											else SelfObj.Destroy();
										}
									});
								},
								show: true
							},
							cancel: {
								text: button_lang.no,
								click: function(){
									SelfObj.Hide({
										effect: true,
										callback: function(){
											if(opts.onClickButton.cancel) opts.onClickButton.cancel(SelfObj);
											else SelfObj.Destroy();
										}
									});
								},
								show: true
							}
						}
					},
					error: {
						buttons: {
							ok: {
								text: button_lang.ok,
								click: function(){
									SelfObj.Hide({
										effect: true,
										callback: function(){
											if(opts.onClickButton.ok) opts.onClickButton.ok(SelfObj);
											else SelfObj.Destroy();
										}
									});
								},
								show: true
							}
						}
					},
					info: {
						buttons: {
							ok: {
								text: button_lang.ok,
								click: function(){
									SelfObj.Hide({
										effect: true,
										callback: function(){
											if(opts.onClickButton.ok) opts.onClickButton.ok(SelfObj);
											else SelfObj.Destroy();
										}
									});
								},
								show: true
							}
						}
					},
                    maskAdd: {
                        buttons: {
                            ok: {
                                text: button_lang.save,
                                click: function(){
                                    SelfObj.ErrorHide();

                                    proto.Data.areaset.controls[inputs.nameOfMask].control.CheckText();
                                    if(proto.Data.areaset.controls[inputs.nameOfMask].control.state.error){
                                        SelfObj.ErrorShow(language.maskAdd.maskName.error);
                                        return;
                                    };

                                    proto.Data.areaset.controls[inputs.mask[0]].control.CheckText();
                                    if(proto.Data.areaset.controls[inputs.mask[0]].control.state.error || proto.Data.areaset.controls[inputs.mask[1]].control.state.error){
                                        SelfObj.ErrorShow(language.type.maskAdd.mask.error);
                                        return;
                                    };

                                    proto.Data.areaset.controls[inputs.rangeSize].control.CheckText();
                                    if(proto.Data.areaset.controls[inputs.rangeSize].control.state.error){
                                        SelfObj.ErrorShow(language.type.maskAdd.rangeSize.error);
                                        return;
                                    };

                                    proto.Data.areaset.controls[inputs.uniqTime].control.CheckText();
                                    if(proto.Data.areaset.controls[inputs.uniqTime].control.state.error){
                                        SelfObj.ErrorShow(language.type.maskAdd.uniqTime.error);
                                        return;
                                    };

                                    SelfObj.Hide({
                                        effect: true,
                                        callback: function(){
                                            wa_api.methods.AddMask({
                                                token: wa_manager.methods.GetToken(),
                                                mask: ((proto.Data.areaset.controls[inputs.mask[1]].control.GetValue().length > 0) ? [proto.Data.areaset.controls[inputs.mask[0]].control.GetValue(), proto.Data.areaset.controls[inputs.mask[1]].control.GetValue()].join(opts.maskEdit.maskDelimiter) : [proto.Data.areaset.controls[inputs.mask[0]].control.GetValue()].join(opts.maskEdit.maskDelimiter)),
                                                name: proto.Data.areaset.controls[inputs.nameOfMask].control.GetValue(),
                                                ignoregu: proto.Data.filter[inputs.ignoreGU].control.state.check,
                                                allowproxy: proto.Data.filter[inputs.allowProxy].control.state.check,
                                                uniqtime: proto.Data.areaset.controls[inputs.uniqTime].control.GetValue(),
                                                rangesize: proto.Data.areaset.controls[inputs.rangeSize].control.GetValue(),
                                                callback: function(data){
                                                    SelfObj.Destroy({
                                                        callback: function(){
                                                            opts.maskAdd = $.extend(true, opts.maskAdd, {
                                                                mask: ((proto.Data.areaset.controls[inputs.mask[1]].control.GetValue().length > 0) ? [proto.Data.areaset.controls[inputs.mask[0]].control.GetValue(), proto.Data.areaset.controls[inputs.mask[1]].control.GetValue()].join(opts.maskEdit.maskDelimiter) : [proto.Data.areaset.controls[inputs.mask[0]].control.GetValue()].join(opts.maskEdit.maskDelimiter)),
                                                                maskName: proto.Data.areaset.controls[inputs.nameOfMask].control.GetValue(),
                                                                ignoreGU: proto.Data.filter[inputs.ignoreGU].control.state.check,
                                                                allowProxy: proto.Data.filter[inputs.allowProxy].control.state.check,
                                                                uniqTime: proto.Data.areaset.controls[inputs.uniqTime].control.GetValue(),
                                                                rangeSize: proto.Data.areaset.controls[inputs.rangeSize].control.GetValue(),
                                                                maskId: data[jsonItem.IdMask]
                                                            });

                                                            opts.maskAdd.success(opts.maskAdd);
                                                        }
                                                    });
                                                },
                                                ge_callback: function(){
                                                    SelfObj.Show({effect: true});
                                                },
                                                exception: {
                                                    LimitExceeded: function(){
                                                        SelfObj.Destroy();

                                                        var msgbox = new wa_manager.form.MessageBox({
                                                            title: wa_manager.language.form.messagebox.title.error,
                                                            text: language.type[constant.type.maskAdd].exception.LimitExceeded.text,
                                                            type: wa_manager.constants.form.messagebox.type.error
                                                        },{});
                                                        msgbox.Show({effect: true});
                                                    }
                                                }
                                            });
                                        }
                                    });
                                },
                                show: true
                            },
                            cancel: {
                                text: button_lang.cancel,
                                click: function(){
                                    SelfObj.Hide({
                                        effect: true,
                                        callback: function(){
                                            if(opts.onClickButton.cancel) opts.onClickButton.cancel(SelfObj);
                                            else SelfObj.Destroy();
                                        }
                                    });
                                },
                                show: true
                            }
                        },
                        controls: [
                            {
                                name: inputs.nameOfMask,
                                text: language.type.maskAdd.maskName.text,
                                control: function(holder){
                                    return new control.textline({
                                        holder: holder,
                                        focus: true,
                                        tooltip:  language.type.maskAdd.maskName.tooltip,
                                        minLength: limits.Mask.Name.Length.Min,
                                        maxLength:  limits.Mask.Name.Length.Max,
                                        regexp: regexp.mask.name,
                                        checkData: true
                                    },{visible: true});
                                }
                            },
                            [{
                                name: inputs.mask[0],
                                text: language.type.maskAdd.mask.text,
                                control: function(holder){
                                    return new control.textline({
                                        holder: holder,
                                        type: wa_manager.constants.control.textline.type.numericUpDown,
                                        tooltip:  language.type.maskEdit.mask.tooltip,
                                        minLength: limits.Mask.Mask.Length.Min,
                                        maxLength:  limits.Mask.Mask.Length.Max,
                                        regexp: regexp.mask.mask,
                                        userCheckDataError: function(){return default_options.setControl.maskEdit.functions.checkDataMask(1)},
                                        checkData: true
                                    },{visible: true});
                                }
                            },{
                                name: inputs.mask[1],
                                text: language.type.maskAdd.mask.text,
                                control: function(holder){
                                    return new control.textline({
                                        holder: holder,
                                        type: wa_manager.constants.control.textline.type.numericUpDown,
                                        tooltip:  language.type.maskEdit.mask.tooltip,
                                        minLength: limits.Mask.Mask.Length.Min,
                                        maxLength:  limits.Mask.Mask.Length.Max,
                                        regexp: regexp.mask.mask,
                                        userCheckDataError: function(){return default_options.setControl.maskEdit.functions.checkDataMask(2)},
                                        checkData: true
                                    },{visible: true});
                                }
                            }],
                            {
                                name: inputs.rangeSize,
                                text: language.type[constant.type.maskAdd].rangeSize.text,
                                control: function(holder){
                                    return new control.numericUpDown({
                                        holder: holder,
                                        value: opts[constant.type.maskAdd].rangeSize,
                                        tooltip:  language.type[constant.type.maskAdd].rangeSize.tooltip,
                                        min: limits.Mask.RangeSize.Value.Min,
                                        max: limits.Mask.RangeSize.Value.Max,
                                        minLength: 1,
                                        checkData: true
                                    },{visible: true});
                                }
                            },
                            {
                                name: inputs.uniqTime,
                                text: language.type[constant.type.maskAdd].uniqTime.text,
                                control: function(holder){
                                    return new control.numericUpDown({
                                        holder: holder,
                                        value: opts[constant.type.maskAdd].uniqTime,
                                        tooltip:  language.type[constant.type.maskAdd].uniqTime.tooltip,
                                        min: limits.Mask.UniqPeriod.Value.Min,
                                        max: limits.Mask.UniqPeriod.Value.Max,
                                        minLength: 1,
                                        checkData: true
                                    },{visible: true});
                                }
                            }
                        ],
                        filters: [
                            {
                                name: inputs.allowProxy,
                                text: language.type[constant.type.maskAdd].allowProxy.text,
                                control: function(holder){
                                    return new control.checkbox({
                                        holder: holder,
                                        state: ((opts[constant.type.maskAdd].allowProxy) ? wa_manager.constants.control.checkbox.state.check : wa_manager.constants.control.checkbox.state.uncheck),
                                        tooltip:  language.type[constant.type.maskAdd].allowProxy.tooltip
                                    },{visible: true});
                                }
                            },
                            {
                                name: inputs.ignoreGU,
                                text: language.type[constant.type.maskAdd].ignoreGU.text,
                                control: function(holder){
                                    return new control.checkbox({
                                        holder: holder,
                                        state: ((opts[constant.type.maskAdd].ignoreGU) ? wa_manager.constants.control.checkbox.state.check : wa_manager.constants.control.checkbox.state.uncheck),
                                        tooltip:  language.type[constant.type.maskAdd].ignoreGU.tooltip
                                    },{visible: true});
                                }
                            }
                        ],
                        functions: {
                            checkDataMask: function(number){
                                var error = false,
                                    callback = function(){},
                                    mask_1 = proto.Data.areaset.controls[inputs.mask[0]].control,
                                    mask_1_Length = mask_1.GetValue().length,
                                    mask_2 = proto.Data.areaset.controls[inputs.mask[1]].control,
                                    mask_2_Length = mask_2.GetValue().length,
                                    maskDelimiterLength = opts.maskEdit.maskDelimiter.length;

                                switch(number){
                                    case 1:
                                        if(mask_1_Length < 1) error = true;
                                        else if(mask_1_Length + mask_2_Length + maskDelimiterLength > limits.Mask.Mask.Length.Max){
                                            error = true;
                                            callback = function(){
                                                mask_2.SetError(true);
                                            };
                                        }else{
                                            callback = function(){
                                                mask_2.SetError(false);
                                            };
                                        };
                                        break
                                    case 2:
                                        if(mask_1_Length < 1){
                                            callback = function(){
                                                mask_1.SetError(true);
                                            };
                                        }else if(mask_1_Length + mask_2_Length + maskDelimiterLength > limits.Mask.Mask.Length.Max){
                                            error = true;
                                            callback = function(){
                                                mask_1.SetError(true);
                                            };
                                        }else{
                                            callback = function(){
                                                mask_1.SetError(false);
                                            };
                                        };
                                        break;
                                };

                                return {state: error, callback: callback};
                            }
                        }
                    },
					maskEdit: {
						buttons: {
							ok: {
								text: button_lang.save,
								click: function(){
									SelfObj.ErrorHide();

									proto.Data.areaset.controls[inputs.nameOfMask].control.CheckText();
									if(proto.Data.areaset.controls[inputs.nameOfMask].control.state.error){
										SelfObj.ErrorShow(language.maskEdit.maskName.error);
										return;
									};

									proto.Data.areaset.controls[inputs.mask[0]].control.CheckText();
									if(proto.Data.areaset.controls[inputs.mask[0]].control.state.error || proto.Data.areaset.controls[inputs.mask[1]].control.state.error){
										SelfObj.ErrorShow(language.type.maskEdit.mask.error);
										return;
									};

									proto.Data.areaset.controls[inputs.rangeSize].control.CheckText();
									if(proto.Data.areaset.controls[inputs.rangeSize].control.state.error){
										SelfObj.ErrorShow(language.type.maskEdit.rangeSize.error);
										return;
									};

									proto.Data.areaset.controls[inputs.uniqTime].control.CheckText();
									if(proto.Data.areaset.controls[inputs.uniqTime].control.state.error){
										SelfObj.ErrorShow(language.type.maskEdit.uniqTime.error);
										return;
									};

									SelfObj.Hide({
										effect: true,
										callback: function(){
											wa_api.methods.SetMask({
												token: wa_manager.methods.GetToken(),
												maskid: opts.maskEdit.maskId,
												mask: ((proto.Data.areaset.controls[inputs.mask[1]].control.GetValue().length > 0) ? [proto.Data.areaset.controls[inputs.mask[0]].control.GetValue(), proto.Data.areaset.controls[inputs.mask[1]].control.GetValue()].join(opts.maskEdit.maskDelimiter) : [proto.Data.areaset.controls[inputs.mask[0]].control.GetValue()].join(opts.maskEdit.maskDelimiter)),
												name: proto.Data.areaset.controls[inputs.nameOfMask].control.GetValue(),
												ignoregu: proto.Data.filter[inputs.ignoreGU].control.state.check,
												allowproxy: proto.Data.filter[inputs.allowProxy].control.state.check,
												uniqtime: proto.Data.areaset.controls[inputs.uniqTime].control.GetValue(),
												rangesize: proto.Data.areaset.controls[inputs.rangeSize].control.GetValue(),
												callback: function(){
													SelfObj.Destroy({
														callback: function(){
															opts.maskEdit = $.extend(true, opts.maskEdit, {
																mask: ((proto.Data.areaset.controls[inputs.mask[1]].control.GetValue().length > 0) ? [proto.Data.areaset.controls[inputs.mask[0]].control.GetValue(), proto.Data.areaset.controls[inputs.mask[1]].control.GetValue()].join(opts.maskEdit.maskDelimiter) : [proto.Data.areaset.controls[inputs.mask[0]].control.GetValue()].join(opts.maskEdit.maskDelimiter)),
																maskName: proto.Data.areaset.controls[inputs.nameOfMask].control.GetValue(),
																ignoreGU: proto.Data.filter[inputs.ignoreGU].control.state.check,
																allowProxy: proto.Data.filter[inputs.allowProxy].control.state.check,
																uniqTime: proto.Data.areaset.controls[inputs.uniqTime].control.GetValue(),
																rangeSize: proto.Data.areaset.controls[inputs.rangeSize].control.GetValue()
															});

															opts.maskEdit.success(opts.maskEdit)
														}
													});
												},
												ge_callback: function(){
													SelfObj.Show({effect: true});
												}
											});
										}
									});
								},
								show: true
							},
							cancel: {
								text: button_lang.cancel,
								click: function(){
									SelfObj.Hide({
										effect: true,
										callback: function(){
											if(opts.onClickButton.cancel) opts.onClickButton.cancel(SelfObj);
											else SelfObj.Destroy();
										}
									});
								},
								show: true
							}
						},
						controls: [
							{
								name: inputs.nameOfMask,
								text: language.type.maskEdit.maskName.text,
								control: function(holder){
									return new control.textline({
										holder: holder,
										focus: true,
										value: opts.maskEdit.maskName,
										tooltip:  language.type.maskEdit.maskName.tooltip,
										minLength: limits.Mask.Name.Length.Min,
										maxLength:  limits.Mask.Name.Length.Max,
										regexp: regexp.mask.name,
										checkData: true
									},{visible: true});
								}
							},
							[{
								name: inputs.mask[0],
								text: language.type.maskEdit.mask.text,
								control: function(holder){
									return new control.textline({
										holder: holder,
										type: wa_manager.constants.control.textline.type.numericUpDown,
										value: opts.maskEdit.mask.split(opts.maskEdit.maskDelimiter)[0],
										tooltip:  language.type.maskEdit.mask.tooltip,
										minLength: limits.Mask.Mask.Length.Min,
										maxLength:  limits.Mask.Mask.Length.Max,
										regexp: regexp.mask.mask,
										userCheckDataError: function(){return default_options.setControl.maskEdit.functions.checkDataMask(1)},
										checkData: true
									},{visible: true});
								}
							},{
								name: inputs.mask[1],
								text: language.type.maskEdit.mask.text,
								control: function(holder){
									return new control.textline({
										holder: holder,
										type: wa_manager.constants.control.textline.type.numericUpDown,
										value: opts.maskEdit.mask.split(opts.maskEdit.maskDelimiter)[1],
										tooltip:  language.type.maskEdit.mask.tooltip,
										minLength: limits.Mask.Mask.Length.Min,
										maxLength:  limits.Mask.Mask.Length.Max,
										regexp: regexp.mask.mask,
										userCheckDataError: function(){return default_options.setControl.maskEdit.functions.checkDataMask(2)},
										checkData: true
									},{visible: true});
								}
							}],
							{
								name: inputs.rangeSize,
								text: language.type[constant.type.maskEdit].rangeSize.text,
								control: function(holder){
									return new control.numericUpDown({
										holder: holder,
										value: opts[constant.type.maskEdit].rangeSize,
										tooltip:  language.type[constant.type.maskEdit].rangeSize.tooltip,
										min: limits.Mask.RangeSize.Value.Min,
										max: limits.Mask.RangeSize.Value.Max,
										minLength: 1,
										checkData: true
									},{visible: true});
								}
							},
							{
								name: inputs.uniqTime,
								text: language.type[constant.type.maskEdit].uniqTime.text,
								control: function(holder){
									return new control.numericUpDown({
										holder: holder,
										value: opts[constant.type.maskEdit].uniqTime,
										tooltip:  language.type[constant.type.maskEdit].uniqTime.tooltip,
										min: limits.Mask.UniqPeriod.Value.Min,
										max: limits.Mask.UniqPeriod.Value.Max,
										minLength: 1,
										checkData: true
									},{visible: true});
								}
							}
						],
						filters: [
							{
								name: inputs.allowProxy,
								text: language.type[constant.type.maskEdit].allowProxy.text,
								control: function(holder){
									return new control.checkbox({
										holder: holder,
										state: ((opts[constant.type.maskEdit].allowProxy) ? wa_manager.constants.control.checkbox.state.check : wa_manager.constants.control.checkbox.state.uncheck),
										tooltip:  language.type[constant.type.maskEdit].allowProxy.tooltip
									},{visible: true});
								}
							},
							{
								name: inputs.ignoreGU,
								text: language.type[constant.type.maskEdit].ignoreGU.text,
								control: function(holder){
									return new control.checkbox({
										holder: holder,
										state: ((opts[constant.type.maskEdit].ignoreGU) ? wa_manager.constants.control.checkbox.state.check : wa_manager.constants.control.checkbox.state.uncheck),
										tooltip:  language.type[constant.type.maskEdit].ignoreGU.tooltip
									},{visible: true});
								}
							}
						],
						functions: {
							checkDataMask: function(number){
								var error = false,
									callback = function(){},
									mask_1 = proto.Data.areaset.controls[inputs.mask[0]].control,
									mask_1_Length = mask_1.GetValue().length,
									mask_2 = proto.Data.areaset.controls[inputs.mask[1]].control,
									mask_2_Length = mask_2.GetValue().length,
									maskDelimiterLength = opts.maskEdit.maskDelimiter.length;

								switch(number){
									case 1:
										if(mask_1_Length < 1) error = true;
										else if(mask_1_Length + mask_2_Length + maskDelimiterLength > limits.Mask.Mask.Length.Max){
											error = true;
											callback = function(){
												mask_2.SetError(true);
											};
										}else{
											callback = function(){
												mask_2.SetError(false);
											};
										};
										break
									case 2:
										if(mask_1_Length < 1){
											callback = function(){
												mask_1.SetError(true);
											};
										}else if(mask_1_Length + mask_2_Length + maskDelimiterLength > limits.Mask.Mask.Length.Max){
											error = true;
											callback = function(){
												mask_1.SetError(true);
											};
										}else{
											callback = function(){
												mask_1.SetError(false);
											};
										};
										break;
								};

								return {state: error, callback: callback};
							}
						}
					},
					folderRename: {
						buttons: {
							ok: {
								text: button_lang.save,
								click: function(){
									SelfObj.ErrorHide();

									proto.Data.areaset.controls[inputs.nameOfFolder].control.CheckText();
									if(proto.Data.areaset.controls[inputs.nameOfFolder].control.state.error){
										SelfObj.ErrorShow(language.type[constant.type.folderRename].folderName.error);
										return;
									};

									SelfObj.Hide({
										effect: true,
										callback: function(){
											wa_api.methods.SetFolderName({
												token: wa_manager.methods.GetToken(),
												folderid: opts[constant.type.folderRename].folderId,
												name: proto.Data.areaset.controls[inputs.nameOfFolder].control.GetValue(),
												callback: function(){
													SelfObj.Destroy({
														callback: function(){
															opts[constant.type.folderRename] = $.extend(true, opts[constant.type.folderRename], {
																folderName: proto.Data.areaset.controls[inputs.nameOfFolder].control.GetValue()
															});

															opts[constant.type.folderRename].success(opts[constant.type.folderRename]);
														}
													});
												},
												ge_callback: function(){
													SelfObj.Show({effect: true});
												}
											});
										}
									});
								},
								show: true
							},
							cancel: {
								text: button_lang.cancel,
								click: function(){
									SelfObj.Hide({
										effect: true,
										callback: function(){
											if(opts.onClickButton[button_constant.button.name.ok]) opts.onClickButton[button_constant.button.name.cancel](SelfObj);
											else SelfObj.Destroy();
										}
									});
								},
								show: true
							}
						},
						controls: [
							{
								name: inputs.nameOfFolder,
								text: language.type[constant.type.folderRename].folderName.text,
								control: function(holder){
									return new control.textline({
										holder: holder,
										focus: true,
										value: opts[constant.type.folderRename].folderName,
										tooltip:  language.type[constant.type.folderRename].folderName.tooltip,
										minLength: limits.Folder.Name.Length.Min,
										maxLength:  limits.Folder.Name.Length.Max,
										regexp: regexp.folder.name,
										checkData: true
									},{visible: true});
								}
							}
						]
					},
					folderAdd: {
						buttons: {
							ok: {
								text: button_lang.save,
								click: function(){
									SelfObj.ErrorHide();

									proto.Data.areaset.controls[inputs.nameOfFolder].control.CheckText();
									if(proto.Data.areaset.controls[inputs.nameOfFolder].control.state.error){
										SelfObj.ErrorShow(language.type[constant.type.folderAdd].folderName.error);
										return;
									};

									SelfObj.Hide({
										effect: true,
										callback: function(){
											wa_api.methods.AddFolder({
												token: wa_manager.methods.GetToken(),
												name: proto.Data.areaset.controls[inputs.nameOfFolder].control.GetValue(),
												callback: function(data){
													SelfObj.Destroy({
														callback: function(){
															opts[constant.type.folderAdd] = $.extend(true, opts[constant.type.folderAdd], {
																folderId: data[jsonItem.IdFolder],
																folderName: proto.Data.areaset.controls[inputs.nameOfFolder].control.GetValue()
															});

															opts[constant.type.folderAdd].success(opts[constant.type.folderAdd]);
														}
													});
												},
												exception: {
													LimitExceeded: function(){
														SelfObj.Destroy();

														var msgbox = new wa_manager.form.MessageBox({
															title: wa_manager.language.form.messagebox.title.error,
															text: language.type[constant.type.folderAdd].exception.LimitExceeded.text,
															type: wa_manager.constants.form.messagebox.type.error
														},{});
														msgbox.Show({effect: true});
													}
												},
												ge_callback: function(){
													SelfObj.Show({effect: true});
												}
											});
										}
									});
								},
								show: true
							},
							cancel: {
								text: button_lang.cancel,
								click: function(){
									SelfObj.Hide({
										effect: true,
										callback: function(){
											if(opts.onClickButton[button_constant.button.name.ok]) opts.onClickButton[button_constant.button.name.cancel](SelfObj);
											else SelfObj.Destroy();
										}
									});
								},
								show: true
							}
						},
						controls: [
							{
								name: inputs.nameOfFolder,
								text: language.type[constant.type.folderAdd].folderName.text,
								control: function(holder){
									return new control.textline({
										holder: holder,
										focus: true,
										value: opts[constant.type.folderAdd].folderName,
										tooltip:  language.type[constant.type.folderAdd].folderName.tooltip,
										minLength: limits.Folder.Name.Length.Min,
										maxLength:  limits.Folder.Name.Length.Max,
										regexp: regexp.folder.name,
										checkData: true
									},{visible: true});
								}
							}
						]
					},
					setGeotargeting: {
						buttons: {
							ok: {
                                click: function(){
                                    var summ = 0, data = proto.Data.areaset.GetControl(inputs.graphGeo).GetData();
                                    $.each(data.min, function(key, value){
                                        summ +=value[1];
                                    });
                                    if(summ < 100){
                                        var msgbox = new wa_manager.form.MessageBox({
                                            title: wa_manager.language.form.messagebox.title.notification,
                                            text: language.type.setGeoTargeting.lessThan100,
                                            type: wa_manager.constants.form.messagebox.type.confirm,
                                            onClickButton: {
                                                ok: function(){
                                                    msgbox.Destroy();
                                                    save();
                                                }
                                            }
                                        },{});
                                        msgbox.Show({effect: true});
                                    }else{
                                        save();
                                    };
                                    
                                    function save(){
                                        SelfObj.Hide({effect: true});
                                        var geoData = [];
                                        $.each(data.min, function(key, value){
                                            geoData.push({
                                                id: value[0],
                                                value: value[1]
                                            });
                                        });
                                        wa_api.methods.SetGeoTargeting({
                                            token: wa_manager.methods.GetToken(),
                                            folderId: opts.setGeotargeting.folderId,
                                            taskId: opts.setGeotargeting.taskId,
                                            geoData: geoData,
                                            callback: function(){
                                                SelfObj.Destroy();
                                            },
                                            ge_callback: function(){
                                                SelfObj.Show({effect: true});
                                            }
                                        });
                                    };
                                },
								text: button_lang.save,
								show: true
							},
							cancel: {
                                click: function(){
                                    SelfObj.Hide({
                                        effect: true,
                                        callback: function(){
                                            if(opts.onClickButton[button_constant.button.name.ok]) opts.onClickButton[button_constant.button.name.cancel](SelfObj);
                                            else SelfObj.Destroy();
                                        }
                                    });
                                },
								text: button_lang.cancel,
								show: true
							}
						},
						controls: [
							{
								name: inputs.graphGeo,
								text: language.type.setGeoTargeting.graphName,
								control: function(holder){
									return new wa_manager.control.graphic({
										holder: holder,
										type: wa_manager.constants.control.graphic.type.geoTargeting,
										data: opts[opts.type].data
									},{visible: true});
								}
							}
						]
					},
					setViewtargeting: {
						buttons: {
							ok: {
								click: function(){
									SelfObj.Hide({effect: true});

									var  viewData = {min: [], max: []}, data = proto.Data.areaset.GetControl(inputs.graphView).GetData();

									$.each(data.min, function(key, value){
										viewData.min.push({
											id: value[0],
											value: value[1]
										});
									});
									$.each(data.max, function(key, value){
										viewData.max.push({
											id: value[0],
											value: value[1]
										});
									});

									wa_api.methods.SetViewTargeting({
										token: wa_manager.methods.GetToken(),
										folderId: opts.setViewtargeting.folderId,
										domainId: opts.setViewtargeting.domainId,
										viewData: viewData,
										callback: function(){
											SelfObj.Destroy();
										},
										ge_callback: function(){
											SelfObj.Show({effect: true});
										}
									});
								},
								text: button_lang.save,
								show: true
							},
							cancel: {
								click: function(){
									SelfObj.Hide({
										effect: true,
										callback: function(){
											if(opts.onClickButton[button_constant.button.name.ok]) opts.onClickButton[button_constant.button.name.cancel](SelfObj);
											else SelfObj.Destroy();
										}
									});
								},
								text: button_lang.cancel,
								show: true
							}
						},
						controls: [
							{
								name: inputs.graphView,
								text: language.type.setViewTargeting.graphName,
								control: function(holder){
									return new wa_manager.control.graphic({
										holder: holder,
										type: wa_manager.constants.control.graphic.type.viewTargeting,
										data: opts[opts.type].data,
										onChange: function(data){
											var summ = {max: 0, min: 0, give: 0};
											$.each(data.max,function(key,value){
												summ.max += data.max[key][1];
												summ.min += data.min[key][1];
												summ.give += data.give[key][1];
											});
											proto.Data.areaset.GetControl(inputs.dataResult).SetValues(summ);
										}
									},{visible: true});
								}
							},
							{
								name: inputs.dataResult,
								control: function(holder){
									return new wa_manager.control.dataResult({
										holder: holder,
										items: [
											{
												name: "max",
												text: wa_manager.language.control.dataResult.max,
												value: 0,
												'class': 'max',
												order: 1
											},
											{
												name: "min",
												text: wa_manager.language.control.dataResult.min,
												value: 0,
												'class': 'min',
												order: 2
											},
											{
												name: "give",
												text: wa_manager.language.control.dataResult.give,
												value: 0,
												'class': 'give',
												order: 3
											}
										]
									},{visible: true});
								}
							}
						],
						events: [
							function(){
								var data = proto.Data.areaset.GetControl(inputs.graphView).GetData(), summ = {max: 0, min: 0, give: 0};
								$.each(data.max,function(key,value){
									summ.max += data.max[key][1];
									summ.min += data.min[key][1];
									summ.give += data.give[key][1];
								});
								proto.Data.areaset.GetControl(inputs.dataResult).SetValues(summ);
							}
						]
					},
					setClicktargeting: {
						buttons: {
							ok: {
								click: function(){
									SelfObj.Hide({effect: true});

									var  clickData = {min: [], max: []}, data = proto.Data.areaset.GetControl(inputs.graphClick).GetData();

									$.each(data.min, function(key, value){
										clickData.min.push({
											id: value[0],
											value: value[1]
										});
									});
									$.each(data.max, function(key, value){
										clickData.max.push({
											id: value[0],
											value: value[1]
										});
									});

									wa_api.methods.SetClickTargeting({
										token: wa_manager.methods.GetToken(),
										folderId: opts.setClicktargeting.folderId,
										domainId: opts.setClicktargeting.domainId,
										maskId:  opts.setClicktargeting.data.curMaskId,
										clickData: clickData,
										callback: function(){
											SelfObj.Destroy();
										},
										ge_callback: function(){
											SelfObj.Show({effect: true});
										}
									});
								},
								text: button_lang.save,
								show: true
							},
							appy: {
								click: function(){
									var  clickData = {min: [], max: []}, data = proto.Data.areaset.GetControl(inputs.graphClick).GetData();

									$.each(data.min, function(key, value){
										clickData.min.push({
											id: value[0],
											value: value[1]
										});
									});
									$.each(data.max, function(key, value){
										clickData.max.push({
											id: value[0],
											value: value[1]
										});
									});

									wa_api.methods.SetClickTargeting({
										token: wa_manager.methods.GetToken(),
										folderId: opts.setClicktargeting.folderId,
										domainId: opts.setClicktargeting.domainId,
										maskId:  opts.setClicktargeting.data.curMaskId,
										clickData: clickData,
										callback: function(){
											var msgbox = new wa_manager.form.MessageBox({
												title: wa_manager.language.form.messagebox.title.notification,
												text: language.type.setClickTargeting.success,
												type: wa_manager.constants.form.messagebox.type.info
											},{visible: false});
											msgbox.Show({effect: true});
										},
										ge_callback: function(){}
									});
								},
								text: button_lang.appy,
								show: true
							},
							cancel: {
								click: function(){
									SelfObj.Hide({
										effect: true,
										callback: function(){
											if(opts.onClickButton[button_constant.button.name.ok]) opts.onClickButton[button_constant.button.name.cancel](SelfObj);
											else SelfObj.Destroy();
										}
									});
								},
								text: button_lang.cancel,
								show: true
							}
						},
						controls: [
							{
								name: inputs.listMask,
								text: language.type.setClickTargeting.selectMask,
								control: function(holder){
									return new wa_manager.control.maskList({
										holder: holder,
										onSelect: function(maskOpt){
											var maskId = maskOpt.maskId;

											opts.setClicktargeting.data.curMaskId = maskId;

											wa_api.methods.GetClickTargeting({
												token: wa_manager.methods.GetToken(),
												folderId: opts.setClicktargeting.folderId,
												domainId: opts.setClicktargeting.domainId,
												maskId: maskId,
												callback: function(data){
													data = data[jsonItem.ClickTargeting];
													data.sort(function(a,b){
														return a[jsonItem.IdTime]-b[jsonItem.IdTime];
													});

													var clickData = {min: [], max: [], give: []}, summ = {max: 0, min: 0, give: 0};
													$.each(data, function(key, value){
														clickData.min.push([value[jsonItem.IdTime],value[jsonItem.Min]]);
														clickData.max.push([value[jsonItem.IdTime],value[jsonItem.Max]]);
														clickData.give.push([value[jsonItem.IdTime],value[jsonItem.Recd]]);

														summ.min += value[jsonItem.Min];
														summ.max += value[jsonItem.Max];
														summ.give += value[jsonItem.Recd];
													});

													proto.Data.areaset.GetControl(inputs.graphClick).SetData(clickData);
													proto.Data.areaset.GetControl(inputs.dataResult).SetValues(summ);
												}
											});
										}
									},{visible: true});
								}
							},
							{
								name: inputs.graphClick,
								text: language.type.setClickTargeting.graphName,
								control: function(holder){
									return new wa_manager.control.graphic({
										holder: holder,
										type: wa_manager.constants.control.graphic.type.clickTargeting,
										data: opts[opts.type].data.data,
										onChange: function(data){
											var summ = {max: 0, min: 0, give: 0};
											$.each(data.max,function(key,value){
												summ.max += data.max[key][1];
												summ.min += data.min[key][1];
												summ.give += data.give[key][1];
											});
											proto.Data.areaset.GetControl(inputs.dataResult).SetValues(summ);
										}
									},{visible: true});
								}
							},
							{
								name: inputs.dataResult,
								control: function(holder){
									return new wa_manager.control.dataResult({
										holder: holder,
										items: [
											{
												name: "max",
												text: wa_manager.language.control.dataResult.max,
												value: 0,
												'class': 'max',
												order: 1
											},
											{
												name: "min",
												text: wa_manager.language.control.dataResult.min,
												value: 0,
												'class': 'min',
												order: 2
											},
											{
												name: "give",
												text: wa_manager.language.control.dataResult.give,
												value: 0,
												'class': 'give',
												order: 3
											}
										]
									},{visible: true});
								}
							}
						],
						events: [
							function(){
								proto.Data.areaset.GetControl(inputs.listMask).SelectMask("first");
							}
						]
					},
                    setTimetargeting: {
                        buttons: {
                            ok: {
                                click: function(){
                                    SelfObj.Hide({effect: true});

                                    var  timeData = {min: [], max: []}, data = proto.Data.areaset.GetControl(inputs.graphTime).GetData();

                                    $.each(data.min, function(key, value){
                                        timeData.min.push({
                                            id: value[0],
                                            value: value[1]
                                        });
                                    });
                                    $.each(data.max, function(key, value){
                                        timeData.max.push({
                                            id: value[0],
                                            value: value[1]
                                        });
                                    });

                                    wa_api.methods.SetTimeTargeting({
                                        token: wa_manager.methods.GetToken(),
                                        folderId: opts.setTimetargeting.folderId,
                                        taskId: opts.setTimetargeting.taskId,
                                        timeData: timeData,
                                        callback: function(){
                                            SelfObj.Destroy();
                                        },
                                        ge_callback: function(){
                                            SelfObj.Show({effect: true});
                                        }
                                    });
                                },
                                text: button_lang.save,
                                show: true
                            },
                            cancel: {
                                click: function(){
                                    SelfObj.Hide({
                                        effect: true,
                                        callback: function(){
                                            if(opts.onClickButton[button_constant.button.name.ok]) opts.onClickButton[button_constant.button.name.cancel](SelfObj);
                                            else SelfObj.Destroy();
                                        }
                                    });
                                },
                                text: button_lang.cancel,
                                show: true
                            }
                        },
                        controls: [
                            {
                                name: inputs.graphTime,
                                text: language.type.setTimeTargeting.graphName,
                                control: function(holder){
                                    return new wa_manager.control.graphic({
                                        holder: holder,
                                        type: wa_manager.constants.control.graphic.type.timeTargeting,
                                        data: opts[opts.type].data,
                                        onChange: function(data){
                                            var summ = {max: 0, min: 0, give: 0};
                                            $.each(data.max,function(key,value){
                                                summ.max += data.max[key][1];
                                                summ.min += data.min[key][1];
                                                summ.give += data.give[key][1];
                                            });
                                            proto.Data.areaset.GetControl(inputs.dataResult).SetValues(summ);
                                        }
                                    },{visible: true});
                                }
                            },
                            {
                                name: inputs.dataResult,
                                control: function(holder){
                                    return new wa_manager.control.dataResult({
                                        holder: holder,
                                        items: [
                                            {
                                                name: "max",
                                                text: wa_manager.language.control.dataResult.max,
                                                value: 0,
                                                'class': 'max',
                                                order: 1
                                            },
                                            {
                                                name: "min",
                                                text: wa_manager.language.control.dataResult.min,
                                                value: 0,
                                                'class': 'min',
                                                order: 2
                                            },
                                            {
                                                name: "give",
                                                text: wa_manager.language.control.dataResult.give,
                                                value: 0,
                                                'class': 'give',
                                                order: 3
                                            }
                                        ]
                                    },{visible: true});
                                }
                            }
                        ],
                        events: [
                            function(){
                                var data = proto.Data.areaset.GetControl(inputs.graphTime).GetData(), summ = {max: 0, min: 0, give: 0};
                                $.each(data.max,function(key,value){
                                    summ.max += data.max[key][1];
                                    summ.min += data.min[key][1];
                                    summ.give += data.give[key][1];
                                });
                                proto.Data.areaset.GetControl(inputs.dataResult).SetValues(summ);
                            }
                        ]
                    },
					domainAdd: {
						buttons: {
							ok: {
								click: function(){
									SelfObj.ErrorHide();

									proto.Data.areaset.controls[inputs.domain].control.CheckText();
									if(proto.Data.areaset.controls[inputs.domain].control.state.error){
										SelfObj.ErrorShow(language.type.domainAdd.domain.error);
										return;
									};

									proto.Data.areaset.controls[inputs.extSource].control.CheckText();
									if(proto.Data.areaset.controls[inputs.extSource].control.state.error){
										SelfObj.ErrorShow(language.type.domainAdd.extSource.error);
										return;
									};

									SelfObj.Hide({
										effect: true,
										callback: function(){
											wa_api.methods.AddDomain({
												token: wa_manager.methods.GetToken(),
												folderId: opts.domainAdd.folderId,
												domain: proto.Data.areaset.controls[inputs.domain].control.GetValue(),
												extSource: proto.Data.areaset.controls[inputs.extSource].control.GetValue(),
												exception: {
													LimitExceeded: function(){
														SelfObj.Destroy();

														var msgbox = new wa_manager.form.MessageBox({
															title: wa_manager.language.form.messagebox.title.error,
															text: language.type.domainAdd.exception.LimitExceeded.text,
															type: wa_manager.constants.form.messagebox.type.error
														},{});
														msgbox.Show({effect: true});
													}
												},
												callback: function(data){
													SelfObj.Destroy({
														callback: function(){
															opts.domainAdd = $.extend(true, opts.domainAdd, {
																folderId: opts.domainAdd.folderId,
																domain: proto.Data.areaset.controls[inputs.domain].control.GetValue(),
																extSource: proto.Data.areaset.controls[inputs.extSource].control.GetValue(),
																domainId: data[jsonItem.IdDomain]
															});

															opts.domainAdd.success(opts.domainAdd);
														}
													});
												},
												ge_callback: function(){
													SelfObj.Show({effect: true});
												}
											});
										}
									});
								},
								text: button_lang.save,
								show: true
							},
							cancel: {
								click: function(){
									SelfObj.Hide({
										effect: true,
										callback: function(){
											if(opts.onClickButton[button_constant.button.name.ok]) opts.onClickButton[button_constant.button.name.cancel](SelfObj);
											else SelfObj.Destroy();
										}
									});
								},
								text: button_lang.cancel,
								show: true
							}
						},
						controls: [
							{
								name: inputs.domain,
								text: language.type.domainAdd.domain.text,
								control: function(holder){
									return new control.textline({
										holder: holder,
										focus: true,
										tooltip:  language.type.domainAdd.domain.tooltip,
										minLength: limits.Domain.Domain.Length.Min,
										maxLength:  limits.Domain.Domain.Length.Max,
										regexp: regexp.domain.domain,
										checkData: true
									},{visible: true});
								}
							},
							{
								name: inputs.extSource,
								text: language.type.domainAdd.extSource.text,
								control: function(holder){
									return new control.textline({
										holder: holder,
										focus: false,
										tooltip:  language.type.domainAdd.extSource.tooltip,
										minLength: limits.Domain.ExtSource.Length.Min,
										maxLength:  limits.Domain.ExtSource.Length.Max,
										regexp: regexp.domain.extSource,
										checkData: true
									},{visible: true});
								}
							}
						]
					},
					setDomain: {
						buttons: {
							ok: {
								click: function(){
									SelfObj.ErrorHide();

									proto.Data.areaset.controls[inputs.domain].control.CheckText();
									if(proto.Data.areaset.controls[inputs.domain].control.state.error){
										SelfObj.ErrorShow(language.type.setDomain.domain.error);
										return;
									};

									proto.Data.areaset.controls[inputs.extSource].control.CheckText();
									if(proto.Data.areaset.controls[inputs.extSource].control.state.error){
										SelfObj.ErrorShow(language.type.setDomain.extSource.error);
										return;
									};

									SelfObj.Hide({
										effect: true,
										callback: function(){
											wa_api.methods.SetDomain({
												token: wa_manager.methods.GetToken(),
												folderId: opts.setDomain.folderId,
												domainId: opts.setDomain.domainId,
												domain: proto.Data.areaset.controls[inputs.domain].control.GetValue(),
												extSource: proto.Data.areaset.controls[inputs.extSource].control.GetValue(),
												callback: function(data){
													SelfObj.Destroy({
														callback: function(){
															opts.setDomain = $.extend(true, opts.setDomain, {
																folderId: opts.setDomain.folderId,
																domainId: opts.setDomain.domainId,
																domain: proto.Data.areaset.controls[inputs.domain].control.GetValue(),
																extSource: proto.Data.areaset.controls[inputs.extSource].control.GetValue()
															});

															opts.setDomain.success(opts.setDomain);
														}
													});
												},
												ge_callback: function(){
													SelfObj.Show({effect: true});
												}
											});
										}
									});
								},
								text: button_lang.save,
								show: true
							},
							cancel: {
								click: function(){
									SelfObj.Hide({
										effect: true,
										callback: function(){
											if(opts.onClickButton[button_constant.button.name.ok]) opts.onClickButton[button_constant.button.name.cancel](SelfObj);
											else SelfObj.Destroy();
										}
									});
								},
								text: button_lang.cancel,
								show: true
							}
						},
						controls: [
							{
								name: inputs.domain,
								text: language.type.setDomain.domain.text,
								control: function(holder){
									return new control.textline({
										holder: holder,
										focus: true,
										value: opts.setDomain.domain,
										tooltip:  language.type.setDomain.domain.tooltip,
										minLength: limits.Domain.Domain.Length.Min,
										maxLength:  limits.Domain.Domain.Length.Max,
										regexp: regexp.domain.domain,
										checkData: true
									},{visible: true});
								}
							},
							{
								name: inputs.extSource,
								text: language.type.setDomain.extSource.text,
								control: function(holder){
									return new control.textline({
										holder: holder,
										focus: false,
										value: opts.setDomain.extSource,
										tooltip:  language.type.setDomain.extSource.tooltip,
										minLength: limits.Domain.ExtSource.Length.Min,
										maxLength:  limits.Domain.ExtSource.Length.Max,
										regexp: regexp.domain.extSource,
										checkData: true
									},{visible: true});
								}
							}
						]
					},
                    console: {
                        buttons: {
                            ok: {
                                click: function(){
                                    var textarea = proto.Data.areaset.controls[inputs.console].control;

                                    try{
                                        $.evalJSON(textarea.GetValue(true));

                                        wa_api.utils.sendData(textarea.GetValue(true), function(data){
                                            textarea.AddLine("\n\n----------RESPONSE-----------\n" + data, true);
                                        });
                                    }catch(e){
                                        var mb = new wa_manager.form.MessageBox({
                                            title: language.title.error,
                                            text: language.type.console.notValidJSON,
                                            type: wa_manager.constants.form.messagebox.type.error
                                        },{});
                                        mb.Show({
                                            effect: true
                                        });
                                    };
                                },
                                text: button_lang.send,
                                show: true,
                                accessKey: {
                                    used: "second"
                                }
                            },
                            cancel: {
                                click: function(){
                                    SelfObj.Hide({
                                        effect: true,
                                        callback: function(){
                                            if(opts.onClickButton[button_constant.button.name.ok]) opts.onClickButton[button_constant.button.name.cancel](SelfObj);
                                            else SelfObj.Destroy();
                                        }
                                    });
                                },
                                text: button_lang.cancel,
                                show: true
                            },
                            appy: {
                                text: button_lang.clear,
                                click: function(){
                                    proto.Data.areaset.controls[inputs.console].control.SetValue("", true);
                                },
                                show: true
                            }
                        },
                        controls: [
                            {
                                name: inputs.console,
                                text: language.type.console.console,
                                control: function(holder){
                                    return new control.textarea({
                                        holder: holder,
                                        focus: true,
                                        lineNumbers: false
                                    },{visible: true});
                                }
                            }
                        ]
                    },
                    addTask: {
                        buttons: {
                            ok: {
                                click: function(){
                                    SelfObj.ErrorHide();

                                    var tabCont = proto.Data.areaset.GetControl(inputs.tabContainer),
                                        tab_1 = tabCont.GetTab(inputs.tab_1),
                                        tab_2 = tabCont.GetTab(inputs.tab_2),
                                        areaset_1 = tab_1.GetControl(inputs.areaset),
                                        areaset_2 = tab_2.GetControl(inputs.areaset);

                                    //name task
                                    areaset_1.GetControl(inputs.nameTask).CheckText();
                                    if(areaset_1.GetControl(inputs.nameTask).state.error){
                                        tabCont.ActivateTab(inputs.tab_1);
                                        areaset_1.GetControl(inputs.nameTask).SetFocus(true);
                                        SelfObj.ErrorShow(language.type.taskAdd.nameTask.error);
                                        return;
                                    };

                                    //domain
                                    areaset_1.GetControl(inputs.domain).CheckText();
                                    if(areaset_1.GetControl(inputs.domain).state.error){
                                        tabCont.ActivateTab(inputs.tab_1);
                                        areaset_1.GetControl(inputs.domain).SetFocus(true);
                                        SelfObj.ErrorShow(language.type.taskAdd.domain.error);
                                        return;
                                    };

                                    //ext source
                                    areaset_1.GetControl(inputs.extSource).CheckText();
                                    if(areaset_1.GetControl(inputs.extSource).state.error){
                                        tabCont.ActivateTab(inputs.tab_1);
                                        areaset_1.GetControl(inputs.extSource).SetFocus(true);
                                        SelfObj.ErrorShow(language.type.taskAdd.extSource.error);
                                        return;
                                    };

                                    //mask
                                    areaset_2.GetControl(inputs.mask[0]).CheckText();
                                    if(areaset_2.GetControl(inputs.mask[0]).state.error){
                                        tabCont.ActivateTab(inputs.tab_2);
                                        areaset_2.GetControl(inputs.mask[0]).SetFocus(true);
                                        SelfObj.ErrorShow(language.type.taskAdd.mask.error);
                                        return;
                                    };

                                    //time before click
                                    areaset_2.GetControl(inputs.beforeClick).CheckText();
                                    if(areaset_2.GetControl(inputs.beforeClick).state.error || areaset_2.GetControl(inputs.beforeClick).GetValue()%10 != 0){
                                        tabCont.ActivateTab(inputs.tab_2);
                                        areaset_2.GetControl(inputs.beforeClick).SetFocus(true);
                                        areaset_2.GetControl(inputs.beforeClick).SetVisualError(true);
                                        SelfObj.ErrorShow(language.type.taskAdd.beforeClick.error);
                                        return;
                                    };

                                    //time after click
                                    areaset_2.GetControl(inputs.afterClick).CheckText();
                                    if(areaset_2.GetControl(inputs.afterClick).state.error || areaset_2.GetControl(inputs.afterClick).GetValue()%10 != 0){
                                        tabCont.ActivateTab(inputs.tab_2);
                                        areaset_2.GetControl(inputs.afterClick).SetFocus(true);
                                        areaset_2.GetControl(inputs.afterClick).SetVisualError(true);
                                        SelfObj.ErrorShow(language.type.taskAdd.afterClick.error);
                                        return;
                                    };

                                    //range size
                                    areaset_2.GetControl(inputs.rangeSize).CheckText();
                                    if(areaset_2.GetControl(inputs.rangeSize).state.error){
                                        tabCont.ActivateTab(inputs.tab_2);
                                        areaset_2.GetControl(inputs.rangeSize).SetFocus(true);
                                        SelfObj.ErrorShow(language.type.taskAdd.rangeSize.error);
                                        return;
                                    };

                                    //uniq time
                                    areaset_2.GetControl(inputs.uniqTime).CheckText();
                                    if(areaset_2.GetControl(inputs.uniqTime).state.error){
                                        tabCont.ActivateTab(inputs.tab_2);
                                        areaset_2.GetControl(inputs.uniqTime).SetFocus(true);
                                        SelfObj.ErrorShow(language.type.taskAdd.uniqTime.error);
                                        return;
                                    };

                                    SelfObj.Hide({
                                        effect: true,
                                        callback: function(){
                                            wa_api.methods.AddTask({
                                                token: wa_manager.methods.GetToken(),
                                                folderId: opts.addTask.folderId,
                                                mask: areaset_2.GetControl(inputs.mask[0]).GetValue(),
                                                name: areaset_1.GetControl(inputs.nameTask).GetValue(),
                                                ignoreGU: areaset_2.GetControl(inputs.ignoreGU).state.check,
                                                allowProxy: areaset_2.GetControl(inputs.allowProxy).state.check,
                                                uniquePeriod: areaset_2.GetControl(inputs.uniqTime).GetValue(),
                                                rangeSize: areaset_2.GetControl(inputs.rangeSize).GetValue(),
                                                domain: areaset_1.GetControl(inputs.domain).GetValue(),
                                                extSource: areaset_1.GetControl(inputs.extSource).GetValue(),
                                                beforeClick: areaset_2.GetControl(inputs.beforeClick).GetValue(),
                                                afterClick: areaset_2.GetControl(inputs.afterClick).GetValue(),
                                                exception: {
                                                    LimitExceeded: function(){
                                                        SelfObj.Destroy();

                                                        var msgbox = new wa_manager.form.MessageBox({
                                                            title: wa_manager.language.form.messagebox.title.error,
                                                            text: language.type.taskAdd.exception.LimitExceeded.text,
                                                            type: wa_manager.constants.form.messagebox.type.error
                                                        },{});
                                                        msgbox.Show({effect: true});
                                                    }
                                                },
                                                callback: function(data){
                                                    SelfObj.Destroy({
                                                        callback: function(){
                                                            $.extend(true, opts.addTask, {
                                                                folderId: opts.addTask.folderId,
                                                                mask: areaset_2.GetControl(inputs.mask[0]).GetValue(),
                                                                name: areaset_1.GetControl(inputs.nameTask).GetValue(),
                                                                ignoreGU: areaset_2.GetControl(inputs.ignoreGU).state.check,
                                                                allowProxy: areaset_2.GetControl(inputs.allowProxy).state.check,
                                                                uniquePeriod: areaset_2.GetControl(inputs.uniqTime).GetValue(),
                                                                rangeSize: areaset_2.GetControl(inputs.rangeSize).GetValue(),
                                                                domain: areaset_1.GetControl(inputs.domain).GetValue(),
                                                                extSource: areaset_1.GetControl(inputs.extSource).GetValue(),
                                                                beforeClick: areaset_2.GetControl(inputs.beforeClick).GetValue(),
                                                                afterClick: areaset_2.GetControl(inputs.afterClick).GetValue(),
                                                                taskId: data[jsonItem.IdTask]
                                                            });

                                                            opts.addTask.success(opts.addTask);
                                                        }
                                                    });
                                                },
                                                ge_callback: function(){
                                                    SelfObj.Show({effect: true});
                                                }
                                            });
                                        }
                                    });
                                },
                                text: button_lang.save,
                                show: true
                            },
                            cancel: {
                                click: function(){
                                    SelfObj.Hide({
                                        effect: true,
                                        callback: function(){
                                            if(opts.onClickButton[button_constant.button.name.ok]) opts.onClickButton[button_constant.button.name.cancel](SelfObj);
                                            else SelfObj.Destroy();
                                        }
                                    });
                                },
                                text: button_lang.cancel,
                                show: true
                            }
                        },
                        controls: [
                            {
                                name: inputs.tabContainer,
                                control: function(holder){
                                    var tabContainer = new wa_manager.control.tabContainer({
                                        holder: holder,
                                        items: [
                                            {
                                                name: inputs.tab_1,
                                                text: language.type.taskAdd.tab_1,
                                                active: true,
                                                show: true,
                                                controls: [
                                                    {
                                                        name: inputs.areaset,
                                                        control: function(holder){
                                                            var areaset = new wa_manager.control.areaset({
                                                                holder: holder
                                                            },{visible: true});

                                                            //task name
                                                            areaset.AddControl({
                                                                name: inputs.nameTask,
                                                                text: language.type.taskAdd.nameTask.text,
                                                                control: function(holder){
                                                                    return new wa_manager.control.textline({
                                                                        holder: holder,
                                                                        focus: true,
                                                                        tooltip:  language.type.taskAdd.nameTask.tooltip,
                                                                        minLength: limits.Task.Name.Length.Min,
                                                                        maxLength:  limits.Task.Name.Length.Max,
                                                                        regexp: regexp.task.name,
                                                                        checkData: true
                                                                    },{visible: true});
                                                                }
                                                            });

                                                            //domain
                                                            areaset.AddControl({
                                                                name: inputs.domain,
                                                                text: language.type.taskAdd.domain.text,
                                                                control: function(holder){
                                                                    return new wa_manager.control.textline({
                                                                        holder: holder,
                                                                        tooltip:  language.type.taskAdd.domain.tooltip,
                                                                        minLength: limits.Task.Domain.Length.Min,
                                                                        maxLength:  limits.Task.Domain.Length.Max,
                                                                        regexp: regexp.task.domain,
                                                                        checkData: true
                                                                    },{visible: true});
                                                                }
                                                            });

                                                            //domain
                                                            areaset.AddControl({
                                                                name: inputs.extSource,
                                                                text: language.type.taskAdd.extSource.text,
                                                                control: function(holder){
                                                                    return new wa_manager.control.textline({
                                                                        holder: holder,
                                                                        tooltip:  language.type.taskAdd.extSource.tooltip,
                                                                        minLength: limits.Task.ExtSource.Length.Min,
                                                                        maxLength:  limits.Task.ExtSource.Length.Max,
                                                                        regexp: regexp.task.extSource,
                                                                        checkData: true
                                                                    },{visible: true});
                                                                }
                                                            });

                                                            return areaset;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                name: inputs.tab_2,
                                                text: language.type.taskAdd.tab_2,
                                                show: true,
                                                controls: [
                                                    {
                                                        name: inputs.areaset,
                                                        control: function(holder){
                                                            var areaset = new wa_manager.control.areaset({
                                                                holder: holder
                                                            },{visible: true});

                                                            //mask
                                                            areaset.AddControl({
                                                                name: inputs.mask[0],
                                                                text: language.type.taskAdd.mask.text,
                                                                control: function(holder){
                                                                    return new wa_manager.control.textline({
                                                                        holder: holder,
                                                                        tooltip:  language.type.taskAdd.mask.tooltip,
                                                                        minLength: limits.Task.Mask.Length.Min,
                                                                        maxLength:  limits.Task.Mask.Length.Max,
                                                                        regexp: regexp.task.mask,
                                                                        checkData: true
                                                                    },{visible: true});
                                                                }
                                                            });

                                                            //ignore GU
                                                            areaset.AddControl({
                                                                name: inputs.ignoreGU,
                                                                text: "",
                                                                control: function(holder){
                                                                    var filter = cwe('div','class,filter',holder);

                                                                    var cb = new wa_manager.control.checkbox({
                                                                        holder: filter,
                                                                        tooltip: language.type.taskAdd.ignoreGU.tooltip
                                                                    },{visible: true});

                                                                    $(cwe("span","",filter)).html(language.type.taskAdd.ignoreGU.text);

                                                                    return cb;
                                                                }
                                                            });

                                                            //allow proxy
                                                            areaset.AddControl({
                                                                name: inputs.allowProxy,
                                                                text: "",
                                                                control: function(holder){
                                                                    var filter = cwe('div','class,filter',holder);

                                                                    var cb = new wa_manager.control.checkbox({
                                                                        holder: filter,
                                                                        tooltip: language.type.taskAdd.allowProxy.tooltip
                                                                    },{visible: true});

                                                                    $(cwe("span","",filter)).html(language.type.taskAdd.allowProxy.text);

                                                                    return cb;
                                                                }
                                                            });

                                                            //time before & after click
                                                            areaset.AddControl([
                                                                {
                                                                    name: inputs.beforeClick,
                                                                    text: language.type.taskAdd.timeBeforeAfterClick,
                                                                    control: function(holder){
                                                                        return new control.numericUpDown({
                                                                            holder: holder,
                                                                            value: limits.Task.BeforeClick.Value.Default,
                                                                            tooltip:  language.type.taskAdd.beforeClick.tooltip,
                                                                            min: limits.Task.BeforeClick.Value.Min,
                                                                            max: limits.Task.BeforeClick.Value.Max,
                                                                            minLength: 1,
                                                                            step: 10,
                                                                            checkData: true
                                                                        },{visible: true});
                                                                    }
                                                                },
                                                                {
                                                                    name: inputs.afterClick,
                                                                    text: language.type.taskAdd.timeBeforeAfterClick,
                                                                    control: function(holder){
                                                                        return new control.numericUpDown({
                                                                            holder: holder,
                                                                            value: limits.Task.AfterClick.Value.Default,
                                                                            tooltip:  language.type.taskAdd.afterClick.tooltip,
                                                                            min: limits.Task.AfterClick.Value.Min,
                                                                            max: limits.Task.AfterClick.Value.Max,
                                                                            minLength: 1,
                                                                            step: 10,
                                                                            checkData: true
                                                                        },{visible: true});
                                                                    }
                                                                }
                                                            ]);

                                                            //range size & uniq time
                                                            areaset.AddControl([
                                                                {
                                                                    name: inputs.rangeSize,
                                                                    text: language.type.taskAdd.rangeSizeUniqTime,
                                                                    control: function(holder){
                                                                        return new control.numericUpDown({
                                                                            holder: holder,
                                                                            value: limits.Task.RangeSize.Value.Default,
                                                                            tooltip:  language.type.taskAdd.rangeSize.tooltip,
                                                                            min: limits.Task.RangeSize.Value.Min,
                                                                            max: limits.Task.RangeSize.Value.Max,
                                                                            minLength: 1,
                                                                            checkData: true
                                                                        },{visible: true});
                                                                    }
                                                                },
                                                                {
                                                                    name: inputs.uniqTime,
                                                                    text: language.type.taskAdd.rangeSizeUniqTime,
                                                                    control: function(holder){
                                                                        return new control.numericUpDown({
                                                                            holder: holder,
                                                                            value: limits.Task.UniqPeriod.Value.Default,
                                                                            tooltip:  language.type.taskAdd.uniqTime.tooltip,
                                                                            min: limits.Task.UniqPeriod.Value.Min,
                                                                            max: limits.Task.UniqPeriod.Value.Max,
                                                                            minLength: 1,
                                                                            checkData: true
                                                                        },{visible: true});
                                                                    }
                                                                }
                                                            ]);

                                                            return areaset;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },{visible: true});

                                    return tabContainer;
                                }
                            }
                        ]
                    },
                    editTask: {
                        buttons: {
                            ok: {
                                click: function(){
                                    SelfObj.ErrorHide();

                                    var tabCont = proto.Data.areaset.GetControl(inputs.tabContainer),
                                        tab_1 = tabCont.GetTab(inputs.tab_1),
                                        tab_2 = tabCont.GetTab(inputs.tab_2),
                                        areaset_1 = tab_1.GetControl(inputs.areaset),
                                        areaset_2 = tab_2.GetControl(inputs.areaset);

                                    //name task
                                    areaset_1.GetControl(inputs.nameTask).CheckText();
                                    if(areaset_1.GetControl(inputs.nameTask).state.error){
                                        tabCont.ActivateTab(inputs.tab_1);
                                        areaset_1.GetControl(inputs.nameTask).SetFocus(true);
                                        SelfObj.ErrorShow(language.type.editTask.nameTask.error);
                                        return;
                                    };

                                    //domain
                                    areaset_1.GetControl(inputs.domain).CheckText();
                                    if(areaset_1.GetControl(inputs.domain).state.error){
                                        tabCont.ActivateTab(inputs.tab_1);
                                        areaset_1.GetControl(inputs.domain).SetFocus(true);
                                        SelfObj.ErrorShow(language.type.editTask.domain.error);
                                        return;
                                    };

                                    //ext source
                                    areaset_1.GetControl(inputs.extSource).CheckText();
                                    if(areaset_1.GetControl(inputs.extSource).state.error){
                                        tabCont.ActivateTab(inputs.tab_1);
                                        areaset_1.GetControl(inputs.extSource).SetFocus(true);
                                        SelfObj.ErrorShow(language.type.editTask.extSource.error);
                                        return;
                                    };

                                    //mask
                                    areaset_2.GetControl(inputs.mask[0]).CheckText();
                                    if(areaset_2.GetControl(inputs.mask[0]).state.error){
                                        tabCont.ActivateTab(inputs.tab_2);
                                        areaset_2.GetControl(inputs.mask[0]).SetFocus(true);
                                        SelfObj.ErrorShow(language.type.editTask.mask.error);
                                        return;
                                    };

                                    //time before click
                                    areaset_2.GetControl(inputs.beforeClick).CheckText();
                                    if(areaset_2.GetControl(inputs.beforeClick).state.error || areaset_2.GetControl(inputs.beforeClick).GetValue()%10 != 0){
                                        tabCont.ActivateTab(inputs.tab_2);
                                        areaset_2.GetControl(inputs.beforeClick).SetFocus(true);
                                        areaset_2.GetControl(inputs.beforeClick).SetVisualError(true);
                                        SelfObj.ErrorShow(language.type.editTask.beforeClick.error);
                                        return;
                                    };

                                    //time after click
                                    areaset_2.GetControl(inputs.afterClick).CheckText();
                                    if(areaset_2.GetControl(inputs.afterClick).state.error || areaset_2.GetControl(inputs.afterClick).GetValue()%10 != 0){
                                        tabCont.ActivateTab(inputs.tab_2);
                                        areaset_2.GetControl(inputs.afterClick).SetFocus(true);
                                        areaset_2.GetControl(inputs.afterClick).SetVisualError(true);
                                        SelfObj.ErrorShow(language.type.editTask.afterClick.error);
                                        return;
                                    };

                                    //range size
                                    areaset_2.GetControl(inputs.rangeSize).CheckText();
                                    if(areaset_2.GetControl(inputs.rangeSize).state.error){
                                        tabCont.ActivateTab(inputs.tab_2);
                                        areaset_2.GetControl(inputs.rangeSize).SetFocus(true);
                                        SelfObj.ErrorShow(language.type.editTask.rangeSize.error);
                                        return;
                                    };

                                    //uniq time
                                    areaset_2.GetControl(inputs.uniqTime).CheckText();
                                    if(areaset_2.GetControl(inputs.uniqTime).state.error){
                                        tabCont.ActivateTab(inputs.tab_2);
                                        areaset_2.GetControl(inputs.uniqTime).SetFocus(true);
                                        SelfObj.ErrorShow(language.type.editTask.uniqTime.error);
                                        return;
                                    };

                                    SelfObj.Hide({
                                        effect: true,
                                        callback: function(){
                                            wa_api.methods.SetTask({
                                                token: wa_manager.methods.GetToken(),
                                                folderId: opts.editTask.folderId,
                                                taskId: opts.editTask.taskId,
                                                mask: areaset_2.GetControl(inputs.mask[0]).GetValue(),
                                                name: areaset_1.GetControl(inputs.nameTask).GetValue(),
                                                ignoreGU: areaset_2.GetControl(inputs.ignoreGU).state.check,
                                                allowProxy: areaset_2.GetControl(inputs.allowProxy).state.check,
                                                uniquePeriod: areaset_2.GetControl(inputs.uniqTime).GetValue(),
                                                rangeSize: areaset_2.GetControl(inputs.rangeSize).GetValue(),
                                                domain: areaset_1.GetControl(inputs.domain).GetValue(),
                                                extSource: areaset_1.GetControl(inputs.extSource).GetValue(),
                                                beforeClick: areaset_2.GetControl(inputs.beforeClick).GetValue(),
                                                afterClick: areaset_2.GetControl(inputs.afterClick).GetValue(),
                                                callback: function(data){
                                                    SelfObj.Destroy({
                                                        callback: function(){
                                                            $.extend(true, opts.editTask, {
                                                                folderId: opts.editTask.folderId,
                                                                taskId: opts.editTask.taskId,
                                                                mask: areaset_2.GetControl(inputs.mask[0]).GetValue(),
                                                                name: areaset_1.GetControl(inputs.nameTask).GetValue(),
                                                                ignoreGU: areaset_2.GetControl(inputs.ignoreGU).state.check,
                                                                allowProxy: areaset_2.GetControl(inputs.allowProxy).state.check,
                                                                uniquePeriod: areaset_2.GetControl(inputs.uniqTime).GetValue(),
                                                                rangeSize: areaset_2.GetControl(inputs.rangeSize).GetValue(),
                                                                domain: areaset_1.GetControl(inputs.domain).GetValue(),
                                                                extSource: areaset_1.GetControl(inputs.extSource).GetValue(),
                                                                beforeClick: areaset_2.GetControl(inputs.beforeClick).GetValue(),
                                                                afterClick: areaset_2.GetControl(inputs.afterClick).GetValue()
                                                            });

                                                            opts.editTask.success(opts.editTask);
                                                        }
                                                    });
                                                },
                                                ge_callback: function(){
                                                    SelfObj.Show({effect: true});
                                                }
                                            });
                                        }
                                    });
                                },
                                text: button_lang.save,
                                show: true
                            },
                            cancel: {
                                click: function(){
                                    SelfObj.Hide({
                                        effect: true,
                                        callback: function(){
                                            if(opts.onClickButton[button_constant.button.name.ok]) opts.onClickButton[button_constant.button.name.cancel](SelfObj);
                                            else SelfObj.Destroy();
                                        }
                                    });
                                },
                                text: button_lang.cancel,
                                show: true
                            }
                        },
                        controls: [
                            {
                                name: inputs.tabContainer,
                                control: function(holder){
                                    var tabContainer = new wa_manager.control.tabContainer({
                                        holder: holder,
                                        items: [
                                            {
                                                name: inputs.tab_1,
                                                text: language.type.editTask.tab_1,
                                                active: true,
                                                show: true,
                                                controls: [
                                                    {
                                                        name: inputs.areaset,
                                                        control: function(holder){
                                                            var areaset = new wa_manager.control.areaset({
                                                                holder: holder
                                                            },{visible: true});

                                                            //task name
                                                            areaset.AddControl({
                                                                name: inputs.nameTask,
                                                                text: language.type.editTask.nameTask.text,
                                                                control: function(holder){
                                                                    return new wa_manager.control.textline({
                                                                        holder: holder,
                                                                        focus: true,
                                                                        tooltip:  language.type.editTask.nameTask.tooltip,
                                                                        minLength: limits.Task.Name.Length.Min,
                                                                        maxLength:  limits.Task.Name.Length.Max,
                                                                        regexp: regexp.task.name,
                                                                        checkData: true,
                                                                        value: opts.editTask.name
                                                                    },{visible: true});
                                                                }
                                                            });

                                                            //domain
                                                            areaset.AddControl({
                                                                name: inputs.domain,
                                                                text: language.type.editTask.domain.text,
                                                                control: function(holder){
                                                                    return new wa_manager.control.textline({
                                                                        holder: holder,
                                                                        tooltip:  language.type.editTask.domain.tooltip,
                                                                        minLength: limits.Task.Domain.Length.Min,
                                                                        maxLength:  limits.Task.Domain.Length.Max,
                                                                        regexp: regexp.task.domain,
                                                                        checkData: true,
                                                                        value: opts.editTask.domain
                                                                    },{visible: true});
                                                                }
                                                            });

                                                            //ext source
                                                            areaset.AddControl({
                                                                name: inputs.extSource,
                                                                text: language.type.editTask.extSource.text,
                                                                control: function(holder){
                                                                    return new wa_manager.control.textline({
                                                                        holder: holder,
                                                                        tooltip:  language.type.editTask.extSource.tooltip,
                                                                        minLength: limits.Task.ExtSource.Length.Min,
                                                                        maxLength:  limits.Task.ExtSource.Length.Max,
                                                                        regexp: regexp.task.extSource,
                                                                        checkData: true,
                                                                        value: opts.editTask.extSource
                                                                    },{visible: true});
                                                                }
                                                            });

                                                            return areaset;
                                                        }
                                                    }
                                                ]
                                            },
                                            {
                                                name: inputs.tab_2,
                                                text: language.type.editTask.tab_2,
                                                show: true,
                                                controls: [
                                                    {
                                                        name: inputs.areaset,
                                                        control: function(holder){
                                                            var areaset = new wa_manager.control.areaset({
                                                                holder: holder
                                                            },{visible: true});

                                                            //mask
                                                            areaset.AddControl({
                                                                name: inputs.mask[0],
                                                                text: language.type.editTask.mask.text,
                                                                control: function(holder){
                                                                    return new wa_manager.control.textline({
                                                                        holder: holder,
                                                                        tooltip:  language.type.editTask.mask.tooltip,
                                                                        minLength: limits.Task.Mask.Length.Min,
                                                                        maxLength:  limits.Task.Mask.Length.Max,
                                                                        regexp: regexp.task.mask,
                                                                        checkData: true,
                                                                        value: opts.editTask.mask
                                                                    },{visible: true});
                                                                }
                                                            });

                                                            //ignore GU
                                                            areaset.AddControl({
                                                                name: inputs.ignoreGU,
                                                                text: "",
                                                                control: function(holder){
                                                                    var filter = cwe('div','class,filter',holder);

                                                                    var cb = new wa_manager.control.checkbox({
                                                                        holder: filter,
                                                                        tooltip: language.type.editTask.ignoreGU.tooltip,
                                                                        state: (opts.editTask.ignoreGU) ? wa_manager.constants.control.checkbox.state.check : wa_manager.constants.control.checkbox.state.uncheck
                                                                    },{visible: true});

                                                                    $(cwe("span","",filter)).html(language.type.editTask.ignoreGU.text);

                                                                    return cb;
                                                                }
                                                            });

                                                            //allow proxy
                                                            areaset.AddControl({
                                                                name: inputs.allowProxy,
                                                                text: "",
                                                                control: function(holder){
                                                                    var filter = cwe('div','class,filter',holder);

                                                                    var cb = new wa_manager.control.checkbox({
                                                                        holder: filter,
                                                                        tooltip: language.type.editTask.allowProxy.tooltip,
                                                                        state: (opts.editTask.allowProxy) ? wa_manager.constants.control.checkbox.state.check : wa_manager.constants.control.checkbox.state.uncheck
                                                                    },{visible: true});

                                                                    $(cwe("span","",filter)).html(language.type.editTask.allowProxy.text);

                                                                    return cb;
                                                                }
                                                            });

                                                            //time before & after click
                                                            areaset.AddControl([
                                                                {
                                                                    name: inputs.beforeClick,
                                                                    text: language.type.editTask.timeBeforeAfterClick,
                                                                    control: function(holder){
                                                                        return new control.numericUpDown({
                                                                            holder: holder,
                                                                            value: opts.editTask.beforeClick,
                                                                            tooltip:  language.type.editTask.beforeClick.tooltip,
                                                                            min: limits.Task.BeforeClick.Value.Min,
                                                                            max: limits.Task.BeforeClick.Value.Max,
                                                                            minLength: 1,
                                                                            step: 10,
                                                                            checkData: true
                                                                        },{visible: true});
                                                                    }
                                                                },
                                                                {
                                                                    name: inputs.afterClick,
                                                                    text: language.type.editTask.timeBeforeAfterClick,
                                                                    control: function(holder){
                                                                        return new control.numericUpDown({
                                                                            holder: holder,
                                                                            value: opts.editTask.afterClick,
                                                                            tooltip:  language.type.editTask.afterClick.tooltip,
                                                                            min: limits.Task.AfterClick.Value.Min,
                                                                            max: limits.Task.AfterClick.Value.Max,
                                                                            minLength: 1,
                                                                            step: 10,
                                                                            checkData: true
                                                                        },{visible: true});
                                                                    }
                                                                }
                                                            ]);

                                                            //range size & uniq time
                                                            areaset.AddControl([
                                                                {
                                                                    name: inputs.rangeSize,
                                                                    text: language.type.editTask.rangeSizeUniqTime,
                                                                    control: function(holder){
                                                                        return new control.numericUpDown({
                                                                            holder: holder,
                                                                            value: opts.editTask.rangeSize,
                                                                            tooltip:  language.type.editTask.rangeSize.tooltip,
                                                                            min: limits.Task.RangeSize.Value.Min,
                                                                            max: limits.Task.RangeSize.Value.Max,
                                                                            minLength: 1,
                                                                            checkData: true
                                                                        },{visible: true});
                                                                    }
                                                                },
                                                                {
                                                                    name: inputs.uniqTime,
                                                                    text: language.type.editTask.rangeSizeUniqTime,
                                                                    control: function(holder){
                                                                        return new control.numericUpDown({
                                                                            holder: holder,
                                                                            value: opts.editTask.uniquePeriod,
                                                                            tooltip:  language.type.editTask.uniqTime.tooltip,
                                                                            min: limits.Task.UniqPeriod.Value.Min,
                                                                            max: limits.Task.UniqPeriod.Value.Max,
                                                                            minLength: 1,
                                                                            checkData: true
                                                                        },{visible: true});
                                                                    }
                                                                }
                                                            ]);

                                                            return areaset;
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },{visible: true});

                                    return tabContainer;
                                }
                            }
                        ]
                    }
				},
				onClickButton: {},
				maskEdit: {
					title: language.type.maskEdit.title,
					text: language.type.maskEdit.text,
					maskId: null,
					mask: null,
					maskName: null,
					ignoreGU: null,
					allowProxy: null,
					uniquePeriod: limits.Mask.UniqPeriod.Value.Default,
					rangeSize: limits.Mask.RangeSize.Value.Default,
					maskDelimiter: '->',
					success: function(param){}
				},
                maskAdd: {
                    title: language.type.maskAdd.title,
                    text: language.type.maskAdd.text,
                    maskId: null,
                    mask: null,
                    maskName: null,
                    ignoreGU: null,
                    allowProxy: null,
                    uniquePeriod: limits.Mask.UniqPeriod.Value.Default,
                    rangeSize: limits.Mask.RangeSize.Value.Default,
                    maskDelimiter: '->',
                    success: function(param){}
                },
				folderRename: {
					title: language.type.folderRename.title,
					text: language.type.folderRename.text,
					folderId: null,
					folderName: null,
					success: function(param){}
				},
				folderAdd: {
					title: language.type.folderAdd.title,
					text: language.type.folderAdd.text,
					folderId: null,
					folderName: null,
					success: function(param){}
				},
				setGeotargeting: {
					title: language.type.setGeoTargeting.title,
					text: language.type.setGeoTargeting.text,
					folderId: null,
                    taskId: 0,
                    data: {},
					success: function(param){}
				},
				setViewtargeting: {
					title: language.type.setViewTargeting.title,
					text: language.type.setViewTargeting.text,
					folderId: 0,
					domainId: 0,
					data: {},
					success: function(param){}
				},
                setTimetargeting: {
                    title: language.type.setTimeTargeting.title,
                    text: language.type.setTimeTargeting.text,
                    folderId: 0,
                    taskId: 0,
                    data: {},
                    success: function(param){}
                },
				setClicktargeting: {
					title: language.type.setClickTargeting.title,
					text: language.type.setClickTargeting.text,
					folderId: 0,
					domainId: 0,
					data: {
						curMaskId: 0
					},
					success: function(param){}
				},
				domainAdd: {
					title: language.type.domainAdd.title,
					text: language.type.domainAdd.text,
					folderId: null,
					success: function(data){}
				},
				setDomain: {
					title: language.type.setDomain.title,
					text: language.type.setDomain.text,
					folderId: 0,
					domainId: 0,
					domain: null,
					extSource: null,
					success: function(data){}
				},
                console: {
                    title: language.type.console.title,
                    text: language.type.console.text
                },
                addTask: {
                    title: language.type.taskAdd.title,
                    text: language.type.taskAdd.text,
                    folderId: 0,
                    taskId: 0,
                    allowProxy: false,
                    ignoreGU: false,
                    rangeSize: wa_api.Constants.Limit.Mask.RangeSize.Value.Default,
                    mask: "",
                    uniquePeriod:  wa_api.Constants.Limit.Mask.UniqPeriod.Value.Default,
                    name: "",
                    domain: "",
                    extSource: "",
                    beforeClick: 0,
                    afterClick: 0,
                    success: function(data){}
                },
                editTask: {
                    title: language.type.editTask.title,
                    text: language.type.editTask.text,
                    folderId: 0,
                    taskId: 0,
                    allowProxy: false,
                    ignoreGU: false,
                    rangeSize: wa_api.Constants.Limit.Mask.RangeSize.Value.Default,
                    mask: "",
                    uniquePeriod:  wa_api.Constants.Limit.Mask.UniqPeriod.Value.Default,
                    name: "",
                    domain: "",
                    extSource: "",
                    beforeClick: 0,
                    afterClick: 0,
                    success: function(data){}
                }
			};

			$.each(default_options.setControl, function(key, value){
				default_options.setControl[key] = $.extend(true, {
					buttons: {},
					controls: [],
					functions: {},
					filters: {},
					events: []
				}, value);
			});
			opt = $.extend(true, default_options, opt);
			if(!opt[opt.type]) opt[opt.type] = {};

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','id,popup_wrap',opts.holder);
					var popup_all = cwe('div','id,popup_all',parent);
						var popup_box = cwe('div','id,popup_box',popup_all);
							var popup = cwe('div','id,popup',popup_box);

				//set zIndex
				$(parent).css({zIndex: getNeedZindex(getMsgBoxes())});

				//add class to other type msgbox
				$(popup).addClass(constant['class'][opts.type]);

                //set events to toogle state buttons
                $(window).keydown(function(e){
                    var state = isActiveMsgBox($(parent).css('zIndex'), getMsgBoxes());
                    buttons.SetActive(state);
                    close_box.SetActive(state);
                });

				//title
				var title = proto.Data.title = cwe('div','class,p_title',popup);
					$(title).html(((opts[opts.type].title) ? opts[opts.type].title : opts.title));
				//close box
				var close_box = new control.boxClose({
					holder: title,
					onClick: function(e){
						SelfObj.Hide({
							effect: true,
							callback: function(){
								if(opts.onClickButton.cancel) opts.onClickButton.cancel();
								else if(opts.onClickButton.ok && (opts.type == constant.type.error || opts.type == constant.type.info)) opts.onClickButton.ok();
								else SelfObj.Destroy();
							}
						});
					}
				},{visible: true});
				//content to drag the window
				var content_off = $(cwe('div','id,all_off',popup)).hide();
				//content to display
				var content_on = cwe('div','class,all',popup);
				//content
					var content = proto.Data.content = cwe('div','class,content',content_on);
				//text info
					var textInfo_text = ((opts[opts.type].text) ? opts[opts.type].text : opts.text);
						var textInfo = proto.Data.textInfo = new control.textinfo({
							holder: content,
							text: textInfo_text
						},{visible: true});
						if(!textInfo_text) textInfo.Hide();
				//area set
				var areaset = proto.Data.areaset = new control.areaset({holder: content},{visible: true});

				//sets controls to areaset
				$.each(opts.setControl[opts.type].controls, function(key, value){
					areaset.AddControl(value);
				});

				//sets filter control
				proto.Data.filter = {};
				$.each(opts.setControl[opts.type].filters, function(key, control){
					control = $.extend(true, {
						name: null,
						text: null,
						control: function(holder){}
					}, control);

					if(control.name == null) return;
					if(proto.Data.filter[control.name] != null) return;

					var holder = cwe('div','class,filter',content);

					proto.Data.filter[control.name] = {
						control: control.control(holder),
						text: $(cwe('span','',holder)).html(control.text)
					};
				});

				//sets events
				$.each(opts.setControl[opts.type].events, function(key, event){
					event();
				});

				//text error
				var textError = proto.Data.textError = new control.texterror({holder: content_on},{});

				//footer
				var footer = cwe('div','class,footer',content_on);

				//set buttons to footer
				var buttons = SelfObj.buttonBox = new control.buttonBox({
					holder: footer,
					buttons: opts.setControl[opts.type].buttons
				},{visible: true});

				//EVENTS
				$(popup).draggable({
					handle: title,
					opacity: 0.5,
					containment: "document",
					start: function(event, ui) {
						$(content_off).css({
							width: $(content_on).outerWidth(),
							height: $(content_on).outerHeight()
						}).show();
						$(content_on).hide();
					},
					stop: function(event, ui) {
						$(content_off).hide();
						$(content_on).show();
					}
				});
				//EVENTS
			};

			function getMsgBoxes(){
				var parent = proto.HtmlNodes.Main[0];

				return $(parent.nodeName+"[id='"+$(parent).attr('id')+"']");
			};
			function getNeedZindex(msgboxes){
				var zIndex_default = 100;

				if(msgboxes.length <= 1) return zIndex_default;
				else{
					return zIndex_default + (msgboxes.length - 1);
				};
			};
			function isActiveMsgBox(cur_zIndex, msgboxes){
				var output = true;

				$.each(msgboxes, function(key, value){
					if(cur_zIndex < $(value).css("zIndex")) output = false;
				});

				return output;
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;
			this.buttonBox = null;

			//METHODS
			this.ErrorShow = function(text){
				$(proto.Data.textError.htmlElement).css({width: $(proto.Data.content).outerWidth()});
				proto.Data.textError.SetText(text);
				proto.Data.textError.Show({callback: function(){
					$(proto.Data.textError.htmlElement).hide();
					$(proto.Data.textError.htmlElement).slideDown();
				}});
			};
			this.ErrorHide = function(){
				proto.Data.textError.Hide({force: true});
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		Auth: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.form.auth,
				button_constant = wa_manager.constants.control.buttonBox,
				button_lang = wa_manager.language.control.buttonBox,
				control = wa_manager.control,
				language = wa_manager.language.form.auth,
				limits = wa_api.Constants.Limit.Account,
				regexp = wa_api.utils.verify.regexp;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body
			});

			proto.Constructor = function(){
                var form = cwe("form","target,iframe-auth;method,post",opts.holder);
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','id,account_control',form);
					var title = cwe('div','id,control_title',parent);
						var title_actual = cwe('span','class,actual',title);
						$(title_actual).html(language.title.auth);
						var title_run = cwe('span','class,run',title);
						$(title_run).html(language.title.reg);
						cwe('b','id,clear',title);

				//configs to other inputs name
				var inputs = {
					mail: "mail",
					password: "password"
				};

				//var form = cwe('form','method,post',parent);
				var control_content = cwe('div','id,control_content',parent);

				//areaset
				var areaset = SelfObj.areaset = new control.areaset({holder: control_content},{visible: true});

				//add to areaset email control
				areaset.AddControl({
					name: inputs.mail,
					text: language.mail.text,
					control: function(holder){
						return new control.textline({
							holder: holder,
							tooltip: language.mail.tooltip,
							focus: true,
							minLength: limits.Mail.Length.Min,
							maxLength: limits.Mail.Length.Max,
							regexp: regexp.mail,
							checkData: true,
							tags: {
								name: 'wa_email',
								id: 'wa_email',
								autocomplete: 'on'
							}
						},{visible: true});
					}
				});

				//add to areaset password control
				areaset.AddControl({
					name: inputs.password,
					text: language.password.text,
					control: function(holder){
						return new control.textline({
							holder: holder,
							type: wa_manager.constants.control.textline.type.password,
							tooltip: language.password.tooltip,
							focus: false,
							minLength: limits.Password.Length.Min,
							maxLength: limits.Password.Length.Max,
							regexp: regexp.password,
							checkData: true,
							tags: {
								name: 'wa_password',
								id: 'wa_password',
								autocomplete: 'on'
							}
						},{visible: true});
					}
				});

				var control_options = cwe('div','id,control_options', parent);
					//forgot
					var forgot = cwe('span','',cwe('div','class,forgot',control_options));
					$(forgot).html(language.forgot.text);

				var option = cwe('div','class,option',control_options);
				cwe('div','id,clear', control_options);
					var remember_container = cwe('span','class,nobr',option);
					$(remember_container).html(language.rememberMe.text);

				//remember me checkbox
				var rememberMe = new control.checkbox({
					holder: remember_container,
					tooltip: language.rememberMe.tooltip,
					state: wa_manager.constants.control.checkbox.state.uncheck
				},{visible: true});

				//toogle button state
				$(window).keydown(function(e){
					SelfObj.buttonBox.SetActive(wa_manager.utils.notMsgBoxes(wa_manager.utils.getMsgBoxes()));
				});

				//add button
				var btn_opt = {
					holder: option,
					buttons: {}
				};
				btn_opt.buttons[wa_manager.constants.control.buttonBox.button.name.ok] = {
					text: language.enter.text,
					tooltip: language.enter.tooltip,
					click: function(){
						//SelfObj.CheckTextLineAll();

						var language = wa_manager.language,
							constant = wa_manager.constants;

						if(areaset.GetControl(inputs.mail).state.error){
							var msgbox = new wa_manager.form.MessageBox({
								title: language.form.messagebox.title.error,
								text: language.form.auth.mail.error,
								type: constant.form.messagebox.type.error
							},{});
							msgbox.Show({
								effect: true,
								callback: function(){
									areaset.GetControl(inputs.mail).SetFocus(true);
									areaset.GetControl(inputs.mail).SetError(true);
								}
							});
							return;
						};

						if(areaset.GetControl(inputs.password).state.error){
							var msgbox = new wa_manager.form.MessageBox({
								title: language.form.messagebox.title.error,
								text: language.form.auth.password.error,
								type: constant.form.messagebox.type.error
							},{});
							msgbox.Show({
								effect: true,
								callback: function(){
									areaset.GetControl(inputs.password).SetFocus(true);
									areaset.GetControl(inputs.password).SetError(true);
								}
							});
							return;
						};

						areaset.GetControl(inputs.mail).SetError(false);
						areaset.GetControl(inputs.password).SetError(false);

						var remember = rememberMe.state.check;
						if(!wa_manager.data.control.loader.state.work) wa_api.methods.Auth({
							mail: areaset.GetControl(inputs.mail).GetValue(),
							password: areaset.GetControl(inputs.password).GetValue(),
							remember: remember,
							callback: function(data){
								//save login and password on fake form
								/*if($("iframe[name=iframe-auth]").length == 0) $(cwe('iframe','name,iframe-auth',document.body)).hide();
								var fake_form = document.forms['form-spec-auth'];
								fake_form['wa_email'].value = areaset.GetControl(inputs.mail).GetValue();
								fake_form['wa_password'].value = areaset.GetControl(inputs.password).GetValue();
								$(fake_form["submit"]).click();
								$("iframe[name=iframe-auth]").load(function(){
									$("iframe[name=iframe-auth]").load(function(){
										$("iframe[name=iframe-auth]").remove();
									});
								});*/

								wa_manager.data.user.token = data[wa_api.Constants.OperationItem.Token];
								if(remember) wa_manager.utils.storage.Set(wa_manager.constants.cookie.token, wa_manager.data.user.token);
								wa_manager.data.form.main.SetActiveForm({
									form: function(){
										return new wa_manager.form.Account({holder: wa_manager.data.form.main.GetContentHolder()},{visible: false});
									}
								});
							},
							exception: {
								NotMatch: function(data){
									var mb = new wa_manager.form.MessageBox({
										title: language.form.messagebox.title.error,
										text: language.form.auth.exception.NotMatch,
										type: constant.form.messagebox.type.error
									},{});
									mb.Show({
										effect: true,
										callback: function(){
											areaset.GetControl(inputs.mail).SetVisualError(true);
											areaset.GetControl(inputs.password).SetVisualError(true);
										}
									});
								},
								SessionLimit: function(data){
									var mb = new wa_manager.form.MessageBox({
										title: language.form.messagebox.title.error,
										text: language.form.auth.exception.SessionLimit,
										type: constant.form.messagebox.type.error
									},{});
									mb.Show({
										effect: true,
										callback: function(){
											areaset.GetControl(inputs.mail).SetError(false);
											areaset.GetControl(inputs.password).SetError(false);
										}
									});
								}
							}
						});
					},
					type: wa_manager.constants.control.buttonBox.button.type.auth,
					accessKey: {
						first: ["13"],
						used: "first"
					},
					show: true,
					order: 1
				};
				var buttonCollection = SelfObj.buttonBox = new control.buttonBox(btn_opt,{visible: true});

				//EVENTS
				$(title_run).click(function(e){
					wa_manager.data.form.main.SetActiveForm({
						form: function(){
							return new wa_manager.form.Reg({holder: wa_manager.data.form.main.GetContentHolder()},{visible: false});
						}
					});
				});
				$(forgot).click(function(e){
					alert("Функционал на данный момент не реализован");
				});
				//EVENTS

				//OTHER
				//load saved login and password in normal browsers(not opera)
				//$(cwe('iframe','name,iframe-auth',document.body)).hide();
				//$(document.forms["form-spec-auth"].submit).click();
				/*$("iframe[name=iframe-auth]").load(function(){
					$("iframe[name=iframe-auth]").remove();
				});*/
				//load saved login and password in opera browser
				/*$(form).submit(function(){
					setTimeout(function(){
						$(buttonCollection.buttons.ok.htmlElement).click();
					}, 500);

					return false;
				});*/
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;
			this.buttonBox = null;
			this.areaset = null;
			this.formInfo = {
				name: language.name,
				type: 'auth',
				generalMenu: false,
				generalMenuItem: false,
				displayImmediately: true,
				breadcrumb: false
			};

			//METHODS
			this.CheckTextLineAll = function(){
				$.each(SelfObj.areaset.controls, function(key, value){
					value.control.CheckText();
				});
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		Reg: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.form.reg,
				button_constant = wa_manager.constants.control.buttonBox,
				button_lang = wa_manager.language.control.buttonBox,
				control = wa_manager.control,
				language = wa_manager.language.form.reg,
				limits = wa_api.Constants.Limit.Account,
				regexp = wa_api.utils.verify.regexp;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','id,account_control',opts.holder);
				var title = cwe('div','id,control_title',parent);
				var title_actual = cwe('span','class,actual',title);
				$(title_actual).html(language.title.reg);
				var title_run = cwe('span','class,run',title);
				$(title_run).html(language.title.auth);
				cwe('b','id,clear',title);

				//configs to other inputs name
				var inputs = {
					login: "login",
					mail: "mail",
					password: "password",
					repeat_password: "repeat_password",
					wmr: "wmr",
					icq: "icq",
					invite: "invite"
				};

				var control_content = cwe('div','id,control_content',parent);

				//areaset
				var areaset = SelfObj.areaset = new control.areaset({holder: control_content},{visible: true});

				//add to areaset login control
				areaset.AddControl({
					name: inputs.login,
					text: language.login.text,
					control: function(holder){
						return new control.textline({
							holder: holder,
							tooltip: language.login.tooltip,
							focus: true,
							minLength: limits.Login.Length.Min,
							maxLength: limits.Login.Length.Max,
							regexp: regexp.login,
							checkData: true
						},{visible: true});
					}
				});

				//add to areaset mail control
				areaset.AddControl({
					name: inputs.mail,
					text: language.mail.text,
					control: function(holder){
						return new control.textline({
							holder: holder,
							tooltip: language.mail.tooltip,
							focus: false,
							minLength: limits.Mail.Length.Min,
							maxLength: limits.Mail.Length.Max,
							regexp: regexp.mail,
							checkData: true
						},{visible: true});
					}
				});

				//add to areaset password control
				areaset.AddControl({
					name: inputs.password,
					text: language.password.text,
					control: function(holder){
						return new control.textline({
							holder: holder,
							tooltip: language.password.tooltip,
							focus: false,
							minLength: limits.Password.Length.Min,
							maxLength: limits.Password.Length.Max,
							regexp: regexp.password,
							checkData: true,
							type: wa_manager.constants.control.textline.type.password
						},{visible: true});
					}
				});

				//add to areaset repeat password control
				areaset.AddControl({
					name: inputs.repeat_password,
					text: language.repeat_password.text,
					control: function(holder){
						return new control.textline({
							holder: holder,
							tooltip: language.repeat_password.tooltip,
							focus: false,
							minLength: limits.Password.Length.Min,
							maxLength: limits.Password.Length.Max,
							regexp: regexp.password,
							checkData: true,
							type: wa_manager.constants.control.textline.type.password
						},{visible: true});
					}
				});

				//add event for synchronize password and repeat password
				function synchronize_password_passwordrepeat(password_value, passwordrepear_value){
					if(password_value == passwordrepear_value) return false;
					else return true;
				};
				areaset.GetControl(inputs.password).SetUserCheckDataError(function(control, opts){
					var password_control = areaset.GetControl(inputs.password),
						repeatpassword_control = areaset.GetControl(inputs.repeat_password);

					var state_error = synchronize_password_passwordrepeat(password_control.GetValue(), repeatpassword_control.GetValue());

					return {
						state: state_error,
						callback: function(){
							repeatpassword_control.SetError(password_control.state.error);
						}
					};
				});
				areaset.GetControl(inputs.repeat_password).SetUserCheckDataError(function(control, opts){
					var password_control = areaset.GetControl(inputs.password),
						repeatpassword_control = areaset.GetControl(inputs.repeat_password);

					var state_error = synchronize_password_passwordrepeat(password_control.GetValue(), repeatpassword_control.GetValue());

					return {
						state: state_error,
						callback: function(){
							password_control.SetError(repeatpassword_control.state.error);
						}
					};
				});

				//add to areaset wmr control
				areaset.AddControl({
					name: inputs.wmr,
					text: language.wmr.text,
					control: function(holder){
						return new control.textline({
							holder: holder,
							tooltip: language.wmr.tooltip,
							focus: false,
							minLength: limits.Wmr.Length.Min,
							maxLength: limits.Wmr.Length.Max,
							regexp: regexp.wmr,
							checkData: true,
							type: wa_manager.constants.control.textline.type.text
						},{visible: true});
					}
				});

				//add to areaset icq control
				areaset.AddControl({
					name: inputs.icq,
					text: language.icq.text,
					control: function(holder){
						return new control.textline({
							holder: holder,
							tooltip: language.icq.tooltip,
							focus: false,
							minLength: limits.Icq.Length.Min,
							maxLength: limits.Icq.Length.Max,
							regexp: regexp.icq,
							checkData: true,
							type: wa_manager.constants.control.textline.type.text
						},{visible: true});
					}
				});

				//add to areaset invite control
				areaset.AddControl({
					name: inputs.invite,
					text: language.invite.text,
					control: function(holder){
						return new control.textline({
							holder: holder,
							tooltip: language.invite.tooltip,
							focus: false,
							minLength: limits.Invite.Length.Min,
							maxLength: limits.Invite.Length.Max,
							regexp: regexp.invite,
							checkData: true,
							type: wa_manager.constants.control.textline.type.text
						},{visible: true});
					}
				});

				var control_options = cwe('div','id,control_options', parent);
					var options = cwe('div','class,option',control_options);
					cwe('b','id,clear',control_options);

				//acept text and link to rules
				var acept_rulesContainer = cwe('span','class,nobr',options);
				$(acept_rulesContainer).html(language.agree_with_rules.text.agree_with);
				$(cwe('a','target,_blank',acept_rulesContainer)).attr('href',wa_manager.options.service.url + wa_manager.options.service.rules).html(language.agree_with_rules.text.rules);

				//acept rules checkbox
				var aceptRules = new control.checkbox({
					holder: acept_rulesContainer,
					tooltip: language.agree_with_rules.tooltip
				},{visible: true});

				//toogle button state
				$(window).keydown(function(e){
					SelfObj.buttonBox.SetActive(wa_manager.utils.notMsgBoxes(wa_manager.utils.getMsgBoxes()));
				});

				//add button
				var btn_opt = {
					holder: options,
					buttons: {}
				};
				btn_opt.buttons[wa_manager.constants.control.buttonBox.button.name.ok] = {
					text: language.register.text,
					tooltip: language.register.tooltip,
					click: function(){
						//SelfObj.CheckTextLineAll();

						var language = wa_manager.language,
							constant = wa_manager.constants;

						if(areaset.GetControl(inputs.login).state.error){
							var msgbox = new wa_manager.form.MessageBox({
								title: language.form.messagebox.title.error,
								text: language.form.reg.login.error,
								type: constant.form.messagebox.type.error
							},{});
							msgbox.Show({
								effect: true,
								callback: function(){
									areaset.GetControl(inputs.login).SetFocus(true);
									areaset.GetControl(inputs.login).SetError(true);
								}
							});
							return;
						};

						if(areaset.GetControl(inputs.mail).state.error){
							var msgbox = new wa_manager.form.MessageBox({
								title: language.form.messagebox.title.error,
								text: language.form.reg.mail.error,
								type: constant.form.messagebox.type.error
							},{});
							msgbox.Show({
								effect: true,
								callback: function(){
									areaset.GetControl(inputs.mail).SetFocus(true);
									areaset.GetControl(inputs.mail).SetError(true);
								}
							});
							return;
						};

						if(areaset.GetControl(inputs.password).state.error || areaset.GetControl(inputs.repeat_password).state.error){
							var msgbox = new wa_manager.form.MessageBox({
								title: language.form.messagebox.title.error,
								text: language.form.reg.repeat_password.error,
								type: constant.form.messagebox.type.error
							},{});
							msgbox.Show({
								effect: true,
								callback: function(){
									areaset.GetControl(inputs.password).SetError(true);
									areaset.GetControl(inputs.repeat_password).SetError(true);
								}
							});
							return;
						};

						if(areaset.GetControl(inputs.wmr).state.error){
							var msgbox = new wa_manager.form.MessageBox({
								title: language.form.messagebox.title.error,
								text: language.form.reg.wmr.error,
								type: constant.form.messagebox.type.error
							},{});
							msgbox.Show({
								effect: true,
								callback: function(){
									areaset.GetControl(inputs.wmr).SetFocus(true);
									areaset.GetControl(inputs.wmr).SetError(true);
								}
							});
							return;
						};

						if(areaset.GetControl(inputs.icq).state.error){
							var msgbox = new wa_manager.form.MessageBox({
								title: language.form.messagebox.title.error,
								text: language.form.reg.icq.error,
								type: constant.form.messagebox.type.error
							},{});
							msgbox.Show({
								effect: true,
								callback: function(){
									areaset.GetControl(inputs.icq).SetFocus(true);
									areaset.GetControl(inputs.icq).SetError(true);
								}
							});
							return;
						};

						if(areaset.GetControl(inputs.invite).state.error){
							var msgbox = new wa_manager.form.MessageBox({
								title: language.form.messagebox.title.error,
								text: language.form.reg.invite.error,
								type: constant.form.messagebox.type.error
							},{});
							msgbox.Show({
								effect: true,
								callback: function(){
									areaset.GetControl(inputs.invite).SetFocus(true);
									areaset.GetControl(inputs.invite).SetError(true);
								}
							});
							return;
						};

						if(!aceptRules.state.check){
							var msgbox = new wa_manager.form.MessageBox({
								title: language.form.messagebox.title.error,
								text: language.form.reg.agree_with_rules.error,
								type: constant.form.messagebox.type.error
							},{});
							msgbox.Show({
								effect: true
							});
							return;
						};

						areaset.GetControl(inputs.login).SetError(false);
						areaset.GetControl(inputs.mail).SetError(false);
						areaset.GetControl(inputs.password).SetError(false);
						areaset.GetControl(inputs.repeat_password).SetError(false);
						areaset.GetControl(inputs.wmr).SetError(false);
						areaset.GetControl(inputs.icq).SetError(false);
						areaset.GetControl(inputs.invite).SetError(false);

						if(!wa_manager.data.control.loader.state.work) wa_api.methods.Register({
							login: areaset.GetControl(inputs.login).GetValue(),
							mail: areaset.GetControl(inputs.mail).GetValue(),
							password: areaset.GetControl(inputs.password).GetValue(),
							wmr: areaset.GetControl(inputs.wmr).GetValue(),
							icq: areaset.GetControl(inputs.icq).GetValue(),
							invite: areaset.GetControl(inputs.invite).GetValue(),
							callback: function(data){
								var mb = new wa_manager.form.MessageBox({
									title: language.form.messagebox.title.notification,
									text: language.form.reg.success,
									onClickButton: {
										ok: function(){
											wa_manager.data.form.main.SetActiveForm({
												form: function(){
													return new wa_manager.form.Auth({holder: wa_manager.data.form.main.GetContentHolder()},{visible: false});
												}
											});
										}
									}
								},{});
								mb.Show({
									effect: true
								});
							},
							exception: {
								MailExists: function(data){
									var mb = new wa_manager.form.MessageBox({
										title: language.form.messagebox.title.error,
										text: language.form.reg.exception.MailExists,
										type: constant.form.messagebox.type.error
									},{});
									mb.Show({
										effect: true,
										callback: function(){
											areaset.GetControl(inputs.mail).AddBlackList(areaset.GetControl(inputs.mail).GetValue());
											areaset.GetControl(inputs.mail).SetFocus(true);
											areaset.GetControl(inputs.mail).SetError(true);
										}
									});
								},
								LoginExists: function(data){
									var mb = new wa_manager.form.MessageBox({
										title: language.form.messagebox.title.error,
										text: language.form.reg.exception.LoginExists,
										type: constant.form.messagebox.type.error
									},{});
									mb.Show({
										effect: true,
										callback: function(){
											areaset.GetControl(inputs.login).AddBlackList(areaset.GetControl(inputs.login).GetValue());
											areaset.GetControl(inputs.login).SetFocus(true);
											areaset.GetControl(inputs.login).SetError(true);
										}
									});
								},
								InviteNotFound: function(data){
									var mb = new wa_manager.form.MessageBox({
										title: language.form.messagebox.title.error,
										text: language.form.reg.exception.InviteNotFound,
										type: constant.form.messagebox.type.error
									},{});
									mb.Show({
										effect: true,
										callback: function(){
											areaset.GetControl(inputs.invite).AddBlackList(areaset.GetControl(inputs.invite).GetValue());
											areaset.GetControl(inputs.invite).SetFocus(true);
											areaset.GetControl(inputs.invite).SetError(true);
										}
									});
								},
								IcqExists: function(data){
									var mb = new wa_manager.form.MessageBox({
										title: language.form.messagebox.title.error,
										text: language.form.reg.exception.IcqExists,
										type: constant.form.messagebox.type.error
									},{});
									mb.Show({
										effect: true,
										callback: function(){
											areaset.GetControl(inputs.icq).AddBlackList(areaset.GetControl(inputs.icq).GetValue());
											areaset.GetControl(inputs.icq).SetFocus(true);
											areaset.GetControl(inputs.icq).SetError(true);
										}
									});
								},
								WmrExists: function(data){
									var mb = new wa_manager.form.MessageBox({
										title: language.form.messagebox.title.error,
										text: language.form.reg.exception.WmrExists,
										type: constant.form.messagebox.type.error
									},{});
									mb.Show({
										effect: true,
										callback: function(){
											areaset.GetControl(inputs.wmr).AddBlackList(areaset.GetControl(inputs.wmr).GetValue());
											areaset.GetControl(inputs.wmr).SetFocus(true);
											areaset.GetControl(inputs.wmr).SetError(true);
										}
									});
								},
								IpRangeNotRegistered: function(data){
									var mb = new wa_manager.form.MessageBox({
										title: language.form.messagebox.title.error,
										text: language.form.reg.exception.IpRangeNotRegistered,
										type: constant.form.messagebox.type.error
									},{});
									mb.Show({
										effect: true
									});
								}
							}
						});
					},
					type: wa_manager.constants.control.buttonBox.button.type.auth,
					accessKey: {
						first: ["13"],
						used: "first"
					},
					show: true,
					order: 1
				};
				var buttonCollection = SelfObj.buttonBox = new control.buttonBox(btn_opt,{visible: true});


				//EVENTS
				$(title_run).click(function(e){
					wa_manager.data.form.main.SetActiveForm({
						form: function(){
							return new wa_manager.form.Auth({holder: wa_manager.data.form.main.GetContentHolder()},{visible: false});
						}
					});
				});
				//EVENTS
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;
			this.buttonBox = null;
			this.areaset = null;
			this.formInfo = {
				name: language.name,
				type: 'reg',
				generalMenu: false,
				generalMenuItem: false,
				displayImmediately: true,
				breadcrumb: false
			};

			//METHODS
			this.CheckTextLineAll = function(){
				$.each(SelfObj.areaset.controls, function(key, value){
					value.control.CheckText();
				});
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		Account: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.form.account,
				control = wa_manager.control,
				language = wa_manager.language.form.account,
				jsonItem = wa_api.Constants.OperationItem,
				dataFormat = wa_manager.utils.dataFormat;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body,
				'class': {
					'copy': 'copy',
					'recreate': 'recreate',
					'readonly': 'readonly',
					'status': 'status',
					'false': 'false',
					'true': 'true'
				},
				animate: {
					time: 350,
					count: 6
				},
				items: [
					//manager Data Account
					{
						//manager Data Account
						controls: [
							{
								nameObj: "managerDataAccount",
								right: false,
								colspanName: 2,
								colspanValue: 3,
								text: language.items.managerDataAccount.text,
								show: true,
								order: 1,
								iconBoxItems: {
									reset: {
									show: true,
									order: 1,
									tooltip: language.items.managerDataAccount.buttons.reset.tooltip,
									onClick: function(){
										var msgbox = new wa_manager.form.MessageBox({
											title: wa_manager.language.form.messagebox.title.notification,
											text: language.items.managerDataAccount.buttons.reset.notification,
											type: wa_manager.constants.form.messagebox.type.confirm,
											onClickButton: {
												ok: function(){
													msgbox.Destroy();
													wa_api.methods.ResetAccount({
														token: wa_manager.methods.GetToken(),
														callback: function(){
															var msg = new wa_manager.form.MessageBox({
																title: wa_manager.language.form.messagebox.title.notification,
																text: language.items.managerDataAccount.buttons.reset.success
															},{visible: false});
															msg.Show({effect: true});
														}
													});
												}
											}
										},{});
										msgbox.Show({effect: true});
									}
								},
									download: {
									show: true,
									order: 2,
									tooltip: language.items.managerDataAccount.buttons.download.tooltip,
									onClick: function(){
										alert("Функционал не реализован");
									}
								},
									upload: {
									show: true,
									order: 3,
									tooltip: language.items.managerDataAccount.buttons.upload.tooltip,
									onClick: function(){
										alert("Функционал не реализован");
									}
								}
								}
							}
						],
						show: true,
						interval: true,
						order: 1
					},
					//login, icq
					{
						controls: [
							//login
							{
								nameObj: "login",
								right: false,
								text: language.items.login.text,
								show: true,
								order: 1
							},
							//icq
							{
								nameObj: "icq",
								right: false,
								text: language.items.icq.text,
								show: true,
								order: 2,
								iconBoxItems: {
									edit: {
										show: true,
										order: 1,
										tooltip: language.items.icq.buttons.edit.tooltip,
										onClick: function(){
											alert("Функционал на данный момент не реализован");
										}
									}
								}
							}
						],
						show: true,
						order: 2
					},
					//balance, mail
					{
						controls: [
							//balance
							{
								nameObj: "balance",
								right: false,
								text: language.items.balance.text,
								show: true,
								order: 1,
								iconBoxItems: {
									purse: {
										show: true,
										order: 1,
										tooltip: language.items.balance.buttons.purse.tooltip,
										onClick: function(){
											var msgbox = new wa_manager.form.MessageBox({
												title: wa_manager.language.form.messagebox.title.notification,
												text: language.items.balance.notify,
												type: wa_manager.constants.form.messagebox.type.confirm,
												onClickButton: {
													ok: function(){
														msgbox.Destroy();
														var w = window.open('wmk:payto?Purse='+wa_manager.options.service.wmr+'&Amount=5000&Desc='+wa_manager.data.user.login+'&BringToFront=Y');
														$(w).ready(function(e){
															if(!w.closed) w.close();
														});
													}
												}
											},{});
											msgbox.Show({effect: true});
										}
									}
								}
							},
							//mail
							{
								nameObj: "mail",
								right: false,
								text: language.items.mail.text,
								show: true,
								order: 2,
								iconBoxItems: {
									edit: {
										show: true,
										order: 1,
										tooltip: language.items.mail.buttons.edit.tooltip,
										onClick: function(){
											alert("Функционал на данный момент не реализован");
										}
									}
								}
							}
						],
						show: true,
						order: 3
					},
					//wmr, password
					{
						controls: [
							//wmr
							{
								nameObj: "wmr",
								right: false,
								text: language.items.wmr.text,
								show: true,
								order: 1
							},
							//password
							{
								nameObj: "password",
								right: false,
								text: language.items.password.text,
								show: true,
								order: 2,
								iconBoxItems: {
									edit: {
										show: true,
										order: 1,
										tooltip: language.items.password.buttons.edit.tooltip,
										onClick: function(){
											alert("Функционал на данный момент не реализован");
										}
									}
								}
							}
						],
						show: true,
						order: 4
					},
					//surfing key
					{
						controls: [
							{
								nameObj: "surfingKey",
								right: true,
								text: language.items.surfingKey.text,
								show: true,
								order: 1,
								iconBoxItems: {
									copy: {
										show: true,
										order: 2,
										clipboard: true,
										tooltip: language.items.surfingKey.buttons.copy.tooltip,
										success: language.items.surfingKey.buttons.copy.success,
										onClick: function(icon){
											icon.clipboard.setText(SelfObj.GetValue('surfingKey'));
										}
									},
									recreate: {
										show: true,
										order: 1,
										tooltip: language.items.surfingKey.buttons.recreate.tooltip,
										onClick: function(){
											var msgbox = new wa_manager.form.MessageBox({
												title: wa_manager.language.form.messagebox.title.notification,
												text: language.items.surfingKey.buttons.recreate.confirm,
												type: wa_manager.constants.form.messagebox.type.confirm,
												onClickButton: {
													ok: function(){
														msgbox.Destroy();

														wa_api.methods.ResetSurfingKey({
															token: wa_manager.methods.GetToken(),
															callback: function(data){
																SelfObj.ChangeTextAndValue({
																	surfingKey: {
																		value: data[jsonItem.SurfingKey]
																	}
																});

																var count = 0;
																var interval = new wa_manager.utils.interval(function(){
																	count++;
																	var node = SelfObj.items['surfingKey'].GetValueNode();

																	if(count%2 == 0) $(node).removeClass(proto.Opts['class'].recreate);
																	else $(node).addClass(proto.Opts['class'].recreate);

																	if(count == proto.Opts.animate.count) interval.stop();
																},proto.Opts.animate.time);
																interval.start();
															}
														});
													}
												}
											},{});
											msgbox.Show({effect: true});
										}
									}
								}
							}
						],
						show: true,
						order: 5
					},
					//readonly key
					{
						controls: [
							{
								nameObj: "readonlyKey",
								right: true,
								text: language.items.readonlyKey.text,
								show: true,
								interval: true,
								order: 1,
								iconBoxItems: {
									copy: {
										show: true,
										order: 2,
										clipboard: true,
										tooltip: language.items.readonlyKey.buttons.copy.tooltip,
										success: language.items.readonlyKey.buttons.copy.success,
										onClick: function(icon){
											icon.clipboard.setText(SelfObj.GetValue('readonlyKey'));
										}
									},
									recreate: {
										show: true,
										order: 1,
										tooltip: language.items.readonlyKey.buttons.recreate.tooltip,
										onClick: function(){
											var msgbox = new wa_manager.form.MessageBox({
												title: wa_manager.language.form.messagebox.title.notification,
												text: language.items.readonlyKey.buttons.recreate.confirm,
												type: wa_manager.constants.form.messagebox.type.confirm,
												onClickButton: {
													ok: function(){
														msgbox.Destroy();

														wa_api.methods.ResetReadonlyKey({
															token: wa_manager.methods.GetToken(),
															callback: function(data){
																SelfObj.ChangeTextAndValue({
																	readonlyKey: {
																		value: data[jsonItem.ReadonlyKey]
																	}
																});

																var count = 0;
																var interval = new wa_manager.utils.interval(function(){
																	count++;
																	var node = SelfObj.items['readonlyKey'].GetValueNode();

																	if(count%2 == 0) $(node).removeClass(proto.Opts['class'].recreate);
																	else $(node).addClass(proto.Opts['class'].recreate);

																	if(count == proto.Opts.animate.count) interval.stop();
																},proto.Opts.animate.time);
																interval.start();
															}
														});
													}
												}
											},{});
											msgbox.Show({effect: true});
										}
									}
								}
							}
						],
						show: true,
						interval: true,
						order: 6
					},
					//timebonus
					{
						controls: [
							//timebonus
							{
								nameObj: "timebonus",
								right: false,
								colspanValue: 4,
								text: language.items.timebonus.text,
								show: true,
								order: 1
							}
						],
						show: true,
						order: 7
					},
					//inactivity
					{
						controls: [
							//inactivity
							{
								nameObj: "inactivity",
								right: false,
								colspanValue: 4,
								text: language.items.inactivity.text,
								show: true,
								order: 1
							}
						],
						show: true,
						order: 8
					},
					//account status
					{
						controls: [
							//account status
							{
								nameObj: "status",
								right: false,
								colspanValue: 4,
								text: language.items.status.text,
								show: true,
								order: 1,
								iconBoxItems: {
									restore: {
										show: false,
										order: 1,
										tooltip: language.items.status.buttons.restore.tooltip,
										onClick: function(){
											wa_api.methods.RestoreAccount({
												token: wa_manager.data.user.token,
												callback: function(data){
													proto.Opts.items[8].controls[0].iconBoxItems.restore.show = false;
													SelfObj.Destroy();
													proto.Constructor();
												}
											});
										}
									}
								}
							}
						],
						show: true,
						order: 9
					},
					//vip
					{
						controls: [
							//vip
							{
								nameObj: "vip",
								right: false,
								colspanValue: 4,
								text: language.items.vip.text,
								show: true,
								order: 1,
								iconBoxItems: {
									vip: {
										show: true,
										order: 1,
										tooltip: language.items.vip.buttons.vip.tooltip,
										onClick: function(){
											var needVipStatus = ((wa_manager.data.user.vip) ? false : true);

											wa_api.methods.SetVip({
												token: wa_manager.data.user.token,
												vip: needVipStatus,
												callback: function(data){
													wa_manager.data.user.vip = needVipStatus;

													SelfObj.ChangeTextAndValue({
														vip: {
															value: ((needVipStatus) ? language.items.vip.value.enabled : language.items.vip.value.disabled),
															'class': ((needVipStatus) ? opts['class']['true'] : opts['class']['false'])
														}
													});
												}
											});
										}
									}
								}
							}
						],
						show: true,
						order: 10
					},
					//invite
					{
						controls: [
							//invite
							{
								nameObj: "invite",
								right: false,
								colspanValue: 4,
								text: language.items.invite.text,
								show: true,
								order: 12,
								iconBoxItems: {
									copy: {
										show: true,
										clipboard: true,
										order: 1,
										tooltip: language.items.invite.buttons.copy.tooltip,
										success: language.items.invite.buttons.copy.success,
										onClick: function(icon){
											icon.clipboard.setText(SelfObj.GetValue('invite'));
										}
									}
								}
							}
						],
						show: true,
						order: 11
					}
				]
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('table','id,accountinfo',opts.holder);

				//disable iconboxes for mobile browsers
				if($.browser.mobile){
					//opts.items.balance.iconBoxItems.add.show = false;
					//opts.items.invite.iconBoxItems.copy.show = false;
				};


				wa_api.methods.GetGeneralInfo({
					token: wa_manager.data.user.token,
					callback: function(data){
						wa_manager.data.user.login = data[jsonItem.Login];
						wa_manager.options.service.wmr = data[jsonItem.SystemWmr];
						wa_manager.data.user.vip = data[jsonItem.Vip];

						if(data[jsonItem.Deleted]) proto.Opts.items[8].controls[0].iconBoxItems.restore.show = true;
						if(!data[jsonItem.Invite]) proto.Opts.items[10].controls[0].iconBoxItems.copy.show = false;

						SelfObj.SetItems(opts.items);

						SelfObj.ChangeTextAndValue({
							login: {
								value: (data[jsonItem.Login]) ? data[jsonItem.Login] : language.notAvailable
							},
							mail: {
								value: (data[jsonItem.Mail]) ? data[jsonItem.Mail] : language.notAvailable
							},
							password: {
								value: wa_manager.language.other.informationHiden,
								'class': opts['class'].readonly
							},
							icq: {
								value: (data[jsonItem.Icq]) ? dataFormat.Icq(data[jsonItem.Icq]) : language.notAvailable
							},
							balance: {
								value: (data[jsonItem.Balance] || data[jsonItem.Balance] == 0) ? dataFormat.Balance(data[jsonItem.Balance]) : language.notAvailable
							},
							inactivity: {
								value: ((data[jsonItem.InActivity] == 0) ? dataFormat.Int(data[jsonItem.InActivity]) : "<span id='item_status' class='warning'>"+dataFormat.Int(data[jsonItem.InActivity])+"</span>"),
								'class': ((data[jsonItem.InActivity] == 0) ? opts['class']['true'] : opts['class']['false'])
							},
							status: {
								value: ((data[jsonItem.Deleted]) ? language.items.status.value.deleted : language.items.status.value.active),
								'class': ((data[jsonItem.Deleted]) ? opts['class']['false'] : opts['class']['true'])
							},
							invite: {
								value: ((data[jsonItem.Invite]) ? data[jsonItem.Invite] : language.items.invite.notAvailable),
								'class': ((data[jsonItem.Invite]) ? opts['class']['true'] : opts['class'].readonly)
							},
							timebonus: {
								value: (data[jsonItem.TimeBonus] || data[jsonItem.TimeBonus] != null) ? dataFormat.Int(data[jsonItem.TimeBonus]) : language.notAvailable
							},
							id: {
								value: (data[jsonItem.Id]) ? dataFormat.Int(data[jsonItem.Id]) : language.notAvailable
							},
							wmr: {
								value: (data[jsonItem.Wmr]) ? data[jsonItem.Wmr] : language.notAvailable
							},
							vip: {
								value: ((data[jsonItem.Vip]) ? language.items.vip.value.enabled : language.items.vip.value.disabled),
								'class': ((data[jsonItem.Vip]) ? opts['class']['true'] : opts['class']['false'])
							},
							surfingKey: {
								value: language.notAvailable
							},
							readonlyKey: {
								value: language.notAvailable
							}
						});

						wa_api.methods.GetAccessKeys({
							token: wa_manager.methods.GetToken(),
							callback: function(data){
								SelfObj.ChangeTextAndValue({
									surfingKey: {
										value: data[jsonItem.SurfingKey]
									},
									readonlyKey: {
										value: data[jsonItem.ReadonlyKey]
									}
								});
								SelfObj.Show({effect: true});
							}
						});
					}
				});
			};

			function Item(opt, param){
				var proto = new wa_manager.proto(),
					cwe = wa_api.utils.cwe,
					opts = proto.Opts,
					SelfObj = this,
					attributes = wa_manager.constants.attributes;

				//options
				proto.Opts = $.extend(true, proto.Opts, {
					holder: document.body,
					name: null,
					text: null,
					value: null,
					iconBoxItems: {},
					show: true,
					order: 100
				});

				proto.Constructor = function(){
					SelfObj.htmlElement = false;//don't have control parent element

					var text = proto.Data.text = proto.HtmlNodes.Main[0] = cwe('td','class,name',opts.holder);
					var option = proto.Data.option = proto.HtmlNodes.Main[1] = cwe('td','class,icon',opts.holder);
					proto.HtmlNodes.Main[2] = cwe('td','class,value',opts.holder);
					var value = proto.Data.value = cwe('span', 'class,item_value', proto.HtmlNodes.Main[2]);

					if(opts.colspanName) $(proto.Data.text).attr("colspan", opts.colspanName);
					if(opts.colspanValue) $(proto.HtmlNodes.Main[2]).attr("colspan", opts.colspanValue);

					SelfObj.SetText(opts.text);
					SelfObj.SetValue(opts.value);

					SelfObj.buttons = new wa_manager.control.iconBox({
						holder: option,
						items: opts.iconBoxItems
					},{visible: true});
				};

				//PROPERTYS
				this.state = {};
				this.htmlElement = null;
				this.buttons = null;

				//METHODS
				this.SetText = function(text){
					opts.text = text;
					$(proto.Data.text).html(opts.text);
				};
				this.SetValue = function(value){
					opts.value = value;
					$(proto.Data.value).html(opts.value);
				};
				this.GetValue = function(){
					return $(proto.Data.value).html();
				};
				this.GetValueNode = function(){
					return proto.Data.value;
				};

				this.Destroy = function(param){
					//destroy buttons
					SelfObj.buttons.Destroy();

					proto.Destroy(param);
				};
				this.Show = function(param){
					function callback(){
						//buttons show
						if(SelfObj.buttons) SelfObj.buttons.Show();
					};
					if(!param) param = {};
					if(param.callback){
						param.callback = function(){
							callback();
							param.callback();
						};
					}else{
						param.callback = callback;
					};

					proto.Show(param);
				};
				this.Hide = function(param){
					function callback(){
						//buttons hide
						if(SelfObj.buttons) SelfObj.buttons.Hide();
					};
					if(!param) param = {};
					if(param.callback){
						param.callback = function(){
							callback();
							param.callback();
						};
					}else{
						param.callback = callback;
					};

					proto.Hide(param);
				};
				this.Toogle = proto.Toogle;

				proto.Init(opt, param);
			};
			function generateItems(items, holder){
				var output = {}, arr = [];

				//select enabled items
				$.each(items, function(key, value){
					if(value.show) arr.push(value);
				});

				//sort by 'order'
				arr.sort(function(a,b){return a.order-b.order;});

				//parse data  & generate html nodes
				$.each(arr, function(key, value){
					var parent = cwe('tr','',holder),
						t_arr = [],
						group = value;

					//select enabled items
					$.each(value.controls, function(key, value){
						if(value.show) t_arr.push(value);
					});

					//sort by 'order'
					t_arr.sort(function(a,b){return a.order-b.order;});

					//generate htmlNodes and add to output object
					$.each(t_arr, function(key, value){
						if(value.right) cwe('td','colspan,3',parent);

						value.holder = parent;

						output[value.nameObj] = new Item(value,{visible: true});

						if(group.interval) cwe('td','class,interval;colspan,6',cwe('tr','',holder));
					});
				});

				return output;
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;
			this.items = {};
			this.formInfo = {
				name: language.name,
				type: 'account',
				generalMenu: true,
				generalMenuItem: true,
				displayImmediately: true,
				breadcrumb: true,
				breadcrumbLevel: 0
			};

			//METHODS
			this.SetItems = function(items){
				opts.items = $.extend(true, opts.items, items);

				$.each(SelfObj.items, function(key, value){
					if(value) value.Destroy();
					delete SelfObj.items[key];
				});
				$(SelfObj.htmlElement).html("");

				SelfObj.items = generateItems(opts.items, SelfObj.htmlElement);
			};
			this.ChangeTextAndValue = function(data){
				$.each(data, function(key, value){
					if(!SelfObj.items[key]) return;

					if(value.text) SelfObj.items[key].SetText(value.text);
					if(value.value) SelfObj.items[key].SetValue(value.value);
					if(value['class']) $(SelfObj.items[key].GetValueNode())
						.removeClass([opts['class']['true'],opts['class']['false'],opts['class'].readonly].join(' '))
						.addClass(value['class']);
				});
			};
			this.GetValue = function(name){
				return SelfObj.items[name].GetValue();
			};

			this.Destroy = function(param){
				//destroy items
				$.each(SelfObj.items, function(key, value){
					value.Destroy();
				});

				proto.Destroy(param);
			};
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		Masks: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.form.masks,
				control = wa_manager.control,
				language = wa_manager.language.form.masks,
				jsonItem = wa_api.Constants.OperationItem;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','',opts.holder);

				//add button panel
				var buttonBox = proto.Data.BM = new control.buttonBox({
					holder: parent,
					buttons: {
						'delete': {
							text: language.buttons['delete'].text,
							click: function(){
                                alert("Функционал не реализован.");
                                return;
                                var items = [];
                                $.each(SelfObj.items, function(key, value){
                                    if(value.state.checked) items.push(value.GetValues().maskid);
                                });

                                var msgbox = new wa_manager.form.MessageBox({
                                    title: wa_manager.language.form.messagebox.title.notification,
                                    text: language.item.icon['delete'].notification,
                                    type: wa_manager.constants.form.messagebox.type.confirm,
                                    onClickButton: {
                                        ok: function(){
                                            wa_api.methods.DeleteMasks({
                                                token: wa_manager.methods.GetToken(),
                                                masks: items,
                                                callback: function(data){
                                                    $.each(items, function(key, value){
                                                        SelfObj.deleteItem(value);
                                                    });
                                                    checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
                                                }
                                            });
                                        }
                                    }
                                },{});
                                msgbox.Show({effect: true});
							},
							type: wa_manager.constants.control.buttonBox.button.type.leftGray,
							show: true,
							order: 1,
							'AnimateTime': 100
						},
						add: {
							text: language.buttons.add.text,
							click: function(){
                                alert("Функционал не реализован.");
                                return;
                                var msgbox = new wa_manager.form.MessageBox({
                                    type: wa_manager.constants.form.messagebox.type.maskAdd,
                                    maskAdd: {
                                        success: function(param){
                                            SelfObj.addItem({
                                                allowProxy: param.allowProxy,
                                                ignoreGU: param.ignoreGU,
                                                maskid: param.maskId,
                                                rangeSize: param.rangeSize,
                                                mask: param.mask,
                                                uniquePeriod: param.uniqTime,
                                                name: param.maskName,
                                                checkBoxClick: function(checkBox, state){
                                                    var checkAll = true,
                                                        checkSome = false;

                                                    $.each(SelfObj.items, function(key, value){
                                                        if(!value.state.checked) checkAll = false;
                                                        else checkSome = true;
                                                    });

                                                    if(checkAll) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.check, true);
                                                    else if(checkSome) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.tick, true);
                                                    else checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
                                                },
                                                actionDelete: function(id){
                                                    SelfObj.deleteItem(id);
                                                }
                                            });
                                        }
                                    }
                                },{visible: false});
                                msgbox.Show({effect: true});
							},
							show: true,
							order: 1
						}
					}
				},{visible: true});
				//hide button delete
				SelfObj.BMHide();

				var infoTable = cwe('table','id,infotable',parent);

				//set header
				var head = cwe('tr','',cwe('thead','',infoTable));
				//checbox
				var checkBoxAll = new control.checkbox({
					holder: cwe('td','class,checked',head),
					onClick: function(checkBox, state){
						var checked = false,
							items = false;

						if(checkBox.state.check) checked = true;
						else if(checkBox.state.tick) checked = 'tick';
						else if(checkBox.state.uncheck) checked = false;

						$.each(SelfObj.items, function(key, value){
							items = true;
							if(checked != 'tick') if(value.state.checked != checked) value.SetChecked(checked);
						});

						if(!items || checkBox.state.uncheck) SelfObj.BMHide({effect: true});
						else SelfObj.BMShow({effect: true});
					}
				},{visible: true});
				//name of mask
				$(cwe('td','class,name',head)).html(language.infoHead.nameMask);
				//option
				cwe('td','class,option',head);
				//mask
				$(cwe('td','class,mask',head)).html(language.infoHead.mask);
				//proxy
				$(cwe('td','class,proxy',head)).html(language.infoHead.proxy);
				//gu
				$(cwe('td','class,gu',head)).html(language.infoHead.gu);
				//range size
				$(cwe('td','class,range',head)).html(language.infoHead.rangeSize);
				//uniq time
				$(cwe('td','class,unique',head)).html(language.infoHead.timeUniq);

				proto.Data.itemsHolder = cwe('tbody','',infoTable);

				wa_api.methods.GetMasks({
					token: wa_manager.methods.GetToken(),
					callback: function(data){
						if(!data[jsonItem.Masks]) return;
						data[jsonItem.Masks].sort(function(a,b){
							return a[jsonItem.IdMask]-b[jsonItem.IdMask];
						});
						$.each(data[jsonItem.Masks], function(key, value){
							SelfObj.addItem({
								allowProxy: value[jsonItem.AllowProxy],
								ignoreGU: value[jsonItem.IgnoreGU],
								maskid: value[jsonItem.IdMask],
								rangeSize: value[jsonItem.RangeSize],
								mask: value[jsonItem.Mask],
								uniquePeriod: value[jsonItem.UniqPeriod],
								name: value[jsonItem.Name],
								checkBoxClick: function(checkBox, state){
									var checkAll = true,
										checkSome = false;

									$.each(SelfObj.items, function(key, value){
										if(!value.state.checked) checkAll = false;
										else checkSome = true;
									});

									if(checkAll) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.check, true);
									else if(checkSome) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.tick, true);
									else checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
								},
                                actionDelete: function(id){
                                    SelfObj.deleteItem(id);
                                }
							});
						});
					}
				});
			};

			function Item(opt, param){
				var proto = new wa_manager.proto(),
					cwe = wa_api.utils.cwe,
					opts = proto.Opts,
					SelfObj = this,
					constant = wa_manager.constants.form.masks,
					control = wa_manager.control,
					language = wa_manager.language.form.masks.item,
					jsonItem = wa_api.Constants.OperationItem;

				//options
				proto.Opts = $.extend(true, proto.Opts, {
					holder: document.body,
					allowProxy: false,
					ignoreGU: false,
					maskid: null,
					rangeSize: null,
					mask: null,
					uniquePeriod: null,
					name: null,
					maskDelimiter: "->",
					maskDelimiterToDisplay: " ⇒ ",
					checkBoxClick: function(checkBox, state){},
					'class': {
						check: 'check'
					}
				});

				proto.Constructor = function(){
					var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('tr','',opts.holder);

					//checkbox
					proto.Data.checkBox = new control.checkbox({
						holder: cwe('td','class,checked',parent),
						onClick: function(checkBox, state){
							if(checkBox.state.check){
								SelfObj.state.checked = true;
								$(parent).addClass(opts['class'].check);
							}
							else{
								SelfObj.state.checked = false;
								$(parent).removeClass(opts['class'].check);
							};

							opts.checkBoxClick(checkBox, state);
						}
					},{visible: true});
					$(parent).click(function(){
						proto.Data.checkBox.StateToogle();
					});
					//name of mask
					proto.Data.Name = cwe('td','class,name',parent);
					//option
					var iconBox = new control.iconBox({
						holder: cwe('td','class,option',parent),
						items: {
							edit: {
								onClick: function(){
									var msgbox = new wa_manager.form.MessageBox({
										type: wa_manager.constants.form.messagebox.type.maskEdit,
										maskEdit: {
											maskId: opts.maskid,
											mask: opts.mask,
											maskName: opts.name,
											ignoreGU: opts.ignoreGU,
											allowProxy: opts.allowProxy,
											uniqTime: opts.uniquePeriod,
											rangeSize: opts.rangeSize,
											maskDelimiter: opts.maskDelimiter,
											success: function(param){
												SelfObj.SetValues({
													allowProxy: param.allowProxy,
													ignoreGU: param.ignoreGU,
													maskid: param.maskId,
													rangeSize: param.rangeSize,
													mask: param.mask,
													uniquePeriod: param.uniqTime,
													name: param.maskName
												});
											}
										}
									},{visible: false});
									msgbox.Show({effect: true});
								},
								show: true
							},
							'delete': {
								onClick: function(){
									alert("Функционал не реализован.");
                                    return;
                                    var msgbox = new wa_manager.form.MessageBox({
                                        title: wa_manager.language.form.messagebox.title.notification,
                                        text: language.icon['delete'].notification,
                                        type: wa_manager.constants.form.messagebox.type.confirm,
                                        onClickButton: {
                                            ok: function(){
                                                wa_api.methods.DeleteMasks({
                                                    token: wa_manager.methods.GetToken(),
                                                    masks: [proto.Opts.maskid],
                                                    callback: function(data){
                                                        proto.Opts.actionDelete(proto.Opts.maskid);
                                                    }
                                                });
                                            }
                                        }
                                    },{});
                                    msgbox.Show({effect: true});
								},
								show: true
							}
						}
					},{visible: true});
					//mask
					proto.Data.mask = cwe('td','class,mask',parent);
					//proxy
					proto.Data.proxy = cwe('td','class,proxy',parent);
					//gu
					proto.Data.gu = cwe('td','class,gu',parent);
					//range size
					proto.Data.rangeSize = cwe('td','class,range',parent);
					//uniq time
					proto.Data.uniqTime = cwe('td','class,unique',parent);

					//set values
					SelfObj.SetValues(opts);
				};

				//PROPERTYS
				this.state = {
					checked: false
				};
				this.htmlElement = null;

				//METHODS
				this.SetValues = function(obj){
					proto.Opts = $.extend(true, proto.Opts, obj);

					//set display
					//name
					$(proto.Data.Name).text(opts.name);
					//mask
					$(proto.Data.mask).text(opts.mask.replace(opts.maskDelimiter,opts.maskDelimiterToDisplay));
					//proxy
					$(proto.Data.proxy).text(((opts.allowProxy) ? language.proxy.value.enabled : language.proxy.value.disabled));
					//gu
					$(proto.Data.gu).text(((opts.ignoreGU) ? language.gu.value.enabled : language.gu.value.disabled));
					//range size
					$(proto.Data.rangeSize).text(wa_manager.utils.dataFormat.Int(opts.rangeSize));
					//unicTime
					$(proto.Data.uniqTime).text(wa_manager.utils.dataFormat.Int(opts.uniquePeriod));
				};
				this.SetChecked = function(state){
					if(state) proto.Data.checkBox.SetState(wa_manager.constants.control.checkbox.state.check, true);
					else proto.Data.checkBox.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
				};
				this.GetValues = function(){
					return opts;
				};

				this.Destroy = proto.Destroy;
				this.Show = proto.Show;
				this.Hide = proto.Hide;
				this.Toogle = proto.Toogle;

				proto.Init(opt, param);
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;
			this.items = {};
			this.formInfo = {
				name: language.name,
				type: 'masks',
				generalMenu: true,
				generalMenuItem: true,
				displayImmediately: true,
				breadcrumb: true,
				breadcrumbLevel: 1
			};

			//METHODS
			this.BMHide = function(param){
				proto.Data.BM.buttons['delete'].Hide(param);
			};
			this.BMShow = function(param){
				proto.Data.BM.buttons['delete'].Show(param);
			};
			this.addItem = function(item_cfg){
				item_cfg.holder = proto.Data.itemsHolder;

				var item =  new Item(item_cfg,{visible: true});

				SelfObj.items[item_cfg.maskid] = item;

				return item;
			};
            this.deleteItem = function(id){
                if(SelfObj.items[id]) {
                    SelfObj.items[id].Destroy({
                        callback: function(){
                            delete SelfObj.items[id];
                        }
                    });
                };
            };

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		Folders: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.form.folders,
				control = wa_manager.control,
				language = wa_manager.language.form.folders,
				jsonItem = wa_api.Constants.OperationItem;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','',opts.holder);

				//add button panel
				var buttonBox = proto.Data.BM = new control.buttonBox({
					holder: parent,
					buttons: {
						'delete': {
							text: language.buttons['delete'].text,
							click: function(){
								var items = [];
								$.each(SelfObj.items, function(key, value){
									if(value.state.checked) items.push(value.GetValues().idFolder);
								});

								var msgbox = new wa_manager.form.MessageBox({
									title: wa_manager.language.form.messagebox.title.notification,
									text: language.item.button['delete'].notification,
									type: wa_manager.constants.form.messagebox.type.confirm,
									onClickButton: {
										ok: function(){
											wa_api.methods.DeleteFolders({
												token: wa_manager.methods.GetToken(),
												folders: items,
												callback: function(data){
													$.each(items, function(key, value){
														SelfObj.deleteItem(value);
													});
													checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
												}
											});
										}
									}
								},{});
								msgbox.Show({effect: true});
							},
							type: wa_manager.constants.control.buttonBox.button.type.leftGray,
							show: true,
							order: 1,
							'AnimateTime': 100
						},
						add: {
							text: language.buttons.add.text,
							click: function(){
								var msgbox = new wa_manager.form.MessageBox({
									type: wa_manager.constants.form.messagebox.type.folderAdd,
									folderAdd: {
										success: function(param){
											SelfObj.addItem({
												idFolder: param.folderId,
												name: param.folderName,
												checkBoxClick: function(checkBox, state){
													var checkAll = true,
														checkSome = false;

													$.each(SelfObj.items, function(key, value){
														if(!value.state.checked) checkAll = false;
														else checkSome = true;
													});

													if(checkAll) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.check, true);
													else if(checkSome) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.tick, true);
													else checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
												},
												actionDelete: function(id){
													SelfObj.deleteItem(id);
												}
											});
										}
									}
								},{visible: false});
								msgbox.Show({effect: true});
							},
							show: true,
							order: 1
						}
					}
				},{visible: true});
				//hide button delete
				SelfObj.BMHide();

				var infoTable = cwe('table','id,infotable',parent);

				//set header
				var head = cwe('tr','',cwe('thead','',infoTable));
				//checbox
				var checkBoxAll = new control.checkbox({
					holder: cwe('td','class,checked',head),
					onClick: function(checkBox, state){
						var checked = false,
							items = false;

						if(checkBox.state.check) checked = true;
						else if(checkBox.state.tick) checked = 'tick';
						else if(checkBox.state.uncheck) checked = false;

						$.each(SelfObj.items, function(key, value){
							items = true;
							if(checked != 'tick') if(value.state.checked != checked) value.SetChecked(checked);
						});

						if(!items || checkBox.state.uncheck) SelfObj.BMHide({effect: true});
						else SelfObj.BMShow({effect: true});
					}
				},{visible: true});
				//name of folder
				$(cwe('td','class,name',head)).html(language.infoHead.nameFolder);
				//option
				cwe('td','class,option',head);
				//mask
				$(cwe('td','class,value',head)).html(language.infoHead.countPages);
				//proxy
				$(cwe('td','class,value',head)).html(language.infoHead.countHits);
				//gu
				$(cwe('td','class,value',head)).html(language.infoHead.countClicks);

				proto.Data.itemsHolder = cwe('tbody','',infoTable);

				wa_api.methods.GetFolders({
					token: wa_manager.methods.GetToken(),
					callback: function(data){
						if(!data[jsonItem.Folders]) return;

						$.each(data[jsonItem.Folders], function(key, value){
							SelfObj.addItem({
								idFolder: value[jsonItem.IdFolder],
								name: value[jsonItem.Name],
								countPages: 0,
								countHits: 0,
								countClicks: 0,
								checkBoxClick: function(checkBox, state){
									var checkAll = true,
										checkSome = false;

									$.each(SelfObj.items, function(key, value){
										if(!value.state.checked) checkAll = false;
										else checkSome = true;
									});

									if(checkAll) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.check, true);
									else if(checkSome) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.tick, true);
									else checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
								},
								actionDelete: function(id){
									SelfObj.deleteItem(id);
								}
							});
						});
					}
				});
			};

			function Item(opt, param){
				var proto = new wa_manager.proto(),
					cwe = wa_api.utils.cwe,
					opts = proto.Opts,
					SelfObj = this,
					constant = wa_manager.constants.form.folders,
					control = wa_manager.control,
					language = wa_manager.language.form.folders,
					jsonItem = wa_api.Constants.OperationItem;

				//options
				proto.Opts = $.extend(true, proto.Opts, {
					holder: document.body,
					idFolder: null,
					name: null,
					countPages: 0,
					countHits: 0,
					countClicks: 0,
					onClick: function(idFolder){},
					checkBoxClick: function(checkBox, state){},
					'class': {
						check: 'check'
					},
					actionDelete: function(id){}
				});

				proto.Constructor = function(){
					var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('tr','',opts.holder);

					//checbox
					proto.Data.checkBox = new control.checkbox({
						holder: cwe('td','class,checked',parent),
						onClick: function(checkBox, state){
							if(checkBox.state.check){
								SelfObj.state.checked = true;
								$(parent).addClass(opts['class'].check);
							}
							else{
								SelfObj.state.checked = false;
								$(parent).removeClass(opts['class'].check);
							};

							opts.checkBoxClick(checkBox, state);
						}
					},{visible: true});
					$(parent).click(function(){
						proto.Data.checkBox.StateToogle();
					});
					//name of folder
					proto.Data.Name = cwe('span', 'id,link', cwe('td','class,name',parent));
					$(proto.Data.Name).click(function(e){
						e.stopPropagation();

						wa_manager.data.form.main.SetActiveForm({
							form: function(){
								return new wa_manager.form.Tasks({
									holder: wa_manager.data.form.main.GetContentHolder(),
									folderId: opts.idFolder
								},{visible: false});
							}
						});
					});
					//option
					var iconBox = new control.iconBox({
						holder: cwe('td','class,option',parent),
						items: {
                            geo: {
                                onClick: function(){
                                    wa_api.methods.GetGeoTargeting({
                                        token: wa_manager.methods.GetToken(),
                                        idFolder: opts.idFolder,
                                        callback: function(data){
                                            data = data[jsonItem.GeoTargeting];
                                            var graphData = {
                                                min: {
                                                    value: [],
                                                    data: {}
                                                }
                                            };
                                            $.each(data, function(key, value){
                                                graphData.min.value.push([value[jsonItem.IdZone], value[jsonItem.Target]]);
                                                graphData.min.data[value[jsonItem.IdZone]] = {
                                                    xTick: value[jsonItem.ZoneShortName],
                                                    tooltip: wa_manager.language.control.graphic.zoneName[value[jsonItem.ZoneShortName]]
                                                };
                                            });
                                            graphData.min.value.sort(function(a,b){return a[0]-b[0]});
                                            var msg = new wa_manager.form.MessageBox({
                                                type: wa_manager.constants.form.messagebox.type.setGeotargeting,
                                                setGeotargeting: {
                                                    folderId: opts.idFolder,
                                                    data: graphData
                                                }
                                            },{visible: false});
                                            msg.Show({effect: true});
                                        }
                                    });
                                },
                                show: false,
                                order: 2
                            },
							rename: {
								onClick: function(){
									var msgbox = new wa_manager.form.MessageBox({
										type: wa_manager.constants.form.messagebox.type.folderRename,
										folderRename: {
											folderId: proto.Opts.idFolder,
											folderName: proto.Opts.name,
											success: function(param){
												SelfObj.SetValues({
													name: param.folderName
												});
											}
										}
									},{visible: false});
									msgbox.Show({effect: true});
								},
								show: true,
                                order: 1
							},
							'delete': {
								onClick: function(){
									var msgbox = new wa_manager.form.MessageBox({
										title: wa_manager.language.form.messagebox.title.notification,
										text: language.item.icon['delete'].notification,
										type: wa_manager.constants.form.messagebox.type.confirm,
										onClickButton: {
											ok: function(){
												wa_api.methods.DeleteFolders({
													token: wa_manager.methods.GetToken(),
													folders: [proto.Opts.idFolder],
													callback: function(data){
														proto.Opts.actionDelete(proto.Opts.idFolder);
													}
												});
											}
										}
									},{});
									msgbox.Show({effect: true});
								},
								show: true,
                                order: 3
							}
						}
					},{visible: true});
					//pages
					proto.Data.pages = cwe('td','class,value',parent);
					//hits
					proto.Data.hits = cwe('td','class,value',parent);
					//clicks
					proto.Data.clicks = cwe('td','class,value',parent);

					//set values
					SelfObj.SetValues(opts);
				};

				//PROPERTYS
				this.state = {
					checked: false
				};
				this.htmlElement = null;

				//METHODS
				this.SetValues = function(obj){
					proto.Opts = $.extend(true, proto.Opts, obj);

					//set display
					//name
					$(proto.Data.Name).text(opts.name);
					//pages
					$(proto.Data.pages).text(wa_manager.utils.dataFormat.Int(opts.countPages));
					//hits
					$(proto.Data.hits).text(wa_manager.utils.dataFormat.Int(opts.countHits));
					//clicks
					$(proto.Data.clicks).text(wa_manager.utils.dataFormat.Int(opts.countClicks));
				};
				this.SetChecked = function(state){
					if(state) proto.Data.checkBox.SetState(wa_manager.constants.control.checkbox.state.check, true);
					else proto.Data.checkBox.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
				};
				this.GetValues = function(){
					return opts;
				};

				this.Destroy = proto.Destroy;
				this.Show = proto.Show;
				this.Hide = proto.Hide;
				this.Toogle = proto.Toogle;

				proto.Init(opt, param);
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;
			this.items = {};
			this.formInfo = {
				name: language.name,
				type: 'folders',
				generalMenu: true,
				generalMenuItem: true,
				displayImmediately: true,
				breadcrumb: true,
				breadcrumbLevel: 1
			};

			//METHODS
			this.BMHide = function(param){
				proto.Data.BM.buttons['delete'].Hide(param);
			};
			this.BMShow = function(param){
				proto.Data.BM.buttons['delete'].Show(param);
			};
			this.addItem = function(item_cfg){
				item_cfg.holder = proto.Data.itemsHolder;

				var item =  new Item(item_cfg,{visible: true});

				SelfObj.items[item_cfg.idFolder] = item;

				return item;
			};
			this.deleteItem = function(id){
				if(SelfObj.items[id]) {
					SelfObj.items[id].Destroy({
						callback: function(){
							delete SelfObj.items[id];
						}
					});
				};
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
		Domains: function(opt, param){
			var proto = new wa_manager.proto(),
				cwe = wa_api.utils.cwe,
				opts = proto.Opts,
				SelfObj = this,
				constant = wa_manager.constants.form.domains,
				control = wa_manager.control,
				language = wa_manager.language.form.domains,
				jsonItem = wa_api.Constants.OperationItem;

			//options
			proto.Opts = $.extend(true, proto.Opts, {
				holder: document.body,
				folderId: 0
			});

			proto.Constructor = function(){
				var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','',opts.holder);

				var notification = new wa_manager.control.texterror({
					holder: parent,
					text: wa_manager.language.notification.testPage
				},{visible: true});

				//add button panel
				var buttonBox = proto.Data.BM = new control.buttonBox({
					holder: parent,
					buttons: {
						'delete': {
							text: language.buttons['delete'].text,
							click: function(){
								var items = [];
								$.each(SelfObj.items, function(key, value){
									if(value.state.checked) items.push(value.GetValues().domainId);
								});

								var msgbox = new wa_manager.form.MessageBox({
									title: wa_manager.language.form.messagebox.title.notification,
									text: language.item.button['delete'].notification,
									type: wa_manager.constants.form.messagebox.type.confirm,
									onClickButton: {
										ok: function(){
											wa_api.methods.DeleteDomains({
												token: wa_manager.methods.GetToken(),
												folderId: opts.folderId,
												domains: items,
												callback: function(data){
													$.each(items, function(key, value){
														SelfObj.deleteItem(value);
													});
													checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
												}
											});
										}
									}
								},{});
								msgbox.Show({effect: true});
							},
							type: wa_manager.constants.control.buttonBox.button.type.leftGray,
							show: true,
							order: 1,
							'AnimateTime': 100
						},
						add: {
							text: language.buttons.add.text,
							click: function(){
								var msgbox = new wa_manager.form.MessageBox({
									type: wa_manager.constants.form.messagebox.type.domainAdd,
									domainAdd: {
										folderId: opts.folderId,
										success: function(param){
											SelfObj.addItem({
												folderId: opts.folderId,
												domainId: param.domainId,
												domain: param.domain,
												extSource: param.extSource,
												countHits: 0,
												countClicks: 0,
												checkBoxClick: function(checkBox, state){
													var checkAll = true,
														checkSome = false;

													$.each(SelfObj.items, function(key, value){
														if(!value.state.checked) checkAll = false;
														else checkSome = true;
													});

													if(checkAll) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.check, true);
													else if(checkSome) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.tick, true);
													else checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
												},
												actionDelete: function(id){
													SelfObj.deleteItem(id);
												}
											});
										}
									}
								},{visible: false});
								msgbox.Show({effect: true});
							},
							show: true,
							order: 1
						}
					}
				},{visible: true});
				//hide button delete
				SelfObj.BMHide();

				var infoTable = cwe('table','id,infotable',parent);

				//set header
				var head = cwe('tr','',cwe('thead','',infoTable));
				//checbox
				var checkBoxAll = new control.checkbox({
					holder: cwe('td','class,checked',head),
					onClick: function(checkBox, state){
						var checked = false,
							items = false;

						if(checkBox.state.check) checked = true;
						else if(checkBox.state.tick) checked = 'tick';
						else if(checkBox.state.uncheck) checked = false;

						$.each(SelfObj.items, function(key, value){
							items = true;
							if(checked != 'tick') if(value.state.checked != checked) value.SetChecked(checked);
						});

						if(!items || checkBox.state.uncheck) SelfObj.BMHide({effect: true});
						else SelfObj.BMShow({effect: true});
					}
				},{visible: true});
				//name of folder
				$(cwe('td','class,name',head)).html(language.infoHead.domen);
				//option
				cwe('td','class,option',head);
				//count Hits
				$(cwe('td','class,value',head)).html(language.infoHead.countHits);
				//count Clicks
				$(cwe('td','class,value',head)).html(language.infoHead.countClicks);

				proto.Data.itemsHolder = cwe('tbody','',infoTable);

				wa_api.methods.GetDomains({
					token: wa_manager.methods.GetToken(),
					folderId: opts.folderId,
					callback: function(data){
						if(!data[jsonItem.Domains]) return;

						$.each(data[jsonItem.Domains], function(key, value){
							SelfObj.addItem({
								folderId: opts.folderId,
								domainId: value[jsonItem.IdDomain],
								domain: value[jsonItem.Domain],
								extSource: value[jsonItem.ExtSource],
								countHits: 0,
								countClicks: 0,
								checkBoxClick: function(checkBox, state){
									var checkAll = true,
										checkSome = false;

									$.each(SelfObj.items, function(key, value){
										if(!value.state.checked) checkAll = false;
										else checkSome = true;
									});

									if(checkAll) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.check, true);
									else if(checkSome) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.tick, true);
									else checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
								},
								actionDelete: function(id){
									SelfObj.deleteItem(id);
								}
							});
						});
					}
				});
			};

			function Item(opt, param){
				var proto = new wa_manager.proto(),
					cwe = wa_api.utils.cwe,
					opts = proto.Opts,
					SelfObj = this,
					constant = wa_manager.constants.form.domains,
					control = wa_manager.control,
					language = wa_manager.language.form.domains,
					jsonItem = wa_api.Constants.OperationItem;

				//options
				proto.Opts = $.extend(true, proto.Opts, {
					holder: document.body,
					folderId: 0,
					domainId: 0,
					domain: null,
					extSource: null,
					countHits: 0,
					countClicks: 0,
					onClick: function(idFolder){},
					checkBoxClick: function(checkBox, state){},
					'class': {
						check: 'check'
					},
					actionDelete: function(id){}
				});

				proto.Constructor = function(){
					var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('tr','',opts.holder);

					//checbox
					proto.Data.checkBox = new control.checkbox({
						holder: cwe('td','class,checked',parent),
						onClick: function(checkBox, state){
							if(checkBox.state.check){
								SelfObj.state.checked = true;
								$(parent).addClass(opts['class'].check);
							}
							else{
								SelfObj.state.checked = false;
								$(parent).removeClass(opts['class'].check);
							};

							opts.checkBoxClick(checkBox, state);
						}
					},{visible: true});
					$(parent).click(function(){
						proto.Data.checkBox.StateToogle();
					});
					//domain
					proto.Data.domain = cwe('td','class,name',parent);
					//option
					var iconBox = new control.iconBox({
						holder: cwe('td','class,option',parent),
						items: {
							rename: {
								onClick: function(){
									var msgbox = new wa_manager.form.MessageBox({
										type: wa_manager.constants.form.messagebox.type.setDomain,
										setDomain: {
											folderId: proto.Opts.folderId,
											domainId: proto.Opts.domainId,
											domain: proto.Opts.domain,
											extSource: proto.Opts.extSource,
											success: function(param){
												SelfObj.SetValues({
													domain: param.domain,
													extSource: param.extSource
												});
											}
										}
									},{visible: false});
									msgbox.Show({effect: true});
								},
								show: true,
								tooltip: language.item.icon.rename.tooltip,
								order: 1
							},
							view: {
								onClick: function(){
									wa_api.methods.GetViewTargeting({
										token: wa_manager.methods.GetToken(),
										folderId: opts.folderId,
										domainId: opts.domainId,
										callback: function(data){
											data = data[jsonItem.ViewTargeting];
											var graphData = {
												min: {
													value: [],
													data: {}
												},
												max: {
													value: [],
													data: {}
												},
												give: {
													value: [],
													data: {}
												}
											};
											$.each(data, function(key, value){
												graphData.min.value.push([value[jsonItem.IdTime], value[jsonItem.Min]]);
												graphData.max.value.push([value[jsonItem.IdTime], value[jsonItem.Max]]);
												graphData.give.value.push([value[jsonItem.IdTime], value[jsonItem.Recd]]);
											});
											graphData.min.value.sort(function(a,b){return a[0]-b[0]});
											graphData.max.value.sort(function(a,b){return a[0]-b[0]});
											graphData.give.value.sort(function(a,b){return a[0]-b[0]});

											var msg = new wa_manager.form.MessageBox({
												type: wa_manager.constants.form.messagebox.type.setViewtargeting,
												setViewtargeting: {
													folderId: opts.folderId,
													domainId: opts.domainId,
													data: graphData
												}
											},{visible: false});
											msg.Show({effect: true});
										}
									});
								},
								show: true,
								order: 2
							},
							click: {
								onClick: function(){
									var msg = new wa_manager.form.MessageBox({
										type: wa_manager.constants.form.messagebox.type.setClicktargeting,
										setClicktargeting: {
											folderId: opts.folderId,
											domainId: opts.domainId
										}
									},{visible: false});
									msg.Show({effect: true});
								},
								show: true,
								order: 3
							},
							'delete': {
								onClick: function(){
									var msgbox = new wa_manager.form.MessageBox({
										title: wa_manager.language.form.messagebox.title.notification,
										text: language.item.icon['delete'].notification,
										type: wa_manager.constants.form.messagebox.type.confirm,
										onClickButton: {
											ok: function(){
												wa_api.methods.DeleteDomains({
													token: wa_manager.methods.GetToken(),
													folderId: proto.Opts.folderId,
													domains: [proto.Opts.domainId],
													callback: function(data){
														proto.Opts.actionDelete(proto.Opts.domainId);
													}
												});
											}
										}
									},{});
									msgbox.Show({effect: true});
								},
								show: true,
								order: 4
							}
						}
					},{visible: true});
					//hits
					proto.Data.hits = cwe('td','class,value',parent);
					//clicks
					proto.Data.clicks = cwe('td','class,value',parent);

					//set values
					SelfObj.SetValues(opts);
				};

				//PROPERTYS
				this.state = {
					checked: false
				};
				this.htmlElement = null;

				//METHODS
				this.SetValues = function(obj){
					proto.Opts = $.extend(true, proto.Opts, obj);

					//set display
					//domen
					$(proto.Data.domain).text(opts.domain);
					//hits
					$(proto.Data.hits).text(wa_manager.utils.dataFormat.Int(opts.countHits));
					//clicks
					$(proto.Data.clicks).text(wa_manager.utils.dataFormat.Int(opts.countClicks));
				};
				this.SetChecked = function(state){
					if(state) proto.Data.checkBox.SetState(wa_manager.constants.control.checkbox.state.check, true);
					else proto.Data.checkBox.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
				};
				this.GetValues = function(){
					return opts;
				};

				this.Destroy = proto.Destroy;
				this.Show = proto.Show;
				this.Hide = proto.Hide;
				this.Toogle = proto.Toogle;

				proto.Init(opt, param);
			};

			//PROPERTYS
			this.state = {};
			this.htmlElement = null;
			this.items = {};
			this.formInfo = {
				name: language.name,
				type: 'domens',
				generalMenu: true,
				generalMenuItem: false,
				displayImmediately: true,
				breadcrumb: true,
				breadcrumbLevel: 2
			};

			//METHODS
			this.BMHide = function(param){
				proto.Data.BM.buttons['delete'].Hide(param);
			};
			this.BMShow = function(param){
				proto.Data.BM.buttons['delete'].Show(param);
			};
			this.addItem = function(item_cfg){
				item_cfg.holder = proto.Data.itemsHolder;

				var item =  new Item(item_cfg,{visible: true});

				SelfObj.items[item_cfg.domainId] = item;

				return item;
			};
			this.deleteItem = function(id){
				if(SelfObj.items[id]) {
					SelfObj.items[id].Destroy({
						callback: function(){
							delete SelfObj.items[id];
						}
					});
				};
			};

			this.Destroy = proto.Destroy;
			this.Show = proto.Show;
			this.Hide = proto.Hide;
			this.Toogle = proto.Toogle;

			proto.Init(opt, param);
		},
        Tasks: function(opt, param){
            var proto = new wa_manager.proto(),
                cwe = wa_api.utils.cwe,
                opts = proto.Opts,
                SelfObj = this,
                constant = wa_manager.constants.form.tasks,
                control = wa_manager.control,
                language = wa_manager.language.form.tasks,
                jsonItem = wa_api.Constants.OperationItem;

            //options
            $.extend(true, opts, {
                holder: document.body,
                folderId: 0
            });

            proto.Constructor = function(){
                var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('div','',opts.holder);

                //add button panel
                var buttonBox = proto.Data.BM = new control.buttonBox({
                    holder: parent,
                    buttons: {
                        'delete': {
                            text: language.buttons['delete'].text,
                            click: function(){
                                var items = [];
                                $.each(SelfObj.items, function(key, value){
                                    if(value.state.checked) items.push(value.GetValues().taskId);
                                });

                                var msgbox = new wa_manager.form.MessageBox({
                                    title: wa_manager.language.form.messagebox.title.notification,
                                    text: language.item.button['delete'].notification,
                                    type: wa_manager.constants.form.messagebox.type.confirm,
                                    onClickButton: {
                                        ok: function(){
                                            wa_api.methods.DeleteTasks({
                                                token: wa_manager.methods.GetToken(),
                                                folderId: opts.folderId,
                                                tasks: items,
                                                callback: function(data){
                                                    $.each(items, function(key, value){
                                                        SelfObj.deleteItem(value);
                                                    });
                                                    checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
                                                }
                                            });
                                        }
                                    }
                                },{});
                                msgbox.Show({effect: true});
                            },
                            type: wa_manager.constants.control.buttonBox.button.type.leftGray,
                            show: true,
                            order: 1,
                            'AnimateTime': 100
                        },
                        add: {
                            text: language.buttons.add.text,
                            click: function(){
                                var msgbox = new wa_manager.form.MessageBox({
                                    type: wa_manager.constants.form.messagebox.type.addTask,
                                    addTask: {
                                        folderId: opts.folderId,
                                        success: function(param){
                                            SelfObj.addItem({
                                                folderId: param.folderId,
                                                taskId: param.taskId,
                                                allowProxy: param.allowProxy,
                                                ignoreGU: param.ignoreGU,
                                                rangeSize: param.rangeSize,
                                                mask: param.mask,
                                                uniquePeriod:  param.uniquePeriod,
                                                name: param.name,
                                                domain: param.domain,
                                                extSource: param.extSource,
                                                beforeClick: param.beforeClick,
                                                afterClick: param.afterClick,
                                                checkBoxClick: function(checkBox, state){
                                                    var checkAll = true,
                                                        checkSome = false;

                                                    $.each(SelfObj.items, function(key, value){
                                                        if(!value.state.checked) checkAll = false;
                                                        else checkSome = true;
                                                    });

                                                    if(checkAll) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.check, true);
                                                    else if(checkSome) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.tick, true);
                                                    else checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
                                                },
                                                actionDelete: function(id){
                                                    SelfObj.deleteItem(id);
                                                }
                                            });
                                        }
                                    }
                                },{visible: false});
                                msgbox.Show({effect: true});
                            },
                            show: true,
                            order: 1
                        }
                    }
                },{visible: true});
                //hide button delete
                SelfObj.BMHide();

                var infoTable = cwe('table','id,infotable',parent);

                //set header
                var head = cwe('tr','',cwe('thead','',infoTable));
                //checbox
                var checkBoxAll = new control.checkbox({
                    holder: cwe('td','class,checked',head),
                    onClick: function(checkBox, state){
                        var checked = false,
                            items = false;

                        if(checkBox.state.check) checked = true;
                        else if(checkBox.state.tick) checked = 'tick';
                        else if(checkBox.state.uncheck) checked = false;

                        $.each(SelfObj.items, function(key, value){
                            items = true;
                            if(checked != 'tick') if(value.state.checked != checked) value.SetChecked(checked);
                        });

                        if(!items || checkBox.state.uncheck) SelfObj.BMHide({effect: true});
                        else SelfObj.BMShow({effect: true});
                    }
                },{visible: true});
                //name of task
                $(cwe('td','class,name',head)).html(language.infoHead.name);
                //option
                cwe('td','class,option',head);
                //domen of task
                $(cwe('td','class,name',head)).html(language.infoHead.domain);
                //mask of task
                $(cwe('td','class,value',head)).html(language.infoHead.mask);

                proto.Data.itemsHolder = cwe('tbody','',infoTable);

                wa_api.methods.GetTasks({
                    token: wa_manager.methods.GetToken(),
                    folderId: opts.folderId,
                    callback: function(data){
                        if(!data[jsonItem.Tasks]) return;

                        $.each(data[jsonItem.Tasks], function(key, value){
                            SelfObj.addItem({
                                folderId: opts.folderId,
                                taskId: value[jsonItem.IdTask],
                                allowProxy: value[jsonItem.AllowProxy],
                                ignoreGU: value[jsonItem.IgnoreGU],
                                rangeSize: value[jsonItem.RangeSize],
                                mask: value[jsonItem.Mask],
                                uniquePeriod: value[jsonItem.UniqPeriod],
                                name: value[jsonItem.Name],
                                domain: value[jsonItem.Domain],
                                extSource: value[jsonItem.ExtSource],
                                beforeClick: value[jsonItem.BeforeClick],
                                afterClick: value[jsonItem.AfterClick],
                                checkBoxClick: function(checkBox, state){
                                    var checkAll = true,
                                        checkSome = false;

                                    $.each(SelfObj.items, function(key, value){
                                        if(!value.state.checked) checkAll = false;
                                        else checkSome = true;
                                    });

                                    if(checkAll) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.check, true);
                                    else if(checkSome) checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.tick, true);
                                    else checkBoxAll.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
                                },
                                actionDelete: function(id){
                                    SelfObj.deleteItem(id);
                                }
                            });
                        });
                    }
                });
            };

            function Item(opt, param){
                var proto = new wa_manager.proto(),
                    cwe = wa_api.utils.cwe,
                    opts = proto.Opts,
                    SelfObj = this,
                    constant = wa_manager.constants.form.tasks,
                    control = wa_manager.control,
                    language = wa_manager.language.form.tasks,
                    jsonItem = wa_api.Constants.OperationItem;

                //options
                proto.Opts = $.extend(true, proto.Opts, {
                    holder: document.body,
                    folderId: 0,
                    taskId: 0,
                    allowProxy: false,
                    ignoreGU: false,
                    rangeSize: wa_api.Constants.Limit.Mask.RangeSize.Value.Default,
                    mask: "",
                    uniquePeriod:  wa_api.Constants.Limit.Mask.UniqPeriod.Value.Default,
                    name: "",
                    domain: "",
                    extSource: "",
                    beforeClick: 0,
                    afterClick: 0,
                    onClick: function(idFolder){},
                    checkBoxClick: function(checkBox, state){},
                    'class': {
                        check: 'check'
                    },
                    actionDelete: function(id){}
                });

                proto.Constructor = function(){
                    var parent = proto.HtmlNodes.Main[0] = SelfObj.htmlElement = cwe('tr','',opts.holder);

                    //checbox
                    proto.Data.checkBox = new control.checkbox({
                        holder: cwe('td','class,checked',parent),
                        onClick: function(checkBox, state){
                            if(checkBox.state.check){
                                SelfObj.state.checked = true;
                                $(parent).addClass(opts['class'].check);
                            }
                            else{
                                SelfObj.state.checked = false;
                                $(parent).removeClass(opts['class'].check);
                            };

                            opts.checkBoxClick(checkBox, state);
                        }
                    },{visible: true});
                    $(parent).click(function(){
                        proto.Data.checkBox.StateToogle();
                    });
                    //name
                    proto.Data.name = cwe("span", "id,link", cwe('td','class,name',parent));
                    $(proto.Data.name).click(function(e){
                        e.stopPropagation();

                        var msg = new wa_manager.form.MessageBox({
                            type: wa_manager.constants.form.messagebox.type.editTask,
                            editTask: {
                                folderId: opts.folderId,
                                taskId: opts.taskId,
                                allowProxy: opts.allowProxy,
                                ignoreGU: opts.ignoreGU,
                                rangeSize: opts.rangeSize,
                                mask: opts.mask,
                                uniquePeriod:  opts.uniquePeriod,
                                name: opts.name,
                                domain: opts.domain,
                                extSource: opts.extSource,
                                beforeClick: opts.beforeClick,
                                afterClick: opts.afterClick,
                                success: function(param){
                                    SelfObj.SetValues({
                                        folderId: param.folderId,
                                        taskId: param.taskId,
                                        allowProxy: param.allowProxy,
                                        ignoreGU: param.ignoreGU,
                                        rangeSize: param.rangeSize,
                                        mask: param.mask,
                                        uniquePeriod:  param.uniquePeriod,
                                        name: param.name,
                                        domain: param.domain,
                                        extSource: param.extSource,
                                        beforeClick: param.beforeClick,
                                        afterClick: param.afterClick
                                    });
                                }
                            }
                        },{visible: false});
                        msg.Show({effect: true});
                    });
                    //option
                    var iconBox = new control.iconBox({
                        holder: cwe('td','class,option',parent),
                        items: {
                            rename: {
                                onClick: function(){
                                    return;
                                    var msgbox = new wa_manager.form.MessageBox({
                                        type: wa_manager.constants.form.messagebox.type.setDomain,
                                        setDomain: {
                                            folderId: proto.Opts.folderId,
                                            domainId: proto.Opts.domainId,
                                            domain: proto.Opts.domain,
                                            extSource: proto.Opts.extSource,
                                            success: function(param){
                                                SelfObj.SetValues({
                                                    domain: param.domain,
                                                    extSource: param.extSource
                                                });
                                            }
                                        }
                                    },{visible: false});
                                    msgbox.Show({effect: true});
                                },
                                show: false,
                                tooltip: language.item.icon.rename.tooltip,
                                order: 1
                            },
                            'delete': {
                                onClick: function(){
                                    var msgbox = new wa_manager.form.MessageBox({
                                        title: wa_manager.language.form.messagebox.title.notification,
                                        text: language.item.icon['delete'].notification,
                                        type: wa_manager.constants.form.messagebox.type.confirm,
                                        onClickButton: {
                                            ok: function(){
                                                wa_api.methods.DeleteTasks({
                                                    token: wa_manager.methods.GetToken(),
                                                    folderId: proto.Opts.folderId,
                                                    tasks: [proto.Opts.taskId],
                                                    callback: function(data){
                                                        proto.Opts.actionDelete(proto.Opts.taskId);
                                                    }
                                                });
                                            }
                                        }
                                    },{});
                                    msgbox.Show({effect: true});
                                },
                                show: true,
                                order: 4
                            },
                            geo: {
                                onClick: function(){
                                    wa_api.methods.GetGeoTargeting({
                                        token: wa_manager.methods.GetToken(),
                                        folderId: opts.folderId,
                                        taskId: opts.taskId,
                                        callback: function(data){
                                            data = data[jsonItem.GeoTargeting];
                                            var graphData = {
												give: {
													value: [],
													data: {}
												},
                                                min: {
                                                    value: [],
                                                    data: {}
                                                }
                                            };
                                            $.each(data, function(key, value){
                                                graphData.min.value.push([value[jsonItem.IdZone], value[jsonItem.Target]]);
                                                graphData.min.data[value[jsonItem.IdZone]] = {
                                                    xTick: value[jsonItem.ZoneShortName],
                                                    tooltip: wa_manager.language.control.graphic.zoneName[value[jsonItem.ZoneShortName]]
                                                };

												graphData.give.value.push([value[jsonItem.IdZone], value[jsonItem.Recd]]);
												graphData.give.data[value[jsonItem.IdZone]] = {
													xTick: value[jsonItem.ZoneShortName],
													tooltip: wa_manager.language.control.graphic.zoneName[value[jsonItem.ZoneShortName]]
												};
                                            });
                                            graphData.min.value.sort(function(a,b){return a[0]-b[0]});
											graphData.give.value.sort(function(a,b){return a[0]-b[0]});
                                            var msg = new wa_manager.form.MessageBox({
                                                type: wa_manager.constants.form.messagebox.type.setGeotargeting,
                                                setGeotargeting: {
                                                    folderId: opts.folderId,
                                                    taskId: opts.taskId,
                                                    data: graphData
                                                }
                                            },{visible: false});
                                            msg.Show({effect: true});
                                        }
                                    });
                                },
                                show: true,
                                order: 3
                            },
                            graphic: {
                                onClick: function(){
                                    wa_api.methods.GetTimeTargeting({
                                        token: wa_manager.methods.GetToken(),
                                        folderId: opts.folderId,
                                        taskId: opts.taskId,
                                        callback: function(data){
                                            data = data[jsonItem.TimeTargeting];
                                            var graphData = {
                                                min: {
                                                    value: [],
                                                    data: {}
                                                },
                                                max: {
                                                    value: [],
                                                    data: {}
                                                },
                                                give: {
                                                    value: [],
                                                    data: {}
                                                }
                                            };
                                            $.each(data, function(key, value){
                                                graphData.min.value.push([value[jsonItem.IdTime], value[jsonItem.Min]]);
                                                graphData.max.value.push([value[jsonItem.IdTime], value[jsonItem.Max]]);
                                                graphData.give.value.push([value[jsonItem.IdTime], value[jsonItem.Recd]]);
                                            });
                                            graphData.min.value.sort(function(a,b){return a[0]-b[0]});
                                            graphData.max.value.sort(function(a,b){return a[0]-b[0]});
                                            graphData.give.value.sort(function(a,b){return a[0]-b[0]});

                                            var msg = new wa_manager.form.MessageBox({
                                                type: wa_manager.constants.form.messagebox.type.setTimetargeting,
                                                setTimetargeting: {
                                                    folderId: opts.folderId,
                                                    taskId: opts.taskId,
                                                    data: graphData
                                                }
                                            },{visible: false});
                                            msg.Show({effect: true});
                                        }
                                    });
                                },
                                show: true,
                                order: 2
                            }
                        }
                    },{visible: true});
                    //domain
                    proto.Data.domain = cwe('td','class,name',parent);
                    //mask
                    proto.Data.mask = cwe('td','class,value',parent);

                    //set values
                    SelfObj.SetValues(opts);
                };

                //PROPERTYS
                this.state = {
                    checked: false
                };
                this.htmlElement = null;

                //METHODS
                this.SetValues = function(obj){
                    $.extend(true, opts, obj);

                    //set display
                    //name
                    $(proto.Data.name).text(opts.name);
                    //domain
                    $(proto.Data.domain).text(opts.domain);
                    //mask
                    $(proto.Data.mask).text(opts.mask);
                };
                this.SetChecked = function(state){
                    if(state) proto.Data.checkBox.SetState(wa_manager.constants.control.checkbox.state.check, true);
                    else proto.Data.checkBox.SetState(wa_manager.constants.control.checkbox.state.uncheck, true);
                };
                this.GetValues = function(){
                    return opts;
                };

                this.Destroy = proto.Destroy;
                this.Show = proto.Show;
                this.Hide = proto.Hide;
                this.Toogle = proto.Toogle;

                proto.Init(opt, param);
            };

            //PROPERTYS
            this.state = {};
            this.htmlElement = null;
            this.items = {};
            this.formInfo = {
                name: language.name,
                type: 'tasks',
                generalMenu: true,
                generalMenuItem: false,
                displayImmediately: true,
                breadcrumb: true,
                breadcrumbLevel: 2
            };

            //METHODS
            this.BMHide = function(param){
                proto.Data.BM.buttons['delete'].Hide(param);
            };
            this.BMShow = function(param){
                proto.Data.BM.buttons['delete'].Show(param);
            };
            this.addItem = function(item_cfg){
                item_cfg.holder = proto.Data.itemsHolder;

                var item =  new Item(item_cfg,{visible: true});

                SelfObj.items[item_cfg.taskId] = item;

                return item;
            };
            this.deleteItem = function(id){
                if(SelfObj.items[id]) {
                    SelfObj.items[id].Destroy({
                        callback: function(){
                            delete SelfObj.items[id];
                        }
                    });
                };
            };

            this.Destroy = proto.Destroy;
            this.Show = proto.Show;
            this.Hide = proto.Hide;
            this.Toogle = proto.Toogle;

            proto.Init(opt, param);
        }
	};

	//METHODS
	wa_manager.methods = {
		GetToken: function(){
			return wa_manager.data.user.token;
		},
		SetToken: function(token){
			return (wa_manager.data.user.token = token);
		}
	};

	//INIT
	wa_manager.init = function(obj){
		//set local link to manager options
		var opts = wa_manager.options,
			//set local link to manager data
			data = wa_manager.data,
			//set local link to manager forms
			form = wa_manager.form;

		//init wa_api
		wa_api.init({
			server: "http://node0.waspace-run.net:80/",
			json: {
				show: true,
				input : function(json_str){
					data.form.console.AppendText(
						wa_manager.utils.formatDate(new Date(), 'dd/mm/yyyy hh:nn:ss') + "\n" +
						"Send to server: \n-------------------\n" + json_str + "\n"
					);
				},
				output : function(json_str){
					data.form.console.AppendText(
						wa_manager.utils.formatDate(new Date(), 'dd/mm/yyyy hh:nn:ss') + "\n" +
						"Recive from server: \n------------------------\n" + json_str + "\n\n"
					);
				}
			},
			loader: {
				enable : true,
				show : function(){
					data.control.loader.Show({effect: true});
				},
				hide : function(){
					data.control.loader.Hide({effect: true});
				}
			},
			exception : {
				NoResponse : function(resp_data){
					var language = wa_manager.language,
						constant = wa_manager.constants;

					var msgbox = new wa_manager.form.MessageBox({
						title: language.form.messagebox.title.error,
						text: language.generalError.NoResponse.text,
						type: constant.form.messagebox.type.error
					},{});
					msgbox.Show({effect: true});
				},
				UnDefined : function(resp_data){
					var language = wa_manager.language,
						constant = wa_manager.constants;

					var msgbox = new wa_manager.form.MessageBox({
						title: language.form.messagebox.title.error,
						text: language.generalError.UnDefined.text,
						type: constant.form.messagebox.type.error
					},{});
					msgbox.Show({effect: true});
				},
				WrongDataFormat : function(resp_data){
					var language = wa_manager.language,
						constant = wa_manager.constants;

					var msgbox = new wa_manager.form.MessageBox({
						title: language.form.messagebox.title.error,
						text: language.generalError.WrongDataFormat.text,
						type: constant.form.messagebox.type.error
					},{});
					msgbox.Show({effect: true});
				},
				AntiDosBlock : function(resp_data){
					var language = wa_manager.language,
						constant = wa_manager.constants;

					var msgbox = new wa_manager.form.MessageBox({
						title: language.form.messagebox.title.error,
						text: language.generalError.AntiDosBlock.text,
						type: constant.form.messagebox.type.error
					},{});
					msgbox.Show({effect: true});
				},
				WrongSessionId : function(resp_data){
					data.form.main.LogOut(false);
				},
				NotActivated : function(resp_data){
					var language = wa_manager.language,
						constant = wa_manager.constants;

					var msgbox_opt = {
						title: language.form.messagebox.title.error,
						text: language.generalError.NotActivated.text,
						type: constant.form.messagebox.type.error,
						onClickButton: {}
					};
					msgbox_opt.onClickButton[constant.control.buttonBox.button.name.ok] = function(mbox){
						mbox.Destroy({
							callback: function(){
								alert("Функция активации аккаунта на данный момент недоступна.");
							}
						});
					};
					var msgbox = new wa_manager.form.MessageBox(msgbox_opt,{});
					msgbox.Show({effect: true});
				},
				MailSystemError : function(resp_data){
					var language = wa_manager.language,
						constant = wa_manager.constants;

					var msgbox = new wa_manager.form.MessageBox({
						title: language.form.messagebox.title.error,
						text: language.generalError.MailSystemError.text,
						type: constant.form.messagebox.type.error
					},{});
					msgbox.Show({effect: true});
				},
				Blocked: function(resp_data){
					var language = wa_manager.language,
						constant = wa_manager.constants;

					var msgbox_opt = {
						title: language.form.messagebox.title.error,
						text: language.generalError.Blocked.text,
						type: constant.form.messagebox.type.error,
						onClickButton: {}
					};
					msgbox_opt.onClickButton[constant.control.buttonBox.button.name.ok] = function(mbox){
						mbox.Destroy({
							callback: function(){
								data.form.main.LogOut();
							}
						});
					};
					var msgbox = new wa_manager.form.MessageBox(msgbox_opt,{});
					msgbox.Show({effect: true});
				},
				AccessDenied: function(resp_data){
					var language = wa_manager.language,
						constant = wa_manager.constants;

					var msgbox = new wa_manager.form.MessageBox({
						title: language.form.messagebox.title.error,
						text: language.generalError.AccessDenied.text,
						type: constant.form.messagebox.type.error
					},{visible: false});

					msgbox.Show({effect: true});
				}
			}
		});

		//get home path
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++)
			if(scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').indexOf('wa_manager.js') > 0){
				base_path = scripts[i].getAttribute('src').substr(0, scripts[i].getAttribute('src').length-13);
				break;
			};

		//set options
		wa_manager.options = $.extend(true, opts, obj);

		//set language
		wa_api.utils.addScript(base_path+'lang/wa_manager.language.'+wa_manager.utils.language.get()+'.js', true);

		//set status
		wa_manager.state = true;

		//runing application
		$(document.body).ready(function(e){
			//main
			data.form.main = new form.Main({}, {visible: true});
			//breadcrumb
			data.control.breadcrumb = new wa_manager.control.breadcrumb({holder: data.form.main.GetContentHolder()},{visible: false});
			//check browser
			if(!wa_manager.utils.isCompatibleBrowser_2()){
				data.form.main.SetActiveForm({
					form: function(){
						return new form.BadBrowser({holder: data.form.main.GetContentHolder()},{visible: false});
					}
				});
				return;
			};
			//loader
			data.control.loader = new wa_manager.control.loader({},{});
			//tooltip
			data.control.tooltip = new wa_manager.control.tooltip({},{});
			//console
			if(opts.console){
				data.form.console = new form.Console({}, {visible: true});
				data.form.console.AppendText(
					wa_manager.utils.formatDate(new Date(), 'dd/mm/yyyy hh:nn:ss') + "\n" +
						navigator.userAgent + "\n\n"
				);
			};
			//set active form
			setTimeout(function(){
				wa_manager.utils.getSelectedFormFromUrl(window.location.search);
				$(window).bind("beforeunload", function(e){
					if(wa_manager.methods.GetToken()){
						e.returnValue = wa_manager.language.notification.confirmExit;
						return wa_manager.language.notification.confirmExit;
					};
				});
			}, 500);
            //set Develop console
            $(window).keydown(function(e){
                if(e.shiftKey && e.keyCode == 123){//shift + F12
                    var msgbox = new wa_manager.form.MessageBox({
                        type: wa_manager.constants.form.messagebox.type.console
                    },{});
                    msgbox.Show({effect: true});
                };
            });
		});
	};
})(window);