import WeeklyBreakdown from "./breakdown";
import Artists from "./artists";
import Events from "./events";
import { Artist, EventEntry } from "../types/types";
import { SetStateAction, useEffect, useState } from "react";
import NAV from "../nav/nav";

// do not need this homepage
// export interface HOMEPAGE {
//   WeeklyBreakDownHistory: EventEntry[];
// }

// function for homepage
export default function HOMEPAGE() {
  const [weeklyBreakDownHistory, setWeeklyBreakDownHistory] = useState<
    EventEntry[]
  >([]);
  const [artists, setArtists] = useState<
    Artist[]
  >([]);
  const [events, setEvents] = useState<
    EventEntry[]
  >([]);


  return (
    <div className="homepage">
      <NAV
        weeklyBreakDownHistory={weeklyBreakDownHistory}
        setWeeklyBreakDownHistory={setWeeklyBreakDownHistory}
      />
      <WeeklyBreakdown weeklyBreakDownHistory={weeklyBreakDownHistory} />
      <div>
        <Artists artists={artists} />
      </div>
      <div>
        <Events events={events} />
      </div>
    </div>
  );
}
