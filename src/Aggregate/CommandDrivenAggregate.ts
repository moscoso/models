import { AppEvent } from '../AppEvent/AppEvent';
import { Command } from '../Command/Command';
import { Result } from '../Result/Result';
import { Aggregate } from './Aggregate';

/**
 * The `CommandDrivenAggregate` class extends the functionality of an `Aggregate` by integrating
 * command handling. This class is responsible for encapsulating the logic for execution of commands that
 * can mutate the state of the aggregate and emit corresponding events as they are added.
 *
 * The class is designed to be generic, allowing for flexibility in the types of commands,
 * events, and states it can handle. This is achieved through generic type parameters.
 *
 * @param <E> The type of the events that are constituents of the aggregate.
 * @param <S> An object representing the current state of the aggregate.
 * @param <C> The type of the commands that the aggregate can execute.
 */
export class CommandDrivenAggregate<
    E extends AppEvent<string, any>,
    S extends object,
    C extends Command<Result<E[], any>>,
> extends Aggregate<E, S> {
    constructor(
        id: string,
        initialState: S,
        reducer: (event: E, state: S) => S
    ) {
        super(id, initialState, reducer);
    }

	/**
	 * Upon successful execution of a command, events are generated and added to the {@link Aggregate}.
 	 * These events are applied one at at ime to mutate the state of the aggregate.
	 * In case of command or reducer error, a failure Result is returned.
	 * @param commandType the type of command to execute
	 * @param args params for the command
	 * @returns a {@link Result}
	 */
    public executeCommand(command: C): Result<E[], any> {
		let result;
		try {
			result = command.execute();
		} catch (reason: any) {
			console.error(reason);
			return Result.fail(reason);
		}

		if (result?.isSuccess) {
			const events = result.value!;
			if (events.length === 0) {
				return Result.fail(new Error('Failed to execute command. It returned 0 events which is invalid'));
			}
			const initialLength = this.events.length;
			const initialState = this.currentState;
			try {
				events.forEach(event => {
					this.addEvent(event);
				});
			} catch (reason: any) {
				// In case of an error, revert aggregate to its original state
				this.events = this.events.slice(0, initialLength);
				this.currentState = initialState;
				console.error(reason);
				return Result.fail(reason);
			}
		}

        return result;
    }
}
