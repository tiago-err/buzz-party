import {COLORS} from "../interfaces";

const translations = {
	bg: {
		[COLORS.RED]: "bg-red-500",
		[COLORS.BLUE]: "bg-blue-500",
		[COLORS.GREEN]: "bg-lime-500",
		[COLORS.PINK]: "bg-pink-500",
		[COLORS.ORANGE]: "bg-orange-500",
		[COLORS.YELLOW]: "bg-yellow-500",
		[COLORS.PURPLE]: "bg-purple-500",
		[COLORS.BROWN]: "bg-amber-800",
	},
	border: {
		[COLORS.RED]: "border-red-500",
		[COLORS.BLUE]: "border-blue-500",
		[COLORS.GREEN]: "border-lime-500",
		[COLORS.PINK]: "border-pink-500",
		[COLORS.ORANGE]: "border-orange-500",
		[COLORS.YELLOW]: "border-yellow-500",
		[COLORS.PURPLE]: "border-purple-500",
		[COLORS.BROWN]: "border-amber-800",
	},
	text: {
		[COLORS.RED]: "text-red-500",
		[COLORS.BLUE]: "text-blue-500",
		[COLORS.GREEN]: "text-lime-500",
		[COLORS.PINK]: "text-pink-500",
		[COLORS.ORANGE]: "text-orange-500",
		[COLORS.YELLOW]: "text-yellow-500",
		[COLORS.PURPLE]: "text-purple-500",
		[COLORS.BROWN]: "text-amber-800",
	},
};

export function colorToTailwind(type: "bg" | "border" | "text", color: COLORS) {
	return translations[type][color];
}
