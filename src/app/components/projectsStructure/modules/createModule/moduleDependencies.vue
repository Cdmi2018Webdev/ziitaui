<!--STEP 3 of 5-->


<template>
    <div class="savedMethods" style="padding-left: 20px; padding-right: 20px;">
        <div class="well creat-modules" >
            <!-- {{module.dependencyfind(m=>m.module_id=="Hk9poBELz")}} -->
            <!-- <BannerError v-if="error" :exempt="true">{{ error }}</BannerError> -->
            <!-- {{module.dependency}} -->
            <h4 v-if="modulesd" class="text-center hide-nomethd spacer-10">
                No Modules In Project Yet <br>
                <small>You Have To create a module first before We can Have Any Dependencies</small>
            </h4>

            <!--<div v-else>-->
            <div class="row" v-else>
                <!--<h4 class="text-left hide-nomethd">Choose Dependencies from Modules</h4>-->
                <!--<br>-->
                <!--<div class="col">-->
                <div class="kolo">
                    <div class="col-md-6" v-if="module.Id!=m.Id" v-for="(m, index) in modules" :key="index">
                        <div class="proj-type-wellfsd">
                            <!--  <div class="well proj-type-wellfsd"
                             :class="{ 'dactive': isActive(module.Id) }"
                             @click.prevent="addModule(module)" > -->
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="pretty p-default">
                                        <input @click="addModule(m)" :checked="dependencyExist(m.Id)" type="checkbox" />
                                        <div class="state p-primary">
                                            <label> &nbsp; <small>{{ m.module_name }} </small></label>

                                        </div>

                                    </div>
                                    <!--<i class="ion-ios-arrow-down"></i>-->
                                    <!--  <p>{{ module.module_description }}</p>
                                     <small><i class="ion-ios-clock-outline"></i>  Created at {{ module.created_time }}</small> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </div>



            <!--</div>-->
        </div>
        <!--</div>-->

        <div class="col-xs-12" style="padding: 0px !important; margin-top: 10px !important; width: 741px !important; margin-left: -5px !important;" >
            <div class="row" >
                <div class="col-xs-10" >
                    <button class="btn btn-back" @click.stop="goBack" >
                        BACK
                    </button>
                </div>
                <div class="col-xs-2" >
                    <p class=" next-buttontwo">

                        <button class="btn btn-default but" @click="nextStep" >
                            NEXT
                        </button>
                    </p>
                </div>
            </div>
        </div>

      <!--<div class="fortifift">-->

        <!--<div class="dotbarstep2">-->
          <!--<span class="dotbar-item&#45;&#45;filled"></span>-->
          <!--<span class="dotbar-item&#45;&#45;filled"></span>-->
          <!--<span class="dotbar-item&#45;&#45;filled"></span>-->
          <!--<span class="dotbar-item&#45;&#45;empty"></span>-->
          <!--<span class="dotbar-item&#45;&#45;empty"></span>-->

          <!--<button class="btn btn-back" @click="goBack" style="color:#439cfa !important; ">-->
            <!--BACK-->
          <!--</button>-->
        <!--</div>-->

        <!--<p class="text-right next-buttontwo">-->


          <!--<button style="display:none"></button>-->

          <!--<button class="btn btn-default" @click="nextStep" style="">-->
            <!--NEXT-->
          <!--</button>-->
        <!--</p>-->
      <!--</div>-->

    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "module-dependencies",
  props: ['projectId'],
  components: {
  },
    mounted () {
        this.callWithToken({
            parameters: {
                id: this.user.Id, // clients team id
                projectId: this.projectId, // project id
            },
            action: this.getModules,
        });
    },
    destroyed () {
        this.$_$destroyedHook()
    },
  computed: {
      ...mapGetters('modules/all', [
        'modules',
        'loading',
        'error',
      ]),
        // modules(){
        //   if(this.modules ==  []){
        //     return true
        //   }
        //   else{
        //     return false
        //   }
                modulesd(){
        console.log(JSON.stringify(this.modules) + 'sdfsdfsdfs')
          if(JSON.stringify(this.modules) == undefined){
            return true
          }
          else{
            return false
          }
      },

      ...mapGetters('modules', [
        'module',
      ]),
        ...mapGetters('userCredentials', [
            'user',
        ]),
      //   filterItems: function(items) {
      //     return this.modules;
      //   return this.modules.filter(function(item) {
      //     return modules.name.lenght = 6;
      //   })
      // }
  },
  methods: {
    ...mapActions('modules/all', [
        'getModules',
        'resetState'
    ]),
    ...mapActions('userCredentials', [
        'callWithToken',
    ]),
    morethan7(){
        this.modules.splice(6,index);
    },
    goBack () {
        this.$emit('back')
    },
    nextStep () {
        this.$emit('next')
    },
    addModule(module) {
        var exist = this.dependencyExist(module.Id);
        debugger;

        if (!this.dependencyExist(module.Id)) {
            this.module.dependency.push({
//                module_name: module.module_name,
                module_Id:module.Id
            }

            )
        }else{
            this.deleteDependency(module.Id)
        }
        // else {
        //     // remove from array
        //     var index = this.dependencies.indexOf(modu);
        //     array.splice(index, 1);
        // }
    },
    dependencyExist(id){
         for(var i = 0; i<this.module.dependency.length ; i++){
            if(this.module.dependency[i].module_Id==id)
                return true;

        }
        return false;
    },
     deleteDependency(id){
        for(var i = 0; i<this.module.dependency.length ; i++){
            if(this.module.dependency[i].module_Id==id)
                 this.module.dependency.splice(i,1);
        }

    }

  },
};
</script>

<style scoped>
    .savedMethods{
        height: 420px;
    }
    .creat-modules{
        height: 350px !important;
        background: #fff !important;
        border: none !important;
        box-shadow: none !important;

    }
.btn.btn-default.but{
    border: none;
    background: #326ada;
    color: #fff;
}
.proj-type-well.active {
    border: 1px solid #3369da !important;
    /*margin-top: -18% !important;*/
}
.proj-type-well:hover {
    border: 1px solid #2200da !important;
}
.proj-type-well h4 {
    font-weight: 900;
}
.proj-choose-well h4 {
    font-weight: 900;
}
p.text-right.next-button {
    margin-top: 4%;
    text-align: right !important;
}

p.text-right.next-button .btn-success {
    border: none !important;
    color: #fff;
    padding: 8px 48px;
}
.proj-type-wellfsd{
    margin-bottom: 0px !important;
}
.proj-type-wellfsd i {
    /* position: absolute; */
    /* right: -48px; */
    float: right;
    font-size: 20px;
}
.proj-type-wellfsd{
    border: none !important;
    background: none !important;
    box-shadow: none !important;
    /*margin-bottom: -70px !important;*/
}
inspector-stylesheet:5
.proj-type-wellfsd i {
    /* float: right; */
    /* position: absolute; */
}
p.text-right.next-button button {
    font-size: 12px;
    font-weight: 900;
    color: #3469da;
    padding: 7px 40px;
    border: 1px solid #3469da !important;
}
.proj-type-well i {
    color: #3369da;
    font-size: 63px;
}

.proj-choose-well i {
    color: #3369da;
    font-size: 40px;
}

.proj-type-well p {
    font-size: 11px;
}
.proj-type-wellfsd small {
    font-size: 15px;
    color: #000;
    font-weight: 500;
    /* display: inline-block; */
    /* margin-bottom: 0px; */
    /* margin-left: -23px; */
    /* border-bottom: solid red; */
}

.pretty .state label:after, .pretty .state label:before {

    /*top: calc((0% - (100% - 1.5em)) - 8%) !important;*/

}
.proj-type-wellfsd {
    /*background: #ffff;*/
    /*border: 0px;*/
    /*box-shadow: 0 2px 10px rgba(0,0,0,0.16);*/
    padding: 15px 19px;
}
/*.proj-type-well {
    background: white;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 1px;
    transition: all .5s ease;
    padding: 30px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.06);
}*/
.proj-type-well {
    background: white;
    cursor: pointer;
    /*border-top: 1px solid #326ada !important;*/
    border-radius: 1px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    padding: 12px 26px;
    /*-webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.06);*/
    /*box-shadow: 0 2px 15px rgba(0,0,0,0.06);*/
}
small i {
    color: #000 !important;
    font-size: 15px !important;
}

.proj-choose-well {
    background: white;
    cursor: pointer;
    min-height: 358px;
    max-height: 357px;
    /*border: 1px solid #ddd;*/
    border-radius: 1px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    padding: 30px;
    /*-webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.06);*/
    /*box-shadow: 0 2px 15px rgba(0,0,0,0.06);*/
}
.proj-reach-well {
    background: white;
    /*border: 1px solid #ddd;*/
    border-radius: 1px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    padding: 30px;
    /*-webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.06);*/
    /*box-shadow: 0 2px 15px rgba(0,0,0,0.06);*/
}


/*.dactive:before {*/
    /*content: "\f382";*/
    /*position: absolute;*/
    /*font-family: Ionicons;*/
    /*color: green;*/
    /*top: 7%;*/
    /*right: 7%;*/
    /*border: 1px solid green;*/
    /*font-size: 20px;*/
    /*padding: 3px 6px;*/
    /*border-radius: 50%;*/
/*}*/

.spacer-10{
    margin-bottom: 29%;
}


/*/////////////////////////////////////////////////////////////////*/
/*//////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////*/



/* altering materialpapers input textarea & etc */
textarea, textarea.form-control, input.form-control, input[type="text"], input[type="password"], input[type="email"], input[type="number"], .form-control[type="text"], .form-control[type="password"], .form-control[type="email"], .form-control[type="tel"], .form-control[contenteditable],
select, select.form-control {;
  width: 100% !important;
  font-size: 14px !important;
}

select.form-control {
  -webkit-appearance: none !important;
}
.el-dialog__body {
  padding: 30px 0px !important;
}

.el-tabs--left .el-tabs__active-bar, .el-tabs--left .el-tabs__nav-wrap::after {
  left: auto !important;
  right: auto !important;
}

.el-tabs--left .el-tabs__active-bar, .el-tabs--right .el-tabs__active-bar {
  width: 4px !important;
}

.el-tabs--left .el-tabs__item {
  text-align: left !important;
}

.el-tabs__active-bar {
  background-color: #409EFF !important;
}

.el-tabs__nav-wrap::after {
  background-color: #ffffff !important;
}

.module-info-msg p {
  font-size: 11px !important;
}

.error-text {
  font-size: 12px !important;
}

.creat-modules input {
  border: 1px solid #d0d0d0 !important;
  margin-bottom: 6% !important;
}


.creat-modules textarea {
  border: 1px solid #d0d0d0 !important;
  margin-bottom: 6% !important;
}

.form-control {
  border: 1px solid #d0d0d0 !important;
}

.form-control.methodStructure {
  margin-bottom: 20% !important;
}

.btn {
  border-radius: 2px !important;
}


.modules-wrppwer-side {
  padding-bottom: 2% !important;
}

.el-tabs__content {
  box-shadow: 0 50px 80px rgba(0, 0, 0, 0.10) !important;
  padding-bottom: 2% !important;
}

.el-dialog__body {
  padding: 0px 0px 0px 0px !important;
}

.fortifift {
  margin-top: 4.5% !important;
  position: absolute !important;
  margin-left: 96% !important;
}

.fortifift button {
  background: #439cfa !important;
}

textarea.form-control {
  height: 160px !important;
}

.el-tabs--left .el-tabs__header {
  margin-top: 50px;
}

.steps-orange {
  color: #ff9800 !important;
  margin-top: -25% !important;
  margin-bottom: 50% !important;
}

.is-danger {
  color: #bd3b3be6 !important;
}

button.close {
  font-weight: 900 !important;
  color: #000 !important;
  font-size: 25px !important;
}

/*.btn-default:after {*/
  /*content: "\F125";*/
  /*font-family: "Ionicons" !important;*/
  /*background: #439cfa !important;*/
  /*position: absolute;*/
  /*right: 15%;*/
  /*!*bottom: 63%;*!*/
  /*font-size: 16px;*/
  /*font-weight: 100 !important;*/
  /*color: #ddd;*/
/*}*/

/*.btn-defaultFinish:after {*/
  /*content: "" !important;*/
  /*font-family: "Ionicons" !important;*/
  /*background: #439cfa !important;*/
  /*position: absolute;*/
  /*right: 15%;*/
  /*!*bottom: 63%;*!*/
  /*font-size: 16px;*/
  /*font-weight: 100 !important;*/
  /*color: #ddd;*/
/*}*/

.btn-back {
  color: #326ada !important;
  /*margin-top: -3% !important;*/
  /*margin-left: 58% !important;*/
  /*position: relative !important;*/
  border: 1px solid #326ada !important;
  padding: 6px 42px !important;
  background: #fff !important;
}
/*.btn-back:after {*/
  /*content: "\F124";*/
  /*font-family: "Ionicons" !important;*/
  /*background: white !important;*/
  /*position: absolute;*/
  /*right: 75%;*/
  /*!*bottom: 20%;*!*/
  /*font-size: 16px;*/
  /*font-weight: 100 !important;*/
  /*color: #439cfa;*/
/*}*/





/*.is-active:after {*/
  /*content: "\F120";*/
  /*font-family: "Ionicons" !important;*/
  /*position: relative;*/
  /*left: 20%;*/
  /*!*bottom: 20%;*!*/
  /*font-size: 16px;*/
  /*font-weight: 100 !important;*/
  /*color: #409EFF;*/
/*}*/

.el-tabs__item {
  margin-right: 80px !important;
  width: 80px !important;
  max-width: 80px !important;
}

.fortifift button.btn-back {
  background: white !important;
}

.next-buttonone button {
  margin-top: -20% !important;
  padding: 8px 40px !important;
}

.next-buttontwo button {
  /*margin-top: -20% !important;*/
  padding: 8px 40px !important;
  /*margin-right: 28% !important;*/
}

.next-buttonthree button {
  /*margin-top: -20% !important;*/
  padding: 8px 30px !important;
  margin-right: 28% !important;
}

.close {
  opacity: .3;
}

button {
  box-shadow: none !important;
}


.text-center.hide-nomethdf p {
  padding-bottom: 0% !important;
}





.el-tabs__item {
  color: #767676 !important;
}

.text-center.hide-nomethdf p:before {
  top: 21.3% !important;
}


button.add-methods.btn.btn-primary {
  border: 1px solid #439cfa !important;
  color: #439cfa !important;
}




.methods-well {
  padding: 0px 0px 0px !important;
  width: 250px !important;
}
.well {
  border-radius: 2px !important;
  margin-bottom: 0px !important;

}

.textcase-well {
  background: #f9fcff !important;
  border: 1px solid #439cfa !important;
}

.textcase-well button[data-v-215a5bb9] {
  background: #439cfa !important;
}

.methodsN-header {
  padding: 10px 10px 3% !important;
  border-bottom: 1px dashed rgb(212, 212, 212) !important;
}

.methodsN-header button {
  color: #409EFF !important;
  border: 1px solid #409EFF !important;
  margin-top: 0% !important;
  padding: 4px 20px !important;
}

button.btn.btn-info.btn-case {
  color: #409EFF !important;
  border: 1px solid #409EFF !important;
}

button.btn.btn-info.btn-case b {
  font-size: 9px !important;
  margin-right: 5px !important;
  padding: 1px 5px !important;
}

.pretty .state label:before {
  border-color: #409EFF !important;
}

.pretty input:checked~.state.p-primary label:after, .pretty.p-toggle .state.p-primary label:after{
  background-color: #409EFF !important;
}


.col-md-4.ruller-for-module {
  padding-left: 35px !important;
}

.col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9{
  padding-right: 40px !important;
}

.btn-defaultTwo {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}

.btn-defaultTwoTwo {
  color: #8a8989;
  background-color: #f9fcff;
  border-color: #ccc;
  margin-top: -50px;
}

p.nonresuable-msg {
  width: 200px !important;
}

p.text-right.next-button button {
  color: #409EFF !important;
  border: 1px solid #409EFF !important;
}

.col-md-2.step-strange.step-strangeTwo {
  padding-right: 15px !important;
}


.el-input-number {
  width: 320px  !important;
}

.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 320px !important;
}

.el-date-picker.has-sidebar.has-time {
  width: 334px !important;
  left: 535px !important;
}

.el-picker-panel [slot=sidebar], .el-picker-panel__sidebar {
  display: none !important;
}

.el-date-picker .el-picker-panel__content {
  width: 334px !important;
}

.el-picker-panel [slot=sidebar]+.el-picker-panel__body, .el-picker-panel__sidebar+.el-picker-panel__body {
  margin-left: 0px !important;
}

.el-picker-panel__content {
  margin: 0px !important;
}

.el-popper[x-placement^=bottom] .popper__arrow {
  left: 10.7% !important;
  top: 28% !important;
  border-bottom-color: #fff !important;
}

.el-date-picker__time-header {
  display: none !important;
}

.well.creat-modulesv {
  padding: 0px 0px 185px 42px !important;
}


.el-date-picker.has-sidebar.has-time {
  top: 28% !important;
  left: 63% !important;
  position: fixed !important;
  transform-origin: 0px !important;
}

/*.el-date-picker.has-sidebar.has-time:after {*/
  /*content: "\f107";*/
  /*font-family: "Ionicons" !important;*/
  /*background: transparent !important;*/
  /*position: absolute;*/
  /*left: -2%;*/
  /*top: 3%;*/
  /*font-size: 16px;*/
  /*font-weight: 100 !important;*/
  /*color: transparent;*/
/*}*/

.el-date-picker__header-label {
  font-size: 14px;
  font-weight: 900;
}

.kolo {
  height: 320px !important;
  overflow-y: auto !important;
  /*width: 800px !important;*/
}

.kolo .col-md-6 .col-md-12{
  padding-right: 9px !important;
  padding-left: 9px !important;

}
    .kolo:hover::-webkit-scrollbar{
        width: 5px;
        transition: all 1s ease;
    }
    .kolo::-webkit-scrollbar {
        width: 0px;

        transition: all 1s ease;
    }
    .kolo::-webkit-scrollbar-thumb {
        border-radius: 50px;
        /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
        background-color: #848484;
        transition: all 1s ease;
        /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
    }
    .kolo::-webkit-scrollbar-track {
        -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
        border-radius: 50px;

        transition: all 1s ease;
    }
/*.well.proj-type-wellfsd {*/
  /*border: 1px solid #ddd !important;*/
  /*padding: 0px 0px 0px 0px !important;*/
  /*box-shadow: 0px !important;*/
  /*width: 250px  !important;*/
/*}*/

.proj-type-wellfsd .row {
  margin-top: 10px !important;
}

.proj-type-wellfsd small {
  font-size: 13px !important;
  color: #8a8a8a !important;
  font-weight: 500 !important;
}

.tebas {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18) !important;
  height: 30px !important;
}

.fsystem input{
  width: 470px !important;
}

.fsystem .col-md-8{
  padding-left: 4px !important;
}

.fsystem .row{
  margin-left: 0px !important;
}

.fsystem label{
  font-weight: 900 !important;
}

.table>thead>tr>th {
  vertical-align: top !important;
}

.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
  padding: 0px !important;
  vertical-align: middle !important;
}

.table>caption+thead>tr:first-child>td, .table>caption+thead>tr:first-child>th, .table>colgroup+thead>tr:first-child>td, .table>colgroup+thead>tr:first-child>th, .table>thead:first-child>tr:first-child>td, .table>thead:first-child>tr:first-child>th{
  width: 100px !important;
}

label {
  color: #439cfa !important;
}

.el-dialog__wrapper {
  background-color: rgba(67, 156, 250, 0.27) !important;
}



.el-tabs__item:visited {
  color: red !important;
}

td.text-left i {
  font-size: 26px !important;
  color: #409EFF !important;
}

p.dedicated-file{
  background: #409EFF !important;
}

.tebas i{
  color: #409EFF !important;
}





.el-picker-panel__icon-btn {
  color: #fff !important;
  background-color: #90949d !important;
  width: 20px !important;
  height: 20px !important;
  display: block !important;
  margin-right: 10px !important;
  line-height: 20px !important;
  /*position: absolute !important;*/
  /*left: 50% !important;*/
  /*-webkit-transform: translateX(-50%) !important;*/
  /*transform: translateX(-50%) !important;*/
  border-radius: 50% !important;
}


.modal-body{
  padding: 15px 0px 0px !important;
}

.form-control:focus {
  border-color: #439cfa !important;
  border: 2px solid #439cfa !important;
}

</style>
