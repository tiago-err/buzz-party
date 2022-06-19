import {COLORS} from "./interfaces";
import _ from "lodash";

export function randomColor(usedColors: COLORS[]): COLORS {
	return _.sample(Object.values(COLORS).filter((value) => !usedColors.includes(value))) as COLORS;
}
