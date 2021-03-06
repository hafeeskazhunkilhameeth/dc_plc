// Copyright (c) 2019, igrekus and contributors
// For license information, please see license.txt

let value_or_none = frappe.dc_plc.utils.value_or_none;
let set_field_title = frappe.dc_plc.utils.ui.set_field_title;
let render_info_field = frappe.dc_plc.utils.ui.render_info_field;

frappe.ui.form.on('DC_Doc_Meta', {
	refresh: frm => {
		set_field_title(frm, 'link_subtype');
		frappe.call({
			method: 'dc_plc.controllers.file_manager.get_doc_meta',
			args: {
				doctype: frm.doctype,
				docname: frm.docname,
			},
			callback: r => {
				let file = r.message;
				let title = frm.doc['title'];
				if (title !== file.file_name) {
					frm.set_value('title', file.file_name);
					frm.save();
				}
				render_info_field(
					frm,
					'info_file',
					'Метаданные файла',
					file.name ?
						`<a class="attached-file-link" target="_blank" href="/desk#Form/File/${file.name}">${file.file_name}</a></span>`
						:
						'Файл не прикреплён'
				);
				render_info_field(frm, 'info_type', 'Тип документа', file.type);
			}
		});
		frm.add_custom_button('Скачать', function () {
			open_url_post('/api/method/dc_plc.controllers.file_manager.serve_as_filename', {
				src_url: frm.doc.attached_file,
				target_name: frm.doc.title,
			}, false);
		});
	},
	link_subtype: frm => {
		set_field_title(frm, 'link_subtype');
	}

});
