<template lang="html">
    <div class="container" :class="{'show': showSidebar}">
        <div class="control">
            <i class="fas fa-angle-double-right" @click="showNav"></i>
        </div>
        <div class="navigation-icons">
            <i class="fas fa-user-circle"></i>
            <i class="fas fa-file"></i>
            <i class="fas fa-sign-out-alt"></i>
        </div>
        <div class="navigation-links">
            <transition-group name="fade">
                <div v-show="showLink" key="1">Profile</div>
                <div v-show="showLink" key="2">History</div>
                <div v-show="showLink" key="3">Sign Out</div>
            </transition-group>
        </div>
    </div>
</template>

<script>
  //  import router from "../router";

    export default {
        data: () => {
            return {
                showSidebar: false,
                showLink: false
            }
        },
        methods: {
            showNav() {
                if(this.showSidebar) {
                    this.showLink = false;
                    setTimeout(() => {
                        this.showSidebar = false;
                    }, 500);
                }
                else {
                    this.showSidebar = true;
                    setTimeout(() => {
                        this.showLink = true;
                    }, 500);
                }
            }
        }
    }

</script>

<style lang="scss" scoped >

    @import url('https://fonts.googleapis.com/css?family=Anton');
    @import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');

    .container{
        position: absolute;
        top: 100px;
        left: 0;
        width: 70px;
        padding: 10px;
        min-height: calc(100vh - 20px);
        background-color: rgba($color: #2A88AD, $alpha: .8);
        border: solid #ffffff;
        border-width: 0 1px 0 1px;
        z-index: 999;
        transition: all .5s ease-in-out;

        .control {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            margin-bottom: 10px;

            i {
                font-size: 2rem;
                cursor: pointer;
                transition: all .5s ease-in-out;
            }
        }

        &.show {
            width: 180px;

            .control > i {
                color: #ffffff;
                transform: rotateZ(-180deg);
            }

            .navigation-icons {
                color: #ffffff;
            }
        }

        .navigation-icons {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 50px;
            float: left;

            i {
                font-size: 2rem;
                padding: 10px 0;
                cursor: pointer;
                transition: all .5s ease-in-out;

                &:hover {
                    color: #ffffff;
                }
            }
        }

        .navigation-links {
            padding-top: 14px;
            float: left;
            div {
                display: flex ;
                align-items: stretch ;
                flex-flow: column wrap ;
                vertical-align: middle;
                margin-right: 5px;
                font-size: 1.35rem;
                padding-left: 10px;
                margin-bottom: 26px;
                cursor: pointer;

                &:hover {
                    color: #ffffff;
                }
            }
            @media all and (max-width: 480px) {
                div {
                    display: flex ;
                    align-items: stretch ;
                    flex-flow: column wrap ;
                    vertical-align: middle;
                    margin-right: 5px;
                    font-size: 1.35rem;
                    padding-left: 10px;
                    margin-bottom: 20px;
                    cursor: pointer;

                    &:hover {
                        color: #ffffff;
                    }
                }
            }
        }
    }

    @mixin nav-childs($values...) {
        @each $var in $values {
            &:nth-child(#{$var}) {
                transition: transform linear calc(.1s * #{$var}), display .5s;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        @include nav-childs(1,2,3);
    }
    .fade-enter, .fade-leave-to {
        transform: scale(0);
    }
</style>