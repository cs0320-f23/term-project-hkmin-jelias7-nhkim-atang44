import { Fragment, useState } from "react";
import { EditEventButton } from "../utilities/NavigationButton";
import { eventsBackend } from "../../../../backend/eventsBackend";
import { AddEvent, EditableEventHistory } from "./sideBarComponents";
import { EventEntry } from "../types/types";
import { WrappedMap } from "./WrappedMap";

// ISSUES: backend needs to log the spotifyId of the logged in artist when adding event entries
// This may entail a more robust artist login system

export default function EditEvent() {
  // init params
  const [artist, setArtist] = useState("");
  const [image, setImage] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [fieldToChange, setFieldToChange] = useState("");
  const [fieldValue, setFieldValue] = useState("");
  const { onSubmitEvent } = eventsBackend(); // imported function for submitting events to backend, on backend
  const [selectedOption, setSelectedOption] = useState("");
  const [spotifyId, setSpotifyId] = useState(""); // <- state for storing the spotify ID
  // spotifyId for artist isnt being properly updated
  const [location, setLocation] = useState<number[]>([0, 0]); // <- state for storing the location [latitude, longitude

  // set spotify Id to what is passed in from the login page (i don't really know how to connect the classes together yet)

  // event lists
  const [eventList, setEventList] = useState<EventEntry[]>([]);
  const allEvents = eventsBackend().allEvents;
  const filteredEvents = allEvents.filter(
    // i think this is a promise, so i need some async
    (event) => event.spotifyId == spotifyId
  );
  console.log("these are filtered events:", filteredEvents);
  console.log("this is eventList", eventList);

  function updateLocation(latitude: number, longitude: number) {
    setLocation([latitude, longitude]);
  }

  // function for ADDING events to the database
  async function handleAddEvent() {
    if (artist !== "" && image !== "" && venue !== "" && date !== "") {
      onSubmitEvent(artist, image, venue, date); // submit event to the database
      setEventList([
        ...eventList,
        {
          artist: artist,
          image: image,
          venue: venue,
          date: date,
          spotifyId: spotifyId,
          location: location,
        },
      ]); // add to the artist's event list with the new event
      // reset fields
      setArtist("");
      setImage("");
      setVenue("");
      setDate("");
      setSpotifyId("");
    } else {
      // there is some field that's unfilled, don't update the database
      console.log("a field is unfilled!");
    }
  }

  // change state to selected option. changes what is displayed in the sidebar window
  function handleClick(selectedOption: string) {
    setSelectedOption(selectedOption);
  }

  // partial inspiration for the menu styling credited to: https://tailwindcomponents.com/component/sidebar-by-material-tailwind
  return (
    <div className="grid grid-cols-[300px_minmax(200px,_1fr)_500px] gap-1 ">
      <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 h-100px w-3/8 max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">
            Event Editor
          </h5>
        </div>
        <nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
          <div
            role="button"
            className="grid place-items-center mr-3 w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            onClick={() => handleClick("addEvent")}
          >
            <div className="grid place-items-center mr-1">Add Event</div>
          </div>
          <div
            role="button"
            className="grid place-items-center mr-3 w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            onClick={() => handleClick("modifyEvent")}
          >
            <div className="grid place-items-center mr-1">Modify Event</div>
          </div>
          <div>
            <EditEventButton
              to="/"
              label="Homepage"
              className="grid place-items-center mr-3 w-full p-5 rounded-lg text-start leading-tight transition-all hover:bg-blue-50 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-blue-50 active:bg-opacity-80 hover:text-blue-900 focus:text-blue-900 active:text-blue-900 outline-none"
            />
          </div>
        </nav>
      </div>
      <div className="max-h-screen overflow-scroll">
        {(selectedOption == "addEvent" || selectedOption == "") && (
          <AddEvent
            artist={artist}
            setArtist={setArtist}
            image={image}
            setImage={setImage}
            venue={venue}
            setVenue={setVenue}
            date={date}
            setDate={setDate}
            fieldToChange={fieldToChange}
            setFieldToChange={setFieldToChange}
            fieldValue={fieldValue}
            setFieldValue={setFieldValue}
            handleAddEvent={handleAddEvent}
            eventList={eventList}
            filteredEventList={filteredEvents}
            spotifyId={spotifyId}
            setSpotifyId={setSpotifyId}
          />
        )}
        {selectedOption == "modifyEvent" && (
          <EditableEventHistory
            artist={artist}
            setArtist={setArtist}
            image={image}
            setImage={setImage}
            venue={venue}
            setVenue={setVenue}
            date={date}
            setDate={setDate}
            fieldToChange={fieldToChange}
            setFieldToChange={setFieldToChange}
            fieldValue={fieldValue}
            setFieldValue={setFieldValue}
            handleAddEvent={handleAddEvent}
            eventList={eventList}
            filteredEventList={filteredEvents}
            spotifyId={spotifyId}
            setSpotifyId={setSpotifyId}
          />
        )}
        {selectedOption == ""}
      </div>
      {/* This is the map component. TODO FOR JOHNNY: fill this in. */}
      <div>
        <WrappedMap
          handleLocation={(la, lo) => updateLocation(la, lo)}
        ></WrappedMap>
      </div>
    </div>
  );
}
