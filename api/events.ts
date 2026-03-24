import { EVENTS } from "../shared/events";

export default function handler(_req: any, res: any) {
  res.status(200).json({ events: EVENTS });
}
