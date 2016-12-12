# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from datetime import datetime

from odoo import models, fields, api, exceptions, _
from odoo.tools import DEFAULT_SERVER_DATETIME_FORMAT


class HrActivityRecordLine(models.Model):
    _name = "hr.activity.record.line"
    _description = "Activity Record Line"
    _order = "date_start desc"

    activity_record_id = fields.Many2one('hr.activity.record', string="Activity Record", required=True, ondelete='cascade', index=True)
    
    date_start = fields.Datetime(
        'Effective Start Date')
    date_finished = fields.Datetime(
        'Effective End Date')   
    duration = fields.Float(
        'Real Duration', compute='_compute_duration',
        readonly=True, store=True)
    state = fields.Selection([
        ('inactive', 'Inactive'),
        ('progress', 'In Progress'),
        ('pending', 'Pending'),
        ('done', 'Finished')], string='Status',
        default='inactive') 


    @api.depends('date_finished', 'date_start')
    def _compute_duration(self):
        #self.duration = sum(self.time_ids.mapped('duration')) 
        for blocktime in self:
            if blocktime.date_finished:
                diff = fields.Datetime.from_string(blocktime.date_finished) - fields.Datetime.from_string(blocktime.date_start)
                blocktime.duration = round(diff.total_seconds() / 60.0, 2)
            
  
   
