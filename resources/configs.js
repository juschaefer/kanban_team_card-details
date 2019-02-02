/**
 * @overview configurations of ccm component for kanban card details
 * @author Julian Schäfer <Julian.Schaefer@scmail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "parameter": {
    "key": "parameter",
    "css.1": "../kanban_team_card-details/resources/default.css",
      "data": {
        "store": [ "ccm.store", { "name": "kanban_team_cards", "url": "http://192.168.99.101:8080" } ],
        // "key": "demo_gold"
    }
  }

};