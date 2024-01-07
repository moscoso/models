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
    private commandFactory: (commandType: C, args: any) => any;

    constructor(
        id: string,
        initialState: S,
        reducer: (event: E, state: S) => S,
        commandFactory: any,
    ) {
        super(id, initialState, reducer);
        this.commandFactory = commandFactory;
    }

	/**
	 * Upon successful execution of a command, an event is generated and added to the {@link Aggregate}.
 	 * This event is then used to mutate the state of the aggregate.
	 * In case of command failure, an error event is emitted.
	 * @param commandType
	 * @param args
	 * @returns
	 */
    public executeCommand(command: Command<Result<E, any>>, args: any = {}): Result<E, any> {
        const result = command.execute();
        if (result.isSuccess) {
            const event = result.value!;
            this.addEvent(event);
            setImmediate(() => this.emitter.emit('Update', { aggregate: this, event, state: this.state }));
        } else {
            setImmediate(() => this.emitter.emit('Error', { args, error: result.error! }));
        }
        return result;
    }
}
