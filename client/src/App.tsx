import { ChangeEvent, useEffect, useState } from "react";
import { read, utils } from "xlsx";
import "./App.css";
import axios from "axios";
import { Button, Center, Modal, TextInput } from "@mantine/core";

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
	const [opened, setOpened] = useState(false);
	const [item, setItem] = useState({} as Item);

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

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setItem({ ...item, [event.target.name]: event.target.value });
	};
	const editItem = () => {
		axios
			.patch(`http://localhost:5000/items/${item.id}`, item)
			.then((response) => {
				console.log(response.data);
				fetchItems();
				setOpened(false);
				setOpened(false);
			})
			.catch((error) => {
				console.error(error);
				setOpened(false);
			});
	};

	const deleteItem = () => {};

	const parse = (value: string) =>
		Number.isNaN(parseFloat(value)) ? "" : parseFloat(value).toFixed(2);

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
			{items.length > 0 && (
				<table className="table-response">
					<thead>
						<tr>
							<td>ItemNo</td>
							<td>Description</td>
							<td>Unit</td>
							<td>Qty</td>
							<td>Rate</td>
							<td>Amount</td>
							<td className="actions">Actions</td>
						</tr>
					</thead>
					<tbody>
						{items.map((item) => (
							<tr key={item.id}>
								<td>{item.ItemNo}</td>
								<td>{item.Description}</td>
								<td>{item.Unit}</td>
								<td>{parse(item.Qty)}</td>
								<td>{item.Rate}</td>
								<td>{parse(item.Amount)}</td>
								<td className="actions">
									<span
										className="action-button edit"
										onClick={() => {
											setOpened(true);
											setItem(item);
										}}>
										edit
									</span>
									<span className="action-button delete" onClick={deleteItem}>
										delete
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			<div className="table-parsed" dangerouslySetInnerHTML={{ __html }} />
			<Modal opened={opened} title="Edit Item" onClose={() => setOpened(false)}>
				<TextInput
					label="ItemNo"
					name="ItemNo"
					value={item.ItemNo}
					onChange={handleInputChange}
				/>
				<TextInput
					label="Description"
					name="Description"
					value={item.Description}
					onChange={handleInputChange}
				/>
				<TextInput
					label="Unit"
					name="Unit"
					value={item.Unit}
					onChange={handleInputChange}
				/>
				<TextInput
					label="Qty"
					name="Qty"
					value={item.Qty}
					onChange={handleInputChange}
				/>
				<TextInput
					label="Rate"
					name="Rate"
					value={item.Rate}
					onChange={handleInputChange}
				/>
				<TextInput
					label="Amount"
					name="Amount"
					value={item.Amount}
					onChange={handleInputChange}
				/>
				<Center mt={5}>
					<Button onClick={editItem}>Save</Button>
				</Center>
			</Modal>
		</>
	);
}

export default App;
