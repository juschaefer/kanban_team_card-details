/**
 * @overview ccm component for kanban card details
 * @author Julian Schäfer <Julian.Schaefer@scmail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

(function () {

    const DATA_SERVER = "http://192.168.99.101:8080";
    const LOG_NAME = "jschae2s_kanban_team_log";

    const PROJECT = "jschae2s_sose_19";
    // const PROJECT = "sose_19";

    const component = {

        name: 'kanban_team_card-details',

        //ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.2.0.js',

        config: {

            user: ["ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", ["ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "hbrsinfkaul"]],
            comments: ['ccm.component', 'https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-4.1.0.js'],
            texteditor: ['ccm.component', 'https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-3.1.0.js'],

            html: {
                // "main": ["ccm.load", '../kanban_team_card-details/resources/tpl.details.html']
                "main": {
                    "id": "main",
                    "inner": [
                        {
                          "class": "container-fluid",
                          "inner":
                              {
                                  "class": "row",
                                  "inner": [
                                      {
                                          "class": "col-sm-9",
                                          "inner":
                                      {
                                          "tag": "input",
                                          "type": "text",
                                          "class": "form-control no_border col-form-label-lg",
                                          "style": "margin: 0 0 1rem 0; font-weight: bold;",
                                          "id": "title",
                                          "placeholder": "Title",
                                          "value": "%title%",
                                          "oninput": "%oninput_title%",
                                          "onblur": "%onblur_title%",
                                          "onfocus": "%onfocus_title%"
                                      }
                              },
                                      {
                                          "class": "col-sm-3 align-right",
                                          "id": "user"
                                      }
                                  ]
                              }
                        },
                        {
                            "class": "card",
                            "inner": [
                                {
                                    "class": "card-header",
                                    "inner": "Details"
                                },
                                {
                                    "class": "card-body",
                                    "inner": [
                                        {
                                            "class": "form-group row",
                                            "inner": [
                                                {
                                                    "tag": "label",
                                                    "for": "owner",
                                                    "class": "col-sm-2 col-form-label",
                                                    "inner": "Owner",
                                                },
                                                {
                                                    "class": "col-sm-10",
                                                    "inner":
                                                        {
                                                            "tag": "input",
                                                            "type": "text",
                                                            "class": "form-control",
                                                            "id": "owner",
                                                            "oninput": "%oninput_owner%",
                                                            "value": "%owner%",
                                                            "placeholder": "Owner"
                                                        },
                                                },
                                            ]
                                        },
                                        {
                                            "class": "form-group row",
                                            "inner": [
                                                {
                                                    "tag": "label",
                                                    "for": "priority",
                                                    "class": "col-sm-2 col-form-label",
                                                    "inner": "Priority"
                                                },
                                                {
                                                    "class": "col-sm-10",
                                                    "inner": {
                                                        "tag": "input",
                                                        "class": "form-control",
                                                        "type": "text",
                                                        "id": "priority",
                                                        "oninput": "%oninput_priority%",
                                                        "value": "%priority%",
                                                        "readonly": true
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            "class": "form-group row",
                                            "inner": [
                                                {
                                                    "tag": "label",
                                                    "for": "deadline",
                                                    "class": "col-sm-2 col-form-label",
                                                    "inner": "Deadline"
                                                },
                                                {
                                                    "class": "col-sm-10",
                                                    "inner": [
                                                        {
                                                            "tag": "input",
                                                            "class": "form-control",
                                                            "type": "date",
                                                            "value": "%deadline%",
                                                            "oninput": "%oninput_deadline%",
                                                            "id": "deadline",
                                                        },
                                                        {
                                                            "tag": "small",
                                                            "id": "days_left",
                                                            "class": "form-text text-muted",
                                                            "inner": "In&nbsp;%days_left%&nbsp;Tag(en).",
                                                        }
                                                    ]
                                                }
                                            ]
                                        }

                                    ]
                                }
                            ],

                        },
                        // {
                        //     "class": "card",
                        //     "inner": [{
                        //         "class": "card-header",
                        //         "inner": {
                        //             "tag": "h5",
                        //             "inner": "Zusammenfassung"
                        //         }
                        //     }, {
                        //         "class": "card-body",
                        //         "inner": [
                        //             {
                        //                 "class": "form-group",
                        //                 "inner":
                        //                     {
                        //                         "class": "",
                        //                         "inner": {
                        //                             "tag": "textarea",
                        //                             // "type": "text",
                        //                             "class": "form-control",
                        //                             "id": "summary",
                        //                             "inner": "%summary%",
                        //                             "oninput": "%oninput_summary%"
                        //                         }
                        //                     }
                        //
                        //             }
                        //         ]
                        //     }]
                        // },
                        {
                            "class": "card",
                            "inner": [{
                                "class": "card-header",
                                "inner": {
                                    "tag": "h5",
                                    "inner": "Beschreibung"
                                }
                            }, {
                                "class": "card-body",
                                "id": "description_editor",
                                "inner": ""
                            }]
                        },
                        {
                            "class": "card",
                            "inner": [{
                                "class": "card-header",
                                "inner": {
                                    "tag": "h5",
                                    "inner": "Kommentare"
                                }
                            }, {
                                "class": "card-body",
                                "id": "comments",
                                "inner": ""
                            }]
                        }

                    ]
                }
            },

            css: ["ccm.load", "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
                {
                    "context": "head",
                    "url": "https://ccmjs.github.io/tkless-components/libs/bootstrap/css/font-face.css"
                },
                // "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/js/bootstrap.min.js",
                "../kanban_team_wrapper/resources/hbrs.css"
            ],
            data: {},
            icon: {
                "owner": "https://ccmjs.github.io/akless-components/kanban_card/resources/owner.svg",
                "deadline": "https://ccmjs.github.io/akless-components/kanban_card/resources/deadline.svg"
            },

            //  "onchange": function ( event ) { console.log( this.index, 'onchange', this.getValue(), event ) },
            //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],
            //  "logger": [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ]
            logger: ["ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", {
                "logging": {
                    "data": true,
                    "browser": true,
                    "parent": true,
                    "root": true,
                    "user": true,
                    "website": true
                },
                "events": {
                    "start": {
                        "data": true,
                        "browser": true,
                        "parent": true,
                        "root": true,
                        "user": true,
                        "website": true
                    }
                },
                "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js" ],
                "onfinish": {
                    "store": {
                        "settings": {"name": LOG_NAME + "_card-details", "url": DATA_SERVER},
                        // "permissions": {
                        //     "creator": "jschae2s",
                        //     "team": {
                        //         "jschae2s": true,
                        //         "cmann2s": true,
                        //         "lmuell2s": true
                        //     },
                        //     "group": {
                        //         "mkaul2m": true,
                        //         "akless2m": true
                        //     },
                        //     "access": {
                        //         "get": "group",
                        //         "set": "creator",
                        //         "del": "creator"
                        //     }
                        // }
                    }
                },
            }],

        },

        Instance: function () {

            let $, id, data;
            const self = this;

            this.init = async () => {

                // set shortcut to help functions
                $ = self.ccm.helper;

                // listen to datastore changes => restart
                if ($.isObject(this.data) && $.isDatastore(this.data.store)) this.data.store.onchange = this.start;

            };

            this.ready = async () => {

                // logging of 'ready' event
                this.logger && this.logger.log('ready', $.privatize(this, true));

            };

            this.start = async () => {

                // login user, if not logged in
                await this.user.login();

                // get kanban card data
                // data = await $.dataset(self.data);

                function findGetParameter(parameterName) {
                    let result = null,
                        tmp = [];
                    location.search
                        .substr(1)
                        .split("&")
                        .forEach(function (item) {
                            tmp = item.split("=");
                            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
                        });
                    return result;
                }

                id = findGetParameter("id");

                console.log("ccm: id", id);


                const store = await ccm.store({"name": "jschae2s_kanban_team_cards", "url": "http://192.168.99.101:8080"});
                self.data.store = store;
                data = await store.get(id);
                console.log(data);


                function days_between(date1) {

                    if (date1 == null || date1 == ""){
                        return 0;
                    }

                    date1 = new Date(date1);
                    let date2 = new Date();

                    console.log("date1", date1);
                    console.log("date2", date2);

                    // The number of milliseconds in one day
                    const ONE_DAY = 1000 * 60 * 60 * 24;

                    // Convert both dates to milliseconds
                    let date1_ms = date1.getTime();
                    let date2_ms = date2.getTime();

                    // Calculate the difference in milliseconds
                    let difference_ms = Math.abs(date1_ms - date2_ms);

                    // Convert back to days and return
                    return Math.round(difference_ms / ONE_DAY);

                }

                let calculated_days_left =  data.hasOwnProperty('deadline') ? days_between(data.deadline): 0;

                $.setContent(self.element, $.html(self.html.main, $.integrate({
                    title: '',
                    owner: '',
                    priority: '',
                    deadline: '',
                    days_left: '' + calculated_days_left,
                    summary: '',

                    oninput_title: function () {
                        update('title', this.value.trim());
                    },
                    onfocus_title: function () {
                        this.classList.remove("no_border");
                    },
                    onblur_title: function () {
                        this.classList.add("no_border");
                    },
                    oninput_owner: function () {
                        update('owner', this.value.trim());
                    },
                    oninput_priority: function () {
                        update('priority', this.value.trim());
                    },
                    oninput_deadline: function () {
                        $.setContent(self.element.querySelector('#days_left'), $.html('In&nbsp;' + days_between(this.value) + '&nbsp;Tag(en).'))

                        update('deadline', this.value);
                    },
                    oninput_summary: function () {
                        update('summary', this.value);
                    }
                }, data, true)));

                const INST_TEXTEDITOR = await self.texteditor.start({
                    "data": data["description"],
                    "onchange": function () {
                        console.log("onChange Beschreibung", this.getValue());
                        update("description", this.getValue())
                    },
                    "settings": {
                        "modules": {
                            "syntax": true,
                            "toolbar": [
                                [
                                    {
                                        "header": [
                                            1,
                                            2,
                                            3,
                                            4,
                                            5,
                                            6,
                                            false
                                        ]
                                    }
                                ],
                                [
                                    "bold",
                                    "italic",
                                    "underline",
                                    "strike"
                                ],
                                [
                                    "blockquote",
                                    "code-block"
                                ]
                            ]
                        },
                        "placeholder": "Beschreibung eingeben...",
                        "theme": "snow"
                    }

                });

                $.setContent(self.element.querySelector("#description_editor"), INST_TEXTEDITOR.root);

                const INST_COMMENTS = await self.comments.start(
                    {
                        "chat": "",
                        "template": "expanded",
                        "user": [
                            "ccm.instance",
                            "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js",
                            {
                                "key": {
                                    "key": "button",
                                    "realm": "guest",
                                    "title": "Guest Mode: Please enter any username",
                                    "html.logged_in": {
                                        "id": "logged_in",
                                        "class": "row",
                                        "style": "float:none",
                                        "inner": {
                                            "id": "button",
                                            "class": "btn btn-default",
                                            "inner": [
                                                {
                                                    "tag": "span",
                                                    "id": "user",
                                                    "inner": [
                                                        {
                                                            "class": "glyphicon glyphicon-user"
                                                        },
                                                        "%user%&#8196;"
                                                    ]
                                                },
                                                {
                                                    "tag": "span",
                                                    "class": "glyphicon glyphicon-log-out"
                                                },
                                                "Logout"
                                            ],
                                            "onclick": "%click%"
                                        }
                                    },
                                    "html.logged_out": {
                                        "id": "logged_out",
                                        "style": "float:none",
                                        "inner": {
                                            "id": "button",
                                            "class": "btn btn-default",
                                            "inner": [
                                                {
                                                    "tag": "span",
                                                    "class": "glyphicon glyphicon-log-in"
                                                },
                                                "Login"
                                            ],
                                            "onclick": "%click%"
                                        }
                                    }
                                },
                                "realm": "hbrsinfkaul"
                            }
                        ],
                        "voting": [
                            "ccm.component",
                            "https://ccmjs.github.io/tkless-components/thumb_rating/versions/ccm.thumb_rating-3.0.0.js",
                            {
                                "data": {
                                    "store": [
                                        "ccm.store",
                                        {
                                            "name": "voting",
                                            "url": DATA_SERVER
                                        }
                                    ],
                                    "key": id
                                },
                                "logger": [ "ccm.instance", "../../akless-components/log/ccm.log.js", {
                                    // "events": {
                                    //     "start": {
                                    //         "data": true,
                                    //         "user": true
                                    //     },
                                    //     "join": {
                                    //         "data": true,
                                    //         "user": true
                                    //     }
                                    // },
                                    "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js" ],
                                    "onfinish": {
                                        "store": {
                                            "settings": {"name": LOG_NAME + "_voting", "url": DATA_SERVER},
                                            "permissions": {
                                                "creator": self.user.data().user,
                                                "access": {
                                                    "get": "group",
                                                    "set": "creator",
                                                    "del": "creator"
                                                }
                                            }
                                        }
                                    }
                                } ],
                            }
                        ],
                        "sorting_by_voting": false,
                        "editable": true,
                        "data": {
                            "store": [
                                "ccm.store",
                                {
                                    "name": "jschae2s_comments",
                                    "url": DATA_SERVER
                                }
                            ],
                            "key": id
                        },
                        "logger": [ "ccm.instance", "../../akless-components/log/ccm.log.js", {
                            // "events": {
                            //     "start": {
                            //         "data": true,
                            //         "user": true
                            //     },
                            //     "join": {
                            //         "data": true,
                            //         "user": true
                            //     }
                            // },
                            "hash": [ "ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js" ],
                            "onfinish": {
                                "store": {
                                    "settings": {"name": LOG_NAME + "_comments", "url": DATA_SERVER},
                                    "permissions": {
                                        "creator": self.user.data().user,
                                        "access": {
                                            "get": "group",
                                            "set": "creator",
                                            "del": "creator"
                                        }
                                    }
                                }
                            }
                        } ],
                    }
                );

                $.setContent(self.element.querySelector("#comments"), INST_COMMENTS.root);

                $.setContent(self.element.querySelector('#user'), self.user.root);

                async function update(prop, value) {
                    // has user instance? => login
                    self.user && await self.user.login();

                    console.log("update \"" + prop + "\"", value);

                    data[prop] = value;

                    $.isObject(self.data) && $.isDatastore(self.data.store) && await self.data.store.set(data);

                    // logging of 'change' event
                    // self.logger && self.logger.log('change', {prop: prop, value: value});

                    // perform individual 'change' callback
                    self.onchange && self.onchange.call(self, {prop: prop, value: value});

                }

            };

        }

    };

    let b = "ccm." + component.name + (component.version ? "-" + component.version.join(".") : "") + ".js";
    if (window.ccm && null === window.ccm.files[b]) return window.ccm.files[b] = component;
    (b = window.ccm && window.ccm.components[component.name]) && b.ccm && (component.ccm = b.ccm);
    "string" === typeof component.ccm && (component.ccm = {url: component.ccm});
    let c = (component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/) || ["latest"])[0];
    if (window.ccm && window.ccm[c]) window.ccm[c].component(component); else {
        var a = document.createElement("script");
        document.head.appendChild(a);
        component.ccm.integrity && a.setAttribute("integrity", component.ccm.integrity);
        component.ccm.crossorigin && a.setAttribute("crossorigin", component.ccm.crossorigin);
        a.onload = function () {
            window.ccm[c].component(component);
            document.head.removeChild(a)
        };
        a.src = component.ccm.url
    }
})();