// fetchRankedGameObjects.server.ts

"use server";

export async function fetchRankedGameObjects(playerId: string): Promise<any[]> {
  const url = `https://twobttns.onrender.com/api/game-objects/ranked?playerId=${playerId}&inputTags=Traits&outputTag=Traits`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.TWOBTTNS_BEARER_TOKEN}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching ranked game objects: ${response.statusText}`);
    }

    const data = await response.json();

    return data && Array.isArray(data.scores) ? data.scores : [];
  } catch (error) {
    console.error("Error fetching ranked game objects:", error);
    return []; // Return an empty array in case of error to maintain type consistency
  }
}