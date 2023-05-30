
export interface Event {
    id: string;
    title: string
}

export type Schedule = Map<string, Map<string, Event>>