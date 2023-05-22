<?php

namespace App\Http\Resources\V1\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'items' => parent::toArray($request)/* CustomerResource::collection($this->collection) */,
            'pagination' => [
                "current_page" => $this->currentPage(),
                "first_page_url" =>  $this->getOptions()['path'] . '?' . $this->getOptions()['pageName'] . '=1',
                "prev_page_url" =>  $this->previousPageUrl(),
                "next_page_url" =>  $this->nextPageUrl(),
                "last_page_url" =>  $this->getOptions()['path'] . '?' . $this->getOptions()['pageName'] . '=' . $this->lastPage(),
                "last_page" =>  $this->lastPage(),
                "per_page" =>  $this->perPage(),
                "total" =>  $this->total(),
                "path" =>  $this->getOptions()['path'],
                'range' => $this->getUrlRange(1, $this->lastPage()),
                'lastitem' => $this->lastItem()
            ],
        ];
    }
}
