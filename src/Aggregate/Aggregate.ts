import { EventEmitter } from 'events';
import { AppEvent } from '../AppEvent/AppEvent';

/**
 * An aggregate is a single-unit entity composed by a series of state-changing events.
 * With each new event added to the aggregate the state of the entity changes.
 *
 * Usually in practice, a command is applied to an aggregate which then produces one or more events.
 * The current state of the entity is populated (and can be re-hydrated) by sequential
 * application of the event stream.
 *
 * In other words, a series of events <T> are reduced to a
 * snapshot that is the current state of the object <V>.
 *
 * @param <T> The events that are the constituents of the aggregate
 * @param <V> The interface that represents the current state of the aggregate
 */
export class Aggregate < T extends AppEvent < string, any >, V > {
    /**
     * A unique identifier for the aggregate
     */
    protected id: string;
    /**
     * The initial state of the aggregate
     */
    protected initialState: V;
    /**
     * The current state of the aggregate
     */
    protected state: V;
    /**
     * The reducer used to calculate the state of the aggregate for each new event
     */
    protected reducer: (event: T, state: V) => V;
    /**
     * The events that constitute the aggregate
     */
    protected events: T[] = [];

    /**
     * An event emitter that a listener can use to react to events
     */
    protected eventEmitter: EventEmitter = new EventEmitter();

    constructor(aggregateID: string, initialState: V, reducer: (event: T, state: V) => V) {
        this.id = aggregateID;
		this.initialState = initialState;
        this.state = initialState;
        this.reducer = reducer;
    }

    /**
     * Add a new event to the aggregate and return the reduced state of the aggregate;
     * @param event an App Event
     * @returns the state of the aggregate
     */
    public addEvent(event: T): V {
        this.events.push(event);
        event.aggregateID = this.id;
        event.eventNumber = this.events.length;
        this.state = this.reduce(this.state, event);
		this.eventEmitter.emit(event.type ?? 'unknown', event);
        return this.state;
    }

    /**
     * Determines changes to the aggregate's state. It uses the previous state + an event it receives to determine this change.
     * @param state a state of the Aggregate
     * @param event an App Event
     */
    public reduce(state: V, event: T): V {
        return this.reducer(event, state);
    }

    /**
     * Get the current state of the aggregate
     */
    public getState(): V {
        return this.state;
    }

    /**
     * Get the event emitter that a listener can use to react to events
     */
    public getEventEmitter(): EventEmitter {
        return this.eventEmitter;
    }

	/**
	 * Reset the aggregate to the initial state and clear the event list
	 */
    reset() {
        this.state = this.initialState;
		this.events = [];
    }
}
