// todoList.js

'use strict';

var demoApp = angular.module('demoApp', [

'todoList' ]);

var todoList = angular.module('todoList', []);

todoList.controller('todoCtrl', [ '$scope', function($scope) {

	var todos = $scope.todos = [];

	$scope.addTodo = function () {
	    var newTodo = $scope.newTodo.trim();
	    if (!newTodo.length) {
	        return;
	    }
	    todos.push({
	        title: newTodo,
	        completed: false
	    });

	    $scope.newTodo = '';
	};	

	$scope.removeTodo = function (todo) {
	    todos.splice(todos.indexOf(todo), 1);
	};


	$scope.markAll = function (completed) {
	    todos.forEach(function (todo) {
	        todo.completed = completed;
	    });
	};


	$scope.clearCompletedTodos = function () {
	    $scope.todos = todos = todos.filter(function (todo) {
	        return !todo.completed;
	    });
	    $scope.allChecked = false;
	};	
} ]);