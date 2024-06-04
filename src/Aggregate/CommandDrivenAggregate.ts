import { AppError } from '../AppError/AppError';
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
    C extends Command<Result<E, any>>,
> extends Aggregate<E, S> {
    constructor(
        id: string,
        initialState: S,
        reducer: (event: E, state: S) => S
    ) {
        super(id, initialState, reducer);
    }

	/**
	 * Upon successful execution of a command, an event is generated and added to the {@link Aggregate}.
 	 * This event is then used to mutate the state of the aggregate.
	 * In case of command failure, an error event is emitted.
	 * @param commandType the type of command to execute
	 * @param args params for the command
	 * @returns a {@link Result}
	 */
    public executeCommand(command: C): Result<E, any> {
        const result = command.execute();
        if (result.isSuccess) {
            const event = result.value!;
			try {
				this.addEvent(event);
			} catch (reason: any) {
				console.error(reason);
				return Result.fail(reason);
			}
        }
        return result;
    }
}
