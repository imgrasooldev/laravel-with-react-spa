<?php

namespace App\Repositories\UserRepository;

use App\Filters\V1\UsersFilter;
use App\Repositories\UserRepository\Interfaces\UserRepositoryInterface;
use App\Models\User;


class UserRepository implements UserRepositoryInterface
{
    public function getAllUsers($request)
    {
        $filter = new UsersFilter();
        $filterItems = $filter->transform($request); //[['column', 'operator', 'value']]

        return User::where($filterItems);
    }

    public function getUserById($request, $user)
    {
        return $user;
    }

    public function createUser($request)
    {
        return User::create($request);
    }

    public function updateUser($request, $user)
    {
        return $user->update($request);
    }

    public function deleteUser($user)
    {
        $user->delete();
    }

    public function getAuthenticatedUser($request)
    {
        return $request->user();
    }
}
