<!DOCTYPE html>
<html>
<head>
<title>Fundoo App</title>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
	rel="stylesheet">
<link rel="stylesheet"
	href="bower_components/angular-material/angular-material.min.css">
<link rel="stylesheet" href="css/style.css">
<link rel="stylesheet" href="css/sidebar.css">
 <link rel="stylesheet" href="css/dashboard.css">
 <link rel="stylesheet" href="css/remainder.css">

</head>

<body ng-app="routerApp">
	<ui-view></ui-view>
</body>

<script src="bower_components/angular/angular.min.js"></script>
<script src="bower_components/angular-material/angular-material.min.js"></script>
<script src="bower_components/angular-animate/angular-animate.min.js"></script>
<script src="bower_components/angular-aria/angular-aria.min.js"></script>
<script src="bower_components/angular-ui-router/release/angular-ui-router.min.js"></script>
<script src="bower_components/angular-messages/angular-messages.min.js"></script>
<script src="bower_components/ng-content-editable/dist/ng-content-editable.min.js"></script>
<script src="bower_components/angular-sanitize/angular-sanitize.min.js"></script>
<script src="bower_components/ng-img-crop/compile/minified/ng-img-crop.js"></script>

<script src="scripts/app.js" charset="utf-8"></script>


<script src="controllers/userController.js" charset="utf-8"></script>
<script src="controllers/homeController.js" charset="utf-8"></script>
<script src="controllers/dashboardController.js" charset="utf-8"></script>

<script src="derectives/toolbar.js" charset="utf-8"></script>
<script src="derectives/sidebar.js" charset="utf-8"></script>
<script src="services/userservice.js" charset="utf-8"></script>

<script src="services/labelservice.js" charset="utf-8"></script>

</html>
