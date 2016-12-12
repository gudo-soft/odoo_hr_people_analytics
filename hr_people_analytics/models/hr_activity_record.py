# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

from datetime import datetime

from odoo import models, fields, api, exceptions, _
from odoo.tools import DEFAULT_SERVER_DATETIME_FORMAT


class HrActivityRecord(models.Model):
    _name = "hr.activity.record"
    _description = "Activity Record"
    _order = "date_start desc"

    def _default_employee(self):
        return self.env['hr.employee'].search([('user_id', '=', self.env.uid)], limit=1)

    employee_id = fields.Many2one('hr.employee', string="Employee", required=True, ondelete='cascade', index=True)
    department_id = fields.Many2one('hr.department', string="Department", related="employee_id.department_id")
    general_activity = fields.Many2one('hr.general.activity', string="General Activity" , ondelete='cascade', index=True )
    related_activity = fields.Many2one('hr.related.activity', string="Related Activity" , ondelete='cascade', index=True)
    
    date_start = fields.Datetime(
        'Effective Start Date' , default=fields.Datetime.now, required=True)
    date_finished = fields.Datetime(
        'Effective End Date')   
    duration = fields.Float(
        'Nominal Duration', compute='_compute_duration',
        readonly=True, store=True)
    real_duration = fields.Float( 
        'Real Duration', compute='_compute_real_duration',
        readonly=True, store=True)
    state = fields.Selection([
        ('inactive', 'Inactive'),
        ('progress', 'In Progress'),
        ('pending', 'Pending'),
        ('done', 'Finished')], string='Status',
        default='inactive') 
    
    comment = fields.Text(string="Comment")
    activity_record_line = fields.One2many('hr.activity.record.line', 'activity_record_id', string='Activity Record Lines',  copy=True)


    @api.multi
    def button_start(self):
        timeline = self.env['hr.activity.record.line']
        for activity_record in self:
            timeline.create({
                'activity_record_id': activity_record.id,                
                'date_start': datetime.now(),
                'state': 'progress',
              })
            
            if (activity_record.state == 'inactive'):
                self.write({'state': 'progress',
                    'date_start': datetime.now(),
                  })
            else:
                  self.write({'state': 'progress',                    
                  })
    @api.multi
    def button_start_js(self, general, related , next_action):
          self.ensure_one()
          #print 'button_start_2 \n' 
          timeline = self.env['hr.activity.record.line']
          self.default_employee = self._default_employee()
          #print 'button_start_js   %s %s %s \n' % (self.default_employee  ,self.default_employee.id , self.id)
          
          vals = { 
               #'employee_id': 25 , 
               'employee_id': self.default_employee.id ,
               'general_activity': general, 
               'related_activity': related , 
               'date_start': datetime.now(),
               'state': 'progress',              
           }
          self.env['hr.activity.record'].create(vals)
          for activity_record in self:
          #    print 'button_start_js   %s %s %s\n' % (common , reference , self.default_employee)
              timeline.create({
                'activity_record_id': activity_record.id+1,                
                'date_start': datetime.now(),
                'state': 'progress',
                }) 
          
          return {'action': next_action}

    @api.multi
    def button_start_js_0(self, next_action):
          self.ensure_one()
          #print 'button_start_2 \n' 
          timeline = self.env['hr.activity.record.line'] 
          for activity_record in self:
              #print 'button_start_2   %s %s\n' % (self.ids, next_action)
              timeline.create({
                'activity_record_id': activity_record.id,                
                'date_start': datetime.now(),
                'state': 'progress',
                }) 
              if (activity_record.state == 'inactive'):
                  self.write({'state': 'progress',
                    'date_start': datetime.now(),
                })
              else:
                  self.write({'state': 'progress',                    
                }) 
          return {'action': next_action}

    @api.multi
    def button_pending(self):
        timeline_obj = self.env['hr.activity.record.line']
        domain = [('activity_record_id', 'in', self.ids), ('state', '=', 'progress')]
        #print 'timeline  domain 　　%s　%s %s \n' % (self.ids , timeline_obj , domain)        
        for timeline in timeline_obj.search(domain):
            timeline.write({                         
                'date_finished': datetime.now(),
                'state' : 'done',
             }) 
        self.write({'state': 'pending'
                   # 'date_finished': datetime.now(),
         })

    @api.multi
    def button_pending_js(self , next_action):
        self.ensure_one()
        timeline_obj = self.env['hr.activity.record.line']
        domain = [('activity_record_id', 'in', self.ids), ('state', '=', 'progress')]
        #print 'timeline  domain 　　%s　%s %s \n' % (self.ids , timeline_obj , domain)        
        for timeline in timeline_obj.search(domain):
            timeline.write({                         
                'date_finished': datetime.now(),
                'state' : 'done',
             }) 
        self.write({'state': 'pending'
                   # 'date_finished': datetime.now(),
         })
        return {'action': next_action}

    @api.multi
    def button_stop(self):
        timeline_obj = self.env['hr.activity.record.line']
        domain = [('activity_record_id', 'in', self.ids), ('state', '=', 'progress')]
        for timeline in timeline_obj.search(domain):
            timeline.write({                         
                'date_finished': datetime.now(),
                'state' : 'done',
             })  
        self.write({'state': 'done',
                    'date_finished': datetime.now(),
         })

    @api.multi
    def button_stop_js(self, next_action):
        timeline_obj = self.env['hr.activity.record.line']
        domain = [('activity_record_id', 'in', self.ids), ('state', '=', 'progress')]
        for timeline in timeline_obj.search(domain):
            timeline.write({                         
                'date_finished': datetime.now(),
                'state' : 'done',
             })  
        self.write({'state': 'done',
                    'date_finished': datetime.now(),
         })
        return {'action': next_action}

    @api.depends('date_finished', 'date_start')
    def _compute_duration(self):
        #self.duration = sum(self.time_ids.mapped('duration')) 
        for activity_record in self:
            if activity_record.date_finished:
                diff = fields.Datetime.from_string(activity_record.date_finished) - fields.Datetime.from_string(activity_record.date_start) 
                activity_record.duration = round(diff.total_seconds() / 60.0, 2)
                #print '時刻　%s　%s　%s %s\n' % (fields.Datetime.from_string(activity_record.date_start),fields.Datetime.from_string(activity_record.date_finished),diff,activity_record.duration) 
                #self.duration = activity_record.duration
 
    @api.depends('date_finished', 'date_start')
    def _compute_real_duration(self):
        for activity_record in self:
            if activity_record.date_finished:
               diff_sum = 0.0;
               timeline_obj = self.env['hr.activity.record.line']
               domain = [('activity_record_id', 'in', self.ids), ('state', '=', 'done')]
               for timeline in timeline_obj.search(domain):
                 if timeline.date_finished:
                    diff = fields.Datetime.from_string(timeline.date_finished) - fields.Datetime.from_string(timeline.date_start)
                    #print '時刻　%s　%s　%s \n' % (fields.Datetime.from_string(timeline.date_start),fields.Datetime.from_string(timeline.date_finished),diff) 
                    diff_sum += diff.total_seconds()  
                    #print '時刻 2　%s　%s　 \n' % (diff_sum , diff)
               activity_record.real_duration = round(diff_sum / 60.0, 2)
               #print '時刻 3　%s　%s　 \n' % (diff_sum , activity_record.real_duration)
              
  
    @api.onchange('employee_id')    
    def onchange_employee_id(self):
        res = {}
        if self.employee_id:
           ids = self.employee_id.mapped('id')
           res['domain'] = {'related_activity': [('employee_id', 'in', ids)]}
           print res
        return res



