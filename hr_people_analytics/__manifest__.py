# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.


{
    'name': 'People Analytics',
    'version': '1.0',
    'category': 'Human Resources',
    'sequence': 81,
    'summary': 'Manage/Analize employee activities',
    'description': """
This module aims to manage/analize employee's activities.
==================================================

Keeps account of the activities of the employees on the basis of the
records performed by them.
       """,
    'author': 'gudo_soft',
    'website': 'http://gudo-soft.world.coocan.jp',
    'depends': [ 'hr_attendance' , 'sale' ],
    'data': [
        'security/ir.model.access.csv',
        'views/web_asset_backend_template.xml',
        'views/pa_activity_view.xml',
    ],
    'demo': [
        'data/hr_people_analytics_demo.xml'
    ],
    'installable': True,
    'auto_install': False,
    'qweb': [
        "static/src/xml/pa_activity.xml",
    ],
    'application': False,
}
