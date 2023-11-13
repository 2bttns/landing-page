"use server";

import { RedirectType, redirect } from "next/navigation";
import { twobttns } from "./2bttns";

export default async function play2bttnsDemo(
  playerId: string,
  formData: FormData
) {
  const url = twobttns.generatePlayUrl({
    gameId: process.env.DEMO_GAME_ID!,
    callbackUrl: process.env.CALLBACK_URL,
    playerId,
  });
  return redirect(url, RedirectType.push);
}
