'use server';

import { twobttns } from '../lib/2bttns';

export async function fetchRankedGameObjects() {
    try {
        const response = await twobttns.callApi("/game-objects/ranked", "get", {
            playerId: "amer",
            inputTags: "activities",
            outputTag: "activities"
        });

        return response && response.data && response.data.scores ? 
               response.data.scores : null;
    } catch (error) {
        console.error("Error fetching ranked game objects:", error);
        return null;
    }
}
