<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TeamRequest;
use App\Http\Resources\TeamResource;
use App\Models\Team;

class TeamController extends Controller
{
    public function index()
    {
        return TeamResource::collection(Team::all());
    }

    public function store(TeamRequest $request)
    {
        $team = Team::create($request->validated());

        return new TeamResource($team);
    }

    public function show(Team $team)
    {
        return new TeamResource($team);
    }

    public function update(TeamRequest $request, Team $team)
    {
        $team->update($request->validated());

        return new TeamResource($team);
    }

    public function destroy(Team $team)
    {
        $team->delete();

        return response()->noContent();
    }
}
