export const statSectionMixin = {
  props: ['stats'],
  emits: ['statSectionChange', 'statHelp'],
  methods: {
    /**
     * if we are adding
     * checks if change is allowed
     * if change is not allowed, we will try lower value
     * first allowed value is emitted
     * if we are not adding, no restriction check is needed, so we emit event
     */
    emitAllowedChange(received_event) {
      var i = received_event[1];
      for (; i > received_event[0].value; i--) {
        if (this.allocatedResources[i] < this.stats.resource[i]) {
          break;
        }
      }
      this.$emit('statSectionChange', [received_event[0], i]);
    },
  },
};
