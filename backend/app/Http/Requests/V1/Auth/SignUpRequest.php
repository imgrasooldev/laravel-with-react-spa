<?php

namespace App\Http\Requests\V1\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignUpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules()
    {
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
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'confirm_password' => $this->confirmPassword
        ]);
    }
}
