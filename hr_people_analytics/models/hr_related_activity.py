# -*- coding: utf-8 -*-
from odoo import models, fields, api

class RelatedActivity(models.Model):
    _name = "hr.related.activity"
    _description = "Related Activities"
    _order = "employee_id"

     
    employee_id = fields.Many2one('hr.employee', string='Employee', required=True, ondelete='cascade', index=True)    
    
    @api.model
    def _referencable_models(self):
        models = self.env['res.request.link'].search([])
        return [(x.object, x.name) for x in models]

    name = fields.Reference(
        selection=_referencable_models,
        string='Related Activity')

    active = fields.Boolean(string='Active', default=True)


