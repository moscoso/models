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
 * In other words, a series of events <E> are reduced to a
 * snapshot that is the current state of the object <S>.
 *
 * @param <E> The events that are the constituents of the aggregate
 * @param <S> The interface that represents the current state of the aggregate
 */
export class Aggregate < E extends AppEvent < string, any >, S > {
    /**
     * A unique identifier for the aggregate
     */
    protected id: string;
    /**
     * The initial state of the aggregate
     */
    protected initialState: S;
    /**
     * The current state of the aggregate
     */
    protected currentState: S;
    /**
     * The reducer used to calculate the state of the aggregate for each new event
     */
    protected reducer: (event: E, state: S) => S;
    /**
     * The events that constitute the aggregate
     */
    protected events: E[] = [];

    /**
     * An event emitter that a listener can use to react to events
     */

    constructor(aggregateID: string, initialState: S, reducer: (event: E, state: S) => S) {
        this.id = aggregateID;
		this.initialState = initialState;
        this.currentState = initialState;
        this.reducer = reducer;
    }

    /**
     * Add a new event to the aggregate and return the reduced state of the aggregate;
     * @param event an App Event
     * @returns the state of the aggregate
     */
    public addEvent(event: E): S {
        this.events.push(event);
        event.aggregateID = this.id;
        event.eventNumber = this.events.length;
        this.currentState = this.reduce(this.state, event);
        return this.state;
    }

    /**
     * Determines changes to the aggregate's state. It uses the previous state + an event it receives to determine this change.
     * @param state a state of the Aggregate
     * @param event an App Event
     */
    public reduce(state: S, event: E): S {
        return this.reducer(event, state);
    }

    /**
     * Get the current state of the aggregate
     */
    public get state(): S {
        return this.currentState;
    }

	/**
	 * Reset the aggregate to the initial state and clear the event list
	 */
    reset() {
        this.currentState = this.initialState;
		this.events = [];
    }
}
