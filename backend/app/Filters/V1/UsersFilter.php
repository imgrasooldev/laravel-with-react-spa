<?php

namespace App\Filters\V1;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;


class UsersFilter extends ApiFilter
{
    protected $safeParms = [
        'id' => ['eq'],
        'email' => ['eq']
    ];

    protected $columnMap = [];

    protected $operatorMap = [
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
    ];
}
