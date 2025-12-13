import { useEffect, useState } from "preact/hooks";
import axios from "redaxios";

interface HubDetail {
	shortname: string;
	url: string;
	ssl: boolean;
	fid: number;
	version: string;
	contact?: string;
	write?: boolean;
	hide?: boolean;
}

interface HubGetInfoResponse {
	dbStats?: {
		numMessages: number;
		numFidRegistrations: number;
		approxSize: number;
	};
	hubOperatorFid: number;
	isSyncing: boolean;
	nickname: string;
	peerId: string;
	rootHash: string;
	version: string;
	contact?: string;
	write?: boolean;
}

const endpoint = "/hubs/list";

const linkify = (url: string | undefined) =>
	url ? (
		<a href={url} target="_blank" rel="noopener noreferrer">
			{url}
		</a>
	) : undefined;

const HubsViewer = () => {
	const [hubs, setHubs] = useState<HubDetail[]>([]);
	const [data, setData] = useState<HubGetInfoResponse[]>([]);

	useEffect(() => {
		async function fetchData() {
			const response = await axios.get(endpoint);
			setHubs(response.data);
		}
		void fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			const details = await Promise.all(
				hubs.map(async (h) => {
					if (h.ssl) {
						const url = `https://${h.url}/v1/info?dbstats=1`;
						try {
							const timeoutPromise = new Promise<never>((_, reject) => {
								setTimeout(() => reject(new Error("Request timeout")), 2000);
							});
							const res = await Promise.race([axios.get(url), timeoutPromise]);
							const data = await res.data;
							return {
								...data,
								nickname: h.shortname,
								hubOperatorFid: h.fid,
								contact: h.contact,
								write: h.write,
							};
						} catch (_e) {
							return {
								hubOperatorFid: h.fid,
								isSyncing: false,
								nickname: h.shortname,
								peerId: "unreachable",
								rootHash: "unreachable",
								version: "?",
								contact: h.contact,
								write: h.write,
							};
						}
					} else {
						return {
							hubOperatorFid: h.fid,
							isSyncing: false,
							nickname: h.shortname,
							peerId: "unreachable",
							rootHash: "unreachable",
							version: h.version,
							dbStats: {
								numMessages: "not ssl",
								numFidEvents: "interrogate",
								numFnameEvents: "directly",
							},
							contact: h.contact,
							write: h.write,
						};
					}
				}),
			);
			setData(details);
		}
		void fetchData();
	}, [hubs]);

	return (
		<>
			<h2>Farcaster Hubs Viewer</h2>
			<div>
				{data.length === 0 ? (
					"loading..."
				) : (
					<table>
						<thead>
							<tr>
								<th>name</th>
								<th className="text-center">version</th>
								<th className="text-center">Messages</th>
								<th className="text-center">Fid</th>
								<th className="text-center">Approx Size</th>
								<th className="text-right">fid</th>
								<th className="text-center">R/W</th>
								<th className="text-left">contact</th>
							</tr>
						</thead>
						<tbody>
							{data.map((d) => {
								const nickname = d.nickname;
								const shortname =
									nickname === "Farcaster Hub"
										? (hubs.find((h) => h.fid === d.hubOperatorFid)
												?.shortname ?? "not found")
										: nickname;
								const numMessages = (
									d.dbStats?.numMessages ?? 0
								).toLocaleString();
								const numFidRegistrations = (
									d.dbStats?.numFidRegistrations ?? 0
								).toLocaleString();
								const approxSize = (
									d.dbStats?.approxSize ?? 0
								).toLocaleString();
								const fid = d.hubOperatorFid.toLocaleString();
								return (
									<tr>
										<td>{`${shortname}`}</td>
										<td className="text-center">{`${d.version}`}</td>
										<td className="text-center">{`${numMessages}`}</td>
										<td className="text-center">{`${numFidRegistrations}`}</td>
										<td className="text-center">{`${approxSize}`}</td>
										<td className="text-right">{`${fid}`}</td>
										<td className="text-center">{`${d.write === undefined ? "-" : d.write ? "y" : "n"}`}</td>
										<td className="text-left">
											{d.contact ? linkify(d.contact) : "-"}
										</td>
									</tr>
								);
							})}
						</tbody>{" "}
					</table>
				)}
			</div>
		</>
	);
};
export default HubsViewer;
