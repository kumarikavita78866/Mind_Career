var app=angular.module('User_Module',[]);
app.service('userService',function($http){
    this.saveUser=function(data){
        return $http.post('http://localhost:5200/api/user/save', JSON.stringify(data))
    }
    this.LoginUserByEmailandPass=function(email,pass){
        return $http.get('http://localhost:5200/api/user/loginuser/email/'+email+'/pass/'+pass)
    }
})
app.controller('Register_ctr',function($scope,userService){
      $scope.RegisterUser=function(){
        {
            if($scope.pass!=$scope.passCon){
                alert('')
            }
            else{
                var user={
                         FULL_NAME:$scope.full_name,
                         E_MAIL:$scope.e_mail,
                         PHONE_NUMBER:$scope.phone_number,
                         PASSWORD:$scope.password,
                         CONFIRM_PASSWORD:$scope.confirm_password,
                }
            }
            userService.saveUser(user).then(function(response){
                if(response.data.Message=="SUCCESS"){
                    alert('REGISTRATION SUCCESSFULLY')
                    $scope.full_name="";
                    $scope.e_mail="";
                    $scope.phone_number="";
                    $scope.password="";
                    $scope.confirm_password="";
                }
                else{
                    alert('REGISTRATION UNSUCCESSFULLY')
                }
            })
        }
       
      }
})

app.factory('storageService',['$rootScope',function($rootScope){
    return {
        get:function(key){
            return sessionStorage.getItem(key);
        },
        save:function(key,data){
            return sessionStorage.setItem(key,data);
        }
    }
}])


app.controller('login_ctr',function($scope,userService,storageService,$window){
    $scope.LoginUser=function(){
        var email_id=$scope.loginemail;
        var pass=$scope.loginpassword;
        userService.LoginUserByEmailandPass(email_id,pass).then(function(response){
            if(response.data.Message=="Success"){
                $scope.emailid=response.data.LoginResponse[0].E_MAIL;
                storageService.save("email_id",$scope.emailid);
                $window.location.href="../../Base/index.html";
                alert("Login Successfully");
            }else{
                alert("Login Unsuccessfull");
            }
        })
    }
})

app.controller('Main_ctr',function($scope,storageService,$window){
    $scope.IsLoginOrNot=function(){
        var log=storageService.get("email_id");
        if(log==null || log==""){
            $scope.loginbtn=false;
            $scope.profilebtn=true;
        }else{
            $scope.loginbtn=true;
            $scope.profilebtn=false;
        }
    }
    $scope.IsLoginOrNot();
    $scope.LogoutFun=function(){
        storageService.save("email_id","");
        $window.location.href="./index.html";
    }
})