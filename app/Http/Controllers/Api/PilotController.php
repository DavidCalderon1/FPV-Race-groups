<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PilotRequest;
use App\Http\Resources\PilotResource;
use App\Models\Pilot;
use Illuminate\Http\Request;

class PilotController extends Controller
{
    public function index()
    {
        return PilotResource::collection(Pilot::all());
    }

    public function store(PilotRequest $request)
    {
        $company = Pilot::create($request->validated());

        return new PilotResource($company);
    }

    public function show(Pilot $company)
    {
        return new PilotResource($company);
    }

    public function update(PilotRequest $request, Pilot $company)
    {
        $company->update($request->validated());

        return new PilotResource($company);
    }

    public function destroy(Pilot $company)
    {
        $company->delete();

        return response()->noContent();
    }
}
