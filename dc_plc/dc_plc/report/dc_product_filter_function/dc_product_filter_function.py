# Copyright (c) 2013, igrekus and contributors
# For license information, please see license.txt

from __future__ import unicode_literals

import frappe
from frappe import _

from dc_plc.custom.utils import prepare_function_filter_row


def execute(filters=None):
	# frappe.msgprint(str(frappe.request.url))
	columns = get_columns()
	data = get_data()
	return columns, data


def get_columns():
	return [
		{
			"fieldname": "title",
			"label": _("Title"),
			"width": "300",
		},
		{
			"label": _("Number of products"),
			"fieldname": "prod_num",
			"align": "left"
		},
	]


def get_data():
	db_name = frappe.conf.get("db_name")

	host = frappe.utils.get_url()

	raw_result = frappe.db.sql("""
	SELECT
		`f`.`name`
		,`f`.`title`
		, COUNT(`prod`.`name`) AS `prod_num`
	FROM `{}`.`tabDC_PLC_Product_Function` AS `f`
	LEFT JOIN `{}`.`tabDC_PLC_Product_Summary` AS `prod`
		ON (`prod`.`link_function` = `f`.`name`)
	GROUP BY `f`.`name`;""".format(db_name, db_name), as_list=1)

	result = [prepare_function_filter_row(row, host) for row in raw_result]

	return result