<?php

namespace App\Http\Requests\V1\Auth;

use Illuminate\Foundation\Http\FormRequest;

class SignInRequest extends FormRequest
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
            'email' => 'required|email|string|exists:users,email',
            'password' => [
                'required',
            ],
            'remember' => 'boolean'
        ];
    }
}
