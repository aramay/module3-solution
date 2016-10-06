(function() {
	"use strict";

    angular.module("NarrowItDownApp", [])
	.controller("NarrowItDownController", NarrowItDownController)
	.service("MenuSearchService", MenuSearchService)
	.directive("foundItems", FoundItems);

	function FoundItems() {
		var ddo = {
			templateUrl: "foundItems.html",
			scope: {
				search: "<",
				onRemove: "&"
			}
		};

		return ddo;
	}

	NarrowItDownController.$inject = ["MenuSearchService"];
	function NarrowItDownController(MenuSearchService){
		var search = this;
		search.term = "";
		search.found = [-1];

		search.getItems = function(term){
			var promise = MenuSearchService.getMatchedMenuItems(search.term);

			promise.then(function (responce){
				search.found = [];
				search.found = responce;
			});
		};
		search.removeItem = function (index) {
	    	search.found.splice(index, 1);
	    };

	}

	MenuSearchService.$inject = ["$http"];
	function MenuSearchService($http){
		var service = this;

		service.getMatchedMenuItems = function(term){

			return $http({
				method: "GET",
				url: "https://davids-restaurant.herokuapp.com/menu_items.json"
			}).then(function (result){

				var foundItems = []

				for (var i = 0; i < result.data.menu_items.length; i++){
					if(result.data.menu_items[i].name.toLowerCase().indexOf(term.toLowerCase()) !== -1){
						foundItems.push(result.data.menu_items[i]);
					}
				}
				if(foundItems.length === 0 || term === ""){
					foundItems = [];
				}
				return foundItems;
			})

		}

	}


})();
