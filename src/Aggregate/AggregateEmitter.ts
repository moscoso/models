import { EventEmitter } from 'events';
import { fromEvent as rxFromEvent } from 'rxjs';
import TypedEmitter, { FromEvent } from 'typed-emitter/rxjs';
import { AppEvent } from '../AppEvent/AppEvent';

export type AggregateEvents<E extends AppEvent < string, any >, S> = {
	Error: (gameError: { args: any; commandType: string; error: Error; }) => void;
	Update: (gameUpdate: { event: E; state: S }) => void;
}

/** The typed {@link EventEmitter} for {@link AggregateEvents} */
export type AggregateEmitter<E extends AppEvent < string, any >, S> = TypedEmitter<AggregateEvents<E, S>>;

/** A constructor function for the typed {@link AggregateEmitter}. Based off of the typed-emitter package. */
export const newAggregateEmitter = <E extends AppEvent<string, any>, S>() => new EventEmitter() as AggregateEmitter<E, S> ;

/** The RxJs Observable typing can now be correctly inferenced */
export const fromEmitterEvent = rxFromEvent as FromEvent;
