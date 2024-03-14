<template>
  <div class="timeline-item animated-background"></div>
</template>

<style scoped>
.timeline-item {
    background: #fff;
    border: 1px solid;
    border-color: #e5e6e9 #dfe0e4 #d0d1d5;
    border-radius: 3px;
    padding: 12px;
    margin: 0 auto;
    width: 100%;
    /* 撑满父元素高度 */
    height: calc(100%);
    box-sizing: border-box;
}


@keyframes placeHolderShimmer{
    0%{
        background-position: 50% 0;
    }
    100%{
        background-position: -150% 0;
    }
}
.animated-background {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 104px;
    position: relative;
}
</style>