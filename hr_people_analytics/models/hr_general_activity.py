from odoo import models, fields, api

class GeneralActivity(models.Model):
    _name = "hr.general.activity"
    _description = "General Activities"
    
    name = fields.Char('General Activity', required=True)
    active = fields.Boolean(string='Active', default=True)
