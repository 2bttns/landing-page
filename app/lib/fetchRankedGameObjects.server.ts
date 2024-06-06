// fetchRankedGameObjects.server.ts

"use server";
import { twobttns } from "../lib/2bttns";

export async function fetchRankedGameObjects(playerId: string): Promise<any[]> {
  try {
    const response = await twobttns.callApi(
      "/game-objects/ranked",
      "get",
      { playerId: playerId, inputTags: "Traits", outputTag: "Traits" },
      { cache: "no-cache" }
    );

    // Assuming the correct data is nested under `response.data` or similar
    return response && response.data && Array.isArray(response.data.scores) ? response.data.scores : [];
  } catch (error) {
    console.error("Error fetching ranked game objects:", error);
    return []; // Return an empty array in case of error to maintain type consistency
  }
}