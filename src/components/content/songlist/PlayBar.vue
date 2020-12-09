<template>
  <div @mouseleave="click" @mouseup="click" class="item">
    <div @mousedown="animationPlay" class="play-bar" v-show="playbar">
      <div :class="{'animate': playAnimate}" class="play">
        <svg class="icon" height="128" p-id="3657"
             t="1603111001277" version="1.1" viewBox="0 0 1027 1024"
             width="128" xmlns="http://www.w3.org/2000/svg">
          <path d="M500.603007 984.907635c-266.747901 0-483.705526-216.957625-483.705526-483.705526s216.957625-483.705526 483.705526-483.705526 483.705526 216.957625 483.705526 483.705526-217.057606 483.705526-483.705526 483.705526z m0-932.417887c-247.45167 0-448.712361 201.260691-448.712361 448.712361s201.260691 448.712361 448.712361 448.712361 448.712361-201.260691 448.712361-448.712361S747.954696 52.489748 500.603007 52.489748z"
                fill="#8a8a8a" p-id="3658"></path>
          <path class="selected"
                d="M370.02851 656.871705c0 40.29213 28.594415 56.788908 63.4876 36.692833l251.550869-145.271626c34.993165-20.196055 34.993165-53.189611 0-73.285687L433.51611 329.535638c-34.993165-20.196055-63.4876-3.699277-63.4876 36.692833v290.643234z m0 0" data-spm-anchor-id="a313x.7781069.0.i0"
                fill="#515151"
                p-id="3659"></path>
        </svg>
      </div>
    </div>
    <div @mousedown="animationMore" class="more-bar" v-show="morebar">
      <div :class="{'animate': moreAnimate}" class="more">
        <svg class="icon" data-spm-anchor-id="a313x.7781069.0.i9" height="128"
             p-id="8804" t="1603113584111" version="1.1"
             viewBox="0 0 1024 1024" width="128" xmlns="http://www.w3.org/2000/svg">
          <path class=""
                d="M639.939954 511.949507c0 35.33425 28.643233 63.974753 63.977483 63.974753 35.331521 0 63.976118-28.640503 63.976118-63.974753 0-35.33698-28.644597-63.981577-63.976118-63.981577-35.33425 0-63.977483 28.644597-63.977483 63.981577z m-191.876496 0c0 35.33425 28.644597 63.974753 63.981576 63.974753 35.332886 0 63.977483-28.640503 63.977483-63.974753 0-35.33698-28.644597-63.981577-63.977483-63.981577-35.33698 0-63.981577 28.644597-63.981576 63.981577z m-191.744123 0c0 35.33425 28.644597 63.974753 63.981577 63.974753 35.332886 0 63.977483-28.640503 63.977482-63.974753 0-35.33698-28.644597-63.981577-63.977482-63.981577-35.33698 0-63.981577 28.644597-63.981577 63.981577z m0 0" data-spm-anchor-id="a313x.7781069.0.i8" fill="#515151"
                p-id="8805"></path>
          <path class="selected"
                d="M511.344954 1022.751319C229.634415 1022.751319 0.536319 793.527672 0.536319 511.879908 0.536319 230.237603 229.634415 1.139506 511.344954 1.139506c281.578165 0 510.803177 229.098097 510.803178 510.740402-0.001365 281.649128-229.225012 510.871411-510.803178 510.871411z m0-983.555029c-260.705411 0-472.751852 211.985031-472.751852 472.684983 0 260.638542 212.047806 472.750488 472.751852 472.750488 260.570308 0 472.683619-212.111946 472.683619-472.750488 0-260.699952-212.113311-472.684983-472.683619-472.684983z m0 0" data-spm-anchor-id="a313x.7781069.0.i7"
                fill="#8a8a8a" p-id="8806"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PlayBar",
    props: {
      morebar: {
        type: Boolean,
        default: true
      },
      playbar: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        moreAnimate: false,
        playAnimate: false
      }
    },
    methods: {
      animationPlay() {
        this.playAnimate = true;
        this.$emit('itemClick');
        this.$emit('play');
      },
      animationMore() {
        this.moreAnimate = true;
        this.$emit('itemClick');
        this.$emit('more')
      },
      click() {
        this.playAnimate = false;
        this.moreAnimate = false;
      }
    },

  }
</script>

<style scoped>

  .item {
    height: 100%;
    background-color: transparent;
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  .play-bar,
  .more-bar {
    padding-top: 1rem;
  }

  .item .icon {
    width: 2rem;
    height: 2rem;
    margin: 0 1rem;
    opacity: 0.8;
  }

  .play-bar,
  .more-bar {
    perspective: 1000px;
  }

  .animate {
    transform: translateZ(-200px);
  }

  @keyframes click {
    0% {
      transform: translateZ(-24px);
    }
    25% {
      transform: translateZ(-18px);
    }
    50% {
      transform: translateZ(-12px);
    }
    75% {
      transform: translateZ(-6px);
    }
    100% {
      transform: translateZ(0);
    }
  }

</style>