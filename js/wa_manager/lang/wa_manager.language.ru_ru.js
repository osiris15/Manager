wa_manager.language = {
	service: {
		description: "Сервис интернет автоматизации"
	},
	languages: {
		ru: "Русский",
		en: "English",
		ua: "Українська"
	},
	generalError: {
		NoResponse: {
			text: "Сервер вовремя не ответил на запрос. Попробуйте снова немного позже."
		},
		UnDefined: {
			text: "При обработке запроса на сервере возникла непредвиденная ошибка."
		},
		WrongDataFormat: {
			text: "Сервер не смог обработать запрос, так как были отправлены неверно сформированные данные."
		},
		AntiDosBlock: {
			text: "Действие было заблокированно системой AntiDOS сервера. Попробуйте снова немного позже."
		},
		WrongSessionId: {
			text: "Ваша сессия устарела. Авторизуйтесь на сайте и попробуйте снова."
		},
		NotActivated: {
			text: "Ваш аккаунт еще не активирован, для полноценного использования сервиса необходимо активировать аккаунт."
		},
		MailSystemError: {
			text: "На почтовом сервере возникла ошибка."
		},
		Blocked: {
			text: "Ваш аккаунт заблокирован."
		},
		AccessDenied: {
			text: "Доступ запрещен. Операция не была выполнена."
		}
	},
	other: {
		allRightsReserved: "Все права защищены",
		informationHiden: "Информация скрыта",
		mobileBrowser: {
			text: "Вы используете мобильный браузер. Возможна некорректная работа веб-приложения WaspAce. Все равно прололжить?"
		}
	},
	form: {
		auth: {
			name: "Авторизация",
			title: {
				auth: "Авторизация",
				reg: "Регистрация"
			},
			mail: {
				text: "Email",
				tooltip: "Введите email адрес вашего аккаунта",
				error: "Вами был введен неверный email адрес. Введите ваш email адрес и попробуйте снова."
			},
			password: {
				text: "Пароль",
				tooltip: "Введите пароль от вашего аккаунта",
				error: "Вами был введен неверный пароль. Введите ваш пароль и попробуйте снова."
			},
			rememberMe: {
				text: "Запомнить",
				tooltip: "Поставьте галочку, для запоминания сессии на этом компьютере"
			},
			forgot: {
				text: "Забыли пароль?",
				tooltip: "Воспользуйтесь функцией востановления пароля, если вы не можете вспомнить пароль от своего аккаунта"
			},
			enter: {
				text: "Войти",
				tooltip: "Авторизоваться"
			},
			exception: {
				NotMatch: "Неверный email или пароль.",
				SessionLimit: "Ваш аккаунт исчерпал лимит сессий. Закройте старые сессии управления аккаунтом и попробуйте авторизоваться заново."
			}
		},
		reg: {
			name: "Регистрация",
			title: {
				auth: "Авторизация",
				reg: "Регистрация"
			},
			login: {
				text: "Логин",
				tooltip: "Введите предпочитаемый логин",
				error: "Вами был введен неверный логин. Проверьте правильность ввода и попробуйте снова."
			},
			mail: {
				text: "Email",
				tooltip: "Введите email адрес вашего аккаунта",
				error: "Вами был введен неверный email адрес. Проверьте правильность ввода и попробуйте снова."
			},
			password: {
				text: "Пароль",
				tooltip: "Введите пароль, который вы хотите использовать в вашем аккаунте",
				error: "Вами был введен неверный пароль. Проверьте правильность ввода и попробуйте снова."
			},
			repeat_password: {
				text: "Повторите пароль",
				tooltip: "Введите пароль еще раз",
				error: "Пароли не совпадают"
			},
			wmr: {
				text: "WMR-кошелек",
				tooltip: "Введите ваш WMR-кошелек",
				error: "Вами был введен неверный WMR-кошелек. Проверьте правильность ввода и попробуйте снова."
			},
			icq: {
				text: "ICQ (UIN)",
				tooltip: "Введите ваш номер ICQ",
				error: "Вами был введен неверный номер ICQ. Проверьте правильность ввода и попробуйте снова."
			},
			invite: {
				text: "Инвайт код",
				tooltip: "Введите ваш инвайт код",
				error: "Вами был введен неверный инвайт код. Проверьте правильность ввода и попробуйте снова."
			},
			agree_with_rules: {
				text: {
					agree_with: "Согласен с ",
					rules: "Правилами"
				},
				tooltip: "Поставьте галочку, если вы согласны с правилами сервиса",
				error: "Для создания аккаунта в сервисе, необходимо подтвердить свое согласие с Правилами сервиса."
			},
			register: {
				text: "Зарегистрироваться",
				tooltip: "Зарегистрировать аккаунт"
			},
			success: "Вы успешно зарегистрированны в системе.",
			exception: {
				MailExists: "Указанный email уже используется. Введите другой email и попробуйте снова.",
				LoginExists: "Указанный логин уже используется. Введите другой логин и попробуйте снова.",
				InviteNotFound: "Указанный инвайт не принадлежит ни одному пользователю или владелец аккаунта не имеет доступа к инвайту. Введите другой инвайт и попробуйте снова.",
				IcqExists: "Указанный номер ICQ уже используется. Введите другой номер ICQ и попробуйте снова.",
				WmrExists: "Указанный номер кошелька уже используется. Введите другой номер кошелька и попробуйте снова.",
				IpRangeNotRegistered: "Диапазон IP, с которого происходит регистрация не зарегистрирован в сервисе."
			}
		},
		badBrowser: {
			name: "Несовместимый браузер",
			title: "Несовместимый браузер!",
			text: "Вы используете браузер, который не позволяет полноценно работать с веб-приложением WaspAce. Для нормальной работы рекомендуем обновить браузер до последней версии или скачать один из рекомендуемых браузеров, ссылки на которые приведены ниже:",
			browsers: {
				chrome: "Chrome",
				firefox: "FireFox",
				opera: "Opera",
				safari: "Safari"
			}
		},
		account: {
			name: "Аккаунт",
			items: {
				login: {
					text: "Логин"
				},
				mail: {
					text: "Email",
					buttons: {
						edit: {
							tooltip: "Изменить email"
						}
					}
				},
				password: {
					text: "Пароль",
					buttons: {
						edit: {
							tooltip: "Изменить пароль"
						}
					}
				},
				icq: {
					text: "ICQ",
					buttons: {
						edit: {
							tooltip: "Изменить номер ICQ"
						}
					}
				},
				balance: {
					text: "Баланс",
					notify: "Будьте внимательны! Кредиты в аккаунт начислятся только при переводе с кошелька,закрепленного за этим аккаунтом! Проверьте правильность Вашего WMR кошелька. Продолжить пополнение баланса?",
					buttons: {
						purse: {
							tooltip: "Пополнить баланс"
						}
					}
				},
				dateRegistration: {
					text: "Дата регистрации"
				},
				inactivity: {
					text: "Неактивность"
				},
				status: {
					text: "Статус",
					value: {
						active: "Активен",
						deleted: "Удален"
					},
					buttons: {
						restore: {
							tooltip: "Восстановить аккаунт"
						}
					}
				},
				invite: {
					text: "Инвайт-код",
					notAvailable: "Инвайт в данный момент недоступен",
					buttons: {
						copy: {
							tooltip: "Скопировать в буфер обмена",
							success: "Инвайт успешно скопирован в буфер обмена"
						}
					}
				},
				timebonus: {
					text: "Тайм-бонус"
				},
				id: {
					text: "ID"
				},
				wmr: {
					text: "WMR"
				},
				vip: {
					text: "VIP",
					value: {
						enabled: "Активен",
						disabled: "Выключен"
					},
					buttons: {
						vip: {
							tooltip: "Включить/Выключить VIP статус"
						}
					}
				},
				managerDataAccount: {
					text: "Управление данными аккаунта",
					buttons: {
						reset: {
							tooltip: "Сбросить настройки аккаунта. Удаляет все настройки связанные с вашими сайтами. Сброс настроек помогает в том случае, если менеджер не может полностью получить данные аккаунта.",
							notification: "Сброс настроек аккаунта удалит все настройки всязанные с вашими сайтами без возможности восстановления. Вы действительно хотите продолжить?",
							success: "Настройки аккаунта успешно сброшены."
						},
						upload: {
							tooltip: "Загрузить настройки аккаунта из файла. Старые настройки будут перезаписаны."
						},
						download: {
							tooltip: "Сохранить настройки аккаунта в файл."
						}
					}
				},
				surfingKey: {
					text: "Ключ серфинга",
					buttons: {
						copy: {
							tooltip: "Скопировать в буфер обмена",
							success: "Ключ серфинга успешно скопирован в буфер обмена."
						},
						recreate: {
							tooltip: "Пересоздать ключ серфинга",
							success: "Ключ серфинга был успешно пересоздан.",
							confirm: "Вы действительно хотите пересоздать ключ серфинга?"
						}
					}
				},
				readonlyKey: {
					text: "Ключ просмотра настроек",
					buttons: {
						copy: {
							tooltip: "Скопировать в буфер обмена",
							success: "Ключ просмотра настроек аккаунта успешно скопирован в буфер обмена."
						},
						recreate: {
							tooltip: "Пересоздать ключ просмтра настроек аккаунта",
							success: "Ключ просмотра настроек аккаунта был успешно пересоздан.",
							confirm: "Вы действительно хотите пересоздать ключ просмотра настроек аккаунта?"
						}
					}
				}
			},
			notAvailable: "Недоступно"
		},
		messagebox: {
			title: {
				error: "Ошибка",
				notification: "Оповещение"
			},
			type: {
                maskAdd: {
                    title: "Добавление маски",
                    maskName: {
                        text: "Имя маски",
                        tooltip: "Имя маски, помогает различать одинаковые маски, задавая им различные имена.",
                        error: "Проверьте правильность ввода имени маски. Имя маски может содержать до "+wa_api.Constants.Limit.Mask.Name.Length.Max+" символов."
                    },
                    mask: {
                        text: "Маска",
                        tooltip: "Маска - это строка, которая содержится аттрибуте href/onclick ссылки. При помощи маски осуществляется поиск эллемента страницы и производится клик.",
                        error: "Проверьте правильность ввода полей маски. Первое поле маски обязательно для заполнения. Общая длина строк первой и второй маски не может превышать "+wa_api.Constants.Limit.Mask.Mask.Length.Max+" символов."
                    },
                    rangeSize: {
                        text: "Размер подсети разброса",
                        tooltip: "Размер подсети разброса определяет размер диапазона, IP которого будут считаться соседями по подсети. Чем больше размер, тем более отдаленные друг от друга IP будут считаться произошедшими из одной подсети.",
                        error: "Проверьте правильность ввода поля размера подсети разброса. Минимальное значение "+wa_api.Constants.Limit.Mask.RangeSize.Value.Min+", максимальное значение "+wa_api.Constants.Limit.Mask.RangeSize.Value.Max+"."
                    },
                    uniqTime: {
                        text: "Время уникальности IP",
                        tooltip: "Время уникальности определяет время (в минутах), в течении которого один IP не может совершить по маске более одного перехода",
                        error: "Проверье правильность ввода поля времени уникаьности IP. Минимальное значение "+wa_api.Constants.Limit.Mask.UniqPeriod.Value.Min+", максимальное значение "+wa_api.Constants.Limit.Mask.UniqPeriod.Value.Max+". Время указывается в минутах."
                    },
                    allowProxy: {
                        text: "Допускать прокси-трафик",
                        tooltip: "Разрешив прокси-трафик возможно ухудшение качество трафика, но зато вы получите большее колличество трафика.",
                        error: ""
                    },
                    ignoreGU: {
                        text: "Игнорировать глобальную уникальность",
                        tooltip: "Включив игнорирование глобальной уникальности масок, вы сможете получить большее колличество трафика, но качество трафика может значительно ухудшиться.",
                        error: ""
                    },
                    exception: {
                        LimitExceeded: {
                            text: "Вы исчерпали лимит на колличество масок в аккаунте."
                        }
                    }
                },
				maskEdit: {
					title: "Редактирование маски",
					maskName: {
						text: "Имя маски",
						tooltip: "Имя маски, помогает различать одинаковые маски, задавая им различные имена.",
						error: "Проверьте правильность ввода имени маски. Имя маски может содержать до "+wa_api.Constants.Limit.Mask.Name.Length.Max+" символов."
					},
					mask: {
						text: "Маска",
						tooltip: "Маска - это строка, которая содержится аттрибуте href/onclick ссылки. При помощи маски осуществляется поиск эллемента страницы и производится клик.",
						error: "Проверьте правильность ввода полей маски. Первое поле маски обязательно для заполнения. Общая длина строк первой и второй маски не может превышать "+wa_api.Constants.Limit.Mask.Mask.Length.Max+" символов."
					},
					rangeSize: {
						text: "Размер подсети разброса",
						tooltip: "Размер подсети разброса определяет размер диапазона, IP которого будут считаться соседями по подсети. Чем больше размер, тем более отдаленные друг от друга IP будут считаться произошедшими из одной подсети.",
						error: "Проверьте правильность ввода поля размера подсети разброса. Минимальное значение "+wa_api.Constants.Limit.Mask.RangeSize.Value.Min+", максимальное значение "+wa_api.Constants.Limit.Mask.RangeSize.Value.Max+"."
					},
					uniqTime: {
						text: "Время уникальности IP",
						tooltip: "Время уникальности определяет время (в минутах), в течении которого один IP не может совершить по маске более одного перехода",
						error: "Проверье правильность ввода поля времени уникаьности IP. Минимальное значение "+wa_api.Constants.Limit.Mask.UniqPeriod.Value.Min+", максимальное значение "+wa_api.Constants.Limit.Mask.UniqPeriod.Value.Max+". Время указывается в минутах."
					},
					allowProxy: {
						text: "Допускать прокси-трафик",
						tooltip: "Разрешив прокси-трафик возможно ухудшение качество трафика, но зато вы получите большее колличество трафика.",
						error: ""
					},
					ignoreGU: {
						text: "Игнорировать глобальную уникальность",
						tooltip: "Включив игнорирование глобальной уникальности масок, вы сможете получить большее колличество трафика, но качество трафика может значительно ухудшиться.",
						error: ""
					}
				},
				folderRename: {
					title: "Переименование категории",
					folderName: {
						text: "Имя категории",
						tooltip: "Введите желаемое имя категории",
						error: "Проверьте правильность ввода имени категории. Имя категории может содержать от "+wa_api.Constants.Limit.Folder.Name.Length.Min+" до "+wa_api.Constants.Limit.Folder.Name.Length.Max+" символов."
					}
				},
				folderAdd: {
					title: "Добавление категории",
					folderName: {
						text: "Имя категории",
						tooltip: "Введите желаемое имя категории",
						error: "Проверьте правильность ввода имени категории. Имя категории может содержать от "+wa_api.Constants.Limit.Folder.Name.Length.Min+" до "+wa_api.Constants.Limit.Folder.Name.Length.Max+" символов."
					},
					exception: {
						LimitExceeded: {
							text: "Вы исчерпали лимит на колличество категорий в аккаунте."
						}
					}
				},
				setGeoTargeting: {
					title: "Настройка геотаргетинга",
					text: "Настройте желаемый геотаргетинг, указывая процентное колличество трафика каждой страны.",
					graphName: "График геотаргентинга",
                    lessThan100: "Вы настроили геотаргетинг так, что в сумме по странам получилось меньше 100%. Это приведет к тому, что вы получите трафика меньше чем заказывали. Вы точно хотите продолжить?"
				},
				setViewTargeting: {
					title: "Настройка таргентинга просмотров",
					text: "Настройте таргетинг просмотров по своему желанию. Удерживайте клавижу SHIFT для настройки линии максимальных значений таргетинга и клавишу CTRL для настройки линии минимальных значений таргентинга.",
					graphName: "График таргентинга просмотров"
				},
				setClickTargeting: {
					title: "Настройка таргентинга кликов",
					text: "Настройте таргетинг кликов по своему желанию. Для этого выберите из предложенного ниже списка нужную маску и настроите график. Удерживайте клавижу SHIFT для настройки линии максимальных значений таргетинга и клавишу CTRL для настройки линии минимальных значений таргентинга.",
					selectMask: "Выберите маску",
					graphName: "График таргентинга кликов",
					success: "Таргентинг кликов для выбранной маски успешно изменен."
				},
				domainAdd: {
					title: "Добавление домена",
					text: "Введите имя домена и укажите ссылку на внешний источник данных.",
					domain: {
						text: "Домен",
						tooltip: "Введите необходимый домен(без http://).",
						error: "Проверьте правильность ввода домена. Домен может содержать от "+wa_api.Constants.Limit.Domain.Domain.Length.Min+" до "+wa_api.Constants.Limit.Domain.Domain.Length.Max+" символов."
					},
					extSource: {
						text: "Внешний источник",
						tooltip: "Введите url адрес вашего внешнего источника.",
						error: "Проверьте правильность ввода url адреса внешнего источника. Url может содержать от "+wa_api.Constants.Limit.Domain.ExtSource.Length.Min+" до "+wa_api.Constants.Limit.Domain.ExtSource.Length.Max+" символов."
					},
					exception: {
						LimitExceeded: {
							text: "Вы исчерпали лимит на колличество доменов в одной папке аккаунта."
						}
					}
				},
				setDomain: {
					title: "Изменение домена",
					domain: {
						text: "Домен",
						tooltip: "Введите необходимый домен(без http://).",
						error: "Проверьте правильность ввода домена. Домен может содержать от "+wa_api.Constants.Limit.Domain.Domain.Length.Min+" до "+wa_api.Constants.Limit.Domain.Domain.Length.Max+" символов."
					},
					extSource: {
						text: "Внешний источник",
						tooltip: "Введите url адрес вашего внешнего источника.",
						error: "Проверьте правильность ввода url адреса внешнего источника. Url может содержать от "+wa_api.Constants.Limit.Domain.ExtSource.Length.Min+" до "+wa_api.Constants.Limit.Domain.ExtSource.Length.Max+" символов."
					}
				},
                console: {
                    title: "Консоль запросов",
                    text: "Введите запрос и нажмите кнопку отправить.",
                    console: "Консоль",
                    notValidJSON: "Невалидный JSON объект."
                }
			}
		},
		masks: {
			name: "Маски",
			buttons: {
				'delete': {
					text: "Удалить"
				},
				add: {
					text: "Добавить маску"
				}
			},
			infoHead: {
				nameMask: "Имя маски",
				mask: "Маска",
				proxy: "Допуск прокси",
				gu: "Игнор ГУ",
				rangeSize: "Размер подсети разброса",
				timeUniq: "Время уникальности"
			},
			item: {
				proxy: {
					value: {
						enabled: "Да",
						disabled: "Нет"
					}
				},
				gu: {
					value: {
						enabled: "Да",
						disabled: "Нет"
					}
				},
                icon: {
                    'delete': {
                        notification: "Удаление маски приведет к удалению всех настроенных переходов по ней. Вы действительно хотите продолжить?"
                    }
                }
			}
		},
		folders: {
			name: "Категории",
			buttons: {
				'delete': {
					text: "Удалить"
				},
				add: {
					text: "Добавить категорию"
				}
			},
			infoHead: {
				nameFolder: "Имя категории",
				countPages: "Доменов",
				countHits: "Просмотров",
				countClicks: "Переходов"
			},
			item: {
				button: {
					'delete': {
						notification: "Удаление выбранных категории приведет к удалению всех сайтов добавленных в текущие категории. Вы действительно хотите продолжить?"
					}
				},
				icon: {
					'delete': {
						notification: "Удаление категории приведет к удалению всех сайтов добавленных в текущую категорию. Вы действительно хотите продолжить?"
					}
				}
			}
		},
		domains: {
			name: "Домены",
			buttons: {
				'delete': {
					text: "Удалить"
				},
				add: {
					text: "Добавить домен"
				}
			},
			infoHead: {
				domen: "Домен",
				countHits: "Просмотров",
				countClicks: "Переходов"
			},
			item: {
				button: {
					'delete': {
						notification: "Удаление выбранных доменов приведет к безвозратному удалению доменов и всех их настроек. Вы действительно хотите продолжить?"
					}
				},
				icon: {
					'delete': {
						notification: "Удаление домена приведет к безвозратному удалению как самого домена так и всех его настроек. Вы действительно хотите продолжить?"
					},
					rename: {
						tooltip: "Изменить"
					}
				}
			}
		}
	},
	control: {
		buttonBox: {
			save: "Сохранить",
			appy: "Применить",
			cancel: "Отмена",
			ok: "Ок",
			yes: "Да",
			no: "Нет",
            send: "Отправить",
            clear: "Очистить"
		},
		generalMenu: {
			items: {
				account: {
					text: "Аккаунт",
					tooltip: "Управление аккаунтом"
				},
				category: {
					text: "Категории",
					tooltip: "Управление категориями"
				},
				masks: {
					text: "Маски",
					tooltip: "Управление масками"
				},
				referals: {
					text: "Рефералы",
					tooltip: "Управление рефералами"
				},
				logout: {
					text: "Выйти",
					tooltip: "Завершить сессию"
				}
			}
		},
		iconBox: {
			items: {
				edit: {
					tooltip: "Изменить"
				},
				purse: {
					tooltip: "Пополнить баланс"
				},
				pause: {
					tooltip: "Выключить"
				},
				rename: {
					tooltip: "Переименовать"
				},
				'delete': {
					tooltip: "Удалить"
				},
				copy: {
					tooltip: "Скопировать"
				},
				vip: {
					tooltip: "Включить/Выключить VIP статус"
				},
				restore: {
					tooltip: "Восстановить"
				},
				reset: {
					tooltip: "Сбросить"
				},
				upload: {
					tooltip: "Загрузить"
				},
				download: {
					tooltip: "Скачать"
				},
				recreate: {
					tooltip: "Пересоздать"
				},
                geo: {
                    tooltip: "Настройки геотаргетинга"
                },
				view: {
					tooltip: "Просмотры"
				},
				click: {
					tooltip: "Переходы"
				},
				data: {
					tooltip: "Дополнительные данные"
				}
			}
		},
		numericUpDown: {},
		graphic: {
			zoneName: {
				AZ: "Азербайджан",
				AM: "Армения",
				BY: "Белоруссия",
				DE: "Германия",
				GE: "Джорджия",
				IL: "Израиль",
				IT: "Италия",
				KZ: "Казахстан",
				KG: "Кыргызстан",
				LV: "Латвия",
				LT: "Литва",
				MD: "Молдавия",
				PT: "Португалия",
				RU: "Россия",
				TJ: "Таджикистан",
				TR: "Турция",
				UZ: "Узбекистан",
				UA: "Украина",
				FR: "Франция",
				EE: "Эстония",
				TM: "Туркменистан"
			},
			tooltip: {
				max: "Максимум",
				min: "Минимум",
				give: "Получено"
			}
		},
		maskList: {
			maskName: "Имя маски",
			mask: "Маска"
		},
		dataResult: {
			max: "Максимум",
			min: "Минимум",
			give: "Получено"
		}
	},
	notification: {
		testPage: "Все действия производимые на данной странице не отражаются на вашем аккаунте. Страница работает в тестовом режиме.",
		confirmExit: "Вы не завершили текущую сессию работы в web менеджере. Вы действительно хотите выйти не завершив сессию?"
	}
};