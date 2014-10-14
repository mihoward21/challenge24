var AppView = Backbone.View.extend({

  template: _.template('<button class="reset-button">Reset</button>\
    <div class="number-queue"></div>\
    <div class="computeOne-area"></div>\
    <div class="operation-box"></div>\
    <div class="computeTwo-area"></div>\
    <button class="submit-button">Submit</button> <button class="clear-button">Clear</button>'),

  events: {
    'click .reset-button': function(){
      this.model.reset();
    },
    'click .submit-button': function() {
      this.model.compute();
    },
    'click .clear-button': function() {
      this.model.clearComputeArea();
    },
  },

  initialize: function(params){
    this.holderView = new NumberQueueView({collection: this.model.get('numQueue')});
    this.oneComputeView = new NumberView({model: this.model.get('computeQueue').at(0)});
    this.twoComputeView = new NumberView({model: this.model.get('computeQueue').at(1)});
    this.operationView = new OperationView({model: this.model.get('operation')});

    this.model.on('all:numQueue', function(model){
      this.render();
    }, this);

    this.model.on('change:numComputingValues', function(model) {
      this.oneComputeView = new NumberView({model: this.model.get('computeQueue').at(0)});
      this.twoComputeView = new NumberView({model: this.model.get('computeQueue').at(1)});
      this.render();
    }, this);

    this.render();
  },

  render: function(){
    this.$el.children().detach();
    this.$el.html(this.template);
    this.$('.number-queue').html(this.holderView.el);
    this.$('.computeOne-area').html(this.oneComputeView.render());
    this.$('.operation-box').html(this.operationView.el);
    this.$('.computeTwo-area').html(this.twoComputeView.render());
  }

});
