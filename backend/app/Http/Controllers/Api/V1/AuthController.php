<?php

namespace App\Http\Controllers\Api\V1;

use App\Repositories\AuthRepository\Interfaces\AuthRepositoryInterface;
use App\Http\Controllers\Api\BaseController;
use App\Http\Requests\V1\Auth\{SignInRequest, SignUpRequest};
use App\Http\Resources\V1\User\UserResource;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;

class AuthController extends BaseController
{
    private AuthRepositoryInterface $authRepository;

    public function __construct(AuthRepositoryInterface $authRepository)
    {
        $this->authRepository = $authRepository;
    }

    public function signIn(SignInRequest $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $authUser = Auth::user();
            $success['token'] =  $authUser->createToken('admin-token', ['create', 'read', 'update', 'delete'])->plainTextToken;
            $success['user'] =  new UserResource($authUser);

            return $this->sendResponse($success, 'User signed in');
        } else {
            return $this->sendError('Invalid username or password.', ['error' => 'Invalid username or password'], 422);
        }
    }
    public function signUp(SignUpRequest $request)
    {
        $user = User::create($request->all());

        $success['token'] =  $user->createToken('admin-token', ['create', 'read', 'update', 'delete'])->plainTextToken;
        $success['user'] =  new UserResource($user);

        return $this->sendResponse($success, 'User created successfully.');
    }
    public function signOut(Request $request)
    {
        /** @var \App\Models\User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return $this->sendResponse("", 'User loggedout successfully.');
    }
}
