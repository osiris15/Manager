(function(window){
	var document = window.document, base_path = "";
    
	var wa_api = window.wa_api = {
        options : {
            server : 'http://waspace.no-ip.org:81/',
            timeout: 30000,
            json : {
                show : false,
                input : function(){},
                output : function(){}
            },
            loader: {
                enable : false,
                show : function(){},
                hide : function(){}
            },
            exception : {
                NoResponse : function(){},
                UnDefined : function(){},
                WrongDataFormat : function(){},
                AntiDosBlock : function(){},
                WrongSessionId : function(){},
                NotActivated : function(){},
                MailSystemError : function(){},
				Blocked: function(){},
				AccessDenied: function(){}
            }
        },
        state : false
    };

    //METHODS
    wa_api.methods = {
        Auth: function(obj){
            obj = $.extend(true, {
				login: null,
				mail: null,
				password: null,
				remember: false,
                exception: {
                    NotMatch: function(){},
                    SessionLimit: function(){}
                },
				ge_callback: function(){}
            }, obj);

            var data = new wa_api.utils.json();
            data.SetOpcode(wa_api.Constants.OperationCode.Auth);
            if(obj.login) data.AddData(wa_api.Constants.OperationItem.Login, obj.login);
            else if(obj.mail) data.AddData(wa_api.Constants.OperationItem.Mail, obj.mail);
            data.AddData(wa_api.Constants.OperationItem.Password, obj.password);
			data.AddData(wa_api.Constants.OperationItem.Remember, obj.remember);
            data.SendData(obj.callback, obj.exception, obj.ge_callback);
        },
		LogOut: function(obj){
			obj = $.extend(true, {
				token: null,
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.LogOut);
			data.SetToken(obj.token);
			data.SendData(obj.callback, obj.exception, obj.ge_callback);
		},
        Register: function(obj){
            obj = $.extend(true, {
				login: null,
				mail: null,
				password: null,
				wmr: null,
				icq: null,
				invite: null,
                exception: {
                    MailExists: function(){},
                    LoginExists: function(){},
                    InviteNotFound: function(){},
					IcqExists: function(){},
					WmrExists: function(){},
					IpRangeNotRegistered: function(){}
                }
            }, obj);

            var data = new wa_api.utils.json();
            data.SetOpcode(wa_api.Constants.OperationCode.Registration);
            data.AddData(wa_api.Constants.OperationItem.Login, obj.login);
            data.AddData(wa_api.Constants.OperationItem.Mail, obj.mail);
            data.AddData(wa_api.Constants.OperationItem.Password, obj.password);
			data.AddData(wa_api.Constants.OperationItem.Wmr, obj.wmr);
			data.AddData(wa_api.Constants.OperationItem.Icq, obj.icq);
            data.AddData(wa_api.Constants.OperationItem.Invite, obj.invite);
            data.SendData(obj.callback, obj.exception);
        },
		AddFolder: function(obj){
			obj = $.extend(true, {
				exception: {
					LimitExceeded: function(){}
				}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Add.Folder);
			data.SetToken(obj.token);

			data.AddData(wa_api.Constants.OperationItem.Name, obj.name);

			data.SendData(obj.callback, obj.exception, obj.ge_callback);
		},
		AddDomain: function(obj){
			obj = $.extend(true, {
				exception: {
					LimitExceeded: function(){}
				}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Add.Domain);
			data.SetToken(obj.token);

			data.AddData(wa_api.Constants.OperationItem.IdFolder, obj.folderId);
			data.AddData(wa_api.Constants.OperationItem.Domain, obj.domain);
			data.AddData(wa_api.Constants.OperationItem.ExtSource, obj.extSource);

			data.SendData(obj.callback, obj.exception, obj.ge_callback);
		},
        AddMask: function(obj){
            obj = $.extend(true, {
                exception: {
                    LimitExceeded: function(){}
                }
            }, obj);

            var data = new wa_api.utils.json();
            data.SetOpcode(wa_api.Constants.OperationCode.Add.Mask);
            data.SetToken(obj.token);

            data.AddData(wa_api.Constants.OperationItem.Mask, obj.mask);
            data.AddData(wa_api.Constants.OperationItem.Name, obj.name);
            data.AddData(wa_api.Constants.OperationItem.IgnoreGU, obj.ignoregu);
            data.AddData(wa_api.Constants.OperationItem.AllowProxy, obj.allowproxy);
            data.AddData(wa_api.Constants.OperationItem.UniqPeriod, obj.uniqtime);
            data.AddData(wa_api.Constants.OperationItem.RangeSize, obj.rangesize);

            data.SendData(obj.callback, obj.exception, obj.ge_callback);
        },
        ChangeAccountPassword: function(obj){
            obj = $.extend(true, {
				token: null,
				password: null,
				newpassword: null,
				confirmation: null,
                exception: {
                    NotMatch: function(){},
                    WrongPassword: function(){}
                }
            }, obj);

            var data = new wa_api.utils.json();
            data.SetOpcode(wa_api.Constants.OperationCode.Change.Password);
            data.SetToken(obj.token);
            data.AddData(wa_api.Constants.OperationItem.Password, obj.password);
            data.AddData(wa_api.Constants.OperationItem.NewPassword, obj.newpassword);
            data.AddData(wa_api.Constants.OperationItem.Confirmation, obj.confirmation);
            data.SendData(obj.callback, obj.exception);
        },
		ChangeMail: function(obj){
			obj = $.extend(true, {
				exception: {
					PasswordNotMatch: function(){},
					MailNotMatch: function(){},
					MailExists: function(){}
				}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Change.Mail);
			data.SetToken(obj.token);
			data.AddData(wa_api.Constants.OperationItem.Password, obj.password);
			data.AddData(wa_api.Constants.OperationItem.NewMail, obj.newmail);
			data.AddData(wa_api.Constants.OperationItem.Confirmation, obj.confirmation);
			data.SendData(obj.callback, obj.exception);
		},
		ResetAccount: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Reset.Account);
			data.SetToken(obj.token);
			data.SendData(obj.callback, obj.exception);
		},
		ResetSurfingKey: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Reset.SurfingKey);
			data.SetToken(obj.token);
			data.SendData(obj.callback, obj.exception);
		},
		ResetReadonlyKey: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Reset.ReadonlyKey);
			data.SetToken(obj.token);
			data.SendData(obj.callback, obj.exception);
		},
        RestoreAccess: function(obj){
            obj = $.extend(true, {
				mail: null,
                exception: {
                    NotFound: function(){}
                }
            }, obj);

            var data = new wa_api.utils.json();
            data.SetOpcode(wa_api.Constants.OperationCode.Restore.Access);
            data.AddData(wa_api.Constants.OperationItem.Mail, obj.mail);
            data.SendData(obj.callback, obj.exception);
        },
		RestoreAccount: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Restore.Account);
			data.SetToken(obj.token);
			data.SendData(obj.callback, obj.exception);
		},
        GetGeneralInfo: function(obj){
            obj = $.extend(true, {
                exception: {}
            }, obj);

            var data = new wa_api.utils.json();
            data.SetOpcode(wa_api.Constants.OperationCode.Get.GeneralInfo);
            data.SetToken(obj.token);
            data.SendData(obj.callback, obj.exception);
        },
		GetMasks: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Get.Masks);
			data.SetToken(obj.token);
			data.SendData(obj.callback, obj.exception);
		},
		GetFolders: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Get.Folders);
			data.SetToken(obj.token);
			data.SendData(obj.callback, obj.exception);
		},
		GetAccessKeys: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Get.AccessKeys);
			data.SetToken(obj.token);
			data.SendData(obj.callback, obj.exception);
		},
        GetGeoTargeting: function(obj){
            obj = $.extend(true, {
                exception: {}
            }, obj);

            var data = new wa_api.utils.json();
            data.SetOpcode(wa_api.Constants.OperationCode.Get.GeoTargeting);
            data.SetToken(obj.token);
            data.AddData(wa_api.Constants.OperationItem.IdFolder, obj.idFolder);
            
            data.SendData(obj.callback, obj.exception);
        },
		GetViewTargeting: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Get.ViewTargeting);
			data.SetToken(obj.token);

			data.AddData(wa_api.Constants.OperationItem.IdFolder, obj.folderId);
			data.AddData(wa_api.Constants.OperationItem.IdDomain, obj.domainId);

			data.SendData(obj.callback, obj.exception);
		},
		GetClickTargeting: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Get.ClickTargeting);
			data.SetToken(obj.token);

			data.AddData(wa_api.Constants.OperationItem.IdFolder, obj.folderId);
			data.AddData(wa_api.Constants.OperationItem.IdDomain, obj.domainId);
			data.AddData(wa_api.Constants.OperationItem.IdMask, obj.maskId);

			data.SendData(obj.callback, obj.exception);
		},
		GetDomains: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Get.Domains);
			data.SetToken(obj.token);
			data.AddData(wa_api.Constants.OperationItem.IdFolder, obj.folderId);

			data.SendData(obj.callback, obj.exception);
		},
		SetVip: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Set.Vip);
			data.SetToken(obj.token);
			data.AddData(wa_api.Constants.OperationItem.Vip, obj.vip);
			data.SendData(obj.callback, obj.exception);
		},
		SetMask: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Set.Mask);
			data.SetToken(obj.token);

			data.AddData(wa_api.Constants.OperationItem.IdMask, obj.maskid);
			data.AddData(wa_api.Constants.OperationItem.Mask, obj.mask);
			data.AddData(wa_api.Constants.OperationItem.Name, obj.name);
			data.AddData(wa_api.Constants.OperationItem.IgnoreGU, obj.ignoregu);
			data.AddData(wa_api.Constants.OperationItem.AllowProxy, obj.allowproxy);
			data.AddData(wa_api.Constants.OperationItem.UniqPeriod, obj.uniqtime);
			data.AddData(wa_api.Constants.OperationItem.RangeSize, obj.rangesize);

			data.SendData(obj.callback, obj.exception, obj.ge_callback);
		},
		SetFolderName: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Set.FolderName);
			data.SetToken(obj.token);

			data.AddData(wa_api.Constants.OperationItem.IdFolder, obj.folderid);
			data.AddData(wa_api.Constants.OperationItem.Name, obj.name);

			data.SendData(obj.callback, obj.exception, obj.ge_callback);
		},
        SetGeoTargeting: function(obj){
            obj = $.extend(true, {
                exception: {}
            }, obj);

            var data = new wa_api.utils.json();
            data.SetOpcode(wa_api.Constants.OperationCode.Set.GeoTargeting);
            data.SetToken(obj.token);
            data.AddData(wa_api.Constants.OperationItem.IdFolder, obj.idFolder);
            var geo = [];
            $.each(obj.geoData, function(key, value){
				if(value.value == 0) return;

                var data = {};
                data[wa_api.Constants.OperationItem.IdZone] = value.id;
                data[wa_api.Constants.OperationItem.Target] = value.value;
                geo.push(data);
            });
            data.AddData(wa_api.Constants.OperationItem.GeoTargeting, geo);

            data.SendData(obj.callback, obj.exception, obj.ge_callback);
        },
		SetViewTargeting: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Set.ViewTargeting);
			data.SetToken(obj.token);

			data.AddData(wa_api.Constants.OperationItem.IdFolder, obj.folderId);
			data.AddData(wa_api.Constants.OperationItem.IdDomain, obj.domainId);

			var view = [];
			$.each(obj.viewData.min, function(key, value){
				if(obj.viewData.max[key].value == 0) return;

				var data = {};

				data[wa_api.Constants.OperationItem.IdTime] = value.id;
				data[wa_api.Constants.OperationItem.Min] = value.value;
				data[wa_api.Constants.OperationItem.Max] = obj.viewData.max[key].value;

				view.push(data);
			});
			data.AddData(wa_api.Constants.OperationItem.ViewTargeting, view);

			data.SendData(obj.callback, obj.exception, obj.ge_callback);
		},
		SetClickTargeting: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Set.ClickTargeting);
			data.SetToken(obj.token);

			data.AddData(wa_api.Constants.OperationItem.IdFolder, obj.folderId);
			data.AddData(wa_api.Constants.OperationItem.IdDomain, obj.domainId);
			data.AddData(wa_api.Constants.OperationItem.IdMask, obj.maskId);

			var click = [];
			$.each(obj.clickData.min, function(key, value){
				if(obj.clickData.max[key].value == 0) return;

				var data = {};

				data[wa_api.Constants.OperationItem.IdTime] = value.id;
				data[wa_api.Constants.OperationItem.Min] = value.value;
				data[wa_api.Constants.OperationItem.Max] = obj.clickData.max[key].value;

				click.push(data);
			});
			data.AddData(wa_api.Constants.OperationItem.ClickTargeting, click);

			data.SendData(obj.callback, obj.exception, obj.ge_callback);
		},
		SetDomain: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Set.Domain);
			data.SetToken(obj.token);

			data.AddData(wa_api.Constants.OperationItem.IdFolder, obj.folderId);
			data.AddData(wa_api.Constants.OperationItem.IdDomain, obj.domainId);
			data.AddData(wa_api.Constants.OperationItem.Domain, obj.domain);
			data.AddData(wa_api.Constants.OperationItem.ExtSource, obj.extSource);

			data.SendData(obj.callback, obj.exception, obj.ge_callback);
		},
		DeleteFolders: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Delete.Folders);
			data.SetToken(obj.token);

			data.AddData(wa_api.Constants.OperationItem.IdsFolder, obj.folders);

			data.SendData(obj.callback, obj.exception);
		},
		DeleteDomains: function(obj){
			obj = $.extend(true, {
				exception: {}
			}, obj);

			var data = new wa_api.utils.json();
			data.SetOpcode(wa_api.Constants.OperationCode.Delete.Domains);
			data.SetToken(obj.token);

			data.AddData(wa_api.Constants.OperationItem.IdFolder, obj.folderId);
			data.AddData(wa_api.Constants.OperationItem.IdsDomain, obj.domains);

			data.SendData(obj.callback, obj.exception);
		},
        DeleteMasks: function(obj){
            obj = $.extend(true, {
                exception: {}
            }, obj);

            var data = new wa_api.utils.json();
            data.SetOpcode(wa_api.Constants.OperationCode.Delete.Masks);
            data.SetToken(obj.token);

            data.AddData(wa_api.Constants.OperationItem.IdsMasks, obj.masks);

            data.SendData(obj.callback, obj.exception);
        }
    };

    //UTILITES
    wa_api.utils = {
        cwe : function(tag, attr, parent){
            var element = document.createElement(tag);
            if(attr){
                if (attr.length > 0) {
                    var array = attr.split(";");
                    for (var x = 0; x<=array.length - 1; x++) {
                        var tattr = array[x].split(",");
                        element.setAttribute(tattr[0], tattr[1]);
                    };
                };
            };

            if(parent){
                if(window.jQuery)$(parent).append(element);
                else parent.appendChild(element);
            };

            return element;
        },
        addScript : function(path, anticache){
            return this.cwe('script','type,text/javascript;src,'+path+((anticache)?"?rnd="+Math.random():""), document.getElementsByTagName('head')[0]);
        },
        addStyleSheet : function(path, anticache){
            return this.cwe('link','rel,stylesheet;type,text/css;href,'+path+((anticache)?"?rnd="+Math.random():""), document.getElementsByTagName('head')[0]);
        },
        cookie : {
            Get : function(name){
                var cookie = " " + document.cookie;
                var search = " " + name + "=";
                var setStr = null;
                var offset = 0;
                var end = 0;
                if (cookie.length > 0){
                    offset = cookie.indexOf(search);
                    if (offset != -1){
                        offset += search.length;
                        end = cookie.indexOf(";", offset);
                        if (end == -1) {
                            end = cookie.length;
                        };
                        setStr = unescape(cookie.substring(offset, end));
                    };
                };
                return(setStr);
            },
            Set : function(name, value, expires, path, domain, secure){
                document.cookie = name + "=" + escape(value) +
                    ((expires) ? "; expires=" + expires : "") +
                    ((path) ? "; path=" + path : "") +
                    ((domain) ? "; domain=" + domain : "") +
                    ((secure) ? "; secure" : "");
            },
            Del : function(name){
                var cookie_date = new Date ( );
                cookie_date.setTime ( cookie_date.getTime() - 1 );
                document.cookie = name += "=; expires=" + cookie_date.toGMTString();
            },
            GetExpiresDataByDay : function(countDays){
                var exdate=new Date();
                exdate.setDate(exdate.getDate() + countDays);
                return exdate.toGMTString();
            }
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
        sendData : function(data, callback){
            if(wa_api.options.loader.enable) wa_api.options.loader.show();
            var complete = false,
                defaultResponse = "{\n\""+wa_api.Constants.OperationItem.Status+"\":\""+wa_api.Constants.ResponseStatus.GeneralError+"\",\n\""+wa_api.Constants.OperationItem.Error+"\":"+"\""+wa_api.Constants.GeneralError.NoResponse+"\"\n"+"}";
            var IFRAME = wa_api.utils.cwe('iframe','',document.getElementsByTagName('body')[0]);
            IFRAME.contentWindow.name = defaultResponse;
            $(IFRAME).css({
				'display': 'none',
				'position': 'fixed',
				'top': 0,
				'left': -2000,
				'width': 0,
				'height': 0
			});
            var DOCUMENT = IFRAME.contentWindow.document;
            if(!DOCUMENT.body)DOCUMENT.appendChild(DOCUMENT.createElement('body'));
            var FORM = wa_api.utils.cwe('form','method,POST;enctype,application/x-www-form-urlencoded;accept-charset,utf-8;action,'+wa_api.options.server+'?rnd='+Math.random(),DOCUMENT.body);
            var TEXTAREA = wa_api.utils.cwe('textarea','name,v',FORM);
            TEXTAREA.value = data;
            $(FORM).submit();
            if(wa_api.options.json.show) wa_api.options.json.input(data);
            var processResponse = function(resp){
                if(wa_api.options.loader.enable) wa_api.options.loader.hide();
                $(IFRAME).remove();
                resp = decodeURI(resp);
                if(wa_api.options.json.show) wa_api.options.json.output(resp);
                if(callback) callback(resp);
            };
			$(IFRAME).bind('load',function(e){
				if(window.navigator.appName == 'Opera'){
					var interval = new wa_api.utils.interval(function(){
						if(IFRAME.contentWindow.name != defaultResponse){
							complete = true;
							interval.stop();
							processResponse(IFRAME.contentWindow.name);
						};
					}, 100);
					interval.start();
					$(IFRAME).unbind('load');
				}else{
					IFRAME.contentWindow.location.href='about:blank';
					$(IFRAME).bind('load',function(e){
						complete = true;
						processResponse(IFRAME.contentWindow.name);
					});
				};
            });
            setTimeout(function(){
                if(!complete){
                    $(IFRAME).unbind();
                    complete = true;
                    processResponse(defaultResponse);
                };
            },wa_api.options.timeout);
        },
        json : function(){
            var SelfObj = this;
            var DATA = {};
            DATA[wa_api.Constants.OperationItem.Action] = null;
            DATA[wa_api.Constants.OperationItem.Data] = {};

            this.SetOpcode = function(opcode){
                DATA[wa_api.Constants.OperationItem.Action] = opcode;
            };
            this.SetToken = function(token){
                DATA[wa_api.Constants.OperationItem.Data][wa_api.Constants.OperationItem.Token] = token;
            };
            this.AddData = function(key, value){
                DATA[wa_api.Constants.OperationItem.Data][key] = value;
            };
            this.FormatToJSON = function(){
                return $.toJSON(DATA);
            };
            this.FormatToObject = function(json_str){
                //return $.evalJSON("v="+json_str);
                return eval("v="+json_str);
            };
            this.SendData = function(callback, exception, ge_callback){
                wa_api.utils.sendData(this.FormatToJSON(), function(resp){
                    resp = SelfObj.FormatToObject(resp);
                    var data = {};
                    data[wa_api.Constants.OperationItem.Data] = {};
                    resp = $.extend(true, resp, data);//set default response block data

                    switch(resp[wa_api.Constants.OperationItem.Status]){
                        case wa_api.Constants.ResponseStatus.Success:
                            if(callback) callback(resp[wa_api.Constants.OperationItem.Data]);
                            break;
                        case wa_api.Constants.ResponseStatus.QueryError:
                            if(exception){
                                $.each(wa_api.Constants.QueryError, function(key, value){
                                    if(value == resp[wa_api.Constants.OperationItem.Error]){
                                        exception[key](resp[wa_api.Constants.OperationItem.Data]);
                                        return;
                                    };
                                });
                            };
                            break;
                        case wa_api.Constants.ResponseStatus.GeneralError:
                            switch(resp[wa_api.Constants.OperationItem.Error]){
                                case wa_api.Constants.GeneralError.AntiDosBlock:
                                    wa_api.options.exception.AntiDosBlock(resp[wa_api.Constants.OperationItem.Data]);
                                    break;
                                case wa_api.Constants.GeneralError.MailSystemError:
                                    wa_api.options.exception.MailSystemError(resp[wa_api.Constants.OperationItem.Data]);
                                    break;
                                case wa_api.Constants.GeneralError.NoResponse:
                                    wa_api.options.exception.NoResponse(resp[wa_api.Constants.OperationItem.Data]);
                                    break;
                                case wa_api.Constants.GeneralError.NotActivated:
                                    wa_api.options.exception.NotActivated(resp[wa_api.Constants.OperationItem.Data]);
                                    break;
								case wa_api.Constants.GeneralError.Blocked:
									wa_api.options.exception.Blocked(resp[wa_api.Constants.OperationItem.Data]);
									break;
                                case wa_api.Constants.GeneralError.UnDefined:
                                    wa_api.options.exception.UnDefined(resp[wa_api.Constants.OperationItem.Data]);
                                    break;
                                case wa_api.Constants.GeneralError.WrongDataFormat:
                                    wa_api.options.exception.WrongDataFormat(resp[wa_api.Constants.OperationItem.Data]);
                                    break;
                                case wa_api.Constants.GeneralError.WrongSessionId:
                                    wa_api.options.exception.WrongSessionId(resp[wa_api.Constants.OperationItem.Data]);
                                    break;
								case wa_api.Constants.GeneralError.AccessDenied:
									wa_api.options.exception.AccessDenied(resp[wa_api.Constants.OperationItem.Data]);
									break;
                            };
							if(ge_callback) ge_callback(resp[wa_api.Constants.OperationItem.Data]);
                            break;
                    };
                });
            };
        },
		isInt: function(string){
			return (string == parseInt(string).toString());
		},
        verify: {
			regexp: {
				login: /^.*$/,
				mail: /^[a-zA-Z0-9\.\-_]+@[a-zA-Z0-9\-]+\.[a-zA-Z]{2,6}$/,
				password:  /^.*$/,
				invite:  /^.*$/,
				icq: /^\d+$/,
				wmr: /^R\d+$/,
				mask: {
					rangeSize: /^\d+$/,
					mask: /^.*$/,
					uniquePeriod: /^\d+$/,
					name: /^.*$/
				},
				folder: {
					name: /^.*$/
				},
				domain: {
					domain: /^([\-a-zA-Zа-яА-Я0-9]+)?(?:[a-zA-Zа-яА-Я0-9][\-a-zA-Zа-яА-Я0-9]*[a-zA-Zа-яА-Я0-9]\.)+[a-zA-Zа-яА-Я]{2,6}$/,
					extSource: "^(?:(?:ht|f)tps?://){1}([\-a-zA-Zа-яА-Я0-9]+)?(?:[a-zA-Zа-яА-Я0-9][\-a-zA-Zа-яА-Я0-9]*[a-zA-Zа-яА-Я0-9]\.)+[a-zA-Zа-яА-Я]{2,6}(?::\d{1,5})?(?:[?/\\#][?!^$.(){}:|=[\]+\-/\\*;&~#@,%\wА-Яа-я]*)?$"
				}
			},
            Login: function(login){
                if(login.search(this.regexp.login) == -1 || login.length < wa_api.Constants.Limit.Account.Login.Length.Min || login.length > wa_api.Constants.Limit.Account.Login.Length.Max)
                    return false;
                else
                    return true;
            },
            Mail: function(mail){
                if(mail.search(this.regexp.mail) == -1 || mail.length < wa_api.Constants.Limit.Account.Mail.Length.Min || mail.length > wa_api.Constants.Limit.Account.Mail.Length.Max)
                    return false;
                else
                    return true;
            },
            Password: function(pass){
                if(pass.search(this.regexp.password) == -1 || pass.length < wa_api.Constants.Limit.Account.Password.Length.Min || pass.length > wa_api.Constants.Limit.Account.Password.Length.Max)
                    return false;
                else
                    return true;
            },
            Invite: function(invite){
                if(invite.search(this.regexp.invite) == -1 || invite.length < wa_api.Constants.Limit.Account.Invite.Length.Min || invite.length > wa_api.Constants.Limit.Account.Invite.Length.Max)
                    return false;
                else
                    return true;
            },
			Icq: function(icq){
				if(icq.search(this.regexp.icq) == -1 || icq.length < wa_api.Constants.Limit.Account.Icq.Length.Min || icq.length > wa_api.Constants.Limit.Account.Icq.Length.Max)
					return false;
				else
					return true;
			},
			Wmr: function(wmr){
				if(wmr.search(this.regexp.wmr) == -1 || wmr.length < wa_api.Constants.Limit.Account.Wmr.Length.Min || wmr.length > wa_api.Constants.Limit.Account.Wmr.Length.Max)
					return false;
				else
					return true;
			},
			Mask: {
				RangeSize: function(data){
					var regexp = wa_api.utils.verify.regexp;

					if(data.toString().search(regexp.mask.rangeSize) == -1 || data < wa_api.Constants.Limit.Mask.RangeSize.Value.Min || data > wa_api.Constants.Limit.Mask.RangeSize.Value.Max)
						return false;
					else
						return true;
				},
				Mask: function(data){
					var regexp = wa_api.utils.verify.regexp;

					if(data.search(regexp.mask.mask) == -1 || data.length < wa_api.Constants.Limit.Mask.Mask.Length.Min || data.length > wa_api.Constants.Limit.Mask.Mask.Length.Max)
						return false;
					else
						return true;
				},
				UniqPeriod: function(data){
					var regexp = wa_api.utils.verify.regexp;

					if(data.toString().search(regexp.mask.uniquePeriod) == -1 || data < wa_api.Constants.Limit.Mask.UniqPeriod.Value.Min || data > wa_api.Constants.Limit.Mask.UniqPeriod.Value.Max)
						return false;
					else
						return true;
				},
				Name: function(data){
					var regexp = wa_api.utils.verify.regexp;

					if(data.search(regexp.mask.name) == -1 || data.length < wa_api.Constants.Limit.Mask.Name.Length.Min || data.length > wa_api.Constants.Limit.Mask.Name.Length.Max)
						return false;
					else
						return true;
				}
			},
			Folder: {
				Name: function(data){
					var regexp = wa_api.utils.verify.regexp;

					if(data.search(regexp.folder.name) == -1 || data.length < wa_api.Constants.Limit.Folder.Name.Length.Min || data.length > wa_api.Constants.Limit.Folder.Name.Length.Max)
						return false;
					else
						return true;
				}
			}
        },
        randomInt: function(min, max){
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    };

    //CONSTANTS
    wa_api.Constants = {
        OperationCode : {
            Auth : 'Sign in',
			LogOut: 'Sign out',
            Registration : 'Sign up',
            Activate : 'Activate',

            Get : {
                GeneralInfo : 'Get general info',
                Balance : 'Get balance',
                TimeBonus : 'Get timebonus',
                Invite : 'Get invite',
				Masks: 'Get masks',
				Folders: 'Get folders',
				AccessKeys: 'Get access keys',
                GeoTargeting: 'Get geo targeting',
				ViewTargeting: 'Get views targeting',
				ClickTargeting: 'Get clicks targeting',
				Domains: 'Get domains'
            },

            Set : {
                AccountStatus: 'Set account status',
				Vip: 'Set VIP',
				MaskRangeSize: 'Set mask range size',
				Mask: 'Set mask',
				FolderName: 'Set folder name',
                GeoTargeting: 'Set geo targeting',
				ViewTargeting: 'Set views targeting',
				ClickTargeting: 'Set clicks targeting',
				Domain: 'Set domain'
            },

            Add : {
                Folder: 'Add folder',
				Domain: 'Add domain',
                Mask: 'Add mask'
            },

            Delete : {
                Folders : 'Delete folders',
				Domains: 'Delete domains',
                Masks: 'Delete masks'
            },

            Edit : {
                Dataset : 'Edit dataset'
            },

            Rename : {
                Dataset : 'Rename dataset'
            },

            Change : {
                Login : 'Change login',
                Mail : 'Change mail',
                Password : 'Change password'
            },

            Restore : {
                Access: 'Restore access',
				Account: 'Restore account'
            },

			Reset : {
				Account: 'Reset account',
				SurfingKey: 'Reset surfing key',
				ReadonlyKey: 'Reset readonly key'
			}
        },

        OperationItem : {
            Action : 'Action',
            Status : 'Status',
            Error : 'Error',
            Data : 'Data',
            Login : 'Login',
            Mail : 'Mail',
            Password : 'Password',
            Token : 'Token',
            Invite : 'Invite',
            Offset : 'Offset',
            Count : 'Count',
            Name : 'Name',
            Fields : 'Fields',
            NewDatasetId : 'New dataset ID',
            Id : 'ID',
            Use : 'In use',
            FieldsCount : 'Fields count',
            DataSets : 'Datasets',
            SetsCount : 'Sets count',
            Ids : 'IDs',
            NewName : 'New name',
            IdSet : 'SetID',
            ActivationCode : 'Activation code',
            RegDate : 'Register timestamp',
            NewLogin : 'New login',
            NewMail : 'New mail',
            NewPassword : 'New password',
            Confirmation : 'Confirmation',
			Icq: 'ICQ',
			Wmr: 'WMR',
			InActivity: 'Inactivity',
			Balance: 'Balance',
			SystemWmr: 'SystemWMR',
			Deleted: 'Deleted',
			TimeBonus: 'Timebonus',
			Vip: 'VIP',
			AllowProxy: 'Allow proxy',
			IgnoreGU: 'Ignore GU',
			IdMask: 'Mask ID',
			RangeSize: 'Range size',
			Mask: 'Mask',
			UniqPeriod: 'Unique period',
			Masks: 'Masks',
			Folders: 'Folders',
			IdFolder: 'Folder ID',
			IdsFolder: 'Folder IDs',
			SurfingKey: 'Surfing key',
			ReadonlyKey: 'Readonly key',
			Remember: 'Remember',
            GeoTargeting: 'Geo targeting',
			ViewTargeting: 'Views targeting',
			ClickTargeting: 'Clicks targeting',
            IdZone: 'Zone ID',
            Target: 'Target',
            ZoneShortName: 'Zone shortname',
			Domains: 'Domains',
			IdDomain: 'Domain ID',
			Domain: 'Domain',
			ExtSource: 'Ext source',
			IdsDomain: 'Domain IDs',
            IdsMasks: 'Mask IDs',
			IdTime: 'Time ID',
			Recd: 'Recd',
			Min: 'Min',
			Max: 'Max'
        },

        ResponseStatus : {
            GeneralError : 'General error',
            QueryError : 'Query error',
            Success : 'Success'
        },

        GeneralError : {
            NoResponse : 'No response',
            UnDefined : 'Undefined',
            WrongDataFormat : 'Wrong data format',
            AntiDosBlock : 'AntiDOS block',
            WrongSessionId : 'Wrong session ID',
            NotActivated : 'Account not activated',
			Blocked: 'Account blocked',
            MailSystemError : 'Mail system error',
			AccessDenied: 'Access denied'
        },

        QueryError : {
            NotMatch : 'Not match',
            NotFound: 'Not found',
            SessionLimit : 'Session limit',
            MailExists : 'Mail exists',
            LoginExists : 'Login exists',
            InviteNotFound : 'Invite not found',
            NameExists : 'Name exists',
            LimitExceeded : 'Limit exceeded',
            FieldsLimitExceeded : 'Fields limit exceeded',
            CannotRemove : 'Cannot remove',
            AlreadyActive : 'Already active',
            AlreadyExists: 'Already exists',
            WrongActivationCode : 'Wrong activation code',
            WrongPassword: 'Wrong password',
            PasswordNotMatch : 'Password not match',
            MailNotMatch : 'Mail not match',
            Forbidden: 'Forbidden',
			IcqExists: 'ICQ UIN exists',
			WmrExists: 'WMR exists',
			IpRangeNotRegistered: 'IP range not registered'
        },

        AccountStatus : {
            Active : 0,
            Frozen : 1,
            Blocked : 2,
            Awaiting : 3
        },

        Limit : {
            Account : {
                Login : {
                    Length : {
                        Min : 4,
                        Max : 50
                    }
                },

                Password : {
                    Length : {
                        Min : 3,
                        Max : 40
                    }
                },

                Mail : {
                    Length : {
                        Min : 8,
                        Max : 70
                    }
                },

                Invite : {
                    Length : {
                        Min : 40,
                        Max : 55
                    }
                },

				Icq : {
					Length : {
						Min : 4,
						Max : 9
					}
				},

				Wmr : {
					Length : {
						Min : 13,
						Max : 13
					}
				}
            },

			Mask: {
				RangeSize: {
					Value: {
						Min: 10,
						Max: 20,
						Default: 16
					}
				},
				Mask: {
					Length: {
						Min: 0,
						Max: 50
					}
				},
				UniqPeriod: {
					Value: {
						Min: 0,
						Max: 28800,
						Default: 1440
					}
				},
				Name: {
					Length: {
						Min: 0,
						Max: 50
					}
				}
			},

			Folder: {
				Name: {
					Length: {
						Min: 1,
						Max: 50
					}
				}
			},

			Domain: {
				Domain: {
					Length: {
						Min: 5,
						Max: 255
					}
				},
				ExtSource: {
					Length: {
						Min: 5,
						Max: 500
					}
				}
			}
        }
    };

    //INIT
    wa_api.init = function(obj){
        //get home path
        var scripts = document.getElementsByTagName('script');
        for(var i=0;i<scripts.length;i++)
            if(scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').indexOf('wa_api.js') > 0){
                base_path = scripts[i].getAttribute('src').substr(0, scripts[i].getAttribute('src').length-9);
                break;
            };

        wa_api.options = $.extend(true, wa_api.options, obj);

        //set status
        wa_api.state = true;
    };
})(window);