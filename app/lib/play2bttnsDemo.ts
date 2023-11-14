"use server";

import { RedirectType, redirect } from "next/navigation";
import { twobttns } from "./2bttns";

export type Play2bttnsDemoParams = {
  callbackUrl: string;
  playerId: string;
};

export default async function play2bttnsDemo(
  { callbackUrl, playerId }: Play2bttnsDemoParams,
  formData: FormData
) {
  const url = twobttns.generatePlayUrl({
    gameId: process.env.DEMO_GAME_ID!,
    callbackUrl,
    playerId,
  });
  return redirect(url, RedirectType.push);
}
