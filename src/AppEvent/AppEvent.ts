/**
 * AppEvents are events specific to our application that have a generic type T.
 * In an event-sourcing system, events are the constituents that define an entity by aggregation.
 * @typeparam {T} a type of event
 * @typeparam {P} the type of payload
 */
export class AppEvent < T, P > {
    /**
     * A number that determines the chronological order of when the event occured in a sequence of events
     */
    public eventNumber: number = 0;
    /**
     * A timestamp that specifies when the event occured
     */
    public timestamp: Date;
    /**
     * The type of event that gives context to what is happening
     */
    public type: T;
    /**
     * An optional unit of data to describe the event
     */
    public payload: P;
    /**
     * The unique identifier that specifies which aggregate the event belongs to
     */
    public aggregateID: string = '';

    constructor(type: T, payload?: P) {
        this.timestamp = new Date();
        this.type = type;
		this.payload = payload ?? {} as P;
    }
}
