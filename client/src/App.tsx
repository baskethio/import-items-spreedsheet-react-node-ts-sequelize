import { ChangeEvent, useEffect, useState } from "react";
import { read, utils } from "xlsx";
import "./App.css";
import axios from "axios";

function App() {
	const [__html, setHtml] = useState("");
	interface Item {
		id: string;
		ItemNo: string;
		Description: string;
		Unit: string;
		Qty: string;
		Rate: string;
		Amount: string;
	}
	const [items, setItems] = useState<Item[]>([]);

	const reader = new FileReader();
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		// e.preventDefault();
		if (e.target.files && e.target.files.length > 0) {
			reader.readAsArrayBuffer(e.target.files[0]);
		}
	};
	reader.onload = (e: ProgressEvent<FileReader>) => {
		if (e.target) {
			const f = e.target.result;
			const workbook = read(f);
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			const data = utils
				.sheet_to_json(worksheet, {
					range:
						parseInt(utils.sheet_to_formulae(worksheet)[0].split("=")[0][1]) -
						1,
					blankrows: false,
				})
				.map((row: any) =>
					Object.keys(row).reduce((obj: any, key) => {
						obj[key.trim()] = row[key];
						return obj;
					}, {})
				);
			setHtml(utils.sheet_to_html(worksheet));
			console.log(
				parseInt(utils.sheet_to_formulae(worksheet)[0].split("=")[0][1]) - 1
			);
			console.log(data);
			storeData(data);
		}
	};
	const storeData = (data: any) => {
		axios
			.post("http://localhost:5000/items/bulk", data)
			.then((response) => {
				console.log(response);
				fetchItems();
			})
			.catch((error) => console.error(error));
	};
	const fetchItems = () => {
		axios
			.get("http://localhost:5000/items")
			.then((response) => {
				setItems(response.data);
			})
			.catch((error) => console.error(error));
	};
	useEffect(fetchItems, []);
	return (
		<>
			<h3>File Import</h3>
			<input
				type="file"
				name="file"
				onChange={handleChange}
				id="file"
				accept="xls"
			/>
			<table className="table-response">
				<thead>
					<tr>
						<td>ItemNo</td>
						<td>Description</td>
						<td>Unit</td>
						<td>Qty</td>
						<td>Rate</td>
						<td>Amount</td>
					</tr>
				</thead>
				<tbody>
					{items.map((item) => (
						<tr>
							<td>{item.ItemNo}</td>
							<td>{item.Description}</td>
							<td>{item.Unit}</td>
							<td>{parseFloat(item.Qty).toFixed(2)}</td>
							<td>{item.Rate}</td>
							<td>{parseFloat(item.Amount).toFixed(2)}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="parsed-table" dangerouslySetInnerHTML={{ __html }} />
		</>
	);
}

export default App;
