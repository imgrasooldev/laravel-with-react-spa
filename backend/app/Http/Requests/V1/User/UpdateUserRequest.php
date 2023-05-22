<?php

namespace App\Http\Requests\V1\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */

    public function rules(): array
    {
        $method = $this->method();

        if ($method == 'PUT') {
            return [
                'name' => ['required', 'string'],
                'email' => ['required', 'email', 'unique:users,email'],
                'password' => [
                    'required',
                    Password::min(8)
                        ->letters()
                        ->symbols()
                        ->numbers()
                ],
                'confirm_password' => ['required', 'same:password']
            ];
        } else {

            return [
                'name' => ['sometimes', 'required', 'string'],
                'email' => ['sometimes', 'required', 'email', 'unique:users,email'],
                'password' => [
                    'sometimes',
                    'required',
                    Password::min(8)
                        ->letters()
                        ->symbols()
                        ->numbers()
                ],
                'confirm_password' => ['sometimes', 'required', 'same:password']
            ];
        }
    }

    protected function prepareForValidation()
    {
        if ($this->confirmPassword) {
            $this->merge([
                'confirm_password' => $this->confirmPassword
            ]);
        }
    }
}
