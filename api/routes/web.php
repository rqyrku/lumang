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

$app->group(['prefix' => 'api', 'namespace' => 'Auth'], function()  use ($app)
{
    $app->post('/login', 'LoginController@login');
    $app->post('/signup', 'SignUpController@signUp');
});
