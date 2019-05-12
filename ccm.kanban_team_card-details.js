/**
 * @overview ccm component for kanban card details
 * @author Julian Schäfer <Julian.Schaefer@scmail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

(function () {

    const component = {

        name: 'kanban_team_card-details',

        //ccm: 'https://ccmjs.github.io/ccm/ccm.js',
        // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-18.2.0.js',
        ccm: 'https://ccmjs.github.io/ccm/versions/ccm-20.0.0.js',

        config: {

            user: ["ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.3.1.js", ["ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "hbrsinfkaul"]],
            comments: ['ccm.component', 'https://ccmjs.github.io/tkless-components/comment/versions/ccm.comment-4.1.0.js'],
            texteditor: ['ccm.component', 'https://ccmjs.github.io/tkless-components/editor/versions/ccm.editor-3.1.0.js'],

            html: {
                "main": {
                    "id": "main",
                    "inner": {

                        "class": "container",
                        "inner": [
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
                                                                "class": "form-text",
                                                                "inner": "%days_left%",
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }

                                        ]
                                    }
                                ],

                            },
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
                    }}
            },

            bootstrap: [
                "ccm.load", [{
                        "url": "https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css",
                        "integrity": "sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B",
                        "crossorigin": "anonymous"
                    },
                    "../kanban_team_card-details/resources/default.css"]
            ],

            data_server: "https://localhost/",
            log_name: null,
            project: "",

            data: {},
            card_id: null,
            comment_store: {},

            icon: {
                "owner": "https://ccmjs.github.io/akless-components/kanban_card/resources/owner.svg",
                "deadline": "https://ccmjs.github.io/akless-components/kanban_card/resources/deadline.svg"
            },

            //  "onchange": function ( event ) { console.log( this.index, 'onchange', this.getValue(), event ) },
            //  "user": [ "ccm.instance", "https://ccmjs.github.io/akless-components/user/versions/ccm.user-8.2.0.js", [ "ccm.get", "https://ccmjs.github.io/akless-components/user/resources/configs.js", "guest" ] ],

        },

        Instance: function () {

            let $, data;
            const self = this;

            this.init = async () => {

                // set shortcut to help functions
                $ = self.ccm.helper;

                // listen to datastore changes => restart
                if ($.isObject(this.data) && $.isDatastore(this.data.store)) this.data.store.onchange = this.start;

                // set log_name for datastore if not set
                if (self.log_name === null) {
                    self.log_name = self.project + "_log";
                }

            };

            this.ready = async () => {

                // logging of 'ready' event
                self.logger && self.logger.log('ready', $.privatize(this, true));

            };

            this.start = async () => {

                // login user, if not logged in
                await self.user.login();

                self.logger && self.logger.log('start', $.privatize(this, true));

                // Source: https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript/
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

                // Get id out of url if not given
                if (self.card_id === null) {
                    self.card_id = findGetParameter("id");
                }

                // get kanban card data
                data = await self.data.store.get(self.card_id);

                // Inspired by https://www.kostenlose-javascripts.de/tutorials/datumsfunktionen/
                function days_between(date) {

                    if (date == null || date === "") {
                        return;
                    }

                    const JETZT = new Date();
                    const DEADLINE = new Date(date);

                    let verstrichen = false;
                    let text = "";

                    gesamt = Date.parse(JETZT.toGMTString()) - Date.parse(DEADLINE.toGMTString());
                    tage = Math.abs(Math.floor(gesamt / (24 * 3600 * 1000)));

                    text = tage + " Tag";

                    if (tage > 1) {
                            text += "en";
                    }

                    if (tage === 0) {
                        text= "Heute fällig.";
                    }
                    else if (JETZT > DEADLINE) {
                        verstrichen = true;
                        text = "Seit " + text + ".";
                    } else {
                        text = "In " + text + ".";
                    }

                    const RETURN = {
                        "deadline": DEADLINE.toGMTString(),
                        "verstrichen": verstrichen,
                        "gesamt": gesamt,
                        "tage": tage,
                        "text": text
                    };

                    console.log("### RETURN", RETURN);

                    return RETURN;

                }

                const TIME_LEFT = data.hasOwnProperty('deadline') ? days_between(data.deadline) : {"text": ""};

                $.setContent(self.element, $.html(self.html.main, $.integrate({
                    title: '',
                    owner: '',
                    priority: '',
                    deadline: '',
                    days_left: '' + TIME_LEFT.text,
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
                    oninput_deadline: function() {
                        const TIME_LEFT = days_between(this.value);

                        checkTimeLeftClasses(TIME_LEFT);

                        $.setContent(CONTENT_ELEMENT, $.html(TIME_LEFT.text));

                        update('deadline', this.value);
                        update('days_left', TIME_LEFT.text);
                    },
                    oninput_summary: function () {
                        update('summary', this.value);
                    }
                }, data, true)));

                const CONTENT_ELEMENT = self.element.querySelector('#days_left');
                checkTimeLeftClasses(TIME_LEFT);

                function checkTimeLeftClasses(TIME_LEFT) {
                    if (TIME_LEFT.verstrichen) {
                        CONTENT_ELEMENT.classList.add("text-danger");
                        CONTENT_ELEMENT.classList.remove("text-muted");
                    } else {
                        CONTENT_ELEMENT.classList.add("text-muted");
                        CONTENT_ELEMENT.classList.remove("text-danger");
                    }
                }

                /**
                 * Starts Editor for editing the card description
                 */
                const INST_TEXTEDITOR = await self.texteditor.start({
                    "data": data["description"],
                    "onchange": function () {
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

                // Adds editor to html
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
                            }],
                        "sorting_by_voting": false,
                        "editable": false,
                        "data": {
                            "store": self.comment_store,
                            "key": self.card_id
                        },
                        "logger": ["ccm.instance", "https://ccmjs.github.io/akless-components/log/ccm.log.js", {
                            "events": {
                                "create": {
                                    "data": true,
                                    "user": true
                                }
                            },
                            "hash": ["ccm.load", "https://ccmjs.github.io/akless-components/libs/md5/md5.js"],
                            "onfinish": {
                                "store": {
                                    "settings": {
                                        "name": self.log_name + "_comments",
                                        "url": self.data_server
                                    },
                                }
                            }
                        }],
                    }
                );

                $.setContent(self.element.querySelector("#comments"), INST_COMMENTS.root);

                $.setContent(self.element.querySelector('#user'), self.user.root);

                async function update(prop, value) {
                    // has user instance? => login
                    self.user && await self.user.login();

                    data[prop] = value;

                    $.isObject(self.data) && $.isDatastore(self.data.store) && await self.data.store.set(data);

                    // logging of 'change' event
                    self.logger && self.logger.log('change', {prop: prop, value: value});

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