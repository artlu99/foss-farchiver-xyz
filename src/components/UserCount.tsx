import userCount from "atoms/userCount";
import formatNumber from "helpers/formatNumber";
import { useAtom } from "jotai";

export default function () {
	const [fetchedUserCount] = useAtom(userCount);
	return <p>User count: {formatNumber(fetchedUserCount)}</p>;
}
