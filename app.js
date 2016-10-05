(function () {

    var app = angular.module('NarrowItDownApp', []);

    app.controller('NarrowItDownController', NarrowItDownController);

    app.service('MenuSearchService', MenuSearchService);
    app.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController() {
        console.log(MenuSearchService);

        var ctrl = this;

        ctrl.searchTerm = "";

        // var temp = MenuSearchService.testFunc();

        // temp.then = function (response) {
        //
        // };

        ctrl.logMatchedMenuItems = function (searchTerm) {

            console.log(searchTerm);

        };

        console.log(ctrl);
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {

        var service = this;

        service.testFunc = function () {
            return "nill";
        };

        service.getMatchedMenuItems = function (searchTerm) {
            var response = {
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                params: {
                    category: searchTerm
                }
            };
            return response;
        };
    }

}) ();
