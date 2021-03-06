(function() {
    "use strict";

angular.module('myApp', ['ui.bootstrap',"ngRoute"])
.constant('basePath', 'https://api.myjson.com/bins/n25mt')
.controller('myCtrl', myCtrl)

.controller('myEditCtrl',myEditCtrl);

myCtrl.$inject=['$scope','myService','$filter','$interpolate','filterFilter','$window']
function myCtrl ($scope,myService,$filter,$interpolate,filterFilter,$window) {
if ($window.localStorage.getItem('dashboard')!='null'){
  $scope.data =JSON.parse($window.localStorage.getItem('dashboard'))
  console.log($scope.data)
    call();
            
}
else{
myService.getData().then(function(data){
      $scope.data = data;
      console.log(data)
      call();
   })
   .catch(function(response){
      console.log(response.status);
   }); 
  }
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




myEditCtrl.$inject=['$scope','myService','$window']

function myEditCtrl($scope,myService,$window){
 

  if ($window.localStorage.getItem('dashboard')!='null'){
    $scope.data =JSON.parse($window.localStorage.getItem('dashboard'))
    console.log($window.localStorage.getItem('dashboard'))
      other();
              
  }
  else{
  myService.getData().then(function(data){
        $scope.data = data;
        console.log(data)
        other();
     })
     .catch(function(response){
        console.log(response.status);
     }); 
    }
  


  function other() {
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
      $scope.data.push(userJson);
      myService.setData($scope.data)
  
		}

	};
  }
   
}

})();


 /*$scope.page=function(){
    return $scope.data.slice((($scope.currentPage-1)*($scope.itemsPerPage)), (($scope.currentPage)*($scope.itemsPerPage)))
  } */
