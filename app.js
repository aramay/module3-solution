(function () {

    var app = angular.module('NarrowItDownApp', []);

    app.controller('NarrowItDownController', NarrowItDownController);

    app.service('MenuSearchService', MenuSearchService);
    app.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    app.directive('foundItems', FoundItemsDirective);

    function FoundItemsDirective() {

        var ddo = {
            templateUrl: 'loader/itemsloaderindicator.template.html',
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

        ctrl.logMatchedMenuItems = function (searchTerm) {

            console.log(searchTerm);

            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            console.log("promise ",promise);

            // promise.then(function (response) {
            //     ctrl.items = response.data;
            // }).catch(function (error) {
            //     console.log("Http request failed ", error);
            // });

            console.log(ctrl.items);

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
                    // console.log(menu_items[i]);
                    // console.log(menu_items[i].description);

                    var description = menu_items[i].description;
                    console.log(found);
                    // if (searchTerm === undefined) {
                    //     return "nothing found";
                    // }
                    // else if (name.toLowerCase().indexOf(searchTerm) !== -1) {
                    //     return true;
                    // }

                    if (searchTerm === undefined) {
                        break;
                    }

                    if (description.search(searchTerm) != -1) {
                        console.log("not found");
                        console.log(found);
                    }
                    // else {
                    //     console.log(menu_items[i]);
                    //     console.log(found.push(menu_items[i]));
                    //
                    // }


                }
                console.log(found);
                return false;

            }, function error(error) {
                console.log("http request failed ", error);
            });
            // console.log(response);
            return response;
        };
    }

}) ();
