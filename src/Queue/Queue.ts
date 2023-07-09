import { Result } from '../Result/Result';

export class Queue<C, R extends Result<any, any>> {
	private queue: Array<{ commandType: C, args: any, commandFunction: (commandType: C, args: any) => R }>;
	private isProcessingQueue: boolean;

	constructor() {
		this.queue = [];
		this.isProcessingQueue = false;
	}

	private async processQueue(): Promise<R | undefined> {
		if (!this.isProcessingQueue && this.queue.length) {
			this.isProcessingQueue = true;
			const { commandType, args, commandFunction } = this.queue.shift()!;
			const result = commandFunction(commandType, args);

			this.isProcessingQueue = false;
			setImmediate(() => this.processQueue());
			return result;
		}
	}

	public enqueueCommand(commandFunction: (commandType: C, args: any) => R, commandType: C, args: any = {}): void {
		this.queue.push({ commandFunction, commandType, args });
		this.processQueue();
	}
}
