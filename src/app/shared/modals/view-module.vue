<template>
    <el-dialog :visible="show_view_module"
      width="70%"
      :show-close="false"
      >
<!-- {{module}} this.$show_notification(devError)  -->
        <!-- Modal content-->
          <div slot="title">
            <button type="button" class="close" @click="closeModal()">&times;</button>
          </div>  
            <!-- <h4 class="modal-title"></h4> -->
              <div class="modal-body" >
            <!-- {{module}} -->
                <div class="row">

                    
                    <div class="col-md-5">
                       
                        <!-- <div class="row"> -->
                             <h4>Module Details</h4>
                        <hr>
                            <h6  v-if="module.rejected_reason && module.rejected_reason!==''" style="color:red">Module was rejected with the following reason</h6>
                             <div v-if="module.rejected_reason && module.rejected_reason!==''" class="input-ans-overview">
                                <span>{{module.rejected_reason}}</span>
                            </div>

                            <h6>CATEGORY</h6>
                            <div class="input-ans-overview">
                                <span>{{category}}</span>
                            </div>
                             <h6>TITLE</h6>
                            <div class="input-ans-overview">
                                <span>{{module.module_name || "No name"}}</span>
                            </div>
                             <h6>DESCRIPTION</h6>
                            <div class="input-ans-overview">
                                <span>{{module.module_description || "No Description"}}</span>
                            </div>
                             <h6>DUE DATE</h6>
                            <div class="input-ans-overview">
                                <span>{{readAbleTime(module.end_date) || "No Due Date"}}</span>
                            </div>
                             <h6>REJECTED</h6>
                            <div class="input-ans-overview">
                                <span>{{module.rejected || "0"}}</span>
                            </div>
                             <h6>EXTENDED DATE</h6>
                            <div class="input-ans-overview">
                                <span>{{module.extended || "0"}}</span>
                            </div>
                            
                             <h6>DEPENDENCIES</h6>
                            <div  class="input-ans-overview">
                              <span v-if="dependencies.length==0">No dependecies</span>
                                <span v-for="dependency in dependencies" >{{dependency}},</span>
                            </div>
                            <!-- {{module.issues}} -->
                            <!-- <h6 ng-if="module.issues && module.issues.length">ISSUES</h6> -->
                            <table class="table" v-if="module.issues && module.issues.length">
                                <thead>
                                    <th>Issue</th>
                                       <th>Date</th>
                                </thead>
                                <tbody>
                                  <tr v-for="issue in module.issues">
                                    <td>{{issue.issue}}</td>
                                    <td>{{readAbleTime(issue.date)}}</td>
                                  </tr>
                                </tbody>
                            </table>

                       
                           

                        <!-- </div> -->
                    </div>
                    <div class="col-md-7">
                    <!-- <div class="row"> -->

                        <h4>Methods</h4>
                        <hr>
                        <h6 v-if="module.method && !module.method.length">No methods</h6>
                                          <el-tabs  
        tab-position="left" 
        style="height: 100%;"
       >


      <el-tab-pane


       v-for="(method, index) in module.method"
          :key="index"
          align="left"
        :label="method.method_name "
         >
          
        <div class="modules-wrppwer-side">
           <div class="row">
              <div class="col-md-12">
                  
                      <!-- <div v-for="m in selectedMethod"> -->
                          <h6>METHOD NAME</h6>
                         <div  class="input-ans-overview">
                                 <span>{{method.method_name}}</span>
                            </div>
                        <!-- <p align="center">{{method.method_name}}</p> -->
                        <h6>DESCRIPTION</h6>
                            <div class="input-ans-overview">
                                <span>{{method.method_action}}</span>
                            </div>
                             <h6>INPUT PARAMETERS</h6>
                            <div   class="input-ans-overview">
                                <span v-for="param in method.input_params">{{param}},</span>
                            </div>
                             <h6>OUTPUT PARAMETER</h6>
                            <div  class="input-ans-overview">
                                <span v-for="param in method.output_params">{{param}}</span>
                            </div>
                            <!-- {{method.method_test}} -->
                             <p align="center" v-if="method.method_test && method.method_test.length>0">TEST CASES</p>
                            <!-- }
                            } -->
                            <table class="table" v-if="method.method_test  && method.method_test.length>0">
                                <thead>
                                    <th>CASE</th>
                                       <th>ACCEPTANCE</th>
                                       <th>STATUS</th>
                                </thead>
                                <tbody>
                                  <tr v-for="test in method.method_test">
                                    <td>{{test.case}}</td>
                                    <td>{{test.acceptance}}</td>
                                    <td>
                                       <i class="ion-checkmark-round" v-if="test.status==1"></i>
                                          <i class="ion-android-cancel" v-if="test.status==2"></i>
                                           <p v-if="test.status==0">untested</p>
                                    </td>
                                  </tr>
                                </tbody>
                            </table>
                      </div>
           </div>
         <!-- </div> -->
   
     </div>
      </el-tab-pane>
  </el-tabs> 
                    

                    </div>
                    
                    </div>

                    <!-- </div> -->
                </div>
          </div>

          <div class="modal-footer" align=center>
 <button type="button" class="btn btn-warning" @click="closeModal">OK</button>
          </div>  
          </div>

         
   </el-dialog>
</template>
<script>
   import { mapActions, mapGetters } from "vuex";

export default {
  
props: ["show_view_module","module"],

methods:{
            ...mapActions('modules/all', [
        'getModules',
    ]),
               ...mapActions('categories', [
        'getCategories',
    ]),
             ...mapActions('userCredentials', [
        'callWithToken',
    ]),
    closeModal(){
      this.$emit("closeViewModal");
    }, 
    readAbleTime(d){
         var x = new Date(d);
    var time = x.toDateString();
    return time
    }        
           
},
mounted(){
if(this.modules.length == 0)
{
    this.callWithToken({
            parameters: {
                id: this.user.Id, // clients team id
                projectId: this.module.project_Id, // project id
            },
            action: this.getModules,
        });
}

  

},
 created(){
        // this.selectedMethod=
          // debugger;

   },     
    computed:
{
    
    category(){
        var cat = this.categories.find(c=>c.Id==this.module.category);
        if(cat)
            return cat.category_name
        return ''
    },
   


    dependencies(){
      
          var modules = [];
          // debugger;
          try{

              for(var i = 0 ; i < this.module.dependency.length ; i++){
        
            for(var x = 0 ; x < this.modules.length ; x++){

                if(this.module.dependency[i].module_Id== this.modules[x].Id)
                    modules.push(this.modules[x].module_name)
                
            }
       }
          }
          catch(ex){

          }
     
       return modules;
    },
      ...mapGetters('modules/all', [
        'modules',
        'loading',
        'error',
      ]),
         ...mapGetters('userCredentials', [
            'user',
        ]),
       ... mapGetters('categories', [
             'categories',
              'loading',
                'error',
                ]
                ),
    }
    }

        
    
 

</script>

<style scoped>
.developer-in-list .profile-picture img {
  width: 35px;
  height: 35px;
  border-radius: 100%;
  border: solid 1px #326ada;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2) !important;
}
#myModald .modal-dialog {
    width: 880px !important;
}
.input-ans-overview {
    background: #F0F5F9;
    padding: 6px 13px 1px;
    margin-bottom: 30px;
}
input#test-input {
  width: 100%;
  float: left;
  margin-right: 5px;
}


.nav-wrap {
  background: #326ada;
  padding: 11px 0px;
  border-radius: 8px;
  margin-bottom: 3%;
}


.btn.btn-md.bg-pink.btn-input-params {
    border-radius: 50%;
}
.output-image {
  display: block;
  margin-bottom: 13%;
  margin-top: 13%;
  text-align: -webkit-center;
}

.float-right {
  float: right;
}

.person {
  display: inline-block;
  font-weight: 600;
}


.col-blue {
  color: #728eaa;
}

.personal-details {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.well.filter button {
  color: #728eaa;
  font-weight: 500;
}

/*.allItems{
    display: none;
}*/

.well.filter input {
  margin-bottom: 7%;
}

.filter {
  background: #326ada;
  margin-top: 13%;
  color: white;
  border-radius: 1px;
  font-weight: 300 !important;
  z-index: 1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.client-personal-details {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.personal-password {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.deactivate-acc {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.form-control:focus {
  border-color: #326ada;
  border: 2px solid #326ada !important;
  outline: 0;
  box-shadow: none !important;
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 2px solid #dee9f2;
  border-radius: 4px;
  /* -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075); */
  /* box-shadow: inset 0 1px 1px rgba(0,0,0,.075); */
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.personal-details button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}

.client-personal-details button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}

.personal-password button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}
.tab-pane ul.nav {
  margin-top: 1% !important;
}
.tab-content {
    margin-top: 9%;
}

td.text-center.option i {
  margin-left: 11px;
}

.output-table {
  margin-top: 14%;
}

.filled {
  color: #6a86a5;
}

.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  padding: 10px;
  line-height: 1.42857143;
  vertical-align: to;
  border-top: 1px solid #eaeaea;
}



.float-left {
  border: 2px solid #3484f5;
  border-radius: 50%;
  padding: 13px 18px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
}

.float-left-second {
  border: 2px solid #39cc39;
  border-radius: 50%;
  padding: 13px 18px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
}



.txt-small {
  font-size: 13px;
  margin-left: 3px;
  font-weight: 100;
}



.f-s-12 {
  font-size: 12px;
}


.icon-change {
  /*animation: turndeg;
    animation-duration: 2px;*/
  transform: rotate(90deg);
  transition: all 0.3s ease;
}

/*@keyframes turndeg{
    from{transform: rotate(90deg)};
    to{transform: rotate(180deg)};
}*/

.switch {
  position: relative;
  display: inline-block;
  width: 54px;
  height: 26px;
}

.switch input {
  display: none;
}
.el-tabs__item {
  width: 100px !important;
  text-align: left !important;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 17px;
  width: 17px;
  left: 4px;
  bottom: 5px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #4ae650;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */

.slider.round {
  border-radius: 50px;
}

.slider.round:before {
  border-radius: 50%;
}

.available button {
  background: #3eca44;
  padding: 8px 28px;
  font-size: 11px;
  color: white;
}


.btn-danger {
  background: #ff0000;
}

.f-weight-3 {
  font-weight: 300;
}

.f-weight-6 {
  font-weight: 400;
}

.f-weight-7 {
  font-weight: 500;
}






.creat-modules {
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 1px;
}

.creat-modules input {
  margin-bottom: 12px;
  box-shadow: none !important;
  border-radius: 5px;
  border: 2px solid #dee9f2 !important;
}

.creat-modules textarea {
  max-width: 100%;
  margin-bottom: 3%;
  height: 115px;
  resize: none;
  box-shadow: none !important;
  border-radius: 5px;
  border: 2px solid #dee9f2 !important;
}

.modules {
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 1px;
}

.modules hr {
  background: #326ada;
  height: 2px;
  border-top: none;
  width: 50%;
}

.modules h3 {
  font-weight: 500;
  margin-top: -2%;
}

.modules p {
  font-size: 10px;
}

.nav-module > li > a {
  background: transparent;
  border-right: 1px solid #dee9f2;
  color: black;
  font-size: 12px;
  font-weight: 400;
}

.next-button button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}

.nav-module > li.active > a,
.nav-module > li.active > a:focus,
.nav-module > li.active > a:hover {
  border-right: 3px solid #326ada !important;
  font-weight: 500;
}

.modal-header {
  padding: 30px;
  border-bottom: 1px solid rgba(229, 229, 229, 0);
}

button.btn.btn-default.grp-btn {
  border-radius: 50%;
  margin-left: 10px;
  color: #326ada !important;
  border: 1px solid #326ada;
}

.output-depend {
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 1px;
}

.f-size-12 {
  font-size: 12px;
}

.hr {
  background: #326ada;
  height: 2px;
  margin-top: 0.6%;
  border-top: none;
  width: 7%;
}

.output-text-click {
  border-bottom: 1px solid #ccc;
  text-align: justify;
  margin-top: 0.321em;
  width: 100%;

  /* IE special */
  width: 100%;
  -ms-text-justify: distribute-all-lines;
  text-justify: distribute-all-lines;
}

.output-text-click:after {
  content: "";
  display: inline-block;
  width: 100%;
  height: 0;
  font-size: 0;
  line-height: 0;
}

.output-text-click p {
  display: inline-block;
  margin-top: 0.321em;
  margin-bottom: 0% !important;
  padding-bottom: 0px !important;

  /* ie 7*/
  *display: inline;
  *zoom: 1;
  *text-align: left;
}

.text-nav {
  display: inline-block;
  vertical-align: baseline;

  /* ie 7*/
  *display: inline;
  *zoom: 1;
  *text-align: right;
}

.text-nav i {
  color: red;
}
.float-icon-add-module {
    position: fixed;
    bottom: 5%;
    left: 35%;
    font-size: 25px !important;
    cursor: pointer;
    /* height: 50px; */
    background: #326ada;
    font-weight: 900;
    padding: 5px 16px;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.23);
    box-shadow: 0 2px 15px rgba(0,0,0,0.23);
    border-radius: 100%;
    color: white;
    z-index: 1000;
    /* width: 50px; */
}

button.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

button.accordion.active,
button.accordion:hover {
  background-color: #ccc;
}
.btn-fab {
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.17);
    border-radius: 60px !important;
    position: fixed;
    bottom: 24%;
    right: 2%;
}
button.accordion:after {
  content: "\002B";
  color: #777;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

button.accordion.active:after {
  content: "\2212";
}

.asing {
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0);
  border: 0px solid white;
  border-radius: 1px;
  color: black;
}

.asing i {
  font-size: 24px;
  font-weight: 900;
  border-radius: 50%;
  padding: 6px 12px;
  color: black;
  border: 2px solid #326ada;
}

.asing h4 {
  margin-top: 6%;
  font-weight: 300;
}

.asing p {
  font-size: 13px;
}

.asing button {
  border-radius: 1px;
  font-weight: 300;
  padding: 9px 45px;
}

.outsource-dev-modal {
  position: fixed;
  max-height: 500px;
  height: 500px;
  overflow-y: scroll;
  width: 70%;
  z-index: 1000 !important;
  background: white;
  display: none;
  border-radius: 1px;
  padding: 19px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
  top: 10%;
  left: 20%;
}

.outsource-dev-modal img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.outsource-dev-modal button {
  border-radius: 1px;
  font-weight: 300;
}

.outsource-dev-modal i {
  cursor: pointer;
}

.media i {
  border-radius: 50%;
  font-weight: 300;
  background: white;
  color: #326ada;
  font-size: 20px;
}

.f-size-13 {
  font-size: 13px;
  font-weight: 100;
}

.nav-module hr {
  background: #326ada;
  height: 2px;
  border-top: none;
  width: 100%;
  margin-top: 0px;
  margin-bottom: 15px;
}

/* .nav-side-nav {
    /* position: fixed; */

/* left: 20px;
    height: 200px;
} */
</style>
