"use client";
import { useState } from "react";
import { Event, Schedule } from "../types";

const Calendar = () => {
  const [date, setDate] = useState<Date>(() => new Date());
  const [schedule, setSchedule] = useState<Schedule>(() => new Map());

  function handleNewEvent(key: string) {
    const draft = new Map(schedule);

    if (!draft.has(key)) {
      draft.set(key, new Map());
    }

    const day = draft.get(key)!;
    const id = String(+new Date());
    const title = window.prompt("Event title");

    if (!title) return;

    day.set(id, {
      id,
      title,
    });

    setSchedule(draft);
  }

  function handleMonthChange(offset: number) {
    const draft = new Date(date);

    draft.setMonth(date.getMonth() + offset);

    setDate(draft);
  }

  function handleDeleteEvent(key: string, id: string) {
    const draft = new Map(schedule);
    const day = draft.get(key)!;

    day.delete(id);

    setSchedule(draft);
  }

  return (
    <div>
      <div className="absolute z-[-1] left-[-28%] top-0 w-[30%] h-[50%] rounded-full pink_gradient" />
      <h1 className="p-3 font-extrabold text-center text-5xl text-transparent bg-clip-text bg-gradient-to-b from-slate-400 to-gray-200 uppercase">
        {date.toLocaleString("es-AR", { month: "short", year: "numeric" })}
      </h1>
      <div className="flex justify-center text-gray-400 gap-5 mt-[1%] ml-5">
        <button
          onClick={() => handleMonthChange(-1)}
          className="text-3xl font-extrabold px-3 rounded-md"
        >
          {"<"}
        </button>
        <button
          onClick={() => handleMonthChange(1)}
          className="text-3xl font-extrabold px-3 rounded-md"
        >
          {">"}
        </button>
      </div>
      <main className="m-5">
        <div className="grid grid-cols-7 gap-3">
          {Array.from({ length: 7 }, (_, i) => (
            <span
              key={i}
              className="text-center uppercase font-extrabold border-t-2 border-b-2"
            >
              {new Date(
                date.getFullYear(),
                date.getMonth(),
                i + 1
              ).toLocaleString("es-AR", { weekday: "long" })}
            </span>
          ))}
          {Array.from(
            {
              length: new Date(
                date.getFullYear(),
                date.getMonth() + 1,
                0
              ).getDate(),
            },
            (_, i) => {
              const key = `${date.getFullYear()}/${date.getMonth()}/${i + 1}`;
              const events = schedule.get(key);
              return (
                <div
                  key={i}
                  onClick={() => handleNewEvent(key)}
                  className="border-[1px] h-[20vh] rounded-md flex justify-start overflow-y-auto"
                >
                  <div className="font-extrabold flex flex-col p-[0.5rem] m-[0.5rem]">
                    <span className="text-start">{i + 1}</span>
                    {events && (
                      <div className="flex flex-col">
                        {Array.from(events.values()).map((event) => (
                          <li
                            key={event.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteEvent(key, event.id);
                            }}
                            className="cursor-pointer list-none"
                          >
                            <span className="font-medium ">
                              ✓ {event.title}
                            </span>
                          </li>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </main>
    </div>
  );
};

export default Calendar;
