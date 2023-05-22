<?php

namespace App\Repositories\UserRepository\Interfaces;

interface UserRepositoryInterface
{
    public function getAllUsers($request);
    public function getUserById($request, $user);
    public function deleteUser($user);
    public function createUser($request);
    public function updateUser($request, $user);
    public function getAuthenticatedUser($request);
}
