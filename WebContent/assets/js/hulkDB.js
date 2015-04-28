function isNumber(evt) {
	var iKeyCode = (evt.which) ? evt.which : evt.keyCode
	if (iKeyCode != 46 && iKeyCode > 31 && (iKeyCode < 48 || iKeyCode > 57))
		return false;

	return true;
}
function readTextFile(file) {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	var txt = '';
	rawFile.onreadystatechange = function() {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				console.log(allText);
				txt = allText;
			}
		}
	}
	rawFile.send(null);
	return (txt);
}

angular.module('hulkApp', []).controller('hulkController', function($scope) {
	$scope.existingTables = [];
	var exisTab = readTextFile("files/existingTables.hlk");

	var lines = exisTab.split('\n');
	console.log(lines);
	for (var i = 0; i < lines.length; i++) {
		var arr = lines[i].split(',');
		$scope.existingTables.push({
			name : arr[0],
			fields : arr[1]
		});
	}

	$scope.types = [ {
		name : 'numeric',
		size : true
	}, {
		name : 'character varying',
		size : true
	}, {
		name : 'date',
		size : false
	}, {
		name : 'boolean',
		size : false
	}, {
		name : 'text',
		size : false
	}, {
		name : 'bigint',
		size : false
	}, {
		name : 'smallint',
		size : false
	}, {
		name : 'time',
		size : false
	}, {
		name : 'timestamp',
		size : false
	} ];
	
	$scope.newTables = [ {
		name : '',
		fields : [ {
			type : $scope.types[0]
		} ]
	}
	
	 ];
	$scope.createTable = function(ind)
	{var str  = "CREATE TABLE " + $scope.newTables[ind].name;
	for (i in $scope.newTables[ind].fields)
	{
	str +=$scope.newTables[ind].fields[i].name + " " +$scope.newTables[ind].fields[i].type; 
	};
	
		$scope.addField = function(ind) {
		$scope.newTables[ind].fields.push({
			type : $scope.types[0]
		});
	};
	$scope.delField = function(ind, ind2) {
		$scope.newTables[ind].fields.splice(ind2, 1);
	};

});