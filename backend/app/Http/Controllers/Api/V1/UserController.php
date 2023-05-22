<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\BaseController;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\V1\User\{StoreUserRequest, UpdateUserRequest};
use App\Http\Resources\V1\User\{UserCollection, UserResource};
use App\Models\User;
use App\Repositories\UserRepository\Interfaces\UserRepositoryInterface;

class UserController extends BaseController
{
    private UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request): JsonResponse
    {
        $users = $this->userRepository->getAllUsers($request);
        $success = new UserCollection($users->paginate()->appends($request->query()));
        return $this->sendResponse($success, 'Users retrieved successfully.');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \App\Http\Requests\StoreUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $success = new UserResource($this->userRepository->createUser($request->all()));
        return $this->sendResponse($success, 'User stored successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, User $user): JsonResponse
    {
        $success = new UserResource($this->userRepository->getUserById($request, $user));
        return $this->sendResponse($success, 'User retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \App\Http\Requests\UpdateUserRequest $request
     * @param \App\Models\User                     $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user): JsonResponse
    {
        $this->userRepository->updateUser($request->all(), $user);
        $success = new UserResource($user);
        return $this->sendResponse($success, 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user): JsonResponse
    {
        $this->userRepository->deleteUser($user);
        return $this->sendResponse([], 'User deleted successfully.');
    }

    public function getAuthenticatedUser(Request $request): JsonResponse
    {
        $success = $this->userRepository->getAuthenticatedUser($request);
        return $this->sendResponse($success, "User fetched successfully");
    }
}
