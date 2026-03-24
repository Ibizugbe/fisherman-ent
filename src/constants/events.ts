import TradOut from "../assets/tradout/TRADOUT.jpg";
import {
  EVENTS as CORE_EVENTS,
  getEventById as getCoreEventById,
  type EventCore,
} from "../../shared/events";

export type EventItem = EventCore & {
  coverImage?: string;
};

export const EVENTS: EventItem[] = CORE_EVENTS.map((event) => ({
  ...event,
  coverImage: event.id === "tradout" ? TradOut : undefined,
}));

export const getEventById = (id: string): EventItem | undefined =>
  EVENTS.find((e) => e.id === id) ??
  (() => {
    const core = getCoreEventById(id);
    return core ? { ...core } : undefined;
  })();
