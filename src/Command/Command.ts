import { Result } from '../Result/Result';

/**
 * The Command pattern encapsulates actions as objects.
 * Command objects allow for loosely coupled systems
 * by separating the objects that issue a request
 * from the objects that actually process the request.
 *
 * A command can execute to return a Result
 * @type R - the type of Result returned after executing
 */
export interface Command <R extends Result<any, any, any>> {
    /**
     * The function to trigger when this command is invoked.
     * It returns a {@link Result} which provides context as to whether the command succeeded or failed to execute.
     */
    execute(): R;
}
