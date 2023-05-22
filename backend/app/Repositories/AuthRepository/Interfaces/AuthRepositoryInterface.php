<?php

namespace App\Repositories\AuthRepository\Interfaces;

interface AuthRepositoryInterface
{
    public function signIn($request);
    public function signUp($request);
}
