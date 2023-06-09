import { ChangeEvent, useState } from "react";
import { read, utils } from "xlsx";
import "./App.css";
import axios from "axios";

function App() {
	const [__html, setHtml] = useState("");
	interface Item {
		ItemNo: string;
		Description: number;
		Unit: string;
		Qty: number;
		Rate: number;
		Amount: number;
	}
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
			})
			.catch((error) => console.error(error));
	};
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
			<div dangerouslySetInnerHTML={{ __html }} />
		</>
	);
}

export default App;
