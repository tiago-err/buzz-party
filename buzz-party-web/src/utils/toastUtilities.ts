import {toast} from "react-toastify";
import {ERRORS} from "../interfaces";

const errors = {
	[ERRORS.INVALID_GAME_ID]: "Unable to find that game code!",
	[ERRORS.NAME_ALREADY_IN_USE]: "That name is already in use in the game!",
};

export function toastError(error: ERRORS) {
	toast.error(errors[error]);
}
