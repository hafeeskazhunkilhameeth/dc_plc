import UploaderRoot from './UploaderRoot.vue';

frappe.provide('frappe.dc_plc');

frappe.dc_plc.RoleFileUploader = class {
	constructor({
		form,
		product,
		title,
		method,
		fileType,
		searchMethod,
	} = {}) {
		this.product = product;
		this.form = form;
		this.method = method;

		this.make_dialog({
			title: title
		});

		this.$fileuploader = new Vue({
			el: this.wrapper,
			render: h => h(UploaderRoot, {
				props: {
					extNum: product['ext_num'],
					intNum: product['int_num'],
					allowedFileSize: 10,
					fileType: fileType,
					searchMethod: searchMethod,
				}
			})
		});
		this.uploader = this.$fileuploader.$children[0];
	}

	upload_files() {
		let datasheet = this.uploader.currentDatasheet;
		let tempFileName = this.uploader.tempFileName;
		if (!datasheet) {
			return;
		}

		let self = this;
		frappe.call({
			method: this.method,
			args: {
				prod_id: self.product.name,
				datasheet: datasheet,
				temp_file: tempFileName
			},
			callback: function (r) {
				self.dialog.hide();
				self.form.reload_doc();
			}
		});
	}

	make_dialog({title, } = {}) {
		this.dialog = new frappe.ui.Dialog({
			title: title,
			fields: [
				{
					fieldtype: 'HTML',
					fieldname: 'dialog_content'
				}
			],
			primary_action_label: 'Добавить',
			primary_action: () => {
				this.upload_files();
			}
		});

		this.wrapper = this.dialog.fields_dict['dialog_content'].$wrapper[0];
		this.dialog.show();
		this.dialog.$wrapper.on('hidden.bs.modal', function() {
			$(this).data('bs.modal', null);
			$(this).remove();
		});
	}
};
