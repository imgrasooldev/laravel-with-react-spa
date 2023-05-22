<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Repositories\AuthRepository\Interfaces\AuthRepositoryInterface;
use App\Repositories\AuthRepository\AuthRepository;

use App\Repositories\UserRepository\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository\UserRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->bind(AuthRepositoryInterface::class, AuthRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
