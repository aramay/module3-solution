(function () {

    var app = angular.module('NarrowItDownApp', []);

    app.controller('NarrowItDownController', NarrowItDownController);

    app.service('MenuSearchService', MenuSearchService);
    app.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    app.directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {

        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: NarrowItDownController,
            controllerAs: 'ctrl',
            bindToController: true
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {

        console.log(MenuSearchService);
        var ctrl = this;

        ctrl.searchTerm = "";

        ctrl.found = MenuSearchService.getItems();

        // ctrl.errorMessage = MenuSearchService.getErrors();

        ctrl.logMatchedMenuItems = function (searchTerm) {

            console.log(searchTerm);

            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            console.log("promise ",promise);

            console.log(ctrl.items);

        };

        ctrl.removeItems = function (itemIndex) {
            MenuSearchService.removeItems(itemIndex);
        };

        console.log(ctrl);
    }

    MenuSearchService.$inject = ['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath) {

        var service = this;

        var found = [];

        service.getMatchedMenuItems = function (searchTerm) {

            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),

            }).then(function success(result) {

                console.log("success http request ", result.data);
                var menu_items = result.data.menu_items;


                for (var i = 0; i < menu_items.length; i++) {

                    var description = menu_items[i].description;
                    // console.log(found);

                    console.log(searchTerm);

                    if (searchTerm === "") {
                        // found.push("No matching items found");
                        // found = "No input provided";
                        found = "";
                        console.log("No input provided");
                        // console.log(errorMessage);
                        break;
                    }

                    else if (description.search(searchTerm) != -1) {
                        console.log("found matching items");
                        found.push(menu_items[i]);
                    } else {
                        console.log("No matching items were found");
                    }

                }
                // console.log(found);
                // return false;

            }).catch(function error(error) {
                console.log("http request failed ", error);
            });

            console.log(found);
            console.log(response);
            return response;
        };

        service.getItems = function () {
            return found;
        };

        // service.getErrors = function () {
        //     return errorMessage;
        // };

        service.removeItems = function (itemIndex) {
            found.splice(itemIndex, 1);
        };
    }

}) ();
