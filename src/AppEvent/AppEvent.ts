/**
 * AppEvents are events specific to our application that have a generic type T.
 * In an event-sourcing system, events are the constituents that define an entity by aggregation.
 * @typeparam {T} a type of event
 * @typeparam {P} the type of payload
 */
export class AppEvent < T, P > {
	/**
     * The unique identifier that specifies which aggregate the event belongs to
     */
	public aggregateID ?: string;

    /**
     * A number that determines the chronological order of when the event occured in a sequence of events
     */
    public eventNumber: number = 0;

	/**
     * An optional unit of data to describe the event
     */
	public readonly payload ?: P;

    /**
     * A timestamp that specifies when the event occured
     */
    public readonly timestamp: Date = new Date();

    public readonly type ?: T;
}
