odoo.define('ht.people_analytics.pa_widget_n', function (require) {
"use strict";

var core = require('web.core');
var common = require('web.form_common');
var Model = require('web.Model');
var time = require('web.time');
var utils = require('web.utils');
var FieldBinaryFile = core.form_widget_registry.get('binary');

var _t = core._t;

var TimeCounter = common.AbstractField.extend(common.ReinitializeFieldMixin, {
    start: function() {
        this._super();
        var self = this;
        this.field_manager.on("view_content_has_changed", this, function () {
            self.render_value();
        });
    },
    start_time_counter: function(){
        var self = this;
        clearTimeout(this.timer);
        //console.log( this.field_manager.datarecord.state );  
        if ((this.field_manager.datarecord.state == 'progress') || (this.field_manager.datarecord.state == 'pending')){
              //console.log('if');
            this.duration += 1000;
            this.timer = setTimeout(function() {
                self.start_time_counter();
            }, 1000);
        } else {
             //console.log('else');
            clearTimeout(this.timer);
        }
             //console.log('render');
        this.$el.html($('<span>' + moment.utc(this.duration).format("HH:mm:ss") + '</span>'));
    },
    render_value: function() {
        this._super.apply(this, arguments);
        var self = this;
        this.real_duration;
        //var hr_activity_record_line_domain = ['activity_record_id', '=', this.field_manager.datarecord.id];


        var hr_activity_record = new Model('hr.activity.record');
            hr_activity_record.query(['date_start' , 'date_finished' , 'duration' , 'state'])
               .filter([['id', '=', this.field_manager.datarecord.id]])
               .all().then(function (result) {
       // new Model('hr.activity_record_line').call('search_read', [hr_activity_record_line_domain, []]).then(function(result) {
            //console.log(result);
            if (self.get("effective_readonly")) {
                self.$el.removeClass('o_form_field_empty');
                var current_date = new Date();
                self.duration = 0;
                _.each(result, function(data) {
                    //  console.log(data.date_start);
                    self.duration += data.date_finished ? self.get_date_difference(data.date_start, data.date_finished) : self.get_date_difference(time.auto_str_to_date(data.date_start), current_date);

                //      console.log('date_end' , data.date_finished); 
         //    console.log(self.get_date_difference(time.auto_str_to_date(data.date_start), current_date));


                });
                self.start_time_counter();
            }
        });
    },
    get_date_difference: function(date_start, date_finished) {
        var difference = moment(date_finished).diff(moment(date_start));
        return moment.duration(difference);
    },
});


core.form_widget_registry.add('pa_time_counter_n', TimeCounter);
                         
});
