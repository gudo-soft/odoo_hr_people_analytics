odoo.define('hr_people_analytics.my_activities', function (require) {
"use strict";

var core = require('web.core');
var Model = require('web.Model');
var Widget = require('web.Widget');
var time = require('web.time');
var utils = require('web.utils')
var QWeb = core.qweb;
var _t = core._t;

var general_activity = {}; 
var related_activity = {}; 
var activity_list = {}; 
var related_activity_id = 0;
var ar_length = 0;
var new_activity_list = {'general':0 , 'related':0}; 
var last_status = '';
var date_check = '';

var MyAttendances_2 = Widget.extend({

    events: {
        "click .o_hr_attendance_sign_in_out_icon_play": function() {
            this.$('.o_hr_attendance_sign_in_out_icon_play').attr("disabled", "disabled");
            this.update_activity(1);
        },
   
        "click .o_hr_attendance_sign_in_out_icon_play_0": function() {
            this.$('.o_hr_attendance_sign_in_out_icon_play_0').attr("disabled", "disabled");
            this.update_activity(0);
        },
                
       "click .o_hr_attendance_sign_in_out_icon_pause": function() {
            this.$('.o_hr_attendance_sign_in_out_icon_pause').attr("disabled", "disabled");
            this.update_activity(2);
        },

       "click .o_hr_attendance_sign_in_out_icon_stop": function() {
            this.$('.o_hr_attendance_sign_in_out_icon_stop').attr("disabled", "disabled");
            this.update_activity(3);
        },

        "click .o_hr_attendance_pin_pad_button_ca_1": function() {
          for (var i_ca = 0; i_ca<10; i_ca++) { 
            this.$('.o_hr_attendance_pin_pad_button_ca_'+i_ca).attr("disabled", "disabled");
             }
            this.update_general_activity(1);
        }, 
    
        "click .o_hr_attendance_pin_pad_button_ca_2": function() {
          for (var i_ca = 0; i_ca<10; i_ca++) { 
            this.$('.o_hr_attendance_pin_pad_button_ca_'+i_ca).attr("disabled", "disabled");
             }
            this.update_general_activity(2);
        }, 

        "click .o_hr_attendance_pin_pad_button_ca_3": function() {
          for (var i_ca = 0; i_ca<10; i_ca++) { 
            this.$('.o_hr_attendance_pin_pad_button_ca_'+i_ca).attr("disabled", "disabled");
             }
            this.update_general_activity(3);
        }, 

       "click .o_hr_attendance_pin_pad_button_ca_4": function() {
          for (var i_ca = 0; i_ca<10; i_ca++) { 
            this.$('.o_hr_attendance_pin_pad_button_ca_'+i_ca).attr("disabled", "disabled");
             }
            this.update_general_activity(4);
        }, 
    
        "click .o_hr_attendance_pin_pad_button_ca_5": function() {
          for (var i_ca = 0; i_ca<10; i_ca++) { 
            this.$('.o_hr_attendance_pin_pad_button_ca_'+i_ca).attr("disabled", "disabled");
             }
            this.update_general_activity(5);
        }, 

        "click .o_hr_attendance_pin_pad_button_ca_6": function() {
          for (var i_ca = 0; i_ca<10; i_ca++) { 
            this.$('.o_hr_attendance_pin_pad_button_ca_'+i_ca).attr("disabled", "disabled");
             }
            this.update_general_activity(6);
        }, 

       "click .o_hr_attendance_pin_pad_button_ca_7": function() {
          for (var i_ca = 0; i_ca<10; i_ca++) { 
            this.$('.o_hr_attendance_pin_pad_button_ca_'+i_ca).attr("disabled", "disabled");
             }
            this.update_general_activity(7);
        }, 
    
        "click .o_hr_attendance_pin_pad_button_ca_8": function() {
          for (var i_ca = 0; i_ca<10; i_ca++) { 
            this.$('.o_hr_attendance_pin_pad_button_ca_'+i_ca).attr("disabled", "disabled");
             }
            this.update_general_activity(8);
        }, 

        "click .o_hr_attendance_pin_pad_button_ca_9": function() {
          for (var i_ca = 0; i_ca<10; i_ca++) { 
            this.$('.o_hr_attendance_pin_pad_button_ca_'+i_ca).attr("disabled", "disabled");
             }
            this.update_general_activity(9);
        }, 

        "click .o_hr_attendance_pin_pad_button_ra_1": function() {
          for (var i_ra = 0; i_ra<10; i_ra++) { 
            this.$('.o_hr_attendance_pin_pad_button_ra_'+i_ra).attr("disabled", "disabled");
             }
            this.update_related_activity(1);
        }, 
    
        "click .o_hr_attendance_pin_pad_button_ra_2": function() {
          for (var i_ra = 0; i_ra<10; i_ra++) { 
            this.$('.o_hr_attendance_pin_pad_button_ra_'+i_ra).attr("disabled", "disabled");
             }
            this.update_related_activity(2);
        }, 

        "click .o_hr_attendance_pin_pad_button_ra_3": function() {
          for (var i_ra = 0; i_ra<10; i_ra++) { 
            this.$('.o_hr_attendance_pin_pad_button_ra_'+i_ra).attr("disabled", "disabled");
             }
            this.update_related_activity(3);
        }, 

       "click .o_hr_attendance_pin_pad_button_ra_4": function() {
          for (var i_ra = 0; i_ra<10; i_ra++) { 
            this.$('.o_hr_attendance_pin_pad_button_ra_'+i_ra).attr("disabled", "disabled");
             }
            this.update_related_activity(4);
        }, 
    
        "click .o_hr_attendance_pin_pad_button_ra_5": function() {
          for (var i_ra = 0; i_ra<10; i_ra++) { 
            this.$('.o_hr_attendance_pin_pad_button_ra_'+i_ra).attr("disabled", "disabled");
             }
            this.update_related_activity(5);
        }, 

        "click .o_hr_attendance_pin_pad_button_ra_6": function() {
          for (var i_ra = 0; i_ra<10; i_ra++) { 
            this.$('.o_hr_attendance_pin_pad_button_ra_'+i_ra).attr("disabled", "disabled");
             }
            this.update_related_activity(6);
        }, 

        "click .o_hr_attendance_pin_pad_button_ra_7": function() {
          for (var i_ra = 0; i_ra<10; i_ra++) { 
            this.$('.o_hr_attendance_pin_pad_button_ra_'+i_ra).attr("disabled", "disabled");
             }
            this.update_related_activity(7);
        }, 
    
        "click .o_hr_attendance_pin_pad_button_ra_8": function() {
          for (var i_ra = 0; i_ra<10; i_ra++) { 
            this.$('.o_hr_attendance_pin_pad_button_ra_'+i_ra).attr("disabled", "disabled");
             }
            this.update_related_activity(8);
        }, 

        "click .o_hr_attendance_pin_pad_button_ra_9": function() {
          for (var i_ra = 0; i_ra<10; i_ra++) { 
            this.$('.o_hr_attendance_pin_pad_button_ra_'+i_ra).attr("disabled", "disabled");
             }
            this.update_related_activity(9);
        }, 
    },



    start: function () {
        var self = this;
              
        self.$el.html(QWeb.render("HrAttendanceKioskMode_pa", {widget: self}));
        self.start_clock();
        var current_date = new Date();
        var today = current_date.toDateString(navigator.language );

        var hr_employee = new Model('hr.employee');
            hr_employee.query(['attendance_state', 'name'])
            .filter([['user_id', '=', self.session.uid]])
            .all()
            .then(function (result) {
                  self.employee = result[0];
                  self.$el.append(QWeb.render('title', {widget: self}));

           });

//-----------------------------------------------------------------------------------------       
    var hr_activity_record = new Model('hr.activity.record');
      
        hr_activity_record.query(['employee_id','general_activity', 'related_activity' , 'date_start' , 'state'])
              .filter([['employee_id.user_id', '=', self.session.uid]]) 
              .all().then(function (result) {
                         // console.log('activity_record',result);
                       ar_length = result.length;
                         
                       if ( ar_length == 0) 
                          { last_status = 'done';
                            self.$el.append(QWeb.render('play_sign', {widget: self}));
                             }
                       else
                           {
                       self.a_record = result[0];
                        
                       var date_start_1 = time.auto_str_to_date(self.a_record.date_start);
                       
                       var date_start_2= date_start_1.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', second:'2-digit'});
                       self.a_record.date_start = date_start_2;
                       var general_activity_item =  self.a_record.general_activity;
                       if ( general_activity_item == false) { general_activity_item = ' '; }
                          else {             
                              var general_activity_item_array = general_activity_item[1];                                 
                                  general_activity_item = general_activity_item_array;
                                   }
                       self.a_record.general_activity = general_activity_item;

                       var related_activity_item =  self.a_record.related_activity;
                       if ( related_activity_item == false) { related_activity_item = ' '; }
                          else {             
                              var related_activity_item_array = related_activity_item[1];  
                                  related_activity_item = related_activity_item_array;
                                   }
                       self.a_record.related_activity = related_activity_item; 

                       last_status = self.a_record.state; 
                     if ( self.a_record.state != 'done' ) 
                      { self.$el.append(QWeb.render('Activity_AR_now', {widget: self})); }                      
                    
                     if ( self.a_record.state == 'progress' ) 
                          { self.$el.append(QWeb.render('stop_sign', {widget: self}));
                            self.$el.append(QWeb.render('pause_sign', {widget: self}));  }
                     if ( self.a_record.state == 'done' ) 
                          { self.$el.append(QWeb.render('play_sign', {widget: self})); }
                     if ( self.a_record.state == 'inactive' || self.a_record.state == 'pending') 
                          { self.$el.append(QWeb.render('play_sign_0', {widget: self})); }
            
   //       }); 
           } //END if else of   if ( ar_length == 0) 

//-----------------------------------------------------------------------------------------
 if (  last_status == 'done' ) {   
        self.$el.append(QWeb.render('Activity_C0', {widget: self}));

        var hr_general_activity = new Model('hr.general.activity');
        hr_general_activity.query(['name'])
              .all().then(function (result) {
               _.each(result, function(item) {
                            
                        general_activity[item.id] = item;
                        general_activity[item.id].id = item.id;
                        general_activity[item.id].name = item.name;
                                
            });
               self.render_general_activity(); 
          }); 
     

      self.$el.append(QWeb.render('Activity_R0', {widget: self}));

      related_activity_id = 0;
        var hr_related_activity = new Model('hr.related.activity');
        hr_related_activity.query(['employee_id','name'])
              .filter([['employee_id.user_id', '=', self.session.uid]])
              .all().then(function (result) {
               _.each(result, function(item) {                    
                    var db_name = item.name.split( ',' );
                    var db_object = new Model( db_name[0] );
                        db_object.query(['name'])
                  　　   .filter([['id', '=', db_name[1]]])
                    　　 .all().then(function (result_r) {
                   　　　 _.each(result_r, function(item_r) {                            
                             self.store_related_activity(item_r);
                          
      　　　　　　　　　});
                      
                  });        
            });
               
          }); 
  } //END of  if (  last_status == 'done' )
 }); 


        self.$el.append(QWeb.render('Activity_AR0', {widget: self}));
      
        var hr_activity_record = new Model('hr.activity.record');
        hr_activity_record.query(['id', 'employee_id','general_activity', 'related_activity' , 'date_start' , 'date_finished' , 'state'])
               .filter([['employee_id.user_id', '=', self.session.uid]])
               .all().then(function (result) {
               _.each(result, function(item) {
                   if ( ar_length != 0){                                           
                      var date_start_c1 = time.auto_str_to_date(item.date_start);
                          date_check = date_start_c1.toDateString();
                        
                     if (today == date_check) {
                         
                         activity_list[item.id] = item;
                      var general_activity_item = item.general_activity;
                           
                          if ( general_activity_item == false) { general_activity_item = ' '; }
                          else { 
                              var general_activity_item_array = general_activity_item[1];
                                  general_activity_item = general_activity_item_array;
                                   }
                       
                          activity_list[item.id].general_activity = general_activity_item;
                      var related_activity_item = item.related_activity;
                          if ( related_activity_item == false) { related_activity_item = ' '; }
                          else { 
                              var related_activity_item_array = related_activity_item[1];
                                  related_activity_item = related_activity_item_array;
                                   }
                          activity_list[item.id].related_activity = related_activity_item;
                     
                      var date_start_1 = time.auto_str_to_date(item.date_start);
                      var date_start_2= date_start_1.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', second:'2-digit'});                      
                      activity_list[item.id].date_start = date_start_2;
                      var date_finished_item = item.date_finished;
                         // console.log('finished', item.date_finished);
                          if ( date_finished_item == false) { date_finished_item = '     '; }
                          else {
                            var date_start_1 = time.auto_str_to_date(item.date_finished);
                            var date_finished_item= date_start_1.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit', second:'2-digit'}); }                     
                            activity_list[item.id].date_finished = date_finished_item; 
                   
                       } //END of    if (today == date_check)
                       } //END of    if (  if ( ar_length != 0){     
            });
                  
                   self.render_activity_record();
                                
          }); 

          return this._super.apply(this, arguments);
        
      },
  
  render_general_activity:function()
        { 
          // console.log(general_activity);
          var length = Object.keys(general_activity).length; 
          if (length > 0) {               
          self.general_activity = general_activity;
          this.$el.append(QWeb.render('Activity_GA', {widget: self}));
           }             
        },

 store_related_activity:function(item_r)
        { 
          related_activity_id +=1;
          related_activity[related_activity_id] = item_r;
          //var length = Object.keys(reference_activity).length;
                        
          self.related_activity = related_activity;
          this.$el.append(QWeb.render('Activity_RA', {widget: self}));             
        }, 


  render_activity_record:function()
        {   
          
          var length = Object.keys(activity_list).length;
        //  console.log(length); 
          self.activity_list = activity_list;
          this.$el.append(QWeb.render('Activity_AR', {widget: self}));
                      
        },

  update_general_activity:function(n)
        {          
          var self = this;
          //console.log('update_general_activity',n);
          new_activity_list['general'] = n; 
      
        },

  update_related_activity:function(n)
        {          
          var self = this;
          //console.log('update_reference_activity',n); 
          new_activity_list['related'] = n; 
          //console.log(new_activity_list['general'] , new_activity_list['related']);
     
        },


  update_activity:function(command)
        {          
          var self = this;
          //console.log('update_activity', command); 
          var hr_activity_record = new Model('hr.activity.record');
          if ( command == 0) { 
          hr_activity_record.call('button_start_js_0', [[ self.a_record.id] ,'hr_people_analytics_my_activities'])
           .then(function(result) {
                   if (result.action) {
                       self.do_action(result.action);
            //     } else if (result.warning) {
            //        self.do_warn(result.warning);
                }
           });
          }

         if ( command == 1) {
           
            if ( new_activity_list['general']==0 && new_activity_list['related'] == 0) 
                 { //self.$('.o_hr_attendance_employee').append(_t("Error : Please select either General Activity or Related Activity or Both"));
                     //console.log('zero message');
                     self.$el.append(QWeb.render('Activity_E0', {widget: self}));
                    return;
                   } 
            //  console.log( 'command 1');
            //  console.log( self.a_record , self.a_record.id , [self.a_record.id] );
            if (ar_length == 0) { 
                               // console.log( 'ar_length' , ar_length  );
                                self.a_record = {};  
                                self.a_record.id = 0; 
                                    }
          hr_activity_record.call('button_start_js', [[ self.a_record.id] , new_activity_list['general'],new_activity_list['related'] ,　'hr_people_analytics_my_activities'])
           .then(function(result) {
                   if (result.action) {
                       self.do_action(result.action);
            //     } else if (result.warning) {
            //        self.do_warn(result.warning);
                }
           });
          }

         if ( command == 2) { 
            hr_activity_record.call('button_pending_js', [[ self.a_record.id] ,'hr_people_analytics_my_activities'])
           .then(function(result) {
                   if (result.action) {
                       self.do_action(result.action);
            //     } else if (result.warning) {
            //        self.do_warn(result.warning);
                }
           });
          }

         if ( command == 3) { 
            hr_activity_record.call('button_stop_js', [[ self.a_record.id] ,'hr_people_analytics_my_activities'])
           .then(function(result) {
                   if (result.action) {
                       self.do_action(result.action);
            //     } else if (result.warning) {
            //        self.do_warn(result.warning);
                }
           });
          }
   
        },

  start_clock: function() {
        this.clock_start = setInterval(function() {this.$(".o_hr_attendance_clock").text(new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));}, 500);
        // First clock refresh before interval to avoid delay
        this.$(".o_hr_attendance_clock").text(new Date().toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}));
    },

    destroy: function () {
        clearInterval(this.clock_start);
        this._super.apply(this, arguments);
    },

   });

core.action_registry.add('hr_people_analytics_my_activities', MyAttendances_2);
                   
return MyAttendances_2;


});
