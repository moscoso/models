/**
 * An AppError is an error thrown in the context specific to our application.
 */
 export class AppError<T extends string> extends Error {
    constructor(message: T | string) {
        super(message);
        this.name = 'AppError';
    }

    /**
     * Extra detail to give insight to why a certain Error is happening right now.
     */
    private detail ? : string;

    /**
     *
     */
    getDetail(): string {
        return this.detail ? this.detail : 'No details given';
    }

    /**
     * Extra detail to give insight to why a certain Error is happening right now.
     * @param detail a string providing more information on the Error.
     */
    setDetail(detail: string) {
        this.detail = detail;
    }
}
