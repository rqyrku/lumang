<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/


$app->get('/', 'AngularController@serve');

$app->post('/login', 'Auth\LoginController@login');
$app->post('/signup', 'Auth\SignUpController@signUp');
