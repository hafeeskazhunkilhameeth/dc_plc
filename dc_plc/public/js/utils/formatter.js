let product_link_formatter = (value, row, column, row_data, format) => {
	if (!value) {
		value = '-';
	}

	if (column.colIndex === 2) {   // Relevance column
		let id = row[1].content;
		let [date, check, perms] = value.split(';');
		let check_str = parseInt(check) ? 'checked' : '';
		if (parseInt(perms)) {
			return `<input type="checkbox" id="${id}" onchange="check_handle(this)" ${check_str}/><label style="vertical-align: top; padding-top: 3px;" class="rel_label_${id}" for="${id}">&nbsp&nbsp${date}</label>`
		}
		value = date;
	}
	return `<a href="http://${window.location.host}/desk#Form/DC_PLC_Product_Summary/${row_data.ID}">${value}</a>`;
};

let full_stat_formatter = (value, row, column, row_data, format) => {
	if (!value) {
		value = '-';
	}

	if (column.colIndex === 2) {   // Relevance column
		let [array_str, percent] = value.split('|');
		let index_str = array_str.slice(1, array_str.length - 1);
		if (index_str) {
			let columns_to_highlight = index_str.split(', ').map(el => {
				return parseInt(el);
			});
			let sheet = window.document.styleSheets[0];
			let row_index = row.meta.rowIndex;
			columns_to_highlight.forEach(col_index => {
				sheet.insertRule(`.dt-instance-1 .dt-cell--${col_index}-${row_index} { background-color: rgba(37,220,2,0.2); }`, sheet.cssRules.length);
			});
		}
		value = percent;
	}
	return `<a href="http://${window.location.host}/desk#Form/DC_PLC_Product_Summary/${row_data.ID}">${value}</a>`;
};

let function_link_formatter = (value, row, column, row_data, format) => {
	if (!value) {
		value = '-';
	}
	let [title, id] = row[2].content.split('|');
	if (column.colIndex === 2) {   // Title column
		value = title;
	}
	return `<a href="http://${window.location.host}/desk#query-report/DC%20Product%20Stats/Report?link_function=${id}">${value}</a>`;
};

let rnd_project_link_formatter = (value, row, column, row_data, format) => {
	if (!value) {
		value = '-';
	}
	let [title, id] = row[1].content.split('|');
	if (column.colIndex === 1) {   // Title column
		value = title;
	}
	return `<a href="http://${window.location.host}/desk#query-report/DC%20Product%20Stats/Report?link_rnd_project=${id}">${value}</a>`;
};

let product_type_link_formatter = (value, row, column, row_data, format) => {
	if (!value) {
		value = '-';
	}
	let [title, id] = row[1].content.split('|');
	if (column.colIndex === 1) {   // Title column
		value = title;
	}
	return `<a href="http://${window.location.host}/desk#query-report/DC%20Product%20Stats/Report?link_type=${id}">${value}</a>`;
};

let package_link_formatter = (value, row, column, row_data, format) => {
	if (!value) {
		value = '-';
	}
	let [title, id] = row[1].content.split('|');
	if (column.colIndex === 1) {   // Title column
		value = title;
	}
	return `<a href="http://${window.location.host}/desk#query-report/DC%20Product%20Stats/Report?link_package=${id}">${value}</a>`;
};
