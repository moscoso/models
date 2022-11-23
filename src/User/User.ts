/** A unique sequence of characters that identifies a player */
export type UserID = string;

export interface User {
    /**
     * The unique identifier of a user.
     */
    id: UserID;
    /**
     * The username of a player
     */
    name ? : string;
    /**
     * The url of the image for the player's avatar
     */
    photoURL ? : string;
}
