(function () {

    var app = angular.module('NarrowItDownApp', []);

    app.controller('NarrowItDownController', NarrowItDownController);

    app.service('MenuSearchService', MenuSearchService);
    app.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

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

        service.menuItems = "";

        service.getMatchedMenuItems = function (searchTerm) {

            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json"),
                // params: {
                //     category: searchTerm
                // }
                // console.log(response);
            }).then(function success(result) {
                console.log("success http request ", result.data);

                var menu_items = result.data.menu_items;

                for (var i = 0; i < menu_items.length; i++) {

                    var description = menu_items[i].description;
                    // console.log(found);

                    console.log(searchTerm);

                    if (searchTerm === "") {
                        console.log("not found");
                        // found.push("No matching items found");
                        found = "No matching items found";
                        break;
                    }

                    else if (description.search(searchTerm) != -1) {
                        console.log("found matching items");
                        found.push(menu_items[i]);
                    } else {

                    }

                }
                // console.log(found);
                // return false;

            }, function error(error) {
                console.log("http request failed ", error);
            });

            console.log(found);
            console.log(response);
            return response;
        };

        service.getItems = function () {
            return found;
        };

        service.removeItems = function (itemIndex) {
            found.splice(itemIndex, 1);
        };
    }

}) ();
