import { AppEvent } from '../AppEvent/AppEvent';
import { Result } from '../Result/Result';

/**
 * The Command pattern encapsulates actions as objects.
 * Command objects allow for loosely coupled systems
 * by separating the objects that issue a request
 * from the objects that actually process the request.
 *
 * @type R - the type of {@link Result} returned after executing
 */
export interface Command <R extends Result<any, any, any>, P = {}> {
	/** The name of the command */
	name: string;
	/** The parameters required to execute the command. */
	params: P;

    /**
     * The function to trigger when this command is invoked.
     * It returns a {@link Result} which specifies whether the execution succeeded or failed.
     */
    execute(): R;
}

/**
 * The value returned from a successful {@link CommandResult}.
 *
 * Contains the array of {@link AppEvent}s produced as well as
 * any follow-up {@link Command}s that should be executed afterwards.
 */
export type CommandExecution<
	E extends AppEvent<string, object>,
	C extends Command<Result<object, any, object>, any>
> = {
	events: E[];
	commands: C[];
};

/**
 * A {@link CommandResult} represents the {@link Result} of executing a {@link Command}.
 *
 * – On success, it returns a {@link CommandExecution} containing events and follow-up commands.
 *
 * – On failure, it returns any error
 */
export type CommandResult<
	E extends AppEvent<string, object>,
	C extends Command<Result<object, any, object>, any>
> = Result<CommandExecution<E, C>, any, CommandExecution<E, C>>
