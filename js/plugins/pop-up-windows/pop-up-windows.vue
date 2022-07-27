<template>
  <transition>
    <div class="pop-up-windows">
      <div class="pop-up-pos-re">
        <div class="pop-up-content-box animated fadeIn">
          <div class="content-box">
            <div class="col-12 p-0">
              <div class="card">
                <div class="card-header" v-if="tlitle">
                  {{tlitle}}
                </div>
                <div class="card-body">
                  <slot></slot>
                </div>
              </div>
            </div>
          </div>
            <div class="d-flex align-items-center card-buttom ">
                <div class="ml-auto d-flex align-items-center">
                    <div class="col-6">
                        <button type="button"  class="unis-btn unis-btn-tertiary" @click.stop.prevent="cancel">Cancel</button>
                    </div>
                    <div class="col-6 " v-if="isSubmit">
                        <button type="submit" class="unis-btn unis-btn-primary unis-sm " :disabled="isSave" >Save <div v-if="isSave" class="loading ml-4 "    ></div></button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" src="./pop-up-windows.scss"/>

