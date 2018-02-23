(function() {
    "use strict";

angular.module('myApp', ['ui.bootstrap',"ngRoute"])
.constant('basePath', 'https://api.myjson.com/bins/10gtel')
.controller('myCtrl', myCtrl)

.controller('myEditCtrl',myEditCtrl);

myCtrl.$inject=['$scope','myService','$filter','$interpolate','filterFilter']
function myCtrl ($scope,myService,$filter,$interpolate,filterFilter) {

myService.getData().then(function(data){
      $scope.data = data;
      console.log(data)
      call();
   })
   .catch(function(response){
      console.log(response.status);
   }); 

function call(){
  $scope.currentPage = 1;
  $scope.itemsPerPage = 10;
  $scope.maxSize = 3;
   $scope.totalItems = $scope.data.length;
          $scope.filterList=$scope.data;
 
  $scope.$watch('data', function() {   
              
    $scope.filterList = filterFilter($scope.data);
   $scope.itemsPerPage = 10;
   $scope.currentPage = 1;
      $scope.maxSize = 3;
      
      $scope.totalItems = $scope.data.length;
      $scope.currentPage = 1;
                });

   $scope.$watch('search.$', function (term) {
              var obj = { $: term }
              $scope.filterList=null;
 	            $scope.filterList = filterFilter($scope.data, obj);
              $scope.currentPage = 1;
                });
}
};




myEditCtrl.$inject=['$scope','myService']

function myEditCtrl($scope,myService){
    
    $scope.Emails=[{id: 'choice1'}];
    $scope.Contacts=[{id: 'choice1'}];
    $scope.set1=function(x){
        if (x==0)        
        return "work"
        else if (x==1)
        return "personal"
        else if (x==2)
        return "personal2"
        else return "other"
    }
     $scope.set2=function(x){
        if (x==0)        
        return "mobile"
        else if (x==1)
        return "work"
        else if (x==2)
        return "work"
        else return "other"
    }
    $scope.addNewChoice = function(x) {
        if (x==1){
       
        var newItemNo = $scope.Emails.length+1;
        $scope.Emails.push({'id':'choice'+newItemNo});
        }
        else{
        var newItemNo = $scope.Contacts.length+1;
        $scope.Contacts.push({'id':'choice'+newItemNo});
        }
      };
        
      $scope.removeChoice = function(x) {

        if (x==1){
        if($scope.Emails.length==1){return;}
        var lastItem = $scope.Emails.length-1;
        $scope.Emails.splice(lastItem);
               }
        else{
             if($scope.Contacts.length==1){return;}
            var lastItem = $scope.Contacts.length-1;
            $scope.Contacts.splice(lastItem);

        }
      };
      $scope.submitForm = function(isValid) {
     console.log($scope.user.username,$scope.Emails,$scope.Contacts)
		// check to make sure the form is completely valid
		if (isValid) { 
			alert('our form is amazing');
      var emailjson=[]
      var contactjson=[]
      var userArr=[]
      for (var k = 0; k < $scope.Emails.length; k++) {
         var obj = {};
        obj[$scope.Emails[k].id.toString()] =$scope.Emails[k].email_id.toString()
        emailjson.push(obj)
      }
       for (var k = 0; k < $scope.Contacts.length; k++) {
        var obj = {};
        obj[$scope.Contacts[k].id.toString()] =$scope.Contacts[k].number.toString()
        contactjson.push(obj)
      }
      

      var userJson = {
        "name":$scope.user.username.toString(),
        "Emails":emailjson,
        "Contacts":contactjson
      };
      console.log(userJson);
      
      myService.getData().then(function(data){
      $scope.data = data;
      console.log(data)
      $scope.data.push(userJson);
      
   })
   .catch(function(response){
      console.log(response.status);
   }); 
		}

	};

   
}

})();


 /*$scope.page=function(){
    return $scope.data.slice((($scope.currentPage-1)*($scope.itemsPerPage)), (($scope.currentPage)*($scope.itemsPerPage)))
  } */