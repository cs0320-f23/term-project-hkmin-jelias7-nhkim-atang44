import { Dispatch, SetStateAction } from "react";
import { EventEntry } from "../types/types";
import {NavigationButton} from "../../NavigationButton";
import { mockEvents1 } from "../mocks/mockEvents";

export interface EventsAll {
  events: EventEntry[];
  //setEvents: Dispatch<SetStateAction<EventEntry[]>>;
}


export default function EventsAll({ events }: EventsAll) {
  return (
    <div className="EventsAll">
      <NavigationButton to="/" label="Go To Homepage" />
      <ul className="divide-y divide-gray-200 p-10 mx-auto grid gap-2 grid-cols-7">
        {mockEvents1.map((event, index) => (
          <div key={index}>
            {/* Create a profile image, corresponding description. Just make key the index for convenience*/}
            <li key={index} className="h-60 w-45 shadow-xl rounded-xl">
              <img
                className="aspect-video w-45 object-cover object-center rounded-t-xl"
                src={event.image}
                alt=""
              />
              <div className="ml-3 h-10 w-45">
                <p className="text-sm font-medium text-gray-900">
                  {event.artist}
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {event.venue}
                </p>
                <p className="text-sm text-gray-500">{event.date}</p>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
